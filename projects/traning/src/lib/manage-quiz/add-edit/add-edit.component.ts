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
  @Input()
  set serverDetails(serverDetails: {}) {
    this.serverDetailsVal = (serverDetails) || '<no name set>';
    
  }

  @Input()
  set formSource(formSource: any) {
    this.formSourceVal = (formSource) || '<no name set>';
  }
  @Input()
  set ListingPageRoute(val: any) {
    this.listingPageRoute = (val) || '<no name set>';
  }

  constructor(public apiService : ApiService,public fb: FormBuilder,public router:Router) { 
    this.manageQuizForm = this.fb.group({
      question: ["", Validators.required],
      priority: ["", Validators.required],
      status  :[""]
    })

  }

  ngOnInit() {
   
  }
  inputUntouch(form: any, val: any) {
    form.controls[val].markAsUntouched();
  }
 
  ManageQuizFormSubmit(){
    console.log("ddgdd",this.manageQuizForm.value);
      for (let x in this.manageQuizForm.controls) {
        this.manageQuizForm.controls[x].markAsTouched();
      }
      if(this.manageQuizForm.valid){
        if (this.manageQuizForm.value.status)
        this.manageQuizForm.value.status = parseInt("1");
      else
        this.manageQuizForm.value.status = parseInt("0");
      }
       
      const link = this.serverDetailsVal.serverUrl + this.formSourceVal.endpoint;
        let data: any ={
          source: this.formSourceVal.source,
          data: this.manageQuizForm.value,
          token:this.serverDetailsVal.jwttoken
        }
      this.apiService.postData(link,data).subscribe((res: any)=>{
        if(res.status = "success"){
          this.router.navigateByUrl(this.listingPageRoute);
        }
      })
      
  
  }
}
