import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-quiz',
  templateUrl: './manage-quiz.component.html',
  styleUrls: ['./manage-quiz.component.css']
})
export class ManageQuizComponent implements OnInit {
  public quizQuestionList: any = [];
  public addPageRoute: any = "/manage-quiz/add";
  public lessonPageRoute: any = "/manage-lession/list";
  public editPageRoute:any="";
  public serverDetails: any = {
    "serverUrl": "https://9ozbyvv5v0.execute-api.us-east-1.amazonaws.com/production/api/",
    "jwttoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1Nzk3NTYwNzUsImlhdCI6MTU3OTY2OTY3NX0.OPyRtcCe-VGJcDu6YEWmTyM74CtgBFoy-YtdisSy7SA"
  };
  public formSource: any = {
    "source":'quiz_question',
    "endpoint": "deletesingledata",
    "searchEndpoint":"datalist"
  }
  public addUpdateAnswerRoute:any="/manage-quiz/add-answer/"; 

  constructor(public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.forEach(data => {
      let result: any;
      result = data.trainingdata.res;
      this.quizQuestionList = result;
    })
  }

}
