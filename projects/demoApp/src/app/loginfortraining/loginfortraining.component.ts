import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loginfortraining',
  templateUrl: './loginfortraining.component.html',
  styleUrls: ['./loginfortraining.component.css']
})
export class LoginfortrainingComponent implements OnInit {
  public serverDetails : any={
    "serverUrl"  : "https://9ozbyvv5v0.execute-api.us-east-1.amazonaws.com/production/api/",
    "endPoint"   : "login"
  }
  constructor() { }

  ngOnInit() {
  }

}
