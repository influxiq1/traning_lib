import { Component, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar } from "@angular/material";
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { MatCarouselSlide, MatCarouselSlideComponent } from '@ngmodule/material-carousel';
import { count } from 'rxjs/operators';
import { MatProgressBarModule, MatRadioModule, MatSliderModule } from '@angular/material'
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
  public progressLoader: boolean = false;
  public trainingCategoryList: any = [];
  public allLessonData: any = [];
  public serverDetailsVal: any;
  public formSourceVal: any;
  public lessonData: any = [];
  public panelOpenState = false;
  public dialogRef: any;
  public quizQuestionSource: any;
  public quizQuestion: any;
  public quizAnswers: any = [];
  public questionId: any;
  public questionArray: any = [];
  public currentQuestionIndex: any;
  public allCookiesData: any;
  public cookiesData: any;
  public userId: any;
  public questionindex: any = 0;
  public currentlesson: any = '';
  public paramsId: any;
  public trainingCenterRoute: any;
  public isDisabled: boolean = true;
  public trainingCategoryName: any;
  public percentageprogressLoader: boolean = true;
  public totalData: any;
  public reportPercentage: any;
  public dividend: any;
  public divisor: any;
  public parentPercentage: any;
  public doneLessonByCatByUser: any;
  public uniquedonetrainingarray: any = [];
  public paramsTrainingId: any;
  public lesson_title: any;
  public trainingLessonCount: any;
  public lesson_done: any;
  public userName: any;
  public adminlessoncount: any;
  public salesreplessoncount: any;
  public userlessoncount: any;
  public lessonplanmaterialroute: any;
  public lessonDataList: any = [];
  public allLessonDataList: any = [];
  public nextdata: number = 0;
  public userType: any;
  public Index: number;
  public flag: any = 0;
  public lastIndex: number;
  public firstIndex: number;
  public currentLesson: any;
  public completedLessons: any = [];
  public lesson_content: any;
  public lesson_data: any;
  public progress_bar = 0;
  public training_cat_name: any;
  public training_header_text: any = 'ADVANCED MENTOR COURSE CERTIFICATION';
  public paramslessonId: any;

  @Input()
  set lessonplanmaterialRoute(route: any) {
    this.lessonplanmaterialroute = route;
  }
  @Input()
  set TrainingCategoryList(val: any) {
    let results: any = (val) || '<no name set>';
    let parentdone: any;
    let parentcount: any;
    this.trainingCategoryList = results.trainingcenterlist;



    for (let i in this.trainingCategoryList) {

      parentdone = this.trainingCategoryList[i].done;
      parentcount = this.trainingCategoryList[i].count;
      if (this.trainingCategoryList[i].done != null && this.trainingCategoryList[i].count != null) {
        this.trainingCategoryList[i].percentage = Math.floor((this.trainingCategoryList[i].done / this.trainingCategoryList[i].count) * 100);
        console.log('this.trainingCategoryList[i].percentage',this.trainingCategoryList[i].percentage,this.trainingCategoryList[i],i,this.trainingCategoryList[i].done,this.trainingCategoryList[i].count);

      }

    }



    this.allLessonData = results.lessondata;
    this.trainingCategoryName = results.trainingname;
  }
  @Input()
  set TotalData(data: {}) {
    this.totalData = (data) || '<no name set>';
    this.trainingLessonCount = this.totalData.training_lesson_count;
    this.doneLessonByCatByUser = this.totalData.done_lesson_by_cat_by_user;
    this.adminlessoncount = this.totalData.total_lesson[0].count;
    // this.salesreplessoncount=this.totalData.total_lesson_salesrep[0].count;
    // this.userlessoncount=this.totalData.total_lesson_user[0].count;
    let done_lesson_by_cat_by_user: any = this.totalData.done_lesson_by_cat_by_user.length;
    // this.divisor=lesson; 
    let userPercentage: any = 0;

    for (let n in this.trainingCategoryList) {
      for (let tc in this.trainingLessonCount) {
        if (this.trainingCategoryList[n]._id.toString() == this.trainingLessonCount[tc]._id.associated_training.toString()) {
          this.trainingCategoryList[n].count = this.trainingLessonCount[tc].lessons;
          // this.salesrepLessonCount = this.salesrepLessonCount + this.trainingLessonCount[tc].lessons;
        }


      }

      if (this.trainingCategoryList[n].count == null)
        this.trainingCategoryList[n].count = 0;
      if (this.trainingCategoryList[n].done == null)
        this.trainingCategoryList[n].done = 0;

      if (this.trainingCategoryList[n].childid != null && this.trainingCategoryList[n].childid.length > 0) {

        for (let p in this.trainingCategoryList[n].childid) {


          for (let tc in this.trainingLessonCount) {

            if (this.trainingLessonCount[tc]._id.associated_training.toString() == this.trainingCategoryList[n].childid[p].toString()) {
              this.trainingCategoryList[n].childcount[p] = this.trainingLessonCount[tc].lessons;
              // this.salesrepLessonCount = this.salesrepLessonCount + this.trainingLessonCount[tc].lessons;
            }
          }
          if (this.trainingCategoryList[n].childcount[p] == null)
            this.trainingCategoryList[n].childcount[p] = 0;
          if (this.trainingCategoryList[n].childdone == null)
            this.trainingCategoryList[n].childdone = [];
          if (this.trainingCategoryList[n].childpercentage == null)
            this.trainingCategoryList[n].childpercentage = [];

          if (this.trainingCategoryList[n].childdone[p] == null)
            this.trainingCategoryList[n].childdone[p] = 0;
          if (this.trainingCategoryList[n].childpercentage[p] == null)
            this.trainingCategoryList[n].childpercentage[p] = 0;
          for (let c in this.doneLessonByCatByUser) {

            if (this.doneLessonByCatByUser[c].associated_training.toString() == this.trainingCategoryList[n].childid[p].toString()) {

              this.trainingCategoryList[n].childdone[p] = this.doneLessonByCatByUser[c].lessonsdone;
              this.trainingCategoryList[n].childpercentage[p] = Math.floor((this.doneLessonByCatByUser[c].lessonsdone) / (this.trainingCategoryList[n].childcount[p]) * 100);

            }
          }
        }

      }
    }
    if (this.totalData.done_lesson_by_user != null && this.totalData.done_lesson_by_user[0] != null) {
      userPercentage = this.totalData.done_lesson_by_user[0].lessonsdone;
      this.dividend = userPercentage;
      // this.reportPercentage=Math.floor(userPercentage/this.adminlessoncount*100);
    }
    if (done_lesson_by_cat_by_user == 0) {
      this.dividend = 0;
    }
    // this.divisor = this.salesrepLessonCount;
  }
  @Input()
  set TrainingCeneterData(data: any) {

    this.progress_bar = 0;
    if (this.progress_bar == 0) {
      window.scrollTo({
        top: 200,
        left: 0,
        behavior: 'smooth'
      });
    }
    // console.log(this.progress_bar,'>>>+++',this.training_header_text)
    // this.training_cat_name=this.training_header_text;
    let results: any = (data) || '<no name set>';
    // console.log("souresh testing++++++++++",results);
    this.lesson_content = results.results.lesson_content[0];
    console.log(this.lesson_content, 'lesson dada>>>>')

    this.uniquedonetrainingarray = results.uniquedonetrainingarray;
    this.lessonDataList = results.rdata;
    for (const i in this.lessonDataList) {
      if (this.lessonDataList[i].expanded == true) {
        this.currentLesson = this.lessonDataList[i]._id;
      }
    }
    for (const i in this.lessonDataList) {
      if (this.lessonDataList[i].expanded == false) {

        this.completedLessons.push(this.lessonDataList[i]._id);
      }
    }
    console.log("completed lessons", this.completedLessons);

    this.allLessonDataList = results.results.lessondata;
    setTimeout(() => {
      this.paramsTrainingId = this.activatedRoute.snapshot.params.associated_training;
      this.paramslessonId = this.activatedRoute.snapshot.params._id;

      console.log(this.paramsTrainingId, '>>>>', this.paramslessonId)

      if (this.activatedRoute.snapshot.params._id == null) {
        this.paramslessonId = results.results.lessondata[0]._id;
        // this.lesson_content=results.results.lesson_content[0];
        console.log(this.lesson_content, '+++++++++>>>>', this.paramslessonId)

      }
    }, 200);

    for (let i in results.results.trainingcenterlist) {
      if (this.activatedRoute.snapshot.params.associated_training == results.results.trainingcenterlist[i]._id) {
        this.training_cat_name = results.results.trainingcenterlist[i].catagory_name;
      }
    }

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
  constructor(public dialog: MatDialog, public apiService: ApiService, public router: Router,
    public cookieService: CookieService, public snakBar: MatSnackBar, public activatedRoute: ActivatedRoute) {

    this.userId = JSON.parse(this.cookieService.get('userid'));
    this.userType = JSON.parse(this.cookieService.get('type'));
    // this.userType = "mentee";
    setTimeout(() => {
      this.paramsTrainingId = activatedRoute.snapshot.params.associated_training;
      console.log(this.paramsTrainingId, '>>>>')
    }, 200);


  }

  ngOnInit() {
    this.divisor = this.adminlessoncount;
    this.reportPercentage = Math.floor(this.dividend / this.divisor * 100);
    console.log("curreentLesson ++++++", this.currentLesson);
    for (const key in this.lessonDataList) {
      if (this.lessonDataList[key].expanded == true) {
        this.Index = this.lessonDataList.indexOf(this.lessonDataList[key]);
        console.log(this.Index, '>>>>>');
      }
    }
    this.lastIndex = this.lessonDataList.length - 1;
    console.log(this.lastIndex)

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


  lessonplanpageroute(id) {
    this.router.navigateByUrl(this.lessonplanmaterialroute + this.paramsTrainingId + '/' + id);
  }
  questionDetails(id: any, i: any, lesson_title: any) {
    this.lesson_title = lesson_title
    this.progressLoader = true;

    this.questionId = id;
    this.questionindex = 0;
    const link = this.serverDetailsVal.serverUrl + this.formSourceVal.showEndpoint;
    let data: any = {
      source: this.quizQuestionSource.questionSourceName,
      // token:this.serverDetailsVal.jwttoken,
      condition: {
        lesson_id: id
      }
    }
    this.apiService.getData(link, data)
      .subscribe((response): any => {
        let result: any = response;
        this.questionArray = result.results.questionanswerlist;
        if (this.questionArray.length == 0) {
          this.addMarkedData(this.currentlesson, this.paramsId, id, this.lesson_title);
          this.questionArray.expanded = true;
        }
        if (i < this.allLessonData.length) {
          if (i < this.allLessonData.length) {

            if (this.allLessonData[i + 1] != null) {
              this.allLessonData[i].expanded = false;
              this.allLessonData[i + 1].expanded = true;
              this.allLessonData[i + 1].is_done = true;
            } else {
              let message: any = "You Have Successfully Completed The Training";
              let action: any = "Ok";
              this.snakBar.open(message, action, {
                duration: 3000
              });
              setTimeout(() => {
                // this.lastOpenDialog('lessoncompletedmoal'); 
              }, 4000);

            }
          }
        }
        if (this.questionArray.length > 0) {
          this.progressLoader = false;
          let lesson_name: any = lesson_title;
          this.quizQuestion = this.questionArray[this.questionindex];
          // this.openDialog(this.quizQuestion,i,this.lesson_title);
        } else {
          this.progressLoader = false;
          let message: any = "This Lesson Doesn't Have Any Questions";
          let action: any = "Ok";
          this.snakBar.open(message, action, {
            duration: 3000
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

  addMarkedData(lessonId: any, associated_training: any, i: any, lession_title: any) {
    const link = this.serverDetailsVal.serverUrl + this.formSourceVal.addMarkendpoint;
    // if(this.trainingCategoryName==null || this.trainingCategoryName==''){}
    let data: any = {
      "data": {
        "user_id": this.userId,
        "lesson_id": lessonId,
        "associated_training": associated_training,
        "lastlessonname": lession_title,
        "lasttrainingname": this.trainingCategoryName
      },
      "sourceobj": ["user_id", "lesson_id", "associated_training"],
      "token": this.serverDetailsVal.jwttoken
    }

    console.log('post data',data);

    this.apiService.postData(link, data).subscribe((response: any) => {
      if (response.status = "success") {
        const link = this.serverDetailsVal.serverUrl + this.formSourceVal.getUpdatedTrainingPercentageByUserEndpoint;
        let data: any = {
          "user_id": this.userId
        }
        // this.apiService.postDatawithoutToken(link, data).subscribe((response: any) => {
        //   let divisor: any;
        //   let dividend: any;
        //   let percentageResult: any;
        //   let data: any = response.results.totalpercentage[0].lessonsdone;
        //   this.dividend = data;
        //   divisor = response.results.totallesson[0].count;
        //   dividend = response.results.totalpercentage[0].lessonsdone;
        //   percentageResult = Math.floor(dividend / divisor * 100);
        //   this.reportPercentage = percentageResult;
        //   // if(this.reportPercentage === 100){

        //   //  const link = this.serverDetailsVal.serverUrl + this.formSourceVal.trainingCompletEmailEndpoint;
        //   //  let data:any={
        //   //      "user_id":this.userId,
        //   //      "user_email":this.cookiesData.email,
        //   //      "user_name":this.userName,
        //   //      "user_type":this.cookiesData.type
        //   //  }
        //   //  this.apiService.postDatawithoutToken(link,data).subscribe((response:any)=>{

        //   //  });
        //   // }
        // })



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


  videoended(item: any, i: any, j) {
    if (item.test_associate_training == 'Yes') {
      this.questionDetails(item._id, i, j);
    } else {
      this.addMarkedData(item._id, this.paramsId, i, this.lesson_title);
    }
  }

  audioended(item: any, i: any, j) {
    if (item.test_associate_training == 'Yes') {
      this.questionDetails(item._id, i, j);
    } else {
      this.addMarkedData(item._id, this.paramsId, i, this.lesson_title);
    }
  }


  childcatclick(childId: any, catName: any) {
    this.trainingCategoryName = catName;
    this.router.navigateByUrl(this.trainingCenterRoute + childId);

  }


  nochildclick(id: any) {
    setTimeout(() => {
      this.progress_bar = 1;
    }, 100);
    this.router.navigateByUrl(this.trainingCenterRoute + this.paramsTrainingId + '/' + id);
    if (this.lesson_data != null)
      this.lesson_content = this.lesson_data.results.lesson_content[0];
    // console.log(this.lesson_content,'___++++')

  }


  clicktrcataining(id: any, catagory_name: any) {

    setTimeout(() => {
      this.progress_bar = 1;
    }, 100);

    console.log(id, '++++++++++', catagory_name)

    this.router.navigateByUrl(this.trainingCenterRoute + id);
    // if( this.progress_bar == 0){
    this.training_header_text = catagory_name;
    // }

    // setTimeout(() => {
    //   if(this.progress_bar == 0){
    //     window.scrollTo({ 
    //       top: 200, 
    //       left: 0, 
    //       behavior: 'smooth' 
    //     });
    //   }
    // }, 500);

  }

  activatedclass(item) {
    item.active = !item.active;
  }

  // activatedclasslesson(items){
  //   items.active1=!items.active1;
  // }

  getTrainingCenterlistFunction(associated_training: any, type: any, user_id: any) {
    const link = this.serverDetailsVal.serverUrl + "gettrainingcenterlist";
    let data: any = {
      "condition": {
        "associated_training": associated_training
      },
      "user_id": user_id,
      "type": type,
      "associated_training": associated_training
    }
    this.apiService.postDatawithoutToken(link, data).subscribe((response: any) => {
      this.lesson_data = response;
      console.log("response", response);
      this.trainingCategoryList = response.results.trainingcenterlist;
      this.lessonDataList = response.rdata;
      this.dividend = response.results.done_lesson_by_user[0].lessonsdone;
      this.divisor = response.results.total_lesson[0].count;
      this.reportPercentage = Math.floor(this.dividend / this.divisor * 100);
      this.lesson_content = this.lesson_data.results.lesson_content[0];
      console.log(this.lesson_data, '+++++>>>')

      if (this.lesson_data.status == 'success') {

        this.progress_bar = 0;
        console.log(this.progress_bar, '>>>>>>>>>>', this.lesson_data.status)

      }


    });


  }

  //next prev button work

  nextbutton(value: any, bottomval: any) {

    switch (value) {
      case 'next':
        

        console.log(this.lessonDataList[this.Index], '>>>>>>>>>>>>', this.lessonDataList[this.Index]._id)
        // if(this.Index<this.lessonDataList.length){
        this.addMarkedData(this.lessonDataList[this.Index]._id, this.paramsId, this.nextdata, this.lessonDataList[this.Index].lession_title);
        // this.getTrainingCenterlistFunction(this.paramsId, this.userType, this.userId);
        let ind:any=0;
        setTimeout(() => {
        // if(this.Index<this.lessonDataList.length){
          for(let b in this.lessonDataList){
            if(this.lessonDataList[b]._id==this.lesson_content._id)
            ind=(parseInt(b)+1);
          }
          console.log('ind',ind);
          if(this.lessonDataList[ind]!=null){
          this.nochildclick(this.lessonDataList[ind]._id);
          this.progressLoader=true;
          }else{
            for(let n in this.trainingCategoryList){
              if(this.paramsTrainingId!=this.trainingCategoryList[n]._id){
                this.router.navigateByUrl(this.trainingCenterRoute + this.trainingCategoryList[n]._id)
              }
            }
          }
        },500);

        // this.Index++;
        // this.lessonDataList[this.Index];

        // if (bottomval != "" && bottomval == "bottomNext") {
        //   window.scroll({
        //     top: 0,
        //     left: 0,
        //     behavior: 'smooth'
        //   });
        // }

        // console.log("souresh test",this.nextdata);
        // }
        break;
      case 'prev':
        console.log(this.lessonDataList[this.Index], '>>>>>>>>>>>>')
        let ind1:number=0;
        setTimeout(() => {
        // if(this.Index<this.lessonDataList.length){
          for(let b in this.lessonDataList){
            if(this.lessonDataList[b]._id==this.lesson_content._id)
            ind1=parseInt(b)-1;
          }
          this.nochildclick(this.lessonDataList[ind1]._id);
          this.progressLoader=true;
        },500);
        // this.flag = 1;
        // let index: any = this.Index - 1;
        // this.firstIndex = index;
        // this.lessonDataList = [this.lessonDataList[index]];

        // if (bottomval != "" && bottomval == "bottomPrev") {
        //   window.scroll({
        //     top: 0,
        //     left: 0,
        //     behavior: 'smooth'
        //   });
        // }

        break;


    }


  }
}


