import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-training-centre-beto-paredes',
  templateUrl: './training-centre-beto-paredes.component.html',
  styleUrls: ['./training-centre-beto-paredes.component.css']
})
export class TrainingCentreBetoParedesComponent implements OnInit {

  public TrainingCentreData : any={};
  public paramsId:any;
  public lessonData:any=[];
  public trainingName:any;
  public totalData:any=[];
  public trainingCeneterData:any=[];
  public quizQuestionSourceName:any={
    "questionSourceName":"quiz_question",
    "answerSourceName":"quiz_answer"
  };
  public serverDetails: any = {
    "serverUrl": "https://e4bmztjfw8.execute-api.us-east-1.amazonaws.com/dev/api1/",
    "jwttoken": ""
  };
  public trainingcatParamid=this.activatedRoute.snapshot.params.associated_training;
  public lessionParamId=this.activatedRoute.snapshot.params._id;
 
  
  public formSource: any = {
    "source":'manage_lession_view',
    "markedSourceName":"done_training_lesson",
    "endpoint": "addorupdatedata",
    "addMarkendpoint":"addmarkeddata",
    "showEndpoint":"getquestionanswerlistbylessonid",
    "formTitleName": 'Training Center',
    "getUpdatedTrainingPercentageByUserEndpoint":"getupdatedtrainingpercentagebyuserid",
    "trainingCompletEmailEndpoint":"trainingcompletemail",
    "trainingcatcompletemailendpoint":"trainingcatcompletemail"
  }
  public trainingCenterRoute:any="/training-center-beto-paredes/";
  public lessonplanmaterialRoute:any="/lesson-plan-material/";
  public jwtToken:any;
  public googleScheduleRoute:any='/manage-appointment/mentee/book-appointment/';
  
    constructor(public activatedRoute : ActivatedRoute,public cookie:CookieService) {
      this.paramsId = this.activatedRoute.snapshot.params.associated_training;
      this.jwtToken = cookie.get('jwtToken');
      this.serverDetails.jwttoken=this.jwtToken;
      console.log(this.activatedRoute.snapshot.params)
     }

  ngOnInit() {
    this.activatedRoute.data.forEach(data => {
      console.log(data,'data')
      this.trainingName = data.trainingdata.trainingname;  
      console.log(data,"gettrainingcenterlist data",this.trainingName);
      let result: any;
      result = data.trainingdata.results;
      this.totalData=result;
      this.trainingCeneterData = data.trainingdata;
      this.lessonData = data.trainingdata.results.lessondata;
      this.TrainingCentreData = result;
      
    })
  }

}
