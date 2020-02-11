import { Component, OnInit ,ViewChild,Input,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


export interface DialogData {
  message: string;
}
@Component({
  selector: 'lib-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public trainingCategoryList:any=[];
  public allLessonData:any=[];
  public serverDetailsVal:any;
  public formSourceVal:any;
  public lessonData:any=[];
  panelOpenState = false;
  public dialogRef: any;
  public quizQuestionSource:any;
  public quizQuestion:any;
  public quizAnswers : any=[];
  public questionId:any;
  public questionArray:any=[];
  public currentQuestionIndex:any;
  public allCookiesData:any;
  public cookiesData:any;
  public userId:any;

  @Input()
  set TrainingCategoryList(val: any) {
    let results:any=(val) || '<no name set>';
    this.trainingCategoryList= results.trainingcenterlist;
    this.allLessonData = results.lessondata;
    console.log("lesson",this.allLessonData);
  }
  @Input()
  set serverDetails(serverDetails: {}) {
    this.serverDetailsVal = (serverDetails) || '<no name set>';
  }
  @Input()
  set formSource(formSource: any) {
    this.formSourceVal = (formSource) || '<no name set>';
  }
  @Input()
  set QuizQuestionSource(val: any) {
    this.quizQuestionSource = (val) || '<no name set>';
  }
  constructor(public dialog: MatDialog,public apiService : ApiService,public router :Router,
    public cookieService:CookieService) {
      this.allCookiesData = cookieService.getAll();
      this.cookiesData = JSON.parse(this.allCookiesData.login_details);
      this.userId = this.cookiesData._id;
      console.log("cookies dataaaa",this.cookiesData);
      console.log("cookies dataaaa",this.userId);
   }

  ngOnInit() {

  }
  questionDetails(id:any){
    this.questionId = id;
    const link = this.serverDetailsVal.serverUrl + this.formSourceVal.showEndpoint;
    let data: any ={
      source:  this.quizQuestionSource.questionSourceName,
      token:this.serverDetailsVal.jwttoken,
      condition:{
        lesson_id: id
      }
    }
    this.apiService.getData(link, data)
    .subscribe((response):any=>{
      let result :any=response;
      this.questionArray = result.results.questionanswerlist;
      this.quizQuestion = this.questionArray[0].question;
      this.openDialog(this.quizQuestion);

      for (const i in this.questionArray) {
        this.quizQuestion = this.questionArray[i].question;
        for (const loop in this.quizQuestion.answers) {
          this.currentQuestionIndex = this.quizQuestion.answers[loop].answer;
          
        }
      }
      console.log("all answers",this.currentQuestionIndex);

      this.answerDetails();
    })

  }
  openDialog(x: any): void {
    this.dialogRef = this.dialog.open(Dialogtest, {
      width: '250px',
      data: { message: x }
    });
    this.dialogRef.afterClosed().subscribe(result => {
    });
  }
  answerDetails(){
    const link = this.serverDetailsVal.serverUrl + this.formSourceVal.showEndpoint;
    let data: any ={
      source: this.quizQuestionSource.answerSourceName,
      token:this.serverDetailsVal.jwttoken,
      condition:{
        questionId_object: this.questionId
      }
    }
    this.apiService.getData(link, data)
    .subscribe(response=>{
      // let result :any=response;
      // this.questionArray = result.res;
      // for (const i in this.questionArray) {
      //   this.quizQuestion = this.questionArray[i].question;
      //   this.openDialog(this.quizQuestion);
      // }
    
    })
  }
  addMarkedData(lessonId:any,associated_training:any){
    const link = this.serverDetailsVal.serverUrl + this.formSourceVal.endpoint;
    let data:any={
      "data":{
        "user_id" : this.userId,
        "lesson_id": lessonId,
        "associated_training":associated_training
      },
      "source":this.formSourceVal.markedSourceName,
      "token":this.serverDetailsVal.jwttoken
    }
    this.apiService.postData(link,data).subscribe(response=>{
      console.log("results",response);
    })


  }

}


@Component({
  selector: 'dialogtest',
  templateUrl: 'modal.html',
})
export class Dialogtest {
  public is_error: any;

  constructor(public dialogRef: MatDialogRef<Dialogtest>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.is_error = data.message;
  }
}
