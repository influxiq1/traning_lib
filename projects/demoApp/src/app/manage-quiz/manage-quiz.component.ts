import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

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
    "jwttoken": ""
  };
  public formSource: any = {
    "source":'quiz_question',
    "endpoint": "singledeletetrainingdata",
    "searchEndpoint":"datalist",
    "statusUpdateEndpoint":"statusChange",
    "statusUpdateSourceName":"quiz_question",
  }
  public addUpdateAnswerRoute:any={
    "addAnswerRoute":"/manage-quiz/add-answer/",
    "updateAnswerRoute":"/manage-quiz/update-answer/"
  }
  public jwtToken:any;

  constructor(public activatedRoute: ActivatedRoute,public cookie:CookieService) { 
    this.paramsId = this.activatedRoute.snapshot.params.lesson_id_object;
    this.jwtToken = cookie.get('jwtToken');
    this.serverDetails.jwttoken=this.jwtToken;
  }

  ngOnInit() {
    this.activatedRoute.data.forEach(data => {
      let result: any;
      result = data.trainingdata.res;
      this.quizQuestionList = result;
    })
  }

}
