import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormControl, FormArray, FormGroup, Validators ,FormGroupDirective} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
@Component({
  selector: 'lib-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  public manageQuizForm: FormGroup;
  public serverDetailsVal:any;
  public formSourceVal :any;
  public listingPageRoute:any;
  public paramId:any;
  public listingData:any=[];
  public headerText : any="Add Question";
  public buttonText :any="Submit"
  public lessonId:any;
  public statuschecked:boolean = true;
  @Input()
  set serverDetails(serverDetails: {}) {
    this.serverDetailsVal = (serverDetails) || '<no name set>';
  }
  @Input()           //getting data for edit from application
  set DataList(val: any) {
    this.listingData = (val) || 'no name set';
    this.listingData = val;
    if(this.paramId){
      this.manageQuizForm.controls['question'].patchValue(val[0].question);
      this.manageQuizForm.controls['priority'].patchValue(val[0].priority);
      this.manageQuizForm.controls['status'].patchValue(val[0].status);
    }
    }
  @Input()
  set formSource(formSource: any) {
    this.formSourceVal = (formSource) || '<no name set>';
    console.log("dddd",this.formSourceVal);                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
  }
  @Input()
  set ListingPageRoute(val: any) {
    this.listingPageRoute = (val) || '<no name set>';
  }
  @Input()
  set LessonId(id: any) {
    this.lessonId = (id) || '<no name set>';
  }

  constructor(public apiService : ApiService,public fb: FormBuilder,public router:Router,public activatedRoute:ActivatedRoute) { 
    this.manageQuizForm = this.fb.group({                                                                                                                                                                       
      lesson_id:[''],
      question: ["", Validators.required],
      priority: ["", Validators.required],
      status  :[""]
    })
    this.paramId = activatedRoute.snapshot.params._id;
    if(this.paramId){
      this.headerText = "Edit Question";
      this.buttonText = "Update";
    }
  }

  ngOnInit() {
   
  }
  inputUntouch(form: any, val: any) {
    form.controls[val].markAsUntouched();
  }
 
  ManageQuizFormSubmit(){
      for (let x in this.manageQuizForm.controls) {
        this.manageQuizForm.controls[x].markAsTouched();
      }
      if(this.manageQuizForm.valid){
        this.manageQuizForm.controls['lesson_id'].patchValue(this.lessonId);

        if (this.manageQuizForm.value.status)
        this.manageQuizForm.value.status = parseInt("1");
      else
        this.manageQuizForm.value.status = parseInt("0");
           
      const link = this.serverDetailsVal.serverUrl + this.formSourceVal.endpoint;
      console.log("add",link);
      var data;
      if(this.paramId){
        data = {
          "source": this.formSourceVal.source,
          "token":this.serverDetailsVal.jwttoken,
          "data": {
            "id": this.paramId,
            'question': this.manageQuizForm.value.question,
            'priority': this.manageQuizForm.value.priority,
            'status': this.manageQuizForm.value.status,
          },
          "sourceobj": ["lesson_id"],
        }
      }else{
        data = {
          "source":this.formSourceVal.source,
          "token":this.serverDetailsVal.jwttoken,
          "data": this.manageQuizForm.value,
          "sourceobj": ["lesson_id"],
        }
      }
      
       
      this.apiService.postData(link,data).subscribe((res: any)=>{
        if(res.status = "success"){
          this.router.navigateByUrl(this.listingPageRoute + this.lessonId);
        }
      })
    }
      
  
  }
}
