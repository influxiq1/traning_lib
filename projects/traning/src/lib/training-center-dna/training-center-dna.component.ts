import { OnInit, ViewChild, Input, Inject, Component } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
  MatSnackBar,
  SimpleSnackBar,
} from "@angular/material";

import { ApiService } from "../api.service";
import { Router, ActivatedRoute } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
// import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import { DomSanitizer } from "@angular/platform-browser";

export interface DialogData {
  data: any;
  lesson_session_data: any;
  flag: any;
  product_data: any;
  flaglesson: any;
}

export interface DialogData3 {
  data: Number;
}

export interface DialogData1 {
  data: any;
  user_mentor_name: any;
  flag: any;
  // product_data: any;
}

export interface DialogData2 {
  data: any;
  user_mentor_name: any;
  flag: any;
  // product_data: any;
}

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

export interface DialogData5 {
  data: any;
  flag: any;
  quiz_data: any;
  lesson_data: any;
  server_url: any;
  user_id: any;
}
export interface DialogData6 {
  data: any;
  flag: any;
}

@Component({
  selector: "lib-training-center-dna",
  templateUrl: "./training-center-dna.component.html",
  styleUrls: ["./training-center-dna.component.css"],
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
  public currentlesson: any = "";
  public paramsId: any;
  public trainingCenterRoute: any;
  public isDisabled: boolean = true;
  video;
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
  public nextlessondata: any;
  public externalWindow: any;
  public pdf_url: any;
  public fileendpoint: any;
  public audio_duration: any = [];
  public audio_currenttime: any = [];
  public newaudio_currenttime: any = [];
  public audio_end_time: any = [];
  public audio_progress: any = [];

  public disabled = [];
  public checked_status: any;

  public audio_time: any = [];
  public userType: any;
  public Index: number;
  public flag: any = 0;
  public lastIndex: number;
  public firstIndex: number;
  public currentLesson: any;
  public completedLessons: any = [];
  public lesson_content: any = [];
  public lesson_data: any;
  public progress_bar = 0;
  public training_cat_name: any;
  public training_header_text: any = "ADVANCED MENTOR COURSE CERTIFICATION";
  public paramslessonId: any;
  public lesson_id_flag: any = true;
  public flag_id: any;
  public mentee_banner_text: any = "Buy Now";
  public user_parent_id: any;
  public product_data: any = "";
  public dnaServerUrl: any;
  public googlescheduleroute: any;
  public schedule_data: any;
  public orders_data: any;
  public orders_button: any = true;
  public preview_button: any = true;
  public schedule_button: any = false;
  public user_mentor_name: any;
  public all_orders_data: any;
  public next_button_access: any = false;
  public AllTrainingData: any = [];
  public isLockedLesson: any = true;
  public access_flag: any = false;
  public lesson_locked_by_user: any = 1;
  public video_base_url: any = "https://www.youtube.com/embed/";
  public quizflag: boolean = false;
  public previewimages: any;
  public file_data: any;
  public modelval: any = [];
  public files_data: any = [];
  public audio_data: any = [];
  public video_data: any = [];
  public parentcount: any = [];

  public complete_fileflag: any = [];
  public complete_audioflag: any = [];
  public complete_videoflag: any = [];

  public bucket_url: any =
    "https://training-centre-bucket.s3.amazonaws.com/lesson-files/";
  public lessoncontentarraydata: any = [];
  public msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  msaapPageSizeOptions = [2, 4, 6];
  msaapDisplayVolumeControls = true;
  msaapDisablePositionSlider = true;
  public l_content: any = [];
  public play_flag: any = [];
  public pause_flag: any = [];
  public file_array_id: any = [];
  public complete_lesson_file_data: any = [];

  @Input()
  set lessonplanmaterialRoute(route: any) {
    this.lessonplanmaterialroute = route;
  }

  @Input()
  set googleScheduleRoute(route: any) {
    this.googlescheduleroute = route;
  }

  @Input()
  set TrainingCategoryList(val: any) {
    // console.log(val, 'TrainingCategoryList')
    let results: any = val || "<no name set>";
    let parentdone: any;

    this.trainingCategoryList = results.trainingcenterlist;
    this.lesson_locked_by_user = 1;
    this.AllTrainingData = results;
    // console.log( results.trainingcenterlist, 'results')

    setTimeout(() => {}, 5000);
    // console.log(val, 'val.lesson_content[0].file_array')

    if (
      results.lesson_locked_by_user != null &&
      results.lesson_locked_by_user != "undefined"
    ) {
      this.lesson_locked_by_user = results.lesson_locked_by_user;
    }
    // console.log(this.trainingCategoryList, 'trainingCategoryList')
    this.orders_button = true;
    this.preview_button = true;
    Input;
    this.schedule_button = false;
    this.next_button_access = false;
    this.quizflag = false;
    this.lesson_content = results.lesson_content[0];
    this.l_content = results.lesson_content;
    this.audio_data = [];
    this.files_data = [];
    this.video_data = [];
    // console.log(this.l_content, 'l_content')

    // console.log(results.lesson_content[0], 'results.lesson_content[0]')
    // console.log(this.lesson_content, 'lesson_content+++=')
    //
    // )
    if (
      results.complete_lesson_quiz != null &&
      results.complete_lesson_quiz[0] != null
    ) {
      if (
        results.complete_lesson_quiz[0].lesson_id ==
        results.lesson_content[0]._id
      ) {
        this.next_button_access = true;
        // console.log("+++++++++++5+++++++++ quizflag fa")
        this.quizflag = false;
      }
    }
    // console.log(val.lesson_content, 'val.lesson_content[0].file_array')
    if (
      val.lesson_content[0].file_array != null &&
      typeof val.lesson_content[0].file_array != undefined
    ) {
      for (const iterator of val.lesson_content[0].file_array) {
        if (iterator.file_skippable == false) {
          this.files_data.push(iterator);
        }
      }
    }
    if (
      val.lesson_content[0].audio_array != null &&
      typeof val.lesson_content[0].audio_array != undefined
    ) {
      for (const iterator of val.lesson_content[0].audio_array) {
        if (iterator.audio_skippable == false) {
          this.audio_data.push(iterator);
        }
      }
    }
    if (
      val.lesson_content[0].video_array != null &&
      typeof val.lesson_content[0].video_array != undefined
    ) {
      for (const iterator of val.lesson_content[0].video_array) {
        // console.log(iterator, 'iterator')
        if (iterator.video_skippable == false) {
          this.video_data.push(iterator);
        }
      }
    }

    // console.log('audio_data', this.audio_data)
    // console.log('video_data', this.video_data)
    // console.log(val.complete_lesson_file, 'files_data', this.files_data)

    if (
      results.lesson_content[0].has_lessonplan != null &&
      typeof results.lesson_content[0].has_lessonplan != "undefined" &&
      results.lesson_content[0].has_lessonplan == 1 &&
      results.lesson_content[0].has_test_lesson == 0
    ) {
      if (results.lesson_ids[0].lesson_ids != null) {
        for (let id in results.lesson_ids[0].lesson_ids) {
          if (
            results.lesson_content[0]._id ==
            results.lesson_ids[0].lesson_ids[id]
          ) {
            this.preview_button = false;
            this.next_button_access = true;
            if (this.quizflag == false) {
              this.next_button_access = true;
            }
            // else {
            //   this.next_button_access = true;
            // }
            // console.log("+++++++++++++1+++++++")
          }
        }
      }
    }

    if (
      results.lesson_content[0].has_lessonplan == 0 &&
      results.lesson_content[0].has_test_lesson == 1
    ) {
      // console.log('++++++ ==== ??', this.next_button_access)
      this.quizflag = true;
      this.next_button_access = false;
      if (
        results.complete_lesson_quiz != null &&
        results.complete_lesson_quiz[0] != null
      ) {
        if (
          results.complete_lesson_quiz[0].lesson_id ==
          results.lesson_content[0]._id
        ) {
          this.next_button_access = true;
          // console.log("+++++++++++2+++++++++")
          this.quizflag = false;
          if (this.quizflag == false) {
            this.next_button_access = true;
          } else {
            this.next_button_access = true;
          }
        }
      }
    }
    if (
      this.files_data.length == 0 &&
      this.audio_data.length == 0 &&
      this.video_data.length == 0 &&
      this.quizflag != true
    ) {
      this.next_button_access = true;
      if (this.quizflag == false) {
        this.next_button_access = true;
      } else {
        this.next_button_access = true;
      }
      // console.log("+++++@input35454555+++++++++++++++")
    }
    // // console.log(results.lesson_content[0].lesson_attachements.length, "+++++++++++++++++++juhugkj+")

    if (
      results.lesson_content[0].has_lessonplan == 0 &&
      results.lesson_content[0].has_test_lesson == 0 &&
      results.lesson_content[0].lesson_attachements != null &&
      results.lesson_content[0].lesson_attachements.length != "" &&
      typeof results.lesson_content[0].lesson_attachements.length !=
        undefined &&
      results.lesson_content[0].lesson_attachements.length == 0
    ) {
      this.next_button_access = true;
      if (this.quizflag != true) {
        this.next_button_access = true;
      } else {
        this.next_button_access = false;
      }
    }

    if (
      results.lesson_content[0].has_lessonplan == 1 &&
      results.lesson_content[0].has_test_lesson == 1
    ) {
      if (results.lesson_ids[0].lesson_ids != null) {
        for (let id in results.lesson_ids[0].lesson_ids) {
          if (
            results.lesson_content[0]._id ==
            results.lesson_ids[0].lesson_ids[id]
          ) {
            // console.log('++++++ ==== 4', this.preview_button)
            this.preview_button = false;
            this.next_button_access = false;
            // console.log("++++++++3++++++++++++ quizflag t")
            this.quizflag = true;
          }
        }
      }
    }

    // console.log(this.next_button_access, 'quizflag 2', this.quizflag)
    for (let i in this.trainingCategoryList) {
      parentdone = this.trainingCategoryList[i].done;
      this.parentcount[i] = this.trainingCategoryList[i].count;
      // console.log(this.parentcount[i],'parentcount',this.trainingCategoryList[i].count)
      if (
        this.trainingCategoryList[i].done != null &&
        this.trainingCategoryList[i].count != null
      ) {
        this.trainingCategoryList[i].percentage = Math.floor(
          (this.trainingCategoryList[i].done /
            this.trainingCategoryList[i].count) *
            100
        );
        // console.log('this.trainingCategoryList[i].percentage', this.trainingCategoryList[i].percentage, this.trainingCategoryList[i], i, this.trainingCategoryList[i].done, this.trainingCategoryList[i].count);
      }
    }
    this.allLessonData = results.lessondata;
    this.trainingCategoryName = results.trainingname;

    if (this.video_data.length > 0) {
      this.quizflag = false;

      // console.log(results.lesson_content[0].video_array, '++++++++++++++++')

      if (this.video_data.length == val.complete_lesson_video.length) {
        this.quizflag = true;
        this.next_button_access = false;
      }
    }
    if (val.lesson_content[0].has_test_lesson == 1) {
      if (val.complete_lesson_quiz.length > 0) {
        this.quizflag = false;
        // this.next_button_access = true;

        // console.log('rennnnnn')
      } else {
        this.quizflag = true;
        // this.next_button_access = false;
      }
      if (this.quizflag == false) {
        this.next_button_access = true;
      } else {
        this.next_button_access = false;
      }
    }

    // if (val.lesson_content[0].is_done == true) {
    //   this.next_button_access = true
    // }

    if (this.userType == "mentee") {
      this.orders_data = results.orders_data;
      this.all_orders_data = results.all_orders_data;
      this.schedule_data = results.schedule_data;

      if (
        results.lesson_locked_by_user != null &&
        results.lesson_locked_by_user != "undefined"
      ) {
        this.lesson_locked_by_user = results.lesson_locked_by_user;
      } else {
        this.lesson_locked_by_user = 1;
      }

      if (this.orders_data != null && this.orders_data) {
        for (let i in this.orders_data) {
          if (this.orders_data[i].lesson_id == results.lesson_content[0]._id) {
            this.orders_button = false;
            this.preview_button = true;
            if (
              this.orders_button == false &&
              this.schedule_button == true &&
              this.preview_button == false
            ) {
              this.preview_button = true;
            }
          }
        }
      }
      if (results.lesson_ids[0].lesson_ids != null) {
        for (let id in results.lesson_ids[0].lesson_ids) {
          if (
            (results.lesson_content[0]._id ==
              results.lesson_ids[0].lesson_ids[id] &&
              results.lesson_content[0].has_lessonplan == 1) ||
            results.lesson_content[0]._id ==
              results.lesson_ids[0].lesson_ids[id]
          ) {
            this.lesson_id_flag = results.lesson_ids[0].lesson_ids[id];
            this.preview_button = false;
          }
        }
      }
      if (this.orders_button == false && this.preview_button == false) {
        this.schedule_button = true;
      }

      if (
        this.orders_button == false &&
        this.preview_button == false &&
        this.schedule_button == true
      ) {
        for (let j in this.schedule_data) {
          if (
            this.schedule_data[j].lesson_id == results.lesson_content[0]._id
          ) {
            this.orders_button = false;
            this.preview_button = false;
            this.schedule_button = false;
          }
        }
      }
      // }
      if (
        this.orders_button == false &&
        this.preview_button == true &&
        this.schedule_button == false
      ) {
        setTimeout(() => {
          this.getReviewLessonPlanModal();
        }, 500);
      }

      if (
        this.orders_button == false &&
        this.preview_button == false &&
        this.schedule_button == true
      ) {
        setTimeout(() => {
          this.getScheduleModal();
        }, 500);
      }
    }
    // console.log('next_button_access flag', this.next_button_access)
    if (this.userType == "mentor") {
      if (
        results.lesson_locked_by_user != null &&
        results.lesson_locked_by_user != "undefined"
      ) {
        this.lesson_locked_by_user = results.lesson_locked_by_user;
      } else {
        this.lesson_locked_by_user = 1;
      }
    }

    if (results.lesson_ids[0].lesson_ids != null) {
      for (let id in results.lesson_ids[0].lesson_ids) {
        if (
          results.lesson_content[0]._id == results.lesson_ids[0].lesson_ids[id]
        ) {
          if (results.lesson_content[0].is_done == null) {
            // console.log(results.lesson_content[0].has_lessonplan, 'has_lessonplan')

            setTimeout(() => {
              this.getTrainingCenterlistFunctionwithLessonId(
                this.paramsId,
                this.userType,
                this.userId,
                this.paramslessonId
              );
            }, 500);
          }
        }
      }
    }
    //
    // console.log("+++++@input+++++++++++++++", this.next_button_access)

    if (this.files_data.length != val.complete_lesson_file.length) {
      this.next_button_access = false;
    }
    if (this.video_data.length != val.complete_lesson_video.length) {
      this.next_button_access = false;
    }
    if (this.audio_data.length != val.complete_lesson_audio.length) {
      this.next_button_access = false;
    }
    if (
      (val.complete_lesson_file != null &&
        val.complete_lesson_file != "" &&
        this.files_data.length == val.complete_lesson_file.length) ||
      (val.complete_lesson_audio != null &&
        val.complete_lesson_audio != "" &&
        this.audio_data.length == val.complete_lesson_audio.length) ||
      (val.complete_lesson_video != null &&
        val.complete_lesson_video != "" &&
        this.video_data.length == val.complete_lesson_video.length)
    ) {
      this.next_button_access = true;

      if (this.quizflag == false) {
        this.next_button_access = true;
      } else {
        this.next_button_access = false;
      }
      // console.log("++++++++getTrainingCenterlistFunctionwithLessonId++++++++++++")
      if (
        this.files_data.length != val.complete_lesson_file.length &&
        this.audio_data.length == val.complete_lesson_audio.length &&
        this.video_data.length == val.complete_lesson_video.length
      ) {
        this.next_button_access = false;
        // console.log('xxxxxxxxxxxxx')
      }
      if (
        this.video_data.length != val.complete_lesson_video.length &&
        this.audio_data.length == val.complete_lesson_audio.length &&
        this.files_data.length == val.complete_lesson_file.length
      ) {
        this.next_button_access = false;
        // console.log('yyyyyyyyyy')
      }
      if (
        this.audio_data.length != val.complete_lesson_audio.length &&
        this.files_data.length == val.complete_lesson_file.length &&
        this.video_data.length == val.complete_lesson_video.length
      ) {
        this.next_button_access = false;
        // console.log('zzzzzzzzzzz')
      }
    }
    // console.log(val.complete_lesson_file, 'val.complete_lesson_file', this.lessoncontentarraydata)
    // if (val.complete_lesson_file.length > 0 && val.complete_lesson_file != null) {
    //   for (const key of this.lessoncontentarraydata) {
    //     for (const iterator of val.complete_lesson_file) {
    //       console.log(iterator, 'key.file._idkey.file._idkey.file._id')

    //       console.log(key, 'kkkkkkkkkkk')

    //     }

    //   }

    // }
  }
  @Input()
  set TotalData(data: {}) {
    // console.log(data, 'data', this.quizflag);

    this.totalData = data || "<no name set>";
    this.trainingLessonCount = this.totalData.training_lesson_count;
    this.doneLessonByCatByUser = this.totalData.done_lesson_by_cat_by_user;

    if (this.userType == "admin" || this.userType == "affiliate") {
      this.adminlessoncount = this.totalData.total_lesson[0].count;
    }

    if (this.userType == "mentor") {
      this.adminlessoncount = this.totalData.total_lesson_mentor[0].count;
    }

    if (this.userType == "mentee") {
      this.adminlessoncount = this.totalData.total_lesson_mentee[0].count;
    }
    // console.log(this.totalData, 'totalData', this.quizflag);

    // this.salesreplessoncount=this.totalData.total_lesson_salesrep[0].count;
    // this.userlessoncount=this.totalData.total_lesson_user[0].count;
    let done_lesson_by_cat_by_user: any =
      this.totalData.done_lesson_by_cat_by_user.length;
    // this.divisor=lesson;
    let userPercentage: any = 0;

    for (let n in this.trainingCategoryList) {
      for (let tc in this.trainingLessonCount) {
        if (
          this.trainingCategoryList[n]._id.toString() ==
          this.trainingLessonCount[tc]._id.associated_training.toString()
        ) {
          this.trainingCategoryList[n].count =
            this.trainingLessonCount[tc].lessons;
          // this.salesrepLessonCount = this.salesrepLessonCount + this.trainingLessonCount[tc].lessons;
        }
      }

      if (this.trainingCategoryList[n].count == null)
        this.trainingCategoryList[n].count = 0;
      if (this.trainingCategoryList[n].done == null)
        this.trainingCategoryList[n].done = 0;

      if (
        this.trainingCategoryList[n].childid != null &&
        this.trainingCategoryList[n].childid.length > 0
      ) {
        for (let p in this.trainingCategoryList[n].childid) {
          for (let tc in this.trainingLessonCount) {
            if (
              this.trainingLessonCount[tc]._id.associated_training.toString() ==
              this.trainingCategoryList[n].childid[p].toString()
            ) {
              this.trainingCategoryList[n].childcount[p] =
                this.trainingLessonCount[tc].lessons;
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
            if (
              this.doneLessonByCatByUser[c].associated_training.toString() ==
              this.trainingCategoryList[n].childid[p].toString()
            ) {
              this.trainingCategoryList[n].childdone[p] =
                this.doneLessonByCatByUser[c].lessonsdone;
              this.trainingCategoryList[n].childpercentage[p] = Math.floor(
                (this.doneLessonByCatByUser[c].lessonsdone /
                  this.trainingCategoryList[n].childcount[p]) *
                  100
              );
            }
          }
        }
      }
    }
    if (
      this.totalData.done_lesson_by_user != null &&
      this.totalData.done_lesson_by_user[0] != null
    ) {
      userPercentage = this.totalData.done_lesson_by_user[0].lessonsdone;
      this.dividend = userPercentage;
      // this.reportPercentage=Math.floor(userPercentage/this.adminlessoncount*100);
    }
    if (done_lesson_by_cat_by_user == 0) {
      this.dividend = 0;
    }
    if (
      this.totalData.complete_lesson_file != null &&
      this.totalData.complete_lesson_file.length > 0 &&
      this.files_data != null &&
      this.files_data.length > 0
    ) {
      for (const key in this.files_data) {
        // console.log(this.files_data[key].file._id, 'dtufuygtfifk')
        for (const iterator of this.totalData.complete_lesson_file) {
          // console.log(iterator.file_id, '5146546')
          if (this.files_data[key].file._id == iterator.file_id) {
            this.complete_fileflag[iterator.file_id] = true;
          }
        }
      }
    }
    if (
      this.totalData.complete_lesson_audio != null &&
      this.totalData.complete_lesson_audio.length > 0 &&
      this.audio_data != null &&
      this.audio_data.length > 0
    ) {
      for (const key in this.audio_data) {
        // console.log(this.audio_data[key].audio._id)
        for (const iterator of this.totalData.complete_lesson_audio) {
          if (this.audio_data[key].audio._id == iterator.audio_id) {
            this.complete_audioflag[iterator.audio_id] = true;
          }
        }
      }
    }
    if (
      this.totalData.complete_lesson_video != null &&
      this.totalData.complete_lesson_video.length > 0 &&
      this.video_data != null &&
      this.video_data.length > 0
    ) {
      for (const key in this.video_data) {
        // console.log(this.video_data[key].video_url)
        for (const iterator of this.totalData.complete_lesson_video) {
          // console.log(this.totalData.complete_lesson_video[key].video_id)
          if (this.video_data[key].video_url == iterator.video_id) {
            this.complete_videoflag[iterator.video_id] = true;
          }
        }
      }
    }

    // this.divisor = this.salesrepLessonCount;
  }
  @Input()
  set TrainingCeneterData(data: any) {
    this.progress_bar = 0;
    let results: any = data || "<no name set>";
    // console.log("souresh testing++++++++++", results);
    this.lesson_content = results.results.lesson_content[0];
    // console.log(this.lesson_content, 'lesson dada>>>>')

    this.uniquedonetrainingarray = results.uniquedonetrainingarray;
    this.lessonDataList = results.rdata;
    // for (const i in this.lessonDataList) {
    for (var i = 0; i < this.lessonDataList.length; i++) {
      // // console.log(this.lessonDataList.length - 1, i)
      if (this.lessonDataList[i].expanded == true) {
        this.currentLesson = this.lessonDataList[i]._id;

        // console.log(">>>>><<<<<++", typeof (this.lessonDataList[i + 1]), this.lessonDataList[i], this.lessonDataList.length, this.currentLesson)
        if (this.lessonDataList[i + 1] != null) {
          // console.log("if >>>>><<<<<++this.lessonDataList[i+1],this.lessonDataList[i]", i, this.lessonDataList.length - 1);
          this.nextlessondata = {
            next_lesson_id: this.lessonDataList[i + 1]._id,
            next_lesson_title: this.lessonDataList[i + 1].lession_title,
          };
        } else {
          this.nextlessondata = {
            next_lesson_id: "",
            next_lesson_title: "",
          };
          // console.log("else >>>>><<<<<++this.lessonDataList[i+1],this.lessonDataList[i]")
        }
      }
    }

    for (const i in this.lessonDataList) {
      if (this.lessonDataList[i].expanded == false) {
        this.completedLessons.push(this.lessonDataList[i]._id);
      }
    }
    // console.log("completed lessons", this.lessonDataList, this.nextlessondata);

    this.allLessonDataList = results.results.lessondata;
    // console.log(">>>>", this.allLessonDataList)
    setTimeout(() => {
      this.paramsTrainingId =
        this.activatedRoute.snapshot.params.associated_training;
      this.paramslessonId = this.activatedRoute.snapshot.params._id;

      // console.log(this.paramsTrainingId, '>>>>', this.paramslessonId)

      if (this.activatedRoute.snapshot.params._id == null) {
        this.paramslessonId = results.results.lessondata[0]._id;
        // this.lesson_content=results.results.lesson_content[0];
        // console.log(this.lesson_content, '+++++++++>>>>', this.paramslessonId)
      }
    }, 200);

    for (let i in results.results.trainingcenterlist) {
      if (
        this.activatedRoute.snapshot.params.associated_training ==
        results.results.trainingcenterlist[i]._id
      ) {
        this.training_cat_name =
          results.results.trainingcenterlist[i].catagory_name;
      }
    }

    // console.log('less ids>>', results.results.lesson_ids[0].lesson_ids, this.activatedRoute.snapshot.params._id)

    if (this.userType == "admin" || this.userType == "mentor") {
      this.lesson_id_flag = true;
      for (let id in results.results.lesson_ids[0].lesson_ids) {
        if (
          this.lesson_content._id ==
          results.results.lesson_ids[0].lesson_ids[id]
        ) {
          this.lesson_id_flag = false;
        }
      }
    }
  }

  @Input()
  set serverDetails(serverDetails: {}) {
    this.serverDetailsVal = serverDetails || "<no name set>";
  }
  @Input()
  set TrainingName(name: any) {
    this.trainingCategoryName = name || "<no name set>";
  }
  @Input()
  set formSource(formSource: any) {
    this.formSourceVal = formSource || "<no name set>";
  }
  @Input()
  set QuizQuestionSource(val: any) {
    this.quizQuestionSource = val || "<no name set>";
  }
  @Input()
  set ParamsId(id: any) {
    this.paramsId = id || "<no name set>";
  }
  @Input()
  set TrainingCenterRoute(id: any) {
    this.trainingCenterRoute = id || "<no name set>";
  }
  @Input()
  set DnaServerUrl(val: any) {
    this.dnaServerUrl = val || "<no name set>";
  }
  constructor(
    public dialog: MatDialog,
    public apiService: ApiService,
    public router: Router,
    public cookieService: CookieService,
    public snakBar: MatSnackBar,
    public activatedRoute: ActivatedRoute,
    public sanitizer: DomSanitizer
  ) {
    this.userId = JSON.parse(this.cookieService.get("userid"));
    this.userType = JSON.parse(this.cookieService.get("type"));

    // this.userType = "mentee";
    setTimeout(() => {
      this.paramsTrainingId =
        activatedRoute.snapshot.params.associated_training;
      // console.log(this.paramsTrainingId, '>>>>')
    }, 200);
    this.activatedRoute.data.subscribe((response: any) => {
      // // console.log(response.trainingdata.results.lesson_attachements_data[0].lesson_attachements[0].type, 'activatedRoute')
      this.lessoncontentarraydata =
        response.trainingdata.results.lesson_attachements_data[0].lesson_attachements;
    });
    // // console.log(this.lessoncontentarraydata[0].images.converted_array[0].name, 'lessoncontentarraydata!!!!!!!')
    // // console.log(this.bucket_url + this.lessoncontentarraydata[0].images.converted_array[0].name, 'lessoncontentarraydata[0].images.converted_array[0].name')
  }
  // ................................................
  downloadPdf(file: any, i) {
    // console.log(file.file_type, 'fvgbnjkmgbh')

    // console.log(this.serverDetailsVal.serverUrl, 'serverDetailsVal')
    this.fileendpoint =
      this.serverDetailsVal.serverUrl + "updateusercompletelessonfiles";
    this.file_data = {
      user_id: this.userId,
      training_id: this.paramsTrainingId,
      lesson_id: this.paramslessonId,
      file_type: file.file.file_type,
      file_id: file.file._id,
      file_servername: file.file.fileservername,
    };

    if (file.file_skippable != true) {
      this.apiService
        .postDatawithoutToken(this.fileendpoint, this.file_data)
        .subscribe((res) => {
          console.log(res, "res");
          let result: any = res;
          this.complete_fileflag[file.file._id] = false;

          // console.log(this.complete_fileflag[file.file._id], '+++++++_______________')
          if (result.status == "success") {
            this.complete_fileflag[file.file._id] = true;
            // console.log(this.complete_fileflag[file.file._id], '+++++++666______________')

            this.checked_status = "success";
            this.pdf_url = this.bucket_url + file.file.fileservername;
            this.externalWindow = window.open(this.pdf_url);
            this.snakBar.open("You completed this file", "Ok", {
              duration: 1000,
            });
          }
        });
    }
    setTimeout(() => {
      this.getTrainingCenterlistFunctionwithLessonId(
        this.paramsId,
        this.userType,
        this.userId,
        this.paramslessonId
      );
    }, 500);
    if (file.file_skippable == true) {
      this.pdf_url = this.bucket_url + file.file.fileservername;
      this.externalWindow = window.open(this.pdf_url);
    }
  }

  //load to start the audio
  loadstart(fullval, val) {
    setTimeout(() => {
      // audioId.duration find audio duration
      var audioId: any = document.getElementById("audioPlayer_" + val);
      if (audioId.duration != null && audioId.duration != "") {
        this.audio_duration[val] = audioId.duration;
      }
      //audioId.currentTime for current audio time
      this.audio_currenttime[val] = audioId.currentTime;
      this.audio_progress[val] = Math.floor(
        (this.audio_currenttime[val] / this.audio_duration[val]) * 100
      );

      //start time calculation
      var sec_num = parseInt(this.audio_currenttime[val], 10);
      var hours: any = Math.floor(sec_num / 3600);
      var minutes: any = Math.floor((sec_num - hours * 3600) / 60);
      var seconds: any = sec_num - hours * 3600 - minutes * 60;
      // convert start time to hours minutes sec format
      this.audio_time[val] = hours + ":" + minutes + ":" + seconds;

      //end time calculation
      var sec_duration_num = parseInt(this.audio_duration[val], 10);
      var duration_hours: any = Math.floor(sec_duration_num / 3600);
      var duration_minutes: any = Math.floor(
        (sec_duration_num - duration_hours * 3600) / 60
      );
      var duration_seconds: any =
        sec_duration_num - duration_hours * 3600 - duration_minutes * 60;
      // convert end time to min hour sec format
      this.audio_end_time[val] =
        duration_hours + ":" + duration_minutes + ":" + duration_seconds;
      this.play_flag[val] = true;
      this.pause_flag[val] = false;

      if (fullval.audio_skippable == false) {
        // console.log('true')
        this.disabled[val] = true;
      }

      this.modelval[val] = 0;
      // console.log(this.modelval[val], 'ghjgh+++++++++');
      this.modelval[val] = this.audio_progress[val];

      this.audio_currenttime[val] =
        (this.modelval[val] * this.audio_duration[val]) / 100;
      this.newaudio_currenttime[val] = this.audio_currenttime[val];

      // console.log(this.audio_duration[val], 'audio_currenttime')
    }, 1500);
  }
  //skip ten sec (next and previous)
  skipTensec(val, item, flag) {
    // console.log(item, '+++++++++++====', flag)
    if (item.audio_skippable == false) {
      this.snakBar.open("You can't skip this audio", "Ok", {
        duration: 1000,
      });
    } else {
      if (flag == "previos") {
        var audioId: any = document.getElementById("audioPlayer_" + val);
        audioId.currentTime = audioId.currentTime - Math.floor(10);
        // console.log(audioId.currentTime, 'previos')
      }
      if (flag == "next") {
        var audioId: any = document.getElementById("audioPlayer_" + val);
        audioId.currentTime = audioId.currentTime + 10;
        // console.log(audioId.currentTime, 'next')
      }
    }
  }
  // get time update onprocess(id,full value)
  onprocess(val, fullval) {
    var audioId: any = document.getElementById("audioPlayer_" + val); // audio id

    this.audio_duration[val] = audioId.duration; //audio duration

    this.audio_currenttime[val] = audioId.currentTime;
    this.audio_progress[val] =
      (this.audio_currenttime[val] / this.audio_duration[val]) * 100; // audio progress based on current time

    this.modelval[val] = 0;
    this.modelval[val] = this.audio_progress[val];

    this.audio_currenttime[val] =
      (this.modelval[val] * this.audio_duration[val]) / 100; // audio current val
    this.newaudio_currenttime[val] = this.audio_currenttime[val];

    if (fullval.audio_skippable == false) {
      // console.log('true')
      this.disabled[val] = true;
    }
    // this.startEndTimeCalculation(val);
    //start time calculation

    var sec_num = parseInt(this.audio_currenttime[val], 10);
    var hours: any = Math.floor(sec_num / 3600);
    var minutes: any = Math.floor((sec_num - hours * 3600) / 60);
    var seconds: any = sec_num - hours * 3600 - minutes * 60;
    this.audio_time[val] = hours + ":" + minutes + ":" + seconds;

    //end time calculation
    var sec_duration_num = parseInt(this.audio_duration[val], 10);
    var duration_hours: any = Math.floor(sec_duration_num / 3600);
    var duration_minutes: any = Math.floor(
      (sec_duration_num - duration_hours * 3600) / 60
    );
    var duration_seconds: any =
      sec_duration_num - duration_hours * 3600 - duration_minutes * 60;
    // console.log(val, 'audio_duration')
    this.audio_end_time[val] =
      duration_hours + ":" + duration_minutes + ":" + duration_seconds;
  }
  replay(val) {
    var audioId: any = document.getElementById("audioPlayer_" + val);

    audioId.currentTime = 0;
    this.audio_currenttime[val] = audioId.currentTime;
    var sec_num = parseInt(audioId.currentTime, 10);
    var hours: any = Math.floor(sec_num / 3600);
    var minutes: any = Math.floor((sec_num - hours * 3600) / 60);
    var seconds: any = sec_num - hours * 3600 - minutes * 60;
    this.audio_time[val] = hours + ":" + minutes + ":" + seconds;
    this.audio_progress[val] = Math.floor(
      (this.audio_currenttime[val] / this.audio_duration[val]) * 100
    );
    // console.log(this.audio_currenttime[val], 'audioId.currentTime')
  }
  //for audio time
  startEndTimeCalculation(val) {
    //current time calculation
    var sec_num = parseInt(this.audio_currenttime[val], 10);
    var hours: any = Math.floor(sec_num / 3600);
    var minutes: any = Math.floor((sec_num - hours * 3600) / 60);
    var seconds: any = sec_num - hours * 3600 - minutes * 60;
    this.audio_time[val] = hours + ":" + minutes + ":" + seconds;

    //end time calculation
    var sec_duration_num = parseInt(this.audio_duration[val], 10);
    var duration_hours: any = Math.floor(sec_duration_num / 3600);
    var duration_minutes: any = Math.floor(
      (sec_duration_num - duration_hours * 3600) / 60
    );
    var duration_seconds: any =
      sec_duration_num - duration_hours * 3600 - duration_minutes * 60;
    // console.log(val, 'audio_duration')
    this.audio_end_time[val] =
      duration_hours + ":" + duration_minutes + ":" + duration_seconds;
  }

  progressbtn(val, fullval) {
    if (fullval.audio_skippable == true) {
      this.audio_progress[val] = this.modelval[val];

      this.audio_currenttime[val] =
        (this.modelval[val] * this.audio_duration[val]) / 100;

      var sec_num = parseInt(this.audio_currenttime[val], 10);
      var hours: any = Math.floor(sec_num / 3600);
      var minutes: any = Math.floor((sec_num - hours * 3600) / 60);
      var seconds: any = sec_num - hours * 3600 - minutes * 60;
      this.audio_time[val] = hours + ":" + minutes + ":" + seconds;
      // console.log(this.audio_currenttime[val], 'audio_currenttime');
      let audioId: any = document.getElementById("audioPlayer_" + val);
      audioId.currentTime = this.audio_currenttime[val];

      // console.log(this.audio_currenttime, 'audio_currenttime progressbtn fst__--------')
      // console.log(this.audio_progress[val], 'audio_progress progressbtn fst__--------')
    } else {
      this.snakBar.open("You can't skip this audio", "Ok", {
        duration: 1000,
      });
    }
    // this.audio_progress[id]=5
  }

  playbtn(val: any, flag: any) {
    // console.log(val, '000000796e++', flag)
    let audioId: any = document.getElementById("audioPlayer_" + val);
    this.play_flag[val] = false;
    this.pause_flag[val] = true;
    audioId.play();
    // console.log(audioId, 'audioId')
  }

  pausebtn(val: any, flag: any) {
    let audioId: any = document.getElementById("audioPlayer_" + val);
    audioId.pause();
    this.play_flag[val] = true;
    this.pause_flag[val] = false;
    // console.log(audioId, '+++++++++++++')
  }

  previewpdf(val, flag) {
    console.log(val, "val");
    if (flag == "img") {
      this.previewimages = val;
    }
    if (flag == "pdf") {
      this.previewimages = val.images.converted_array;
      // console.log(this.previewimages, 'PreviewContentDialog')
    }
    // this.previewimages = val.images.converted_array;
    // console.log(this.previewimages, 'PreviewContentDialog')

    const dialogRef = this.dialog.open(PreviewContentDialog, {
      panelClass: "lesson_pdfmodal",
      width: "auto",
      data: { data: val, flag: flag },
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe((result) => {
      // console.log(result, '>>>>>>>>>>');
    });
  }
  ngOnInit() {
   
    // console.log(this.userId.length, 'userId')

    if (
      this.userType == "mentee" &&
      this.cookieService.get("parentid") != null &&
      typeof this.cookieService.get("parentid") != "undefined" &&
      this.cookieService.get("parentid") != ""
    ) {
      this.user_parent_id = JSON.parse(this.cookieService.get("parentid"));

      // console.log(this.user_parent_id.length, 'user_parent_id')

      if (this.user_parent_id.length > 10) {
        let endpoint = this.dnaServerUrl + "api1/usergetone";

        let data: any;
        data = {
          id: this.user_parent_id,
        };
        // // console.log('cardData-->', cardData);
        this.apiService
          .postDatawithoutToken(endpoint, data)
          .subscribe((response: any) => {
            if (response.status == "success") {
              this.user_mentor_name =
                response.result[0].firstname +
                " " +
                response.result[0].lastname;
              // console.log(this.dnaServerUrl, '+++++', this.user_mentor_name, response)
            } else {
              this.snakBar.open("Error Occured..!", "Try Again", {
                duration: 3000,
              });
            }
          });
      }
    }

    this.divisor = this.adminlessoncount;
    this.reportPercentage = Math.floor((this.dividend / this.divisor) * 100);
    // console.log("curreentLesson ++++++", this.currentLesson);
    for (const key in this.lessonDataList) {
      if (this.lessonDataList[key].expanded == true) {
        this.Index = this.lessonDataList.indexOf(this.lessonDataList[key]);
        // console.log(this.Index, '>>>>>');
      }
    }
    this.lastIndex = this.lessonDataList.length - 1;
  }

  lessonplanpageroute(id) {
    this.router.navigateByUrl(
      this.lessonplanmaterialroute + this.paramsTrainingId + "/" + id
    );
  }

  questionDetails(id: any, i: any, lesson_title: any) {
    // console.log(this.allLessonDataList.length, 'this.allLessonDataList.length', i)
    this.lesson_title = lesson_title;
    this.progressLoader = true;
    this.questionId = id;
    this.questionindex = 0;
    const link =
      this.serverDetailsVal.serverUrl + this.formSourceVal.showEndpoint;
    let data: any = {
      source: this.quizQuestionSource.questionSourceName,
      // token:this.serverDetailsVal.jwttoken,
      condition: {
        lesson_id: id,
      },
    };
    this.apiService.getData(link, data).subscribe((response): any => {
      let result: any = response;
      this.questionArray = result.results.questionanswerlist;
      if (this.questionArray.length == 0) {
        // this.addMarkedData(this.currentlesson, this.paramsId, id, this.lesson_title, this.nextlessondata);
        this.questionArray.expanded = true;
      }

      if (i < this.allLessonDataList.length) {
        if (i < this.allLessonDataList.length) {
          if (this.allLessonDataList[i + 1] != null) {
            this.allLessonDataList[i].expanded = false;
            this.allLessonDataList[i + 1].expanded = true;
            this.allLessonDataList[i + 1].is_done = true;
          } else {
            let message: any = "You Have Successfully Completed The Training";
            let action: any = "Ok";
            this.snakBar.open(message, action, {
              duration: 3000,
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
          duration: 3000,
        });
      }
    });
  }

  addMarkedData(
    lessonId: any,
    associated_training: any,
    i: any,
    lession_title: any,
    nextlessondata: any
  ) {
    const link =
      this.serverDetailsVal.serverUrl + this.formSourceVal.addMarkendpoint;
    // if(this.trainingCategoryName==null || this.trainingCategoryName==''){}
    let data: any = {
      data: {
        user_id: this.userId,
        lesson_id: this.paramslessonId,
        associated_training: this.paramsTrainingId,
        lastlessonname: lession_title,
        lasttrainingname: this.trainingCategoryName,
        nextlessondata: nextlessondata,
      },
      sourceobj: ["user_id", "lesson_id", "associated_training"],
      token: this.serverDetailsVal.jwttoken,
    };

    // console.log('post data', data);

    this.apiService.postData(link, data).subscribe((response: any) => {
      // console.log(response, 'respoese453')
      if ((response.status = "success")) {
        const link =
          this.serverDetailsVal.serverUrl +
          this.formSourceVal.getUpdatedTrainingPercentageByUserEndpoint;
        let data: any = {
          user_id: this.userId,
        };
      }
    });
  }

  // videoended(item: any, i: any, j) {
  //   // console.log(i, '+++++++++==============')
  //   if (item.test_associate_training == 'Yes') {
  //     this.questionDetails(item._id, i, j);
  //   } else {
  //     // this.addMarkedData(item._id, this.paramsId, i, this.lesson_title, this.nextlessondata);
  //   }
  // }

  audioended(item: any, i: any, j) {
    console.log(item, "dcnjmkxdcvf");
    if (item.test_associate_training == "Yes") {
      this.questionDetails(item._id, i, j);
    } else {
      // this.addMarkedData(item._id, this.paramsId, i, this.lesson_title, this.nextlessondata);
    }
    if (j == 1) {
      setTimeout(() => {
        this.getTrainingCenterlistFunctionwithLessonId(
          this.paramsId,
          this.userType,
          this.userId,
          this.paramslessonId
        );
      }, 500);

      let audioendpoint =
        this.serverDetailsVal.serverUrl + "updateusercompletelessonaudio";

      let audio_data = {
        user_id: this.userId,
        training_id: this.paramsTrainingId,
        lesson_id: this.paramslessonId,
        audio_type: item.audio.file_type,
        audio_id: item.audio._id,
        audio_name: item.audio.fileservername,
      };
      if (item.audio_skippable != true) {
        this.apiService
          .postDatawithoutToken(audioendpoint, audio_data)
          .subscribe((res) => {
            console.log(res);
            let result: any = res;

            // console.log(result, '+++++++')
            if (result.status == "success") {
              console.log(item, "dcnjmkxdcvf");
              this.complete_audioflag[item.audio._id] = true;
              // this.next_button_access=true;
              this.snakBar.open(
                "Successfully Completed This Lesson Audio",
                "ok",
                {
                  duration: 3000,
                }
              );
            }
          });
      }
    }
  }

  childcatclick(childId: any, catName: any) {
    this.trainingCategoryName = catName;
    this.router.navigateByUrl(this.trainingCenterRoute + childId);
  }

  nochildclick(val: any, flag) {
    // console.log(val, '++990==++', flag)

    // if ((val.complete_lesson_file != null && val.complete_lesson_file != '' && this.files_data.length == val.complete_lesson_file.length) || (val.complete_lesson_audio != null && val.complete_lesson_audio != '' && this.audio_data.length == val.complete_lesson_audio.length) || (val.complete_lesson_video != null && val.complete_lesson_video != '' && this.video_data.length == val.complete_lesson_video.length)) {

    //   this.next_button_access = true;
    //   // console.log("+++++@input++++++++nochildclick+++++++")

    // }

    // this.lesson_content = this.lesson_data.results.lesson_content[0];
    // console.log(this.lesson_content, '___++++')

    if (this.lesson_locked_by_user == 1) {
      if (flag == "click") {
        this.access_flag = false;
        // console.log('no1')
      }
      if (flag == "next" || flag == "prev") {
        this.access_flag = true;
      }
    }
    if (this.lesson_locked_by_user == 0) {
      this.access_flag = true;
      // console.log('no2')
      // this.router.navigateByUrl(this.trainingCenterRoute + this.paramsTrainingId + '/' + val._id);
    }

    if (val.is_done != null && val.is_done == true) {
      // this.next_button_access = true;
      this.access_flag = true;
      // console.log('no3')
      // this.router.navigateByUrl(this.trainingCenterRoute + this.paramsTrainingId + '/' + val._id);
    }

    if (val.prerequisite_lession == "") {
      this.access_flag = true;
      // console.log('no4')
      // this.router.navigateByUrl(this.trainingCenterRoute + this.paramsTrainingId + '/' + val._id);
    }

    // console.log(val.prerequisite_lession, 'val.prerequisite_lession', this.paramslessonId)

    if (
      (this.lesson_content.is_done != null &&
        this.lesson_content.is_done == true &&
        val.prerequisite_lession == this.paramslessonId) ||
      val.prerequisite_lession == ""
    ) {
      // console.log(this.paramslessonId, 'jatatatajaja')
      this.access_flag = true;
    }
    // console.log(this.access_flag, 'accesss.com')

    if (this.access_flag == true) {
      this.router.navigateByUrl(
        this.trainingCenterRoute + this.paramsTrainingId + "/" + val._id
      );
    } else {
      this.snakBar.open(
        "You Can Not Access This Lesson Until Submit Current Lesson Plan...!",
        "OK",
        {
          duration: 5000,
        }
      );
    }

    // if (val.is_done == true) {
    //   // this.next_button_access == true;.
    //   this.access_flag = true;
    // }

    // if (val.has_lessonplan == 0) {
    //   this.access_flag = true;
    //   this.router.navigateByUrl(this.trainingCenterRoute + this.paramsTrainingId + '/' + val._id);
    // }

    // if ( this.access_flag==false) {

    //   // this.access_flag = false;
    //   if (this.AllTrainingData.lesson_ids[0].lesson_ids != null) {

    //     for (let i in this.AllTrainingData.lesson_ids[0].lesson_ids) {
    //       if ((this.AllTrainingData.lesson_ids[0].lesson_ids[i] == val.prerequisite_lession || this.AllTrainingData.lesson_ids[0].lesson_ids[i] == val.paramslessonId) || this.next_button_access == true) {
    //         this.access_flag = true;
    //       }
    //     }
    //   }

    //   // console.log(this.next_button_access, 'next_button_access', this.access_flag)

    //   if ((val.is_done != null && val.is_done == true && this.access_flag == true) || (val.prerequisite_lession == this.paramslessonId && this.access_flag == true)) {

    //     setTimeout(() => {
    //       this.progress_bar = 1;
    //     }, 100);
    //     // this.next_button_access = false;
    //     this.router.navigateByUrl(this.trainingCenterRoute + this.paramsTrainingId + '/' + val._id);

    //   } else {
    //
    //   }
    // }
  }

  clicktrcataining(id: any, catagory_name: any) {
    setTimeout(() => {
      this.progress_bar = 1;
    }, 100);

    // console.log(id, '++++++++++', catagory_name)

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
    setTimeout(() => {
      document.getElementById("lessonData").scrollIntoView();
    }, 1000);
  }

  activatedclass(item) {
    item.active = !item.active;
  }

  getTrainingCenterlistFunction(
    associated_training: any,
    type: any,
    user_id: any
  ) {
    const link = this.serverDetailsVal.serverUrl + "gettrainingcenterlist";
    let data: any = {
      condition: {
        associated_training: associated_training,
      },
      user_id: user_id,
      type: type,
      associated_training: associated_training,
    };
    this.apiService
      .postDatawithoutToken(link, data)
      .subscribe((response: any) => {
        this.lesson_data = response;
        // console.log("response", response);
        this.trainingCategoryList = response.results.trainingcenterlist;
        this.lessonDataList = response.rdata;
        this.dividend = response.results.done_lesson_by_user[0].lessonsdone;
        this.divisor = response.results.total_lesson[0].count;
        this.reportPercentage = Math.floor(
          (this.dividend / this.divisor) * 100
        );
        this.lesson_content = this.lesson_data.results.lesson_content[0];
        // console.log(this.lesson_data, '+++++>>>')
        this.l_content = this.lesson_data.results.lesson_content[0];

        // console.log(this.l_content, "l_content")
        // console.log(this.lesson_content, 'lesson_content')

        if (this.lesson_data.status == "success") {
          // console.log(this.lesson_data, '+++++>>>', this.lesson_data.status)

          this.progress_bar = 0;
        }
      });
  }




  getTrainingCenterlistFunctionwithLessonId(associated_training: any, type: any, user_id: any, _id: any) {
   
    // console.log('associated_training', associated_training, 'type', type, 'user_id', user_id, '_id', _id)
    const link = this.serverDetailsVal.serverUrl + "gettrainingcenterlist";
    let data: any = {
      condition: {
        associated_training: associated_training,
        _id: _id,
      },
      user_id: user_id,
      type: type,
      associated_training: associated_training,
    };
    this.apiService
      .postDatawithoutToken(link, data)
      .subscribe((response: any) => {
        this.lesson_data = response;
        // console.log("response", response);
        this.trainingCategoryList = response.results.trainingcenterlist;
        this.lessonDataList = response.rdata;
        // console.log(response.results.done_lesson_by_user, 'response.results.done_lesson_by_user[0].lessonsdone')

        if (
          response.results.done_lesson_by_user.length != 0 &&
          response.results.done_lesson_by_user != ""
        ) {
          this.dividend = response.results.done_lesson_by_user[0].lessonsdone;
        }

        this.divisor = response.results.total_lesson[0].count;
        this.reportPercentage = Math.floor(
          (this.dividend / this.divisor) * 100
        );
        this.lesson_content = this.lesson_data.results.lesson_content[0];
        this.AllTrainingData = response.results;
        // console.log(this.lesson_data, '+++++>>>')

        if (this.lesson_data.status == "success") {
          // console.log(this.lesson_data, '+++++>>>', this.lesson_data.status)

          this.progress_bar = 0;
        }
        // console.log(this.files_data, 'files_data')
        // console.log(this.audio_data, 'audio_data')
        // console.log(this.video_data, 'video_data')

        if (
          this.files_data.length != response.results.complete_lesson_file.length
        ) {
          this.next_button_access = false;
        }
        if (
          this.video_data.length !=
          response.results.complete_lesson_video.length
        ) {
          this.next_button_access = false;
        }
        if (
          this.audio_data.length !=
          response.results.complete_lesson_audio.length
        ) {
          this.next_button_access = false;
        }
        if (
          (response.results.complete_lesson_file != null &&
            response.results.complete_lesson_file.length != 0 &&
            this.files_data.length ==
              response.results.complete_lesson_file.length) ||
          (response.results.complete_lesson_audio != null &&
            response.results.complete_lesson_audio.length != 0 &&
            this.audio_data.length ==
              response.results.complete_lesson_audio.length) ||
          (response.results.complete_lesson_video != null &&
            response.results.complete_lesson_video.length != 0 &&
            this.video_data.length ==
              response.results.complete_lesson_video.length)
        ) {
          this.next_button_access = true;

          // console.log("++++++++getTrainingCenterlistFunctionwithLessonId++++++++++++")
          if (
            this.files_data.length !=
              response.results.complete_lesson_file.length &&
            this.audio_data.length ==
              response.results.complete_lesson_audio.length &&
            this.video_data.length ==
              response.results.complete_lesson_video.length
          ) {
            this.next_button_access = false;
            console.log("xxxxxxxxxxxxx");
          }
          if (
            this.video_data.length !=
              response.results.complete_lesson_video.length &&
            this.audio_data.length ==
              response.results.complete_lesson_audio.length &&
            this.files_data.length ==
              response.results.complete_lesson_file.length
          ) {
            this.next_button_access = false;
            console.log("yyyyyyyyyy");
          }
          if (
            this.audio_data.length !=
              response.results.complete_lesson_audio.length &&
            this.files_data.length ==
              response.results.complete_lesson_file.length &&
            this.video_data.length ==
              response.results.complete_lesson_video.length
          ) {
            this.next_button_access = false;
            console.log("zzzzzzzzzzz");
          }
          this.next_button_access = true;
        }

        if (
          this.files_data.length == 0 &&
          this.audio_data.length == 0 &&
          this.video_data.length == 0
        ) {
          this.next_button_access = true;
          if (this.quizflag != true) {
            this.next_button_access = true;
          } else {
            this.next_button_access = false;
          }
          // console.log("+++++@input35454555+++++++++++++++")
        }
      });
    // if (this.quizflag != true) {
    //   this.next_button_access = true;
    // }
    // else {
    //   this.next_button_access = false;
    // }
  }

  //next prev button work

  nextbutton(value: any) {
    // console.log(value, 'value')
    window.scrollTo({
      top: 1100,
      left: 0,
      behavior: 'smooth'
    });
    switch (value) {
      case "next":
        // this.lessonDataList[this.Index].lession_title

        // console.log(this.lesson_content, 'this.lesson_content', this.lessonDataList[0])
        if (
          this.lesson_content.is_done == null &&
          this.lesson_content.has_lessonplan == 0
        ) {
          // console.log(this.lesson_content.has_lessonplan, 'has_lessonplan')
          this.addMarkedData(
            this.lessonDataList[0]._id,
            this.paramsId,
            this.nextdata,
            this.lesson_content.lession_title,
            this.nextlessondata
          );
        }
        this.addMarkedData(
          this.lessonDataList[0]._id,
          this.paramsId,
          this.nextdata,
          this.lesson_content.lession_title,
          this.nextlessondata
        );

        let ind: any = 0;
        setTimeout(() => {
          for (let b in this.lessonDataList) {
            if (this.lessonDataList[b]._id == this.lesson_content._id)
              ind = parseInt(b) + 1;
          }
          // console.log('ind', ind);
          if (this.lessonDataList[ind] != null) {
            setTimeout(() => {
              this.nochildclick(this.lessonDataList[ind], "next");
            }, 500);

            this.progressLoader = true;
          } else {
            for (var n = 0; n < this.trainingCategoryList.length; n++) {
              // console.log('++>>>>', this.trainingCategoryList[n], this.trainingCategoryList[n + 1], this.trainingCategoryList[0]._id)
              if (
                this.paramsTrainingId == this.trainingCategoryList[n]._id &&
                this.trainingCategoryList[n + 1] != null
              ) {
                // console.log('-->>>>', this.trainingCategoryList[n + 1])

                this.router.navigateByUrl(
                  this.trainingCenterRoute +
                    this.trainingCategoryList[n + 1]._id
                );
              } else {
                // console.log('++>>>>', this.trainingCategoryList[n]._id, this.trainingCategoryList[n + 1]._id,)
                // '>>>',this.trainingCategoryList[0]._id)
                this.progressLoader = false;
                this.router.navigateByUrl(
                  this.trainingCenterRoute + this.trainingCategoryList[0]._id
                );
              }
            }
          }
        }, 500);
        // console.log("souresh test", this.nextdata);
        // }
        break;
      case "prev":
        // console.log(this.lessonDataList[this.Index], '>>>>>>>>>>>>')
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

          this.nochildclick(this.lessonDataList[ind1], "prev");

          this.progressLoader = true;
        }, 500);

        break;
    }
  }

  // button for purchase ,schedule ,-131px lesson
  menteeLessonReviewButton(flag: any) {
    console.log(flag);

    if (
      this.user_parent_id != null &&
      flag == "buy" &&
      this.user_parent_id != ""
    ) {
      // console.log('parent-id-->', this.user_parent_id);

      //product data by category id start
      let product_data: any;
      let endpointa = this.serverDetailsVal.serverUrl + "getproductsbycatid";
      product_data = {
        category: "5eddd5401acf66000738be19",
      };
      this.apiService
        .postDatawithoutToken(endpointa, product_data)
        .subscribe((response: any) => {
          // console.log('>>>>>', response)
          this.product_data = response.results;
          if (response.status == "success") {
            const dialogRef = this.dialog.open(PurchaseModalComponent, {
              panelClass: "blogdetail_videomodal",
              data: { data: this.dialog, product_data: this.product_data },
            });

            dialogRef.afterClosed().subscribe((result: any) => {
              // console.log('>>>', result);

              if (result != null && result.flag == "yes") {
                var lesson_data: any = [];
                var lesson_id: any;
                var product_price: any;
                let cardData: any;

                if (result.flaglesson == "single") {
                  var lessondataobj = [];

                  for (let c in this.allLessonData) {
                    if (this.allLessonData[c]._id == this.paramslessonId) {
                      // console.log(this.allLessonData[c], '????++++')
                      lessondataobj.push(this.allLessonData[c]);
                    }
                  }
                  product_price = result.lesson_session_data.price;
                  lesson_id = this.paramslessonId;

                  if (lessondataobj != null) {
                    // console.log(lessondataobj, '>>>>lessondataobj')
                    cardData = {
                      product: [
                        {
                          free_shipping: 1,
                          flag: "lesson",
                          id: result.lesson_session_data._id,
                          name:
                            "Lesson Plan For - " +
                            "( " +
                            lessondataobj[0].lession_title +
                            " )",
                          price: product_price,
                          quantity: 1,
                          image: result.lesson_session_data.image,
                          training_id: this.paramsTrainingId,
                          lesson_id: lesson_id,
                          description: result.lesson_session_data.description,
                          shortsummary: result.lesson_session_data.shortsummary,
                        },
                      ],
                      userid: this.userId,
                    };
                  }
                }

                if (result.flaglesson == "all") {
                  var lesson_ids_data: any = [];
                  product_price = result.lesson_session_data.price;

                  // console.log(this.orders_data, '+++>>>>orders_data')

                  // if(this.orders_data != null){
                  for (let i in this.allLessonData) {
                    for (let j in this.orders_data) {
                      if (
                        this.allLessonData[i]._id ==
                        this.orders_data[j].lesson_id
                      ) {
                        lesson_data.push(this.allLessonData[i]);
                      }
                    }
                  }
                  // }

                  // console.log(lesson_data, '+++>>>>lesson_data')

                  this.allLessonData = this.allLessonData.filter(function (el) {
                    return !lesson_data.includes(el);
                  });

                  // console.log(lesson_data, '>>>>lesson_data', this.allLessonData)

                  for (let i in this.allLessonData) {
                    let data: any = {};
                    data = {
                      free_shipping: 1,
                      flag: "lesson",
                      id: result.lesson_session_data._id,
                      name:
                        "Lesson Plan For -" +
                        "( " +
                        this.allLessonData[i].lession_title +
                        " )",
                      price: product_price,
                      quantity: 1,
                      image: result.lesson_session_data.image,
                      training_id: this.paramsTrainingId,
                      lesson_id: this.allLessonData[i]._id,
                      description: result.lesson_session_data.description,
                      shortsummary: result.lesson_session_data.shortsummary,
                    };
                    lesson_ids_data.push(data);
                  }

                  // console.log(lesson_ids_data, 'lesson_ids_data')

                  cardData = {
                    product: lesson_ids_data,
                    userid: this.userId,
                  };
                }
                let endpoint = this.dnaServerUrl + "api/cart";

                this.apiService
                  .postDatawithoutToken(endpoint, cardData)
                  .subscribe((response: any) => {
                    if (response.status == "success") {
                      // this.getTrainingCenterlistFunction(this.paramsId, this.userType, this.userId)
                      this.snakBar.open(
                        "Product Successfully Added Into Your Cart.",
                        "OK",
                        {
                          duration: 3000,
                        }
                      );
                      this.router.navigateByUrl("cart/" + response.result._id);
                    } else {
                      this.snakBar.open("Error Occured..!", "Try Again", {
                        duration: 2000,
                      });
                    }
                  });
              }
            });
          }
        });
    }

    if (this.user_parent_id == null || this.user_parent_id == "") {
      this.router.navigateByUrl(
        "/mentors/" + this.paramsTrainingId + "/" + this.paramslessonId
      );
    }

    if (flag == "lesson_plan") {
      this.router.navigateByUrl(
        this.lessonplanmaterialroute +
          this.paramsTrainingId +
          "/" +
          this.paramslessonId
      );
    }

    if (
      this.user_parent_id != null &&
      flag == "schedule" &&
      this.user_parent_id != ""
    ) {
      this.router.navigateByUrl(
        this.googlescheduleroute +
          this.user_parent_id +
          "/" +
          this.paramslessonId +
          "/" +
          this.paramsTrainingId
      );
    }
  }

  //review lesson plan modal open

  getReviewLessonPlanModal() {
    // console.log('>>>', this.lesson_content)
    const dialogRef = this.dialog.open(ReviewLessonPlanComponent, {
      panelClass: "lesson_modal",
      data: {
        data: this.lesson_content,
        user_mentor_name: this.user_mentor_name,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      // console.log(result);
      if (result != null && result.flag == "yes") {
        this.router.navigateByUrl(
          "/lesson-plan-material/" +
            this.paramsTrainingId +
            "/" +
            this.paramslessonId
        );
      } else {
        return;
      }
    });
  }

  // open Lesson Video
  openLessonVideo(val: any) {
    // console.log(val, 'openLessonVideo')
    var url =
      this.video_base_url +
      val.video_url +
      "?modestbranding=1&autohide=0&showinfo=0&controls=0&listType=playlist&rel=0";

    var server_url =
      this.serverDetailsVal.serverUrl + "updateusercompletelessonvideo";

    const safe_url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    // console.log(safe_url, val)

    if (val.video_skippable == true) {
      var video_url =
        val.video_url +
        "?rel=0&modestbranding=1&autoplay=1&showinfo=0&controls=1&listType=playlist";
    } else {
      var video_url =
        val.video_url +
        "?rel=0&modestbranding=1&autoplay=1&showinfo=0&controls=0&listType=playlist";
    }
    const dialogRef = this.dialog.open(LessonVideoModalComponent, {
      panelClass: "lesson_videomodal",
      width: "900px",
      height: "auto",
      data: {
        safe_url: safe_url,
        data: val,
        training_id: this.paramsId,
        lesson_id: this.paramslessonId,
        endpoint: server_url,
        user_id: this.userId,
        video_url: video_url,
      },
    });
    dialogRef.disableClose = true;

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result, "result********************", val);
      if (result != null && result == "yes") {
        // console.log()
        this.getTrainingCenterlistFunctionwithLessonId(
          this.paramsId,
          this.userType,
          this.userId,
          this.paramslessonId
        );

        // setTimeout(() => {
        //   // console.log(this.AllTrainingData.complete_lesson_video, 'AllTrainingData', this.lesson_content.video_array)

        // }, 2000);

        setTimeout(() => {
          if (
            this.AllTrainingData.complete_lesson_video.length != null &&
            this.AllTrainingData.complete_lesson_video.length ==
              this.video_data.length
          ) {
            // console.log(this.AllTrainingData.complete_lesson_video, 'has_lessonplan ++')
            this.next_button_access = true;

            if (this.AllTrainingData.quiz_data.length != 0) {
              this.quizflag = true;
              this.next_button_access = false;
            }

            if (
              this.AllTrainingData.complete_lesson_quiz != null &&
              this.AllTrainingData.complete_lesson_quiz[0] != null
            ) {
              if (
                this.AllTrainingData.complete_lesson_quiz[0].lesson_id ==
                this.AllTrainingData.lesson_content[0]._id
              ) {
                this.next_button_access = true;
                this.quizflag = false;
              }
            }
            this.complete_videoflag[val.video_url] = true;
            // if (this.lesson_content.is_done == null) {
            //   // console.log(this.lesson_content.has_lessonplan, 'has_lessonplan')
            //   // this.addMarkedData(this.lessonDataList[0]._id, this.paramsId, this.nextdata, this.lesson_content.lession_title, this.nextlessondata);
            // }
          }
        }, 2000);
      }
    });
  }

  // Schedule modal open

  getScheduleModal() {
    // console.log('>>>', this.lesson_content)
    const dialogRef = this.dialog.open(ScheduleModalComponent, {
      panelClass: "schedule_modal",
      data: {
        data: this.lesson_content,
        user_mentor_name: this.user_mentor_name,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      // console.log(result);
      if (result != null && result.flag == "yes") {
        this.router.navigateByUrl(
          this.googlescheduleroute +
            this.user_parent_id +
            "/" +
            this.paramslessonId +
            "/" +
            this.paramsTrainingId
        );
      }
    });
  }

  // Unlock Lesson
  UnlockLesson(val) {
    // console.log(val, 'UnlockLesson', this.access_flag)
    this.access_flag = true;

    const dialogRef = this.dialog.open(UnlockLessonModalComponent, {
      panelClass: "schedule_modal",
      data: { data: val },
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe((result: any) => {
      // console.log(result, '+++++====', val)
      var lockVal: any;
      var snackText: any = "";
      if (val == 1) {
        snackText = "Applied sequential lessons...!";
      } else {
        snackText = "Unlocked sequential lessons...!";
      }
      if (result == "yes") {
        let endpoint: any =
          this.serverDetailsVal.serverUrl + "updateuserforunlockedlesson";

        var data: any = {
          user_id: this.userId,
          haslessonlocked: val,
        };
        // console.log(data, 'data')
        this.apiService
          .postDatawithoutToken(endpoint, data)
          .subscribe((response: any) => {
            if (response.status == "success") {
              this.lesson_locked_by_user = val;
              this.snakBar.open(snackText, "OK", {
                duration: 5000,
              });

              if (this.lesson_locked_by_user == 0) {
                this.next_button_access = false;
                this.access_flag = true;
              } else {
                this.next_button_access = false;
                this.access_flag = false;
              }
            }
          });
      }
    });
  }

  // lesson_quiz LessonQuizModalComponent
  lessonQuiz(val: any) {
    if (
      this.AllTrainingData != null &&
      typeof this.AllTrainingData.quiz_data != "undefined"
    ) {
      // console.log(val, '++', this.AllTrainingData.quiz_data)
      var server_url: any =
        this.serverDetailsVal.serverUrl + "addlessonquizdata";

      const dialogRef = this.dialog.open(LessonQuizModalComponent, {
        panelClass: "schedule_modal",
        width: "900px",
        height: "auto",
        data: {
          quiz_data: this.AllTrainingData.quiz_data,
          lesson_data: val,
          user_id: this.userId,
          server_url: server_url,
        },
      });
      dialogRef.disableClose = true;
      dialogRef.afterClosed().subscribe((result: any) => {
        // console.log(result, 'result')
        if (result == "yes") {
          this.next_button_access = true;

          // if (this.lesson_content.is_done == null) {
          //   this.addMarkedData(this.lessonDataList[0]._id, this.paramsId, this.nextdata, this.lesson_content.lession_title, this.nextlessondata);
          // }
          this.getTrainingCenterlistFunctionwithLessonId(
            this.paramsId,
            this.userType,
            this.userId,
            this.paramslessonId
          );
          this.quizflag = false;
          if (this.quizflag == false) {
            this.next_button_access = true;
          } else {
            this.next_button_access = false;
          }
        }
      });
    }
  }
}

//purchase modal

@Component({
  selector: "PurchaseModal",
  templateUrl: "./PurchaseModal.html",
})
export class PurchaseModalComponent {
  public message: any;
  public session_id: any;
  // public lesson_session_id:any='';
  constructor(
    public dialogRef: MatDialogRef<PurchaseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public snakBar: MatSnackBar,
    public apiService: ApiService
  ) {}
  submitLession(val: any, flag: string, flaglesson: any) {
    // // console.log(val, flag, index);
    this.data.lesson_session_data = val;
    this.data.flag = flag;
    this.data.flaglesson = flaglesson;
    if (val != null && val !== "") {
      this.dialogRef.close(this.data);
      // this.snakBar.open('Submited Successfully ..!', 'OK', {
      //   duration: 3000
      // })
    } else {
      this.message = "Please Choose Lesson Session";
    }
  }

  closedModal() {
    this.data.flag = "no";
    this.dialogRef.close(this.data.flag);
    this.snakBar.open(" Your Lesson Purchase is Incomplete..!", "OK", {
      duration: 5000,
    });
  }
}

//review lesson plan reminder modal

@Component({
  selector: "ReviewLessonPlan",
  templateUrl: "./ReviewLessonPlan.html",
})
export class ReviewLessonPlanComponent {
  public message: any;
  public session_id: any;
  // public lesson_session_id:any='';
  constructor(
    public dialogRef: MatDialogRef<ReviewLessonPlanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData1,
    public snakBar: MatSnackBar,
    public apiService: ApiService,
    public router: Router
  ) {}
  submitLesson(val: any, flag: string) {
    this.data.flag = flag;
    // console.log(val, flag);
    this.dialogRef.close(this.data);
    // this.snakBar.open('Submited Successfully ..!', 'OK', {
    //   duration: 3000
    // })
  }

  closedModal() {
    this.data.flag = "no";
    this.dialogRef.close(this.data.flag);
    this.snakBar.open(" Your Lesson Plan Submit is Incomplete..!", "OK", {
      duration: 5000,
    });
  }
}

//schedule reminder modal

@Component({
  selector: "Schedule",
  templateUrl: "./Schedule.html",
})
export class ScheduleModalComponent {
  public message: any;
  public session_id: any;
  // public lesson_session_id:any='';
  constructor(
    public dialogRef: MatDialogRef<ScheduleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData2,
    public snakBar: MatSnackBar,
    public apiService: ApiService,
    public router: Router
  ) {}

  submitSchedule(val: any, flag: string) {
    this.data.flag = flag;
    // console.log(val, flag);
    this.dialogRef.close(this.data);
    // this.snakBar.open('Submited Successfully ..!', 'OK', {
    //   duration: 3000
    // })
  }

  closedModal() {
    this.data.flag = "no";
    this.dialogRef.close(this.data.flag);
    this.snakBar.open(" Your Schedule is Incomplete..!", "OK", {
      duration: 5000,
    });
  }
}

@Component({
  selector: "unlockLesson",
  templateUrl: "./unlockLesson.html",
})
export class UnlockLessonModalComponent {
  constructor(
    public dialogRef: MatDialogRef<UnlockLessonModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData3,
    public snakBar: MatSnackBar,
    public apiService: ApiService,
    public router: Router
  ) {}

  lockedLesson(val: any) {
    // console.log(val)
    this.dialogRef.close(val);
  }
}

// lesson video modal
@Component({
  selector: "LessonVideo",
  templateUrl: "./LessonVideo.html",
  styleUrls: ["./LessonVideo.css"],
})
export class LessonVideoModalComponent {
  playerVars = {
    cc_lang_pref: "en",
  };
  public video_time: any;

  public video_Count_time: any;

  constructor(
    public dialogRef: MatDialogRef<LessonVideoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData4,
    public snakBar: MatSnackBar,
    public apiService: ApiService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    // console.log(data, 'data_video')
  }

  closedModals() {
    // console.log()
    this.snakBar.open("Video Lesson Has Not Been Completed ...!", "OK", {
      duration: 4000,
    });
    this.dialogRef.close();
  }

  savePlayer(event) {
    // console.log(event, 'save', this.playerVars)
  }

  onStateChange(event) {
    // console.log(this.data.data.video_skippable, 'data_video')

    console.log(event, "state chn");
    console.log(
      event.target.playerInfo.duration,
      "///)",
      event.target.playerInfo.currentTime
    );

    if (
      event.target.playerInfo.duration <= event.target.playerInfo.currentTime
    ) {
      this.data.flag = "yes";
      this.dialogRef.close(this.data.flag);
      this.snakBar.open("Successfully Completed The Lesson Video..!", "OK", {
        duration: 5000,
      });
    }

    //duration calculation
    var sec_num = parseInt(event.target.playerInfo.duration, 10);
    var hours: any = Math.floor(sec_num / 3600);
    var minutes: any = Math.floor((sec_num - hours * 3600) / 60);
    var seconds: any = sec_num - hours * 3600 - minutes * 60;

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    // console.log(hours + ':' + minutes + ':' + seconds);
    this.video_time = hours + ":" + minutes + ":" + seconds;

    // this.startTimer(event.target.playerInfo.duration);

    // console.log(event.target.playerInfo, 'change 1', event.data)
    if (
      event.data == 0 &&
      event.target.playerInfo.duration >= event.target.playerInfo.currentTime
    ) {
      // console.log(event.data, 'data 0', event.target.playerInfo)

      var endpoint = this.data.endpoint;
      var video_data: any = {
        user_id: this.data.user_id,
        training_id: this.data.training_id,
        lesson_id: this.data.lesson_id,
        video_id: event.target.playerInfo.videoData.video_id,
        video_url: event.target.playerInfo.videoUrl,
        flag: 1,
      };
      // console.log(video_data, 'data===++')
      if (this.data.data.video_skippable != true) {
        this.apiService
          .postDatawithoutToken(endpoint, video_data)
          .subscribe((res) => {
            console.log(
              res,
              "frghjk++++++++++",
              event.target.playerInfo.videoData.video_id
            );
            let result: any = res;
            if (result.status == "success") {
              // getTrainingCenterlistFunctionwithLessonId(associated_training: any, type: any, user_id: any, _id: any)
              this.data.flag = "yes";
              this.dialogRef.close(this.data.flag);
              this.snakBar.open(
                "Successfully Completed The Lesson Video..!",
                "OK",
                {
                  duration: 5000,
                }
              );
            }
          });
      }
    }
  }
}

@Component({
  selector: "lessonquiz",
  templateUrl: "./lesson_quiz.html",
})
export class LessonQuizModalComponent {
  public quizData: any = "";
  public CheckedAnswer: any = [];
  public lessonData: any;
  public quizVal: any = "";
  public correctQuizVal: any = [];
  public resultVal: any;
  public resultStatus: any = "Failed";
  public indexVal: any = 1;

  constructor(
    public dialogRef: MatDialogRef<LessonQuizModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData5,
    public snakBar: MatSnackBar,
    public apiService: ApiService,
    public router: Router
  ) {
    // console.log(data, 'data')
    this.quizData = data.quiz_data[0];
    this.lessonData = data.lesson_data;
    this.indexVal = 1;
    // console.log(this.quizData, '++')
  }

  closedModal() {
    this.data.flag = "no";
    this.dialogRef.close(this.data.flag);

    if (this.data.quiz_data.length > 0) {
      this.snakBar.open(" Your Lesson Quiz is Incomplete..!", "OK", {
        duration: 5000,
      });
    }
  }

  //next quiz
  nextQuizRecord(val: any) {
    this.indexVal = this.indexVal + 1;
    // console.log(this.CheckedAnswer, 'CheckedAnswer', this.quizVal)
    if (this.quizVal != "") {
      this.CheckedAnswer.push(this.quizVal);
      this.quizVal = "";
    }

    let ind: any = 0;

    for (let i in this.data.quiz_data) {
      if (this.data.quiz_data[i]._id == val._id) {
        ind = parseInt(i) + 1;
        if (
          this.data.quiz_data[ind] != null &&
          typeof this.data.quiz_data[ind] != "undefined"
        ) {
          this.quizData = this.data.quiz_data[ind];
          // this.indexVal = ind;
        } else {
          this.quizData = "";

          // console.log(this.CheckedAnswer, '++== else ')
          if (this.CheckedAnswer.length > 0) {
            for (let i in this.CheckedAnswer) {
              if (this.CheckedAnswer[i].isCorrect == 1) {
                // console.log(this.CheckedAnswer[i], '????chk')
                this.correctQuizVal.push(this.CheckedAnswer[i]);
              }
            }
          }

          if (this.correctQuizVal.length > 0) {
            var result =
              (this.correctQuizVal.length / this.data.quiz_data.length) * 100;
            this.resultVal = parseFloat(result.toFixed(2));
            if (this.resultVal >= this.data.lesson_data.test_percentage) {
              this.resultStatus = "Success";
            } else {
              this.resultStatus = "Failed";
            }
          } else {
            this.resultVal = 0;
            this.resultStatus = "Failed";
          }
        }
      }
    }
  }

  saveQuizRecord(val) {
    // console.log(this.resultVal, 'resultVal')

    let user_result: any = {
      resultVal: this.resultVal,
      CheckedAnswer: this.CheckedAnswer,
      resultStatus: this.resultStatus,
      target_percentage: this.data.lesson_data.test_percentage,
      user_id: this.data.user_id,
      lesson_id: this.lessonData._id,
    };
    // console.log(user_result, 'user_result')
    this.apiService
      .postDatawithoutToken(this.data.server_url, user_result)
      .subscribe((res) => {
        let result: any = res;
        if (result.status == "success") {
          this.data.flag = "yes";
          this.dialogRef.close(this.data.flag);
          this.snakBar.open(
            "Successfully Completed Your Lesson Quiz..!",
            "OK",
            {
              duration: 5000,
            }
          );
        }
      });
  }

  startQuizAgain(val) {
    this.CheckedAnswer = [];
    this.correctQuizVal = [];
    this.resultVal = 0;
    this.resultStatus = "Failed";
    this.quizData = "";
    this.quizData = this.data.quiz_data[0];
    this.indexVal = 1;
  }
}
// preview content class
@Component({
  selector: "preview-content-dialog",
  templateUrl: "preview-content-dialog.html",
  styleUrls: ["preview-content-dialog.css"],
})
export class PreviewContentDialog {
  public previewImg: any = [];
  public image: any = "";
  public indeximg = 0;
  public page = 1;
  public bucket_url: any =
    "https://training-centre-bucket.s3.amazonaws.com/lesson-files/";
  public nextflg: any = "disabled";
  public prevflag: any = "disabled";
  public pos: any;
  public image1: any;

  constructor(
    public dialogRef: MatDialogRef<PreviewContentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData6,
    public snakBar: MatSnackBar,
    public apiService: ApiService,
    public router: Router
  ) {
    // console.log(data, 'data',)
    if (
      data.flag == "pdf" &&
      typeof data.data.images.converted_array != undefined
    ) {
      this.previewImg = data.data.images.converted_array;
      this.image =
        this.bucket_url + data.data.images.converted_array[this.indeximg].name; //set image for pdf
      this.pos = data.data.images.numberOfPages;
      // console.log(this.previewImg[this.indeximg])
    }
    if (data.flag == "img") {
      this.image1 = this.bucket_url + data.data.file.fileservername; //set img for imagefile
    }
    // // console.log(this.quizData, '++')
  }
  close(val) {
    //FOR MODAL CLOSE
    this.snakBar.open(
      " Your Lesson  is Complete After Download This File ..!",
      "OK",
      {
        duration: 5000,
      }
    );
  }
  //next previos btn
  nextprevbtn(flag) {
    // console.log(flag, 'nextbtn',)
    switch (flag) {
      case "prev": // for prevous case
        if (this.indeximg == 0 || this.indeximg < 0) {
          // console.log(flag, '++++++++++++ if')
        } else {
          // console.log(flag, '++++++++++++ else')
          this.indeximg = this.indeximg - 1;
          this.image = this.bucket_url + this.previewImg[this.indeximg].name;
          this.page = this.previewImg[this.indeximg].page;
          // console.log('index+++++++', this.indeximg, this.previewImg.length)
        }
        break;
      case "next": // for next case
        if (this.previewImg.length == this.indeximg + 1) {
          // console.log(flag, '++++++++++++ if')
        } else {
          // console.log(flag, '++++++++++++ else')
          this.indeximg = this.indeximg + 1;
          this.image = this.bucket_url + this.previewImg[this.indeximg].name;
          this.page = this.previewImg[this.indeximg].page;
          // console.log('index+++++++', this.indeximg + 1, this.previewImg.length)
        }
        break;
    }

    // // console.log(flag, '++++++++++++', index)
  }
}
