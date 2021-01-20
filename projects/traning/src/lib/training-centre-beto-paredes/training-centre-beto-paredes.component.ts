import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../api.service';

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
  public lessionParamId: any;
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
    console.log(this.trainingcatParamid, 'trainingcatParamid')
  }
  @Input()
  set LessionParamId(_id: any) {
    this.lessionParamId = (_id) || '<no name set>';
    console.log(this.lessionParamId, 'lessionParamId')
  }
  @Input()
  set TrainingCentreData(val) {

    this.paramsTrainingId = this.activatedRoute.snapshot.params.associated_training;
    this.paramslessonId = this.activatedRoute.snapshot.params._id;

    this.trainingCentreData = val;
    console.log(this.trainingCentreData, 'librery')
    this.trainingCategoryData = this.trainingCentreData.trainingcenterlist;
    this.trainingLessonData = this.trainingCentreData.alllessondata;


    for (let i in this.trainingCategoryData) {
      if (this.paramsTrainingId == this.trainingCategoryData[i]._id) {
        console.log(this.trainingCategoryData[i]._id,'this.trainingCentreData[i]._id')
        this.training_cat_name = this.trainingCategoryData[i].catagory_name;
      }
    }

  }

  constructor(public router: Router, public snakBar: MatSnackBar, public activatedRoute: ActivatedRoute,public apiService: ApiService,public cookieService: CookieService,) {
    this.userId = JSON.parse(this.cookieService.get('userid'));
   }

  ngOnInit() {
  }
  activatedclass(val) {
  }


  clicktrcataining(id: any, catagory_name: any) {
    console.log(id, '+++', this.trainingCenterRoute)
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
    console.log(val, 'nochiuld')
    this.router.navigateByUrl(this.trainingCenterRoute + this.paramsTrainingId + '/' + val._id);
   
  }


  nextbutton(value: any) {
    // console.log(value, 'value')

    switch (value) {
      case 'next':
        // this.lessonDataList[this.Index].lession_title


        // console.log(this.lesson_content, 'this.lesson_content', this.lessonDataList[0])
        if (this.lesson_content.is_done == null && this.lesson_content.has_lessonplan == 0) {
          // console.log(this.lesson_content.has_lessonplan, 'has_lessonplan')
          this.addMarkedData(this.lessonDataList[0]._id, this.paramsId, this.nextdata, this.lesson_content.lession_title, this.nextlessondata);
        }
        this.addMarkedData(this.lessonDataList[0]._id, this.paramsId, this.nextdata, this.lesson_content.lession_title, this.nextlessondata);

        let ind: any = 0;
        setTimeout(() => {
          for (let b in this.lessonDataList) {
            if (this.lessonDataList[b]._id == this.lesson_content._id)
              ind = (parseInt(b) + 1);
          }
          // console.log('ind', ind);
          if (this.lessonDataList[ind] != null) {

            setTimeout(() => {
              this.nochildclick(this.lessonDataList[ind], 'next');

            }, 500)

            this.progressLoader = true;
          } else {

            for (var n = 0; n < this.trainingCategoryList.length; n++) {
              // console.log('++>>>>', this.trainingCategoryList[n], this.trainingCategoryList[n + 1], this.trainingCategoryList[0]._id)
              if (this.paramsTrainingId == this.trainingCategoryList[n]._id && this.trainingCategoryList[n + 1] != null) {
                // console.log('-->>>>', this.trainingCategoryList[n + 1])

                this.router.navigateByUrl(this.trainingCenterRoute + this.trainingCategoryList[n + 1]._id);
              }
              else {
                // console.log('++>>>>', this.trainingCategoryList[n]._id, this.trainingCategoryList[n + 1]._id,)
                // '>>>',this.trainingCategoryList[0]._id)
                this.progressLoader = false;
                this.router.navigateByUrl(this.trainingCenterRoute + this.trainingCategoryList[0]._id);

              }
            }

          }
        }, 500);
        // console.log("souresh test", this.nextdata);
        // }
        break;
      case 'prev':
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

          this.nochildclick(this.lessonDataList[ind1], 'prev');

          this.progressLoader = true;
        }, 500);

        break;
    }
  }


  addMarkedData(lessonId: any, associated_training: any, i: any, lession_title: any, nextlessondata: any) {
    const link = this.serverDetailsVal.serverUrl + this.formSourceVal.addMarkendpoint;
    // if(this.trainingCategoryName==null || this.trainingCategoryName==''){}
    let data: any = {
      "data": {
        "user_id": this.userId,
        "lesson_id": this.paramslessonId,
        "associated_training": this.paramsTrainingId,
        "lastlessonname": lession_title,
        "lasttrainingname": this.trainingCategoryName,
        'nextlessondata': nextlessondata
      },
      "sourceobj": ["user_id", "lesson_id", "associated_training"],
      "token": this.serverDetailsVal.jwttoken
    }

    // console.log('post data', data);

    this.apiService.postData(link, data).subscribe((response: any) => {
      // console.log(response, 'respoese453')
      if (response.status = "success") {
        const link = this.serverDetailsVal.serverUrl + this.formSourceVal.getUpdatedTrainingPercentageByUserEndpoint;
        let data: any = {
          "user_id": this.userId
        }

      }
    })

  }
}
