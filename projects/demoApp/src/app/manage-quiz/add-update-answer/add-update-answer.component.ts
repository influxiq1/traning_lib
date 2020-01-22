import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-update-answer',
  templateUrl: './add-update-answer.component.html',
  styleUrls: ['./add-update-answer.component.css']
})
export class AddUpdateAnswerComponent implements OnInit {
public paramsId:any;
public serverDetails: any = {
  "serverUrl": "https://9ozbyvv5v0.execute-api.us-east-1.amazonaws.com/production/api/",
  "jwttoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1Nzk3NTYwNzUsImlhdCI6MTU3OTY2OTY3NX0.OPyRtcCe-VGJcDu6YEWmTyM74CtgBFoy-YtdisSy7SA"
};
public formSource: any = {
  "source":'quiz_question',
  "endpoint": "addorupdatedata",
  "showEndpoint":"datalist",
  "AddheaderText": "Add Training",
  "EditheaderText": "Edit Training",
  "formTitleName": 'Training'
}
  constructor(public activatedRoute:ActivatedRoute) { 
    this.paramsId = activatedRoute.snapshot.params.id;
    console.log("dkjfhdjhsc",this.paramsId);
  }

  ngOnInit() {
  }

}
