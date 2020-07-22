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

    console.log(this.allData,'??')

    this.formdata = {
      successmessage: "Added Successfully !!",
      // redirectpath: this.redirectPath+'/'+this.associated_training_id,
      // redirectpath: '',
      submittext: "Submit",
      // canceltext:"Cancel Now",
      resettext: "Reset",
      submitactive: true, //optional, default true
      apiUrl: this.serverdata.serverUrl,
      // endpoint: 'addlessonplandata',  //change endpoint
      endpoint: 'lesson-submit',  //change endpoint
      jwttoken: '',

    };
    let answer: any = [];
    let tempfrondata: any = [];
    let answerForSelect: any = [];
    for (let loop = 0; loop < this.allData.length; loop++) {
      answer = [];
      answerForSelect = [];


      if (this.allData[loop].answerdata != null && this.allData[loop].answerdata.length > 1) {
        for (const key in this.allData[loop].answerdata) {
          answer.push({ key: this.allData[loop].answerdata[key].answer, val: this.allData[loop].answerdata[key].answer });
          answerForSelect.push({
            val: this.allData[loop].answerdata[key].answer,
            name: this.allData[loop].answerdata[key].answer
          });
        }
      }
      let jsonObj: any = {
        heading: this.allData[loop].description,
        label: this.allData[loop].question,
        name: this.allData[loop].question,
        type: this.allData[loop].question_type
      };
      this.jsonObj1 = {
        heading: this.allData[loop].description,
        label: this.allData[loop].question,
        name: this.allData[loop].question,
        type: this.allData[loop].question_type,
        disabled: true
      };

      // console.log('this.allData[loop]', '>>>>++++', jsonObj)
      //------------------------ old code ------------------------------------//
      // switch (this.allData[loop].question_type) {
      //   case 'checkbox':
      //     jsonObj.type = 'checkbox';
      //     if (this.allData[loop].answerdata != null && this.allData[loop].answerdata.length > 0) {
      //       jsonObj.multiple = true;
      //       jsonObj.val = answer;
      //       jsonObj.value = [];
      //     }
      //     break;
      //   case 'dropdown':
      //     jsonObj.type = 'select';
      //     jsonObj.val = this.selectValue;
      //     jsonObj.val = answerForSelect
      //     break;
      //   case 'radio_button':
      //     jsonObj.type = 'radio';
      //     jsonObj.val = answer;

      //     break;
      //   case 'text_box':
      //     jsonObj.type = 'text';
      //     break;

      //   default:
      //     break;
      // }


    //------------------------ new code ------------------------------------//

      switch (this.allData[loop].question_type) {
        case 'text_area':
          jsonObj.type = 'checkbox';
          if (this.allData[loop].answerdata != null && this.allData[loop].answerdata.length > 0) {
            jsonObj.multiple = true;
            jsonObj.val = answer;
            jsonObj.value = [];
          }
          break;
        case 'pick_picture':
          jsonObj.type = 'select';
          jsonObj.val = this.selectValue;
          jsonObj.val = answerForSelect
          break;
        case 'yes_no':
          jsonObj.type = 'radio';
          jsonObj.val = answer;

          break;
        case 'multiple_selection':
          jsonObj.type = 'text';
          break;

        default:
          break;
      }

      let traininghiddenfield: any = {
        label: "associated_training",
        name: "associated_training",
        type: 'hidden',
        value: this.associated_training_id
      };
      let lessonhiddenfields: any = {
        label: "lesson_id",
        name: "lesson_id",
        type: 'hidden',
        value: this.lessonId
      }
      let userhiddenfields: any = {
        label: "user_id",
        name: "user_id",
        type: 'hidden',
        value: this.userId
      }
      let descriptionhiddenfields: any = {
        label: "description",
        name: "description",
        type: 'hidden',
        value: this.allData[loop].description
      }

      // console.log(descriptionhiddenfields, '----->>>') 

      tempfrondata.push(jsonObj);
      tempfrondata.push(traininghiddenfield);
      tempfrondata.push(lessonhiddenfields);
      tempfrondata.push(userhiddenfields);
      tempfrondata.push(descriptionhiddenfields);
      if (jsonObj.val != null) this.jsonObj1.val = jsonObj.val;
      if (jsonObj.multiple != null) this.jsonObj1.multiple = jsonObj.multiple;
      if (jsonObj.type != null) this.jsonObj1.type = jsonObj.type;

      this.valFormData.push(this.jsonObj1);
      // this.valFormData.push(traininghiddenfield);
      // this.valFormData.push(lessonhiddenfields);
      // this.valFormData.push(userhiddenfields);
      // this.valFormData.push(descriptionhiddenfields);

    }


    if (tempfrondata.length > 0) {
      this.formdata.fields = tempfrondata;
    }
    // console.log("tempfrondata", this.valFormData)
  }


  listenFormFieldChange(val: any) {

    // console.log(val);
    if (val.field == 'fromsubmit') {
      // console.log('val', 1);

      // if(val.fromval.message!=null && val.fromval.message!=''){
      // this.jsonObj1.value=val.fromval;
      // this.valFormData.push(this.jsonObj1);
      // console.log('vf', 'val', val, 'formval', val.fromval.item.data, 'valFormData', this.valFormData);
      // console.log('valFormData', this.valFormData);
      // console.log('val.fromval.item.data', val.fromval.item);
      // this.answerData=val.fromval;
      for (let n in this.valFormData) {
        // console.log('n', n);
        for (let m in val.fromval.item) {
          // console.log(m, 'm');
          if (this.valFormData[n].name == m) {
            console.log(this.valFormData[n].name, 'm');

            this.valFormData[n].value = val.fromval.item[m];
          }
        }
      }
      // console.log('valFormData >>>>', this.valFormData);
      let endpoint = this.serverdata.serverUrl + 'addlessonplandata'
      let data: any = {
        'lesson_id': this.lessonId,
        'associated_training_id': this.associated_training_id,
        'user_id': this.userId,
        'training_from_data': this.valFormData
      }

      let dataval: any = { data };

      // console.log(data, '>>>>');
      this.apiService.getData(endpoint, dataval).subscribe(res => {
        let result: any;
        result = res;
        if (result.status == 'success') {
          this.router.navigateByUrl(this.redirectPath + '/' + this.associated_training_id);
        }
        // console.log('+++++>>>>', res)
      })

    }

  }

}


