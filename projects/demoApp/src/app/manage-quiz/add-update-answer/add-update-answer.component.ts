import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-update-answer',
  templateUrl: './add-update-answer.component.html',
  styleUrls: ['./add-update-answer.component.css']
})
export class AddUpdateAnswerComponent implements OnInit {
public paramsId:any;
public lessonId:any;
public listingPageRoute:any="/manage-quiz/list/";
public serverDetails: any = {
  "serverUrl": "https://9ozbyvv5v0.execute-api.us-east-1.amazonaws.com/production/api/",
  "jwttoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1ODExNTAxNzYsImlhdCI6MTU4MTA2Mzc3Nn0.CNXLL48GzKbEY7s65ferCxqJGiPmgA1g0vZpvs9Rrmg"
};
public formSource: any = {
  "source":'quiz_answer',
  "endpoint": "addorupdatedata",
  "showEndpoint":"datalist",
  "AddheaderText": "Add Training",
  "EditheaderText": "Edit Training",
  "formTitleName": 'Training'
}
  constructor(public activatedRoute:ActivatedRoute) { 
    this.paramsId = activatedRoute.snapshot.params.id;
    this.lessonId = activatedRoute.snapshot.params.lessonid;
  }

  ngOnInit() {
  }

}
