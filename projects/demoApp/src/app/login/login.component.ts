import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   public serverDetails : any={
     "serverUrl"  : "https://9ozbyvv5v0.execute-api.us-east-1.amazonaws.com/production/api/",
     "endPoint"   : "login"
   }
  constructor() { }

  ngOnInit() {
  }

}
