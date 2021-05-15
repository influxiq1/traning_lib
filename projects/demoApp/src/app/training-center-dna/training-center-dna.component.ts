import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-training-center-dna',
  templateUrl: './training-center-dna.component.html',
  styleUrls: ['./training-center-dna.component.css']
})
export class TrainingCenterDnaComponent implements OnInit {
public manageTrainingList : any=[];
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
  "serverUrl": "https://obq0e0nxhk.execute-api.us-east-1.amazonaws.com/production/api/",
  "jwttoken": ""
};

public DnaServerUrl:any='https://obq0e0nxhk.execute-api.us-east-1.amazonaws.com/production';

public formSource: any = {
  "source":'manage_lession_view',
  "markedSourceName":"done_training_lesson",
  "endpoint": "addorupdatedata",
  "addMarkendpoint":"addmarkdata",
  "showEndpoint":"getquestionanswerlistbylessonid",
  "formTitleName": 'Training Center',
  "getUpdatedTrainingPercentageByUserEndpoint":"getupdatedtrainingpercentagebyuserid",
  "trainingCompletEmailEndpoint":"trainingcompletemail",
  "trainingcatcompletemailendpoint":"trainingcatcompletemail"
}
public trainingCenterRoute:any="/training-center-dna/";
public lessonplanmaterialRoute:any="/lesson-plan-material/";
public jwtToken:any;
public googleScheduleRoute:any='/manage-appointment/mentee/book-appointment/';

  constructor(public activatedRoute : ActivatedRoute,public cookie:CookieService) {
    this.paramsId = this.activatedRoute.snapshot.params.associated_training;
    this.jwtToken = cookie.get('jwtToken');
    this.serverDetails.jwttoken=this.jwtToken;
   }

  ngOnInit() {
    this.activatedRoute.data.forEach(data => {
      this.trainingName = data.trainingdata.trainingname;  
      // console.log("gettrainingcenterlist data",this.trainingName);
      let result: any;
      result = data.trainingdata.results;
      this.totalData=result;
      this.trainingCeneterData = data.trainingdata;
      this.lessonData = data.trainingdata.results.lessondata;
      this.manageTrainingList = result;
      
    })
  }


}
