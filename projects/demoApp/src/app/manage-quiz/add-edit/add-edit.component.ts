import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  public serverDetails: any = {
    "serverUrl": "https://9ozbyvv5v0.execute-api.us-east-1.amazonaws.com/production/api/",
    "jwttoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1Nzk3NTYwNzUsImlhdCI6MTU3OTY2OTY3NX0.OPyRtcCe-VGJcDu6YEWmTyM74CtgBFoy-YtdisSy7SA"
  };
  public formSource: any = {
    "source":'quiz_answer',
    "endpoint": "addorupdatedata",
    "showEndpoint":"datalist",
    "AddheaderText": "Add Training",
    "EditheaderText": "Edit Training",
    "formTitleName": 'Training'
  }
  public listingPageRoute : any="/manage-quiz/list";

  constructor() { }

  ngOnInit() {
  }

}
