import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'lib-lesson-plan-material',
  templateUrl: './lesson-plan-material.component.html',
  styleUrls: ['./lesson-plan-material.component.css']
})
export class LessonPlanMaterialComponent implements OnInit {
  public jsonObj1: any;
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
  public formDataVal: any;
  public routerPath: any = '/lesson-plan-material/';
  public prevButton: boolean = false;
  @Input()
  set lessonplandata(val: any) {
    this.allData = val;
  }
  @Input()
  set serverDetails(val: {}) {
    this.serverdata = val;
  }
  @Input()
  set Redirectpath(val: any) {
    this.redirectPath = val;
  }


  constructor(public activatedroute: ActivatedRoute, public apiService: ApiService, public cookieService: CookieService, public router: Router) {
    this.userId = JSON.parse(this.cookieService.get('userid'));

    this.associated_training_id = this.activatedroute.snapshot.params.associated_training;
    this.lessonId = this.activatedroute.snapshot.params.lesson_id_object;
  }

  ngOnInit() {

    if (this.activatedroute.snapshot.params._id == null) {
      this.displayQuestionData(this.allData[0]);
      this.formDataVal = this.allData[0];
      this.prevButton = false;
      console.log('>> param null', this.formDataVal)
    } else {
      for (let a in this.allData) {
        if (this.allData[a]._id == this.activatedroute.snapshot.params._id) {
          this.formDataVal = this.allData[a];
          this.progress_bar = 0;
          this.displayQuestionData(this.allData[a]);
          console.log(this.formDataVal, '??', this.activatedroute.snapshot.params._id)
        }
      }
    }

    console.log('>> param id data', this.formDataVal)




    // let answer: any = [];
    // let tempfrondata: any = [];
    // let answerForSelect: any = [];
    // for (let loop = 0; loop < this.allData.length; loop++) {
    //   answer = [];
    //   answerForSelect = [];

    //   let jsonObj: any = {
    //     heading: this.allData[loop].description,
    //     label: this.allData[loop].question,
    //     name: this.allData[loop].question,
    //     type: this.allData[loop].question_type
    //   };

    //   //------------------------ new code ------------------------------------//

    //   let traininghiddenfield: any = {
    //     label: "associated_training",
    //     name: "associated_training",
    //     type: 'hidden',
    //     value: this.associated_training_id
    //   };
    //   let lessonhiddenfields: any = {
    //     label: "lesson_id",
    //     name: "lesson_id",
    //     type: 'hidden',
    //     value: this.lessonId
    //   }
    //   let userhiddenfields: any = {
    //     label: "user_id",
    //     name: "user_id",
    //     type: 'hidden',
    //     value: this.userId
    //   }
    //   let descriptionhiddenfields: any = {
    //     label: "description",
    //     name: "description",
    //     type: 'hidden',
    //     value: this.allData[loop].description
    //   }

    // }


    // if (tempfrondata.length > 0) {
    //   this.formdata.fields = tempfrondata;
    // }
  }


  listenFormFieldChange(val: any) {

    // console.log(val);
    // if (val.field == 'fromsubmit') {
    //   // console.log('val', 1);

    //   // if(val.fromval.message!=null && val.fromval.message!=''){
    //   // this.jsonObj1.value=val.fromval;
    //   // this.valFormData.push(this.jsonObj1);
    //   // console.log('vf', 'val', val, 'formval', val.fromval.item.data, 'valFormData', this.valFormData);
    //   // console.log('valFormData', this.valFormData);
    //   // console.log('val.fromval.item.data', val.fromval.item);
    //   // this.answerData=val.fromval;
    //   for (let n in this.valFormData) {
    //     // console.log('n', n);
    //     for (let m in val.fromval.item) {
    //       // console.log(m, 'm');
    //       if (this.valFormData[n].name == m) {
    //         console.log(this.valFormData[n].name, 'm');

    //         this.valFormData[n].value = val.fromval.item[m];
    //       }
    //     }
    //   }
    //   // console.log('valFormData >>>>', this.valFormData);
    //   let endpoint = this.serverdata.serverUrl + 'addlessonplandata'
    //   let data: any = {
    //     'lesson_id': this.lessonId,
    //     'associated_training_id': this.associated_training_id,
    //     'user_id': this.userId,
    //     'training_from_data': this.valFormData
    //   }

    //   let dataval: any = { data };

    //   // console.log(data, '>>>>');
    //   this.apiService.getData(endpoint, dataval).subscribe(res => {
    //     let result: any;
    //     result = res;
    //     if (result.status == 'success') {
    //       this.router.navigateByUrl(this.redirectPath + '/' + this.associated_training_id);
    //     }
    //     // console.log('+++++>>>>', res)
    //   })

    // }

  }

  nextButton(flag: any) {
    console.log(flag)
    this.progress_bar = 1;

    switch (flag) {
      case 'next':
        let ind: any = 0;
        for (let a in this.allData) {
          if (this.allData[a]._id == this.activatedroute.snapshot.params._id) {
            ind = (parseInt(a) + 1);
            // this.formDataVal = this.allData[a];
            // this.displayQuestionData(this.allData[ind]);
            // console.log(ind)
          }
        }

        if (this.allData[ind] != null) {
          this.prevButton = true;

          console.log(ind)

          this.router.navigateByUrl(this.routerPath + this.activatedroute.snapshot.params.associated_training + '/' + this.activatedroute.snapshot.params.lesson_id_object + '/' + this.allData[ind]._id);

          this.displayQuestionData(this.allData[ind]);


        } else {
          this.prevButton = true;
          // this.formDataVal = this.allData[0];
          this.displayQuestionData(this.allData[0]);

          this.router.navigateByUrl(this.routerPath + this.activatedroute.snapshot.params.associated_training + '/' + this.activatedroute.snapshot.params.lesson_id_object + '/' + this.allData[0]._id)
        }
        setTimeout(() => {
          this.progress_bar = 0;
        }, 1000);
        break;
      case 'prev':
        let ind1: number = 0;

        for (let b in this.allData) {
          if (this.allData[b]._id == this.activatedroute.snapshot.params._id) {
            ind1 = (parseInt(b) - 1);
            // this.formDataVal = this.allData[b];
            console.log(this.allData[ind1])
          }
        }

        if (this.allData[ind1] > 0) {
          this.displayQuestionData(this.allData[ind1]);
          this.prevButton = true;
          this.router.navigateByUrl(this.routerPath + this.activatedroute.snapshot.params.associated_training + '/' + this.activatedroute.snapshot.params.lesson_id_object + '/' + this.allData[ind1]._id)
        } else {
          this.prevButton = false;

          // this.formDataVal = this.allData[0];
          this.displayQuestionData(this.allData[0]);

          this.router.navigateByUrl(this.routerPath + this.activatedroute.snapshot.params.associated_training + '/' + this.activatedroute.snapshot.params.lesson_id_object + '/' + this.allData[0]._id)
        }
        setTimeout(() => {
          this.progress_bar = 0;
        }, 1000);
        break;
    }
  }


  skipButton(){
    let ind: any = 0;
    for (let a in this.allData) {
      if (this.allData[a]._id == this.activatedroute.snapshot.params._id) {
        ind = (parseInt(a) + 1);
        // this.formDataVal = this.allData[a];
        // this.displayQuestionData(this.allData[ind]);
        console.log(this.allData[a])
      }
    }
  }


  displayQuestionData(value: any) {

    console.log(value)

    this.formDataVal = value;

    this.formdata = {
      successmessage: "Added Successfully !!",
      // redirectpath: this.redirectPath+'/'+this.associated_training_id,
      // redirectpath: '',
      // submittext: "Submit",
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
          val: value.answerdata[key].answer,
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
          heading: '<div><img src="value.question_img[key].basepath + value.question_img[key].image"></div>',
          val: value.question_img[key].basepath + value.question_img[key].image,

        });

      }
    }


    let checkSelected: any = []

    if (value.question_type == 'yes_no') {
      checkSelected.push({
        key: 'Yes',
        val: 'Yes'
      },
        {
          key: 'No',
          val: 'No'
        });
    }

    let jsonObj: any = {
      type: value.question_type
    };


    switch (value.question_type) {
      case 'text_area':
        jsonObj.type = 'textarea';
        break;
      case 'pick_picture':
        jsonObj.type = 'radio';
        jsonObj.val = pictureSelect;
        break;
      case 'yes_no':
        jsonObj.type = 'radio';
        jsonObj.val = checkSelected;

        break;
      case 'multiple_selection':
        // console.log('M')
        jsonObj.type = 'select';
        jsonObj.val = answerForSelect;
        jsonObj.multiple = true;
        jsonObj.validations= [
          { rule: 'required' }
      ]
        break;

      default:
        break;
    }
    console.log('jsonObj', jsonObj)


    tempfrondata.push(jsonObj);

    if (tempfrondata.length > 0) {
      this.formdata.fields = tempfrondata;
    }

  }



}


