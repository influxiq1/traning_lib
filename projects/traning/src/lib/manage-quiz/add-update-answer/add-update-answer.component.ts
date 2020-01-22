import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormControl, FormArray, FormGroup, Validators ,FormGroupDirective} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
@Component({
  selector: 'lib-add-update-answer',
  templateUrl: './add-update-answer.component.html',
  styleUrls: ['./add-update-answer.component.css']
})
export class AddUpdateAnswerComponent implements OnInit {
  public addUpdateAnswerForm: FormGroup;
  public serverDetailsVal:any;
  public formSourceVal :any;
  public listingPageRoute:any;
  public paramsId:any;
  @Input()
  set serverDetails(serverDetails: {}) {
    this.serverDetailsVal = (serverDetails) || '<no name set>';
    console.log(this.serverDetailsVal);
    
  }

  @Input()
  set formSource(formSource: any) {
    this.formSourceVal = (formSource) || '<no name set>';
  }
  @Input()
  set ListingPageRoute(val: any) {
    this.listingPageRoute = (val) || '<no name set>';
  }
  @Input()
  set ParamsId(val: any) {
    this.paramsId = (val) || '<no name set>';
    console.log("idddddddddd",this.paramsId);
  }
  constructor(public apiService : ApiService,public fb: FormBuilder,public router:Router) { 
    this.addUpdateAnswerForm = this.fb.group({
      questionId: ["", Validators.required],
      answer: ["", Validators.required],
      isCorrect  :[""]
    })
  }

  ngOnInit() {
  }
  inputUntouch(form: any, val: any) {
    form.controls[val].markAsUntouched();
  }
  AddUpdateAnswerFormSubmit(){
    for (let x in this.addUpdateAnswerForm.controls) {
      this.addUpdateAnswerForm.controls[x].markAsTouched();
    }

    if(this.addUpdateAnswerForm.valid){
      if (this.addUpdateAnswerForm.value.isCorrect)
      this.addUpdateAnswerForm.value.isCorrect = parseInt("1");
    else
      this.addUpdateAnswerForm.value.isCorrect = parseInt("0");
    }
    // this.addUpdateAnswerForm.value.questionId.
    this.addUpdateAnswerForm.controls['questionId'].patchValue(this.paramsId);
    console.log("scs",this.addUpdateAnswerForm.value.questionId);
 
     
    const link = this.serverDetailsVal.serverUrl + this.formSourceVal.endpoint;
      let data: any ={
        source: this.formSourceVal.source,
        data: this.addUpdateAnswerForm.value,
        token:this.serverDetailsVal.jwttoken
      }
    this.apiService.postData(link,data).subscribe((res: any)=>{
      if(res.status = "success"){
        // this.router.navigateByUrl(this.listingPageRoute);
      }
    })
  }

}
