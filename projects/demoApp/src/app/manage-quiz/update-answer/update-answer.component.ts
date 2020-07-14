import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-update-answer',
  templateUrl: './update-answer.component.html',
  styleUrls: ['./update-answer.component.css']
})
export class UpdateAnswerComponent implements OnInit {
public quizAnswerList : any=[];
public serverDetails: any = {
  "serverUrl": "https://obq0e0nxhk.execute-api.us-east-1.amazonaws.com/production/api1/",
  "jwttoken": ""
};
public formSource: any = {
  "source":"quiz_answer",
  "endpoint": "addorupdatedata",
  "deleteendpoint": "lessonanswerdatadelete",
  "showEndpoint":"datalist",
  "formTitleName": 'Training'
}
public jwtToken:any;

  constructor(public activatedRoute : ActivatedRoute,public cookie:CookieService) { 
    this.jwtToken = cookie.get('jwtToken');
    this.serverDetails.jwttoken=this.jwtToken;
  }

  ngOnInit() {
    this.activatedRoute.data.forEach(data => {
      let result: any;
      result = data.quizQuestionData.res;
      this.quizAnswerList = result;
    })
  }

}
