import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-list-quiz',
  templateUrl: './list-quiz.component.html',
  styleUrls: ['./list-quiz.component.css']
})
export class ListQuizComponent implements OnInit {
  public paramsId: any;
  public lessonId: any;
  public AddPageRoute:any='/quiz/add/';
  public LessonList:any='/manage-lesson/list';

  public quizQuestionList: any = [];
  public addPageRoute: any = "/quiz/add/";
  public editPageRoute:any="/quiz/edit/";

  public serverDetails: any = {
    "serverUrl": "https://obq0e0nxhk.execute-api.us-east-1.amazonaws.com/production/api/",
    "jwttoken": ""
  };
  public formSource: any = {
    "source":'manage_quiz',
    "endpoint": "deletesingledata",
    "searchEndpoint":"datalist",
    "statusUpdateEndpoint":"statusupdate",
    "statusUpdateSourceName":"manage_quiz",
  }
  public addUpdateAnswerRoute:any={
    "addAnswerRoute":"/quiz/add-answer/",
    "updateAnswerRoute":"/quiz/update-answer/"
  }
  public jwtToken:any;

  constructor(public activatedRoute: ActivatedRoute,public cookie:CookieService) { 
    this.paramsId = activatedRoute.snapshot.params.id;
    this.lessonId = activatedRoute.snapshot.params.lesson_id_object;
    console.log("lesson id",this.paramsId);
    this.jwtToken = cookie.get('jwtToken');
    this.serverDetails.jwttoken=this.jwtToken;
  }

  ngOnInit() {
    this.activatedRoute.data.forEach(data => {
      let result: any;
      result = data.quizData.res;
      this.quizQuestionList = result;
    })
  }

}
