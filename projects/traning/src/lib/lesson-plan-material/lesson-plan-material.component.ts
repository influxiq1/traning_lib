import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar } from "@angular/material";
// import { type } from 'os';


@Component({
  selector: 'lib-lesson-plan-material',
  templateUrl: './lesson-plan-material.component.html',
  styleUrls: ['./lesson-plan-material.component.css']
})
export class LessonPlanMaterialComponent implements OnInit {
  public jsonObj1: any = {};
  public answerData: any
  public valFormData: any = [];
  public allData: any = [];
  public formdata: any = {};
  public serverdata: any;
  public associated_training_id: any;
  public lessonId: any;
  formfieldrefresh: boolean = true;
  updatetable: boolean = true;
  formfieldrefreshdata: any = null;
  public selectValue: any = [{}];
  public userId: any;
  public redirectPath: any;
  public progress_bar = 0;
  public formDataVal: any = {};
  public flag: boolean = false;
  public routerPath: any = '/lesson-plan-material/';
  public prevButton: boolean = false;
  public formVal: any = [];
  public selectVal: any = [];
  public pictureSelect: any = [];


  @Input()
  set lessonplandata(val: any) {
    this.formDataVal = {};
    this.jsonObj1 = {};
    this.valFormData = [];
    this.selectVal = [];
    this.pictureSelect = [];

    this.allData = val;
    this.flag = false;
    for (let a in this.allData) {
      if (this.allData[a]._id == this.activatedroute.snapshot.params._id) {
        this.progress_bar = 1;
        setTimeout(() => {
          this.formDataVal = this.allData[a];
          this.displayQuestionData(this.allData[a]);
        }, 100);
      }
    }
  }

  @Input()
  set serverDetails(val: {}) {
    this.serverdata = val;
  }
  @Input()
  set Redirectpath(val: any) {
    this.redirectPath = val;
  }


  constructor(public activatedroute: ActivatedRoute, public apiService: ApiService, public cookieService: CookieService, public router: Router, public snackBar: MatSnackBar) {
    this.userId = JSON.parse(this.cookieService.get('userid'));

    this.associated_training_id = this.activatedroute.snapshot.params.associated_training;
    this.lessonId = this.activatedroute.snapshot.params.lesson_id_object;
  }

  ngOnInit() {
    this.formDataVal = {};
    this.jsonObj1 = {};
    this.valFormData = [];
    this.selectVal = [];
    this.pictureSelect = [];

    // console.log('>> param id data', this.allData)

    if (this.activatedroute.snapshot.params._id == null) {
      this.displayQuestionData(this.allData[0]);
      this.formDataVal = this.allData[0];
      this.prevButton = false;
      // console.log('>> param null', this.formDataVal)
    }
    if (this.activatedroute.snapshot.params._id != null) {
      // console.log('>> param id data', this.activatedroute.snapshot.params._id)

      for (let a in this.allData) {
        if (this.allData[a]._id == this.activatedroute.snapshot.params._id) {
          this.formDataVal = this.allData[a];
          this.progress_bar = 0;
          // setTimeout(() => {
          // this.flag = false;/

          this.displayQuestionData(this.allData[a]);
          // }, 200);
          // console.log(this.formDataVal, '>>>>>>>>>??', this.activatedroute.snapshot.params._id)
        }
      }
    }

    // console.log('>> param id data',this.activatedroute.snapshot.params._id)
  }


  listenFormFieldChange(val: any) {
    this.jsonObj1 = {};
    this.valFormData = [];
    // console.log(val)/

    if (val.field == 'fromsubmit') {
      this.jsonObj1 = {};
      this.valFormData = [];
      this.progress_bar = 1;
      var question_id:any;

      if(this.activatedroute.snapshot.params._id != null){
        question_id = this.activatedroute.snapshot.params._id;
      } else{
        question_id = this.allData[0]._id;
      }


      this.jsonObj1 = {
        quiz_id:question_id,
        heading: 'Title : ' + this.formDataVal.title + '<br>' +
          'Description : ' + this.formDataVal.description + '<br>' +
          'Question : ' + this.formDataVal.question + '<br>',
        // label: this.formDataVal.description,
        // name: this.formDataVal.question,
        disabled: true,
      };

      if (this.formDataVal.question_type == 'multiple_selection') {
        this.selectVal = [];

        for (let a in this.formDataVal.answerdata) {
          this.selectVal.push(
            { val: parseInt(a), name: this.formDataVal.answerdata[a].answer }
          );
        }
        this.jsonObj1.type = 'select';
        this.jsonObj1.value = val.fromval.item.itemVal;
        this.jsonObj1.val = this.selectVal;
        this.jsonObj1.name = 'itemVal';
        this.jsonObj1.multiple = true;
        this.valFormData.push(this.jsonObj1);
      };

      if (this.formDataVal.question_type == 'text_area') {
        this.jsonObj1.type = 'textarea';
        this.jsonObj1.name = 'desc1';
        this.jsonObj1.value = val.fromval.item.itemVal;
        this.valFormData.push(this.jsonObj1);
      };


      if (this.formDataVal.question_type == 'pick_picture') {
        this.pictureSelect = [];

        for (const b in this.formDataVal.question_img) {

          if(parseInt(val.fromval.item.image) ==  parseInt(b)){
            this.pictureSelect.push({
              key: parseInt(b),
              image: this.formDataVal.question_img[b].basepath + this.formDataVal.question_img[b].image,
            });
          }
        }
        this.jsonObj1.name = 'img';
        this.jsonObj1.type = 'image';
        this.jsonObj1.val = this.pictureSelect;
        this.jsonObj1.value = parseInt(val.fromval.item.image);
        this.valFormData.push(this.jsonObj1);
      };


      if (this.formDataVal.question_type == 'yes_no') {
        this.jsonObj1.type = 'radio';
        let radioval: any = [{ key: 0, val: 'Yes' }, { key: 1, val: 'No' }]
        this.jsonObj1.name = 'yes/no';
        this.jsonObj1.value = parseInt(val.fromval.item.itemVal);
        this.jsonObj1.val = radioval;
        this.valFormData.push(this.jsonObj1);
      };




      let endpoint = this.serverdata.serverUrl + 'addlessonplandata'
      let data: any = {
        'lesson_id': this.lessonId,
        'associated_training_id': this.associated_training_id,
        'user_id': this.userId,
        'training_from_data': this.valFormData
      }

      let dataval: any = { data };

      this.apiService.getData(endpoint, dataval).subscribe(res => {
        let result: any;
        result = res;
        let ind: any = 0;

        if (result.status == 'success') {

          if (this.activatedroute.snapshot.params._id != null && typeof (this.activatedroute.snapshot.params._id) != "undefined"
            && this.allData.length >= 2) {
            for (let a in this.allData) {
              if (this.allData[a]._id == this.activatedroute.snapshot.params._id) {
                this.flag = false;
                ind = (parseInt(a) + 1);
                if (typeof (this.allData[ind]) != "undefined" && this.allData[ind] != null) {
                  this.router.navigateByUrl(this.routerPath + this.activatedroute.snapshot.params.associated_training + '/' + this.activatedroute.snapshot.params.lesson_id_object + '/' + this.allData[ind]._id);

                } else {
                  this.router.navigateByUrl(this.redirectPath + '/' + this.associated_training_id + '/' + this.activatedroute.snapshot.params.lesson_id_object);
                }
              }
            }
          }
          if ((this.activatedroute.snapshot.params._id == null || typeof (this.activatedroute.snapshot.params._id) == "undefined") && (this.allData.length >= 2)) {
            this.router.navigateByUrl(this.routerPath + this.activatedroute.snapshot.params.associated_training + '/' + this.activatedroute.snapshot.params.lesson_id_object + '/' + this.allData[1]._id);
          }

          if ((this.activatedroute.snapshot.params._id == null && this.allData.length < 2)) {
            this.router.navigateByUrl(this.redirectPath + '/' + this.associated_training_id);
          }
        }
      })

    }

  }

  // nextButton(flag: any) {
  //   console.log(flag)
  //   this.progress_bar = 1;

  //   switch (flag) {
  //     case 'next':
  //       let ind: any = 0;
  //       for (let a in this.allData) {
  //         if (this.allData[a]._id == this.activatedroute.snapshot.params._id) {
  //           ind = (parseInt(a) + 1);
  //         }
  //       }

  //       if (this.allData[ind] != null) {
  //         this.prevButton = true;

  //         console.log(ind)

  //         this.router.navigateByUrl(this.routerPath + this.activatedroute.snapshot.params.associated_training + '/' + this.activatedroute.snapshot.params.lesson_id_object + '/' + this.allData[ind]._id);

  //         // this.displayQuestionData(this.allData[ind]);e


  //       } else {
  //         this.prevButton = true;
  //         // this.formDataVal = this.allData[0];
  //         // this.displayQuestionData(this.allData[0]);

  //         this.router.navigateByUrl(this.routerPath + this.activatedroute.snapshot.params.associated_training + '/' + this.activatedroute.snapshot.params.lesson_id_object + '/' + this.allData[0]._id)
  //       }
  //       setTimeout(() => {
  //         this.progress_bar = 0;
  //       }, 1000);
  //       break;
  //     case 'prev':
  //       let ind1: number = 0;

  //       for (let b in this.allData) {
  //         if (this.allData[b]._id == this.activatedroute.snapshot.params._id) {
  //           ind1 = (parseInt(b) - 1);
  //           // this.formDataVal = this.allData[b];
  //           console.log(this.allData[ind1])
  //         }
  //       }

  //       if (this.allData[ind1] > 0) {
  //         // this.displayQuestionData(this.allData[ind1]);
  //         this.prevButton = true;
  //         this.router.navigateByUrl(this.routerPath + this.activatedroute.snapshot.params.associated_training + '/' + this.activatedroute.snapshot.params.lesson_id_object + '/' + this.allData[ind1]._id)
  //       } else {
  //         this.prevButton = false;

  //         // this.formDataVal = this.allData[0];
  //         // this.displayQuestionData(this.allData[0]);

  //         this.router.navigateByUrl(this.routerPath + this.activatedroute.snapshot.params.associated_training + '/' + this.activatedroute.snapshot.params.lesson_id_object + '/' + this.allData[0]._id)
  //       }
  //       setTimeout(() => {
  //         this.progress_bar = 0;
  //       }, 1000);
  //       break;
  //   }
  // }


  skipButton() {
    // console.log('>>1')
    let ind: any = 0;
    for (let a in this.allData) {
      if (this.allData[a]._id == this.activatedroute.snapshot.params._id) {

        ind = (parseInt(a) + 1);
        // this.formDataVal = this.allData[a];
        // this.displayQuestionData(this.allData[ind]);
        if (this.allData[a].skippable == 1) {

          if (this.allData[ind] != null) {
            this.prevButton = true;

            this.router.navigateByUrl(this.routerPath + this.activatedroute.snapshot.params.associated_training + '/' + this.activatedroute.snapshot.params.lesson_id_object + '/' + this.allData[ind]._id);

            // this.displayQuestionData(this.allData[ind]);


          } else {
            // this.displayQuestionData(this.allData[0]);

            this.router.navigateByUrl(this.routerPath + this.activatedroute.snapshot.params.associated_training + '/' + this.activatedroute.snapshot.params.lesson_id_object + '/' + this.allData[0]._id)
          }
        } else {
          this.snackBar.open('Can Not Skip This Question..!', 'Ok', {
            duration: 1000
          });
        }
        // console.log(this.allData[a])
      }

      if (this.activatedroute.snapshot.params._id == null) {
        // console.log('>>3')
        if (this.allData[0].skippable == 0) {
          this.snackBar.open('Can Not Skip This Question..!', 'Ok', {
            duration: 1000
          });
        }
      }

    }
  }


  displayQuestionData(value: any) {
    this.progress_bar = 1;

    this.flag = true;

    this.formDataVal = {};

    let checkSelected: any = []


    this.formDataVal = value;

    this.formdata = {
      successmessage: "Submitted Successfully !!",
      // redirectpath: this.redirectPath+'/'+this.associated_training_id,
      // redirectpath: '',
      submittext: "Next",
      // canceltext:"Cancel Now",
      // resettext: "Reset",
      submitactive: true, //optional, default true
      apiUrl: this.serverdata.serverUrl,
      // endpoint: 'addlessonplandata',  //change endpoint
      endpoint: 'lesson-submit',  //change endpoint
      jwttoken: '',

    };

    let answer: any = [];
    let tempfrondata: any = [];
    let answerForSelect: any = [];
    answer = [];
    answerForSelect = [];

    if (value.answerdata != null && value.answerdata != '' && value.question_type == 'multiple_selection') {
      for (const key in value.answerdata) {
        answer.push({ key: value.answerdata[key].answer, val: value.answerdata[key].answer });
        answerForSelect.push({
          val: parseInt(key),
          name: value.answerdata[key].answer
        });
      }
    }

    let pictureSelect: any = [];
    let picture: any = [];

    if (value.question_img != null && value.question_img != '' && value.question_type == 'pick_picture') {
      for (const key in value.question_img) {
        // picture.push({ key: value.question_img[key].basepath + value.question_img[key].image, val: value.question_img[key].basepath + value.question_img[key].image });

        pictureSelect.push({
          key: key,
          image: value.question_img[key].basepath + value.question_img[key].image,
        });
      }
    }



    if (value.question_type == 'yes_no') {
      checkSelected.push({ key: 0, val: 'Yes' }, { key: 1, val: 'No' });
    }

    let jsonObj: any = {
      type: value.question_type
    };


    switch (value.question_type) {
      case 'text_area':
        // jsonObj.label='Enter Your Answer';
        jsonObj.type = 'textarea';
        jsonObj.name = 'itemVal';
        jsonObj.validations = [
          { rule: 'required', message: 'Please Enter Your Answer' }
        ]
        this.progress_bar = 0;

        break;
      case 'pick_picture':
        // jsonObj.label='Choose Your Answer'
        jsonObj.type = 'image';
        jsonObj.val = pictureSelect;
        jsonObj.name = 'image';
        jsonObj.validations = [
          { rule: 'required', message: 'Please Select One Picture' }
        ]
        this.progress_bar = 0;

        break;
      case 'yes_no':
        // jsonObj.label='Choose Your Answer';
        jsonObj.type = 'radio';
        jsonObj.val = checkSelected;
        jsonObj.name = 'itemVal';
        jsonObj.validations = [
          { rule: 'required', message: 'Please Choose One Option' }
        ]
        this.progress_bar = 0;
        break;
      case 'multiple_selection':
        // console.log('M')
        // jsonObj.label='Your Answer';
        jsonObj.type = 'select';
        jsonObj.val = answerForSelect;
        jsonObj.multiple = true;
        jsonObj.name = 'itemVal';
        jsonObj.validations = [
          { rule: 'required', message: 'Please Select One Option' }
        ]
        this.progress_bar = 0;
        break;

      default:
        break;
    }
    // console.log('jsonObj', jsonObj)


    tempfrondata.push(jsonObj);

    if (tempfrondata.length > 0) {
      this.formdata.fields = tempfrondata;
    }

  }

}


