import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  public quizQuestionSingleDataList:any=[];
  public lessonId:any
  public serverDetails: any = {
    "serverUrl": "https://9ozbyvv5v0.execute-api.us-east-1.amazonaws.com/production/api/",
    "jwttoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1ODA1MzQ5MTQsImlhdCI6MTU4MDQ0ODUxNH0.VBsQ4fE_K-v8dP5y5VAV30rPBxbF3qyh4IjN0tbOeS8"
  };
  public formSource: any = {
    "source":"quiz_question",
    "endpoint": "addorupdatedata",
    "showEndpoint":"datalist",
    "formTitleName": 'Training'
  }
  public listingPageRoute : any="/manage-quiz/list/";

  constructor(public activatedRoute : ActivatedRoute) { 
    this.lessonId = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit() {
    if(this.activatedRoute.snapshot.params._id){
      this.activatedRoute.data.forEach(data => {
        let result: any;
        result = data.quizQuestionData.res;
        this.quizQuestionSingleDataList = result;
        console.log("kjjihsiuhdata",this.quizQuestionSingleDataList);
  
      })
    }
  
  }

}
