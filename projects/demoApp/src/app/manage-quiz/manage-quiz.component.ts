import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-quiz',
  templateUrl: './manage-quiz.component.html',
  styleUrls: ['./manage-quiz.component.css']
})
export class ManageQuizComponent implements OnInit {
  public quizQuestionList: any = [];
  public addPageRoute: any = "/manage-quiz/add/";
  public lessonPageRoute: any = "/manage-lession/list";
  public editPageRoute:any="/manage-quiz/edit/";
  public paramsId:any;
  // public updateAnswerRoute:any="/manage-quiz/update-answer/";
  public serverDetails: any = {
    "serverUrl": "https://9ozbyvv5v0.execute-api.us-east-1.amazonaws.com/production/api/",
    "jwttoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1ODA3OTI3MzIsImlhdCI6MTU4MDcwNjMzMn0.kPY8xA70kLfgdfcRFb4-7j7178W_kQfn5DFvHcRv0_E"
  };
  public formSource: any = {
    "source":'quiz_question',
    "endpoint": "deletesingledata",
    "searchEndpoint":"datalist",
    "statusUpdateEndpoint":"statusChange",
    "statusUpdateSourceName":"quiz_question",
  }
  public addUpdateAnswerRoute:any={
    "addAnswerRoute":"/manage-quiz/add-answer/",
    "updateAnswerRoute":"/manage-quiz/update-answer/"
  }

  constructor(public activatedRoute: ActivatedRoute) { 
    this.paramsId = this.activatedRoute.snapshot.params.lesson_id_object;
  }

  ngOnInit() {
    this.activatedRoute.data.forEach(data => {
      let result: any;
      result = data.trainingdata.res;
      this.quizQuestionList = result;
    })
  }

}
