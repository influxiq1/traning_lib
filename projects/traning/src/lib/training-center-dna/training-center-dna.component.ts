import { Component, OnInit ,ViewChild,Input,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar } from "@angular/material";
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { MatCarouselSlide, MatCarouselSlideComponent } from '@ngmodule/material-carousel';
import { count } from 'rxjs/operators';
// import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import { Pipe, PipeTransform } from '@angular/core';
export interface DialogData {
  data: string;
}
@Component({
  selector: 'lib-training-center-dna',
  templateUrl: './training-center-dna.component.html',
  styleUrls: ['./training-center-dna.component.css']
})
export class TrainingCenterDnaComponent implements OnInit {
  public progressLoader:boolean=false;
  public trainingCategoryList:any=[];
  public allLessonData:any=[];
  public serverDetailsVal:any;
  public formSourceVal:any;
  public lessonData:any=[];
  public panelOpenState = false;
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
  public percentageprogressLoader:boolean=true;
  public totalData:any;
  public reportPercentage:any;
  public dividend:any;
  public divisor:any;
  public parentPercentage:any;
  public doneLessonByCatByUser:any;
  public uniquedonetrainingarray:any=[];
  public paramsTrainingId:any; 
  public lesson_title:any;
  public trainingLessonCount:any;
  public lesson_done:any;
  public userName:any;
  public adminlessoncount:any;
  public salesreplessoncount:any;
  public userlessoncount:any;
  public lessonplanmaterialroute:any;
  public lessonDataList:any=[];
  public allLessonDataList:any=[];
  public nextdata:number=0;
  public userType:any;
  public Index:number;
  public flag:any=0;
  public lastIndex:number;
 
  @Input()
  set lessonplanmaterialRoute(route:any){
   this.lessonplanmaterialroute = route;
  }
  @Input()
  set TrainingCategoryList(val: any) {
    let results:any=(val) || '<no name set>';
    let parentdone:any;
    let parentcount:any;
    this.trainingCategoryList= results.trainingcenterlist;   
    for (let i in this.trainingCategoryList) {
     
      parentdone = this.trainingCategoryList[i].done;
      parentcount = this.trainingCategoryList[i].count;
      if(this.trainingCategoryList[i].done !=null && this.trainingCategoryList[i].count !=null){
        this.trainingCategoryList[i].percentage = Math.floor((this.trainingCategoryList[i].done/this.trainingCategoryList[i].count)*100);
      
      }
 
    }
    
    

    this.allLessonData = results.lessondata;
    this.trainingCategoryName=results.trainingname;
  }
  @Input()
  set TotalData(data: {}) {
    this.totalData = (data) || '<no name set>';
    this.trainingLessonCount = this.totalData.training_lesson_count;
    this.doneLessonByCatByUser = this.totalData.done_lesson_by_cat_by_user;
    this.adminlessoncount=this.totalData.total_lesson[0].count;
    // this.salesreplessoncount=this.totalData.total_lesson_salesrep[0].count;
    // this.userlessoncount=this.totalData.total_lesson_user[0].count;
    let done_lesson_by_cat_by_user:any=this.totalData.done_lesson_by_cat_by_user.length;
    // this.divisor=lesson; 
    let userPercentage:any=0;

    for(let n in  this.trainingCategoryList){
      for(let tc in this.trainingLessonCount){
        if(this.trainingCategoryList[n]._id.toString()==this.trainingLessonCount[tc]._id.associated_training.toString()){
          this.trainingCategoryList[n].count=this.trainingLessonCount[tc].lessons;
          // this.salesrepLessonCount = this.salesrepLessonCount + this.trainingLessonCount[tc].lessons;
        }
        
         
      }

      if(this.trainingCategoryList[n].count ==null)
      this.trainingCategoryList[n].count=0;
      if(this.trainingCategoryList[n].done ==null)
      this.trainingCategoryList[n].done=0;
      
      if(this.trainingCategoryList[n].childid!=null && this.trainingCategoryList[n].childid.length>0){
        
        for(let p in this.trainingCategoryList[n].childid){


          for(let tc in this.trainingLessonCount){
    
            if(this.trainingLessonCount[tc]._id.associated_training.toString() == this.trainingCategoryList[n].childid[p].toString()){
              this.trainingCategoryList[n].childcount[p]=this.trainingLessonCount[tc].lessons;
              // this.salesrepLessonCount = this.salesrepLessonCount + this.trainingLessonCount[tc].lessons;
            }
          }
          if(this.trainingCategoryList[n].childcount[p]==null)
          this.trainingCategoryList[n].childcount[p]=0;
          if(this.trainingCategoryList[n].childdone==null)
          this.trainingCategoryList[n].childdone=[];
          if(this.trainingCategoryList[n].childpercentage==null)
          this.trainingCategoryList[n].childpercentage=[];

          if(this.trainingCategoryList[n].childdone[p]==null)
          this.trainingCategoryList[n].childdone[p]=0;
          if(this.trainingCategoryList[n].childpercentage[p]==null)
          this.trainingCategoryList[n].childpercentage[p]=0;
          for(let c in this.doneLessonByCatByUser){
           
            if(this.doneLessonByCatByUser[c].associated_training.toString()==this.trainingCategoryList[n].childid[p].toString()){

              this.trainingCategoryList[n].childdone[p]=this.doneLessonByCatByUser[c].lessonsdone;
              this.trainingCategoryList[n].childpercentage[p]=Math.floor((this.doneLessonByCatByUser[c].lessonsdone)/(this.trainingCategoryList[n].childcount[p])*100);
            
            }
          }
        }

      }
    }
    if(this.totalData.done_lesson_by_user!=null && this.totalData.done_lesson_by_user[0]!=null)
    {
      userPercentage=this.totalData.done_lesson_by_user[0].lessonsdone;
      this.dividend=userPercentage;
      // this.reportPercentage=Math.floor(userPercentage/this.adminlessoncount*100);
    }
    if(done_lesson_by_cat_by_user==0){
      this.dividend=0;
    }
    // this.divisor = this.salesrepLessonCount;
  }
  @Input()
  set TrainingCeneterData(data: any) {
    let results:any=(data) || '<no name set>';
console.log("souresh testing++++++++++",results);
    this.uniquedonetrainingarray = results.uniquedonetrainingarray;
    this.lessonDataList = results.rdata;
    this.allLessonDataList = results.alllessondata;
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
    public cookieService:CookieService,public snakBar:MatSnackBar,public activatedRoute:ActivatedRoute) {
    
      this.userId = JSON.parse(this.cookieService.get('userid'));
      this.userType = JSON.parse(this.cookieService.get('type'));
      // this.userType = "mentee";
      this.paramsTrainingId = activatedRoute.snapshot.params.associated_training;
      
      
    }

  ngOnInit() {
    this.divisor = this.adminlessoncount;
    this.reportPercentage=Math.floor(this.dividend/this.divisor*100);
     
    // switch (this.cookiesData.type) {
    //   case 'admin':
    //     this.divisor = this.adminlessoncount;
    //     break;
    //   case 'salesrep':
    //     this.divisor = this.salesreplessoncount;
    //     break;
    //   case 'user':
    //     this.divisor = this.userlessoncount;
    //     break ;
    
    // }

  }
  
  
  lessonplanpageroute(id){
    this.router.navigateByUrl(this.lessonplanmaterialroute+this.paramsTrainingId+'/'+id);
  }
  questionDetails(id:any,i:any,lesson_title:any){
    this.lesson_title = lesson_title
    this.progressLoader = true;
    
    this.questionId = id;
    this.questionindex = 0;
    const link = this.serverDetailsVal.serverUrl + this.formSourceVal.showEndpoint;
    let data: any ={
      source:  this.quizQuestionSource.questionSourceName,
      // token:this.serverDetailsVal.jwttoken,
      condition:{
        lesson_id: id
      }
    }
    this.apiService.getData(link, data)
    .subscribe((response):any=>{
      let result :any=response;
      this.questionArray = result.results.questionanswerlist;
      if(this.questionArray.length==0){
        this.addMarkedData(this.currentlesson,this.paramsId,id,this.lesson_title);
        this.questionArray.expanded = true;
      }
      if(i<this.allLessonData.length){
      if(i<this.allLessonData.length){
          
        if(this.allLessonData[i+1]!=null){
        this.allLessonData[i].expanded=false;
        this.allLessonData[i+1].expanded=true;
        this.allLessonData[i+1].is_done=true;
        }else{
          let message :any="You Have Successfully Completed The Training";
          let action : any="Ok";
          this.snakBar.open(message,action,{
            duration:3000
          });
          setTimeout(() => {
            // this.lastOpenDialog('lessoncompletedmoal'); 
          }, 4000);
          
        }
      }
      }
      if(this.questionArray.length>0){
        this.progressLoader = false;
        let lesson_name:any=lesson_title;
        this.quizQuestion = this.questionArray[this.questionindex];
        // this.openDialog(this.quizQuestion,i,this.lesson_title);
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

  // openquestionmodal(id:any,lesson_title){

  //   this.quizQuestion = this.questionArray[this.questionindex];
  //   this.openDialog(this.quizQuestion,id,lesson_title);

  //   for (const i in this.questionArray) {
  //     this.quizQuestion = this.questionArray[i].question;
  //     for (const loop in this.quizQuestion.answers) {
  //       this.currentQuestionIndex = this.quizQuestion.answers[loop].answer;
        
  //     }
  //   }
  // }
  // openDialog(x: any,id:any,lesson_title:any): void {
  //   this.dialogRef = this.dialog.open(Dialogtest, {
  //     width: '550px',
  //     data: { data: x } 
  //   });
  //   this.dialogRef.afterClosed().subscribe(result => {
  //     if(result==true) {
  //       if((this.questionindex+1) == this.questionArray.length){
  //         this.addMarkedData(this.currentlesson,this.paramsId,id,this.lesson_title);
  //       }else{
  //       this.questionindex++;
  //       this.openquestionmodal(id,lesson_title);
  //       }
  //     }
  //   });
  // }
  
  addMarkedData(lessonId:any,associated_training:any,i:any,lession_title:any){    
    const link = this.serverDetailsVal.serverUrl + this.formSourceVal.addMarkendpoint;
    let data:any={
      "data":{
        "user_id" : this.userId,
        "lesson_id": lessonId,
        "associated_training":associated_training,
        "lastlessonname":lession_title,
        "lasttrainingname":this.trainingCategoryName
      },
      "sourceobj":["user_id","lesson_id","associated_training"],
      "token":this.serverDetailsVal.jwttoken
    }
    
    this.apiService.postData(link,data).subscribe((response:any)=>{
      if(response.status="success"){
        const link = this.serverDetailsVal.serverUrl + this.formSourceVal.getUpdatedTrainingPercentageByUserEndpoint;
        let data:any={
          "user_id":this.userId
        }
        this.apiService.postDatawithoutToken(link,data).subscribe((response:any)=>{
          let divisor:any;
          let dividend:any;
          let percentageResult:any;
          let data:any=response.results.totalpercentage[0].lessonsdone;
          this.dividend=data;
          divisor = response.results.totallesson[0].count;
          dividend = response.results.totalpercentage[0].lessonsdone;
          percentageResult = Math.floor(dividend/divisor*100);
          this.reportPercentage = percentageResult;
          // if(this.reportPercentage === 100){
           
          //  const link = this.serverDetailsVal.serverUrl + this.formSourceVal.trainingCompletEmailEndpoint;
          //  let data:any={
          //      "user_id":this.userId,
          //      "user_email":this.cookiesData.email,
          //      "user_name":this.userName,
          //      "user_type":this.cookiesData.type
          //  }
          //  this.apiService.postDatawithoutToken(link,data).subscribe((response:any)=>{
           
          //  });
          // }
        })



        // if(i<this.allLessonData.length){
          
        //   if(this.allLessonData[i+1]!=null){
        //   this.allLessonData[i].expanded=false;
        //   this.allLessonData[i+1].expanded=true;
        //   this.allLessonData[i+1].is_done=true;
          
        //   }else{
             
        //     const link = this.serverDetailsVal.serverUrl + this.formSourceVal.trainingcatcompletemailendpoint;
        //     let data:any={
        //       "email":this.cookiesData.email,
        //       "user_name":this.userName,
        //       "cat_name":this.trainingCategoryName,
        //       "user_type":this.cookiesData.type
        //   }
          
        //   this.apiService.postDatawithoutToken(link,data).subscribe((response:any)=>{
          
        //   });
            
        //     let message :any="You Have Successfully Completed The Training";
        //     let action : any="Ok";
        //     this.snakBar.open(message,action,{
        //       duration:3000
        //     });
        //     setTimeout(() => {
              
        //     }, 4000);
            
        //   }
        //   }
          
        }
      
    })
  }

  // lastOpenDialog(x: any): void {
  //   this.dialogRef = this.dialog.open(Dialogtest, {
  //     panelClass: 'successModal',
  //     width: '550px',
  //     data: { data: x ,trainingdata:this.trainingCategoryList,currentTrainingId:this.paramsTrainingId ,trainingCenterRoute:this.trainingCenterRoute} 
  //   });
  //   this.dialogRef.afterClosed().subscribe(result => {
 
  //   });
  // }
 

  videoended(item:any,i:any,j){
    if(item.test_associate_training=='Yes'){
        this.questionDetails(item._id,i,j);
    }else{
    this.addMarkedData(item._id,this.paramsId,i,this.lesson_title);
    }
  }

  audioended(item:any,i:any,j){
    if(item.test_associate_training=='Yes'){
      this.questionDetails(item._id,i,j);
   }else{
     this.addMarkedData(item._id,this.paramsId,i,this.lesson_title);
  }
  }
  childcatclick(childId:any,catName:any){
    this.trainingCategoryName=catName;
    this.router.navigateByUrl(this.trainingCenterRoute + childId);
  
  }
  nochildclick(id:any){
    this.router.navigateByUrl(this.trainingCenterRoute + this.paramsTrainingId+'/'+id);
  }
  clicktrcataining(id:any){
    this.router.navigateByUrl(this.trainingCenterRoute + id);
  }
  activatedclass(item){
    item.active=!item.active;
  }
  activatedclasslesson(item){
    item.active=!item.active;
  }
  getTrainingCenterlistFunction(associated_training:any,type:any,user_id:any){
    const link = this.serverDetailsVal.serverUrl + "gettrainingcenterlist";  
    let data:any={
      "condition":{
        "associated_training":associated_training
      },
      "user_id":this.userId,
      "type":type,
      "associated_training":associated_training
    }
    this.apiService.postDatawithoutToken(link,data).subscribe((response:any)=>{
      // console.log("response",response);
      this.trainingCategoryList = response.results.trainingcenterlist;
      this.lessonDataList = response.rdata;
      this.dividend = response.results.done_lesson_by_user[0].lessonsdone;
      this.divisor = response.results.total_lesson[0].count;
      this.reportPercentage=Math.floor(this.dividend/this.divisor*100);

    });
  }
  nextbutton(value:any){
    console.log("next button",this.lessonDataList);
    for (const key in this.lessonDataList) {
      if (this.lessonDataList[key].expanded == true) {
        this.Index = this.lessonDataList.indexOf(this.lessonDataList[key]);
        
      }
    }
    this.lastIndex=this.lessonDataList.length; 
    console.log("+++++++++",this.lastIndex);
    console.log("+++++++++",this.Index);

     switch (value) {
       case 'next':
        // if(this.Index<this.lessonDataList.length){
          this.addMarkedData(this.lessonDataList[this.Index]._id,this.paramsId,this.nextdata,this.lessonDataList[this.Index].lession_title);
          this.getTrainingCenterlistFunction(this.paramsId,this.userType,this.userId);
          this.Index++;
          // console.log("souresh test",this.nextdata);
        // }
         break;
         case 'prev':
        this.flag=1;
           let index:any=this.Index-1;
           console.log(this.lessonDataList[index]);
         
            this.lessonDataList = [this.lessonDataList[index]];
          
           
           console.log("++++++++",this.lessonDataList);
           console.log("____________",index);
          //  let index = 0;
          //  let lessonData:any=this.lessonDataList;
          //  if(index===0){
          //     index = this.lessonDataList.length;
          //  }
          //  index = index-1;
          //  this.lessonDataList=lessonData[index];
          // console.log("+++++++",lessonData[index]);
         break;

     
       }
   
  }
}


// @Component({
//   selector: 'dialogtest',
//   templateUrl: 'modal.html',
//   styleUrls: ['./list.component.css']
// })
// export class Dialogtest {
//   public is_error: any;
//   public error:any="";
//   public successanswer:boolean=false;

//   constructor(public dialogRef: MatDialogRef<Dialogtest>,
//     @Inject(MAT_DIALOG_DATA) public data: any,public router:Router) {
//       console.log("modal data",this.data.trainingdata);
//     this.is_error = data.data;
//     let tempdata:any=this.data.data;
//     let ddata:any[]=tempdata.answers;
//     for(let b in ddata){
//         //console.log(ddata[b]._id,'did');
//         ddata[b].ans=false;
//     }
//   }
//   closeButton() {
//     this.dialogRef.close(false);
//   }
//   navigate(childId:any){
//     this.router.navigateByUrl(this.data.trainingCenterRoute+childId);
//     this.closeButton();
//   }
//   noChildNavigate(id:any){
//     this.router.navigateByUrl(this.data.trainingCenterRoute+id);
//     this.closeButton();
//   }

//   resetanswer(){
//     let tempdata:any=this.data.data;
//     let ddata:any[]=tempdata.answers;
//     for(let b in ddata){
//         //console.log(ddata[b]._id,'did');
//         ddata[b].ans=false;
//     }
//   }
//   submitanswer(){
//     this.error='';
//     let tempdata:any=this.data.data;
//     let ddata:any[]=tempdata.answers;
//     for(let b in ddata){
//         //console.log(ddata[b].ans,'did');
//         if(ddata[b].ans==true){
//           if(ddata[b].isCorrect==1){
//             this.successanswer=true;
//             setTimeout(() => {
//               this.successanswer=false;
//               this.dialogRef.close(true);
            
//             }, 5000);
          
//           }
//         }
        
//     }
//     this.error="Wrong Answer !!";

//   }
// }
