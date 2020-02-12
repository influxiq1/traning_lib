import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
public manageTrainingList : any=[];
public paramsId:any;
public lessonData:any=[];
public quizQuestionSourceName:any={
  "questionSourceName":"quiz_question",
  "answerSourceName":"quiz_answer"
};
public serverDetails: any = {
  "serverUrl": "https://9ozbyvv5v0.execute-api.us-east-1.amazonaws.com/production/api/",
  "jwttoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1ODE1NzIxODEsImlhdCI6MTU4MTQ4NTc4MX0.s02ZEafcKSbetGQdvMkUfMZD1sTS4usTOJbYC2ayhCo"
};
public formSource: any = {
  "source":'manage_lession_view',
  "markedSourceName":"done_training_lesson",
  "endpoint": "addorupdatedata",
  "showEndpoint":"getquestionanswerlistbylessonid",
  "formTitleName": 'Training Center'
}
public trainingCenterRoute:any="/training-center/list/";

  constructor(public activatedRoute : ActivatedRoute) {
    this.paramsId = this.activatedRoute.snapshot.params.associated_training;
    console.log("param issss",this.paramsId);
   }

  ngOnInit() {
    this.activatedRoute.data.forEach(data => {
      console.log(data);
      let result: any;
      result = data.trainingdata.results;
      this.lessonData = data.trainingdata.results.lessondata;
      this.manageTrainingList = result;
      
    })
  }


}
