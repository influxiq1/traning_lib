import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  public quizQuestionSingleDataList:any=[];
  public serverDetails: any = {
    "serverUrl": "https://9ozbyvv5v0.execute-api.us-east-1.amazonaws.com/production/api/",
    "jwttoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1Nzk4NDIxNDAsImlhdCI6MTU3OTc1NTc0MH0.9gzREv5uiI4Bp2PMRS2F2fELmmBpztUl8VSFGyoiu-k"
  };
  public formSource: any = {
    "source":"quiz_question",
    "endpoint": "addorupdatedata",
    "showEndpoint":"datalist",
    "formTitleName": 'Training'
  }
  public listingPageRoute : any="/manage-quiz/list";

  constructor(public activatedRoute : ActivatedRoute) { }

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
