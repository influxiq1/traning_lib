import { Component, OnInit ,ViewChild,Input,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar } from "@angular/material";
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { MatCarouselSlide, MatCarouselSlideComponent } from '@ngmodule/material-carousel';

// import { setTimeout } from 'timers';

export interface DialogData {
  data: string;
}
@Component({
  selector: 'lib-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public progressLoader:boolean=false;
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
  public questionindex:any=0;
  public currentlesson:any='';
  public paramsId:any;
  public trainingCenterRoute:any;
  public isDisabled:boolean=true;
  public trainingCategoryName:any;

  @Input()
  set TrainingCategoryList(val: any) {
    let results:any=(val) || '<no name set>';
    console.log(results,'trainingname');
    this.trainingCategoryList= results.trainingcenterlist;   
    this.allLessonData = results.lessondata;
    this.trainingCategoryName=results.trainingname;
    
    console.log("souresh",this.allLessonData);
  }
  @Input()
  set serverDetails(serverDetails: {}) {
    this.serverDetailsVal = (serverDetails) || '<no name set>';
  }
  @Input()
  set TrainingName(name: any) {
    this.trainingCategoryName = (name) || '<no name set>';
  }
  @Input()
  set formSource(formSource: any) {
    this.formSourceVal = (formSource) || '<no name set>';
  }
  @Input()
  set QuizQuestionSource(val: any) {
    this.quizQuestionSource = (val) || '<no name set>';
  }
  @Input()
  set ParamsId(id: any) {
    this.paramsId = (id) || '<no name set>';
  }
  @Input()
  set TrainingCenterRoute(id: any) {
    this.trainingCenterRoute = (id) || '<no name set>';
  }
  constructor(public dialog: MatDialog,public apiService : ApiService,public router :Router,
    public cookieService:CookieService,public snakBar:MatSnackBar) {
      this.allCookiesData = cookieService.getAll();
      this.cookiesData = JSON.parse(this.allCookiesData.user_details);
      this.userId = this.cookiesData._id;
     
   }

  ngOnInit() {

  }
  questionDetails(id:any,i:any){
    this.progressLoader = true;

    this.questionId = id;
    this.questionindex = 0;
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
      if(this.questionArray.length>0){
        this.progressLoader = false;
        this.quizQuestion = this.questionArray[this.questionindex];
        this.openDialog(this.quizQuestion,i);
      }else{
        this.progressLoader = false;
        let message :any="This Lesson Doesn't Have Any Questions";
        let action : any="Ok";
        this.snakBar.open(message,action,{
          duration:3000
        })
      }
      
    });

  }

  openquestionmodal(id:any){

    this.quizQuestion = this.questionArray[this.questionindex];
    this.openDialog(this.quizQuestion,id);

    for (const i in this.questionArray) {
      this.quizQuestion = this.questionArray[i].question;
      for (const loop in this.quizQuestion.answers) {
        this.currentQuestionIndex = this.quizQuestion.answers[loop].answer;
        
      }
    }
  }
  openDialog(x: any,id:any): void {
    this.dialogRef = this.dialog.open(Dialogtest, {
      width: '550px',
      data: { data: x } 
    });
    this.dialogRef.afterClosed().subscribe(result => {
      if(result==true) {
        if((this.questionindex+1) == this.questionArray.length){
          this.addMarkedData(this.currentlesson,this.paramsId,id);
        }else{
        this.questionindex++;
        this.openquestionmodal(id);
        }
      }
    });
  }
  
  addMarkedData(lessonId:any,associated_training:any,i:any){
    const link = this.serverDetailsVal.serverUrl + this.formSourceVal.endpoint;
    let data:any={
      "data":{
        "user_id" : this.userId,
        "lesson_id": lessonId,
        "associated_training":associated_training
      },
      "source":this.formSourceVal.markedSourceName,
      "sourceobj":["user_id","lesson_id","associated_training"],
      "token":this.serverDetailsVal.jwttoken
    }
    this.apiService.postData(link,data).subscribe(response=>{
      console.log("results",response);
      this.allLessonData[i].expanded=false;
      this.allLessonData[i+1].expanded=true;
      this.allLessonData[i+1].is_done=true;
    })


  }


  videoended(item:any,i:any){
    if(item.test_associate_training=='Yes'){
        this.questionDetails(item._id,i);
    }else{
    this.addMarkedData(item._id,this.paramsId,i);
    }
  }

  audioended(item:any,i:any){
    if(item.test_associate_training=='Yes'){
      this.questionDetails(item._id,i);
   }else{
     this.addMarkedData(item._id,this.paramsId,i);
  }
  }
  childcatclick(childId:any,catName:any){
    console.log("cat name",catName);
    this.trainingCategoryName=catName;
  this.router.navigateByUrl(this.trainingCenterRoute + childId);
  //  this.trainingCenterRoute + childId;
  }
  nochildclick(id:any){
    this.router.navigateByUrl(this.trainingCenterRoute + id);

  }

}


@Component({
  selector: 'dialogtest',
  templateUrl: 'modal.html',
})
export class Dialogtest {
  public is_error: any;
  public error:any="";
  public successanswer:boolean=false;

  constructor(public dialogRef: MatDialogRef<Dialogtest>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      
    this.is_error = data.data;
    let tempdata:any=this.data.data;
    let ddata:any[]=tempdata.answers;
    for(let b in ddata){
        //console.log(ddata[b]._id,'did');
        ddata[b].ans=false;
    }
  }
  closeButton() {
    this.dialogRef.close(false);
  }

  resetanswer(){
    let tempdata:any=this.data.data;
    let ddata:any[]=tempdata.answers;
    for(let b in ddata){
        //console.log(ddata[b]._id,'did');
        ddata[b].ans=false;
    }
  }
  submitanswer(){
    this.error='';
    let tempdata:any=this.data.data;
    let ddata:any[]=tempdata.answers;
    for(let b in ddata){
        //console.log(ddata[b].ans,'did');
        if(ddata[b].ans==true){
          if(ddata[b].isCorrect==1){
            this.successanswer=true;
            setTimeout(() => {
              this.successanswer=false;
              this.dialogRef.close(true);
            
            }, 5000);
          
          }
        }
        
    }
    this.error="Wrong Answer !!";

  }
}
