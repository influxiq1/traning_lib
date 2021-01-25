import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../api.service';


export interface DialogData4 {
  data: any;
  safe_url: any;
  lesson_id: any;
  training_id: any;
  endpoint: any;
  user_id: any;
  flag: any;
  video_url: any;
}
export interface DialogData6 {
  data: any;
  flag: any;
}
@Component({
  selector: 'lib-training-centre-beto-paredes',
  templateUrl: './training-centre-beto-paredes.component.html',
  styleUrls: ['./training-centre-beto-paredes.component.css']
})
export class TrainingCentreBetoParedesComponent implements OnInit {
  public lessonplanmaterialroute: any;
  public googlescheduleroute: any;
  public serverDetailsVal: any;
  public trainingCategoryName: any;
  public formSourceVal: any;
  public quizQuestionSource: any;
  public paramsId: any;
  public trainingCenterRoute: any;
  public trainingCentreData: any;
  public trainingCategoryData: any = [];
  public trainingLessonData: any = [];
  public progress_bar = 0;
  public training_header_text: any;
  public video_base_url: any = 'https://www.youtube.com/embed/';
  public trainingcatParamid: any;
  public lessonParamId: any;
  public access_flag: any = false;
  public paramsTrainingId: any;
  public paramslessonId: any;
  public training_cat_name: any;
  public lesson_content: any = [];
  public lessonDataList: any = [];
  public progressLoader: boolean = false;
  public nextdata: number = 0;
  public nextlessondata: any;
  public userId: any;
  public trainingCategoryList: any = [];
  public AllTrainingData: any = [];
  public previewimages: any;
  public bucket_url: any = 'https://training-centre-bucket.s3.amazonaws.com/lesson-files/'
  public userType: any;
  public done_lesson: any;
  public lession_atachment_dataarray: any = [];
  public lessonContentData: any;
  public dividend: any = 0;
  public divisor: any = 0;
  public reportPercentage: any;
  public is_done: any = [];
  public lessondone_count = 0
  public percentageprogressLoader: boolean = true;
  public video_data: any = [];
  public next_button_access: any = false;
  public quizflag: boolean = false;
  public complete_fileflag: any = [];
  public complete_audioflag: any = [];
  public complete_videoflag: any = [];





  @Input()
  set lessonplanmaterialRoute(route: any) {
    this.lessonplanmaterialroute = route;
  }

  @Input()
  set googleScheduleRoute(route: any) {
    this.googlescheduleroute = route;
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
  set TrainingCenterRoute(id: any) {
    this.trainingCenterRoute = (id) || '<no name set>';
  }
  @Input()
  set TrainingcatParamid(train_id: any) {
    this.trainingcatParamid = (train_id) || '<no name set>';
    // console.log(this.trainingcatParamid, 'trainingcatParamid')
  }
  @Input()
  set LessonParamId(lessid: any) {
    this.lessonParamId = (lessid) || '<no name set>';
    // console.log(this.lessonParamId, 'lessionParamId1111111')
    if (this.activatedRoute.snapshot.params._id != null) {
      this.paramslessonId = this.activatedRoute.snapshot.params._id
    } else {
      this.paramslessonId = this.lessonParamId;

    }
    // console.log(this.paramslessonId,'???????????????????')
  }
  @Input()
  set TrainingCentreData(val) {
    console.log(val, 'val',this.trainingLessonData)
    this.paramsTrainingId = this.activatedRoute.snapshot.params.associated_training;

    

    this.trainingCentreData = val;
    // // console.log(this.trainingCentreData.lesson_content[0].lesson_attachements, 'librery')
    this.trainingCategoryData = this.trainingCentreData.trainingcenterlist;
    this.trainingLessonData = this.trainingCentreData.alllessondata;

    if (this.activatedRoute.snapshot.params._id != null) {
      this.paramslessonId = this.activatedRoute.snapshot.params._id
    } else {
      this.paramslessonId = val.lesson_content[0]._id;

    }
    console.log(this.paramslessonId,'_______________')

    this.lessonDataList = val.alllessondata

    this.lessonContentData = this.trainingCentreData.lesson_content[0];
    // this.lession_atachment_dataarray=this.trainingCentreData.lesson_content[0].lesson_attachements;

    // console.log(this.lession_atachment_dataarray)
    for (let i in this.trainingCategoryData) {
      if (this.paramsTrainingId == this.trainingCategoryData[i]._id) {
        // // console.log(this.trainingCategoryData[i]._id, 'this.trainingCentreData[i]._id')
        this.training_cat_name = this.trainingCategoryData[i].catagory_name;
      }
    }
    // console.log(this.userId, 'this.userId')
    if (val.done_lesson_by_user.length != 0 && val.done_lesson_by_user[0].lessonsdone != '' && typeof (val.done_lesson_by_user[0].lessonsdone) != 'undefined') {
      this.dividend = val.done_lesson_by_user[0].lessonsdone;
    }
    this.divisor = val.total_lesson[0].count;

    this.reportPercentage = Math.floor(this.dividend / this.divisor * 100);

    for (const key in this.trainingLessonData) {
      // // console.log(this.trainingLessonData[key], 'raju')
      for (const iterator of this.trainingCentreData.donetraininglessondata) {
        // // console.log(iterator)
        // // console.log(iterator, 'this.trainingCategoryData[key]._id',this.trainingLessonData[key]._id)
        if (iterator.lesson_id == this.trainingLessonData[key]._id) {

          // this.is_done[iterator.lesson_id] = true;
          this.trainingLessonData[key].is_done = true;

        }


      }
    }

    // console.log(this.trainingLessonData,'kkkkkkkkkkkk',this.trainingCentreData.donetraininglessondata)

    for (const key in this.trainingCategoryData) {
      for (const d of val.done_lesson_by_cat_by_user) {
        // 
        if (this.trainingCategoryData[key]._id == d.associated_training) {

          this.trainingCategoryData[key].done = d.lessonsdone;
          this.trainingCategoryData[key].percentage = Math.floor((this.trainingCategoryData[key].done / this.trainingCategoryData[key].count) * 100);

        }

      }



      if (this.trainingCategoryData[key].done == null) {
        this.trainingCategoryData[key].done = 0;
      }
    }

    // console.log(this.trainingCentreData, 'trainingCategoryData')

  }

  constructor(public router: Router, public snakBar: MatSnackBar, public activatedRoute: ActivatedRoute, public apiService: ApiService, public cookieService: CookieService, public dialog: MatDialog, public sanitizer: DomSanitizer) {
    this.userId = JSON.parse(this.cookieService.get('userid'));
    this.userType = JSON.parse(this.cookieService.get('type'));

  }

  ngOnInit() {
  }
  activatedclass(val) {
  }


  clicktrcataining(id: any, catagory_name: any) {
    // console.log(id, '+++', this.trainingCenterRoute)
    setTimeout(() => {
      this.progress_bar = 1;
    }, 100);
    this.router.navigateByUrl(this.trainingCenterRoute + id);
    this.training_cat_name = catagory_name;
    setTimeout(() => {
      document.getElementById("lessonData").scrollIntoView();
      this.progress_bar = 0;
    }, 1000);
  }

  nochildclick(val: any, flag) {
    // console.log(val, 'nochiuld')
    this.router.navigateByUrl(this.trainingCenterRoute + this.paramsTrainingId + '/' + val._id);

  }


  nextbutton(value: any) {
    // console.log(this.lessonContentData, 'value', this.lessonDataList)

    switch (value) {
      case 'next':
        // this.lessonDataList[this.Index].lession_title
        // // console.log(this.lesson_content, 'this.lesson_content', this.lessonDataList[0])
        // if (this.lesson_content.is_done == null && this.lesson_content.has_lessonplan == 0) {
        //   // // console.log(this.lesson_content.has_lessonplan, 'has_lessonplan')
        //   this.addMarkedData(this.lessonDataList[0]._id, this.paramsId, this.nextdata, this.lesson_content.lession_title, this.nextlessondata);
        // }
        this.addMarkedData(this.lessonDataList[0]._id, this.paramsId, this.nextdata, this.lesson_content.lession_title, this.nextlessondata);

        let ind: any = 0;
        setTimeout(() => {
          for (let b in this.lessonDataList) {
            if (this.lessonDataList[b]._id == this.lessonContentData._id)
              ind = (parseInt(b) + 1);
          }
          // // console.log('ind', ind);
          if (this.lessonDataList[ind] != null) {

            setTimeout(() => {
              this.nochildclick(this.lessonDataList[ind], 'next');

            }, 500)

            this.progressLoader = true;
          } else {

            for (var n = 0; n < this.trainingCategoryData.length; n++) {
              // // console.log('++>>>>', this.trainingCategoryList[n], this.trainingCategoryList[n + 1], this.trainingCategoryList[0]._id)
              if (this.paramsTrainingId == this.trainingCategoryData[n]._id && this.trainingCategoryData[n + 1] != null) {
                // // console.log('-->>>>', this.trainingCategoryList[n + 1])

                this.router.navigateByUrl(this.trainingCenterRoute + this.trainingCategoryData[n + 1]._id);
              }
              else {
                // // console.log('++>>>>', this.trainingCategoryList[n]._id, this.trainingCategoryList[n + 1]._id,)
                // '>>>',this.trainingCategoryList[0]._id)
                this.progressLoader = false;
                this.router.navigateByUrl(this.trainingCenterRoute + this.trainingCategoryData[0]._id);

              }
            }

          }
        }, 500);
        // // console.log("souresh test", this.nextdata);
        // }
        break;
      case 'prev':
        // // console.log(this.lessonDataList[this.Index], '>>>>>>>>>>>>')
        let ind1: number = 0;
        setTimeout(() => {
          // if(this.Index<this.lessonDataList.length){
          for (let b in this.lessonDataList) {
            if (this.lessonDataList[b]._id == this.lesson_content._id)
              ind1 = parseInt(b) - 1;
          }

          // if(this.lessonDataList[ind].is_done == true ){
          //   this.nochildclick(this.lessonDataList[ind]);
          //   }

          this.nochildclick(this.lessonDataList[ind1], 'prev');

          this.progressLoader = true;
        }, 500);

        break;
    }
  }


  addMarkedData(lessonId: any, associated_training: any, i: any, lession_title: any, nextlessondata: any) {
    const link = this.serverDetailsVal.serverUrl + this.formSourceVal.addMarkendpoint;
    if (this.trainingCategoryName == null || this.trainingCategoryName == '') { }
    let data: any = {
      "data": {
        "user_id": this.userId,
        "lesson_id": this.paramslessonId,
        "associated_training": this.paramsTrainingId,
        "lastlessonname": lession_title,
        "lasttrainingname": '',
        'nextlessondata': nextlessondata
      },
      "sourceobj": ["user_id", "lesson_id", "associated_training"],
      "token": this.serverDetailsVal.jwttoken
    }

    // // console.log('post data', data);

    this.apiService.postData(link, data).subscribe((response: any) => {
      // // console.log(response, 'respoese453')
      if (response.status = "success") {
        const link = this.serverDetailsVal.serverUrl + this.formSourceVal.getUpdatedTrainingPercentageByUserEndpoint;
        let data: any = {
          "user_id": this.userId
        }

      }
    })

  }
  lessonQuiz(val: any) {
    if (this.AllTrainingData != null && typeof (this.AllTrainingData.quiz_data) != 'undefined') {
      // // console.log(val, '++', this.AllTrainingData.quiz_data)
      var server_url: any = this.serverDetailsVal.serverUrl + 'addlessonquizdata';

      // const dialogRef = this.dialog.open(LessonQuizModalComponent, {
      //   panelClass: 'schedule_modal',
      //   width: '900px',
      //   height: 'auto',
      //   data: { quiz_data: this.AllTrainingData.quiz_data, lesson_data: val, user_id: this.userId, server_url: server_url }
      // });
      // dialogRef.disableClose = true;
      // dialogRef.afterClosed().subscribe((result: any) => {
      //   // // console.log(result, 'result')
      //   if (result == 'yes') {
      //     this.next_button_access = true;

      //     // if (this.lesson_content.is_done == null) {
      //     //   this.addMarkedData(this.lessonDataList[0]._id, this.paramsId, this.nextdata, this.lesson_content.lession_title, this.nextlessondata);
      //     // }
      //     this.getTrainingCenterlistFunctionwithLessonId(this.paramsId, this.userType, this.userId, this.paramslessonId)
      //     this.quizflag = false;
      //     if (this.quizflag == false) {
      //       this.next_button_access = true;
      //     }
      //     else {
      //       this.next_button_access = false;
      //     }
      //   }
      // }
      // )
    }
  }
  previewpdf(val, flag) {
    // console.log(val, 'val');
    if (flag == 'img') {
      this.previewimages = val
    }
    if (flag == 'pdf') {
      this.previewimages = val.images.converted_array;
      // // console.log(this.previewimages, 'PreviewContentDialog')

    }
    // this.previewimages = val.images.converted_array;
    // // console.log(this.previewimages, 'PreviewContentDialog')

    const dialogRef = this.dialog.open(PreviewContentDialogBeto, {
      panelClass: 'lesson_pdfmodal',
      width: 'auto',
      data: { data: val, flag: flag }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      // // console.log(result, '>>>>>>>>>>');
    });
  }
  downloadPdf(file: any, i) {
    // // console.log(file.file_type, 'fvgbnjkmgbh')
    let fileendpoint: any;

    // // console.log(this.serverDetailsVal.serverUrl, 'serverDetailsVal')
    fileendpoint = this.serverDetailsVal.serverUrl + 'updateusercompletelessonfiles'
    let file_data = {
      user_id: this.userId,
      training_id: this.paramsTrainingId,
      lesson_id: this.paramslessonId,
      file_type: file.file.file_type,
      file_id: file.file._id,
      file_servername: file.file.fileservername

    }

    if (file.file_skippable != true) {
      this.apiService.postDatawithoutToken(fileendpoint, file_data).subscribe(res => {
        // console.log(res, 'res')
        let result: any = res;
        this.complete_fileflag[file.file._id] = false;

        // // console.log(this.complete_fileflag[file.file._id], '+++++++_______________')
        if (result.status == 'success') {
          this.complete_fileflag[file.file._id] = true
          // // console.log(this.complete_fileflag[file.file._id], '+++++++666______________')

          let checked_status = 'success';
          let pdf_url = this.bucket_url + file.file.fileservername;
          let externalWindow = window.open(
            pdf_url
          );
          this.snakBar.open("You completed this file", 'Ok', {
            duration: 1000
          });


        }
      })
    }
    setTimeout(() => {
      this.getTrainingCenterlistFunctionwithLessonId(this.paramsId, this.userType, this.userId, this.paramslessonId)
    }, 500);
    if (file.file_skippable == true) {
      let pdf_url = this.bucket_url + file.file.fileservername;
      let externalWindow = window.open(
        pdf_url
      );
    }


  }
  getTrainingCenterlistFunctionwithLessonId(associated_training: any, type: any, user_id: any, _id: any) {
    // // console.log('associated_training', associated_training, 'type', type, 'user_id', user_id, '_id', _id)
    const link = this.serverDetailsVal.serverUrl + "gettrainingcenterlist";
    let data: any = {
      "condition": {
        "associated_training": associated_training,
        "_id": _id
      },
      "user_id": this.userId,
      "type": type,
      "associated_training": associated_training
    }
    // console.log(this.userId, 'this.userId')
    this.apiService.postDatawithoutToken(link, data).subscribe((response: any) => {

      //   this.lesson_data = response;
      // //   // // console.log("response", response);
      //   this.trainingCategoryList = response.results.trainingcenterlist;
      //   this.lessonDataList = response.rdata;
      // //   // // console.log(response.results.done_lesson_by_user, 'response.results.done_lesson_by_user[0].lessonsdone')

      //   if (response.results.done_lesson_by_user.length != 0 && response.results.done_lesson_by_user != '') {
      //     this.dividend = response.results.done_lesson_by_user[0].lessonsdone;
      //   }


      //   this.divisor = response.results.total_lesson[0].count;
      //   this.reportPercentage = Math.floor(this.dividend / this.divisor * 100);
      //   this.lesson_content = this.lesson_data.results.lesson_content[0];
      //   this.AllTrainingData = response.results;
      //   // // console.log(this.lesson_data, '+++++>>>')

      //   if (this.lesson_data.status == 'success') {
      //     // // console.log(this.lesson_data, '+++++>>>', this.lesson_data.status)

      //     this.progress_bar = 0;
      //   }
      //   // // console.log(this.files_data, 'files_data')
      //   // // console.log(this.audio_data, 'audio_data')
      //   // // console.log(this.video_data, 'video_data')


      //   if (this.files_data.length != response.results.complete_lesson_file.length) {
      //     this.next_button_access = false
      //   }
      //   if (this.video_data.length != response.results.complete_lesson_video.length) {
      //     this.next_button_access = false

      //   }
      //   if (this.audio_data.length != response.results.complete_lesson_audio.length) {
      //     this.next_button_access = false
      //   }
      //   if ((response.results.complete_lesson_file != null && response.results.complete_lesson_file.length != 0 && this.files_data.length == response.results.complete_lesson_file.length) || (response.results.complete_lesson_audio != null && response.results.complete_lesson_audio.length != 0 && this.audio_data.length == response.results.complete_lesson_audio.length) || (response.results.complete_lesson_video != null && response.results.complete_lesson_video.length != 0 && this.video_data.length == response.results.complete_lesson_video.length)) {

      //     this.next_button_access = true;


      //     // // console.log("++++++++getTrainingCenterlistFunctionwithLessonId++++++++++++")
      //     if (this.files_data.length != response.results.complete_lesson_file.length && this.audio_data.length == response.results.complete_lesson_audio.length && this.video_data.length == response.results.complete_lesson_video.length) {
      //       this.next_button_access = false;
      //       // console.log('xxxxxxxxxxxxx')
      //     }
      //     if (this.video_data.length != response.results.complete_lesson_video.length && this.audio_data.length == response.results.complete_lesson_audio.length && this.files_data.length == response.results.complete_lesson_file.length) {
      //       this.next_button_access = false;
      //       // console.log('yyyyyyyyyy')

      //     }
      //     if (this.audio_data.length != response.results.complete_lesson_audio.length && this.files_data.length == response.results.complete_lesson_file.length && this.video_data.length == response.results.complete_lesson_video.length) {
      //       this.next_button_access = false;
      //       // console.log('zzzzzzzzzzz')

      //     }
      //     this.next_button_access = true;

      //   }


      //   if ((this.files_data.length == 0) && (this.audio_data.length == 0) && (this.video_data.length == 0)) {
      //     this.next_button_access = true;
      //     if (this.quizflag != true) {
      //       this.next_button_access = true;
      //     }
      //     else {
      //       this.next_button_access = false;
      //     }
      //     // // console.log("+++++@input35454555+++++++++++++++")
      //   }

      // });
      // if (this.quizflag != true) {
      //   this.next_button_access = true;
      // }
      // else {
      //   this.next_button_access = false;
    });

  }
  openLessonVideo(val: any) {
    // console.log(val)
    var url = this.video_base_url + val.video_url + '?modestbranding=1&autohide=0&showinfo=0&controls=0&listType=playlist&rel=0';
    var server_url = this.serverDetailsVal.serverUrl + "updateusercompletelessonvideo"

    const safe_url = this.sanitizer.bypassSecurityTrustResourceUrl(url);

    if (val.video_skippable == true) {
      var video_url = val.video_url + '?rel=0&modestbranding=1&autoplay=1&showinfo=0&controls=1&listType=playlist';
    } else {
      var video_url = val.video_url + '?rel=0&modestbranding=1&autoplay=1&showinfo=0&controls=0&listType=playlist';
    }
    const dialogRef = this.dialog.open(BetoparedesLessonVideoModalComponent, {
      panelClass: 'lesson_videomodal',
      width: '900px',
      height: 'auto',
      data: { 'safe_url': safe_url, data: val, training_id: this.paramsId, lesson_id: this.paramslessonId, endpoint: server_url, user_id: this.userId, video_url: video_url }
    });
    dialogRef.afterClosed().subscribe((result: any) => {

      // console.log(result, 'result********************', val)
      if (result != null && result == 'yes') {
        // // console.log()
        this.getTrainingCenterlistFunctionwithLessonId(this.paramsId, this.userType, this.userId, this.paramslessonId);

        // setTimeout(() => {
        //   // // console.log(this.AllTrainingData.complete_lesson_video, 'AllTrainingData', this.lesson_content.video_array)

        // }, 2000);

        setTimeout(() => {
          if (this.AllTrainingData.complete_lesson_video.length != null &&
            this.AllTrainingData.complete_lesson_video.length == this.video_data.length) {
            // // console.log(this.AllTrainingData.complete_lesson_video, 'has_lessonplan ++')
            this.next_button_access = true;

            if (this.AllTrainingData.quiz_data.length != 0) {
              this.quizflag = true;
              this.next_button_access = false;
            }

            if (this.AllTrainingData.complete_lesson_quiz != null && this.AllTrainingData.complete_lesson_quiz[0] != null) {
              if (this.AllTrainingData.complete_lesson_quiz[0].lesson_id == this.AllTrainingData.lesson_content[0]._id) {
                this.next_button_access = true;
                this.quizflag = false;
              }
            }
            this.complete_videoflag[val.video_url] = true
            // if (this.lesson_content.is_done == null) {
            //   // // console.log(this.lesson_content.has_lessonplan, 'has_lessonplan')
            //   // this.addMarkedData(this.lessonDataList[0]._id, this.paramsId, this.nextdata, this.lesson_content.lession_title, this.nextlessondata);
            // }
          }
        }, 2000);

      }
    })

  }

}


@Component({
  selector: 'preview-content-dialog',
  templateUrl: 'preview-content-dialog.html',
  styleUrls: ['preview-content-dialog.css']

})
export class PreviewContentDialogBeto {
  public previewImg: any = [];
  public image: any = '';
  public indeximg = 0;
  public page = 1;
  public bucket_url: any = 'https://training-centre-bucket.s3.amazonaws.com/lesson-files/';
  public nextflg: any = 'disabled';
  public prevflag: any = 'disabled';
  public pos: any;
  public image1: any

  constructor(public dialogRef: MatDialogRef<PreviewContentDialogBeto>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData6, public snakBar: MatSnackBar, public apiService: ApiService, public router: Router) {
    // // console.log(data, 'data',)
    if (data.flag == 'pdf' && typeof (data.data.images.converted_array) != undefined) {

      this.previewImg = data.data.images.converted_array;
      this.image = this.bucket_url + data.data.images.converted_array[this.indeximg].name //set image for pdf
      this.pos = data.data.images.numberOfPages;
      // // console.log(this.previewImg[this.indeximg])

    }
    if (data.flag == 'img') {
      this.image1 = this.bucket_url + data.data.file.fileservername; //set img for imagefile
    }
    // // // console.log(this.quizData, '++')
  }
  close(val) {                 //FOR MODAL CLOSE 
    this.snakBar.open(' Your Lesson  is Complete After Download This File ..!', 'OK', {
      duration: 5000
    })
  }
  //next previos btn
  nextprevbtn(flag) {
    // // console.log(flag, 'nextbtn',)
    switch (flag) {
      case 'prev': // for prevous case 
        if (this.indeximg == 0 || this.indeximg < 0) {
          // // console.log(flag, '++++++++++++ if')

        } else {
          // // console.log(flag, '++++++++++++ else')
          this.indeximg = this.indeximg - 1;
          this.image = this.bucket_url + this.previewImg[this.indeximg].name
          this.page = this.previewImg[this.indeximg].page
          // // console.log('index+++++++', this.indeximg, this.previewImg.length)
        }
        break;
      case 'next': // for next case 

        if (this.previewImg.length == this.indeximg + 1) {
          // // console.log(flag, '++++++++++++ if')
        }
        else {

          // // console.log(flag, '++++++++++++ else')
          this.indeximg = this.indeximg + 1;
          this.image = this.bucket_url + this.previewImg[this.indeximg].name
          this.page = this.previewImg[this.indeximg].page
          // // console.log('index+++++++', this.indeximg + 1, this.previewImg.length)
        }
        break;
    }

    // // // console.log(flag, '++++++++++++', index)
  };

}
@Component({
  selector: 'BetoLessonVideo',
  templateUrl: 'preview-video-content-dialog.html',
  styleUrls: ['preview-video-content-dialog.css']

})
export class BetoparedesLessonVideoModalComponent {

  playerVars = {
    cc_lang_pref: 'en'
  };
  public video_time: any;

  public video_Count_time: any;

  constructor(public dialogRef: MatDialogRef<BetoparedesLessonVideoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData4, public snakBar: MatSnackBar, public apiService: ApiService, public router: Router, public activatedRoute: ActivatedRoute) {
    console.log(data, 'data_video')
  }
  savePlayer(event) {
    // console.log(event, 'save', this.playerVars)
  }
  closedModals() {
    // console.log()
    this.snakBar.open('Video Lesson Has Not Been Completed ...!', 'OK', {
      duration: 4000
    })
    this.dialogRef.close()
  }

  onStateChange(event) {
    // console.log(this.data.data.video_skippable, 'data_video')

    console.log(event, 'state chn',)
    console.log(event.target.playerInfo.duration, '/\/\/\)', event.target.playerInfo.currentTime)

    //duration calculation
    var sec_num = parseInt(event.target.playerInfo.duration, 10);
    var hours: any = Math.floor(sec_num / 3600);
    var minutes: any = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds: any = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    // console.log(hours + ':' + minutes + ':' + seconds);
    this.video_time = hours + ':' + minutes + ':' + seconds;

    // this.startTimer(event.target.playerInfo.duration);

    // console.log(event.target.playerInfo, 'change 1', event.data)
    if (event.data == 0 && event.target.playerInfo.duration >= event.target.playerInfo.currentTime) {

      // console.log(event.data, 'data 0', event.target.playerInfo)

      var endpoint = this.data.endpoint;
      var video_data: any = {
        user_id: this.data.user_id,
        training_id: this.data.training_id,
        lesson_id: this.data.lesson_id,
        video_id: event.target.playerInfo.videoData.video_id,
        video_url: event.target.playerInfo.videoUrl,
        flag: 1,
      }
      // console.log(video_data, 'data===++')
      if (this.data.data.video_skippable != true) {

        this.apiService.postDatawithoutToken(endpoint, video_data).subscribe(res => {
          console.log(res, 'frghjk++++++++++', event.target.playerInfo.videoData.video_id)
          let result: any = res;
          if (result.status == 'success') {
            // getTrainingCenterlistFunctionwithLessonId(associated_training: any, type: any, user_id: any, _id: any)
            this.data.flag = 'yes';
            this.dialogRef.close(this.data.flag);
            this.snakBar.open('Successfully Completed The Lesson Video..!', 'OK', {
              duration: 5000
            })

          }
        })
      }

    }

  }
}