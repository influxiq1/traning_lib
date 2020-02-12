import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormControl } from "@angular/forms";
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../api.service';
@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   public loginForm:FormGroup; 
   public serverDetailsVal:any;
   @Input()
   set ServerDetails(serverDetails: {}) {
     this.serverDetailsVal = (serverDetails) || '<no name set>';
   }
  constructor( public fb : FormBuilder,public cookieService : CookieService,public apiService : ApiService) {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])],
      password: ['', Validators.required]
    })
   }

  ngOnInit() {
  }
  inputUntouched(val: any) {
    this.loginForm.controls[val].markAsUntouched();
  }
  loginFormSubmit(){
    for (let i in this.loginForm.controls) {
      this.loginForm.controls[i].markAllAsTouched();
    }
    let link = this.serverDetailsVal.serverUrl + this.serverDetailsVal.endPoint;
      let data : any = this.loginForm.value;
      this.apiService.postlogin(link,data).subscribe(Response=>{
        let result : any = Response;
        if(result.status=="success"){
           this.cookieService.set('login_details',JSON.stringify(result.item[0]));
           this.cookieService.set('jwtToken',result.token);
        }
      })
      
  }

}
