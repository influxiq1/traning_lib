import { Component, OnInit ,Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'lib-lesson-plan-material',
  templateUrl: './lesson-plan-material.component.html',
  styleUrls: ['./lesson-plan-material.component.css']
})
export class LessonPlanMaterialComponent implements OnInit {
public  allData:any=[];
public formdata:any = {};
public serverdata:any;
public associated_training_id:any;
public lessonId:any;
formfieldrefresh: boolean = true;
  updatetable: boolean = true;
  formfieldrefreshdata: any = null;
public selectValue:any=[{}];
public userId:any;
public redirectPath:any;
@Input()
set lessonplandata(val:any){
this.allData= val;
}
@Input()
set serverDetails(val: {}){
this.serverdata = val;
}
@Input()
set Redirectpath(val: any){
this.redirectPath = val;
}
  constructor(public activatedroute:ActivatedRoute,public apiService:ApiService,public cookieService:CookieService) { 
    this.userId = JSON.parse(this.cookieService.get('userid'));

    this.associated_training_id = this.activatedroute.snapshot.params.associated_training;
    this.lessonId = this.activatedroute.snapshot.params.lesson_id_object;

  }

  ngOnInit() {
    this.formdata = {
      successmessage: "Added Successfully !!",
      redirectpath: this.redirectPath+'/'+this.associated_training_id,
      submittext:"Submit",
      // canceltext:"Cancel Now",
      resettext:"Reset This",
      submitactive:true, //optional, default true
      apiUrl: this.serverdata.serverUrl,
      endpoint: 'addlessonplandata',  //change endpoint
      jwttoken: '',
    
    };

let answer:any = [];
let tempfrondata:any = [] ;
let answerForSelect:any = [];
    for(let loop = 0; loop < this.allData.length; loop++) {
      answer = [];
      answerForSelect = [];
 
        if (this.allData[loop].answerdata != null && this.allData[loop].answerdata.length > 1) {
        for (const key in this.allData[loop].answerdata) {
         answer.push({key:this.allData[loop].answerdata[key].answer, val:this.allData[loop].answerdata[key].answer});
         answerForSelect.push({val:this.allData[loop].answerdata[key].answer, name:this.allData[loop].answerdata[key].answer});
        }
      }
      let jsonObj: any = {
        // heading: '',
        label: this.allData[loop].question,
        name: this.allData[loop].question,
       
      };
   
      switch (this.allData[loop].question_type) {
        case 'checkbox':
          jsonObj.type = 'checkbox';
          if (this.allData[loop].answerdata != null && this.allData[loop].answerdata.length > 0) {
            jsonObj.multiple = true;
            jsonObj.val = answer;
            jsonObj.value = [];
          }
          break;
        case 'dropdown':
          jsonObj.type = 'select';
          // jsonObj.val = this.selectValue;
          jsonObj.val = answerForSelect
          break;
        case 'radio_button':
          jsonObj.type = 'radio';
          jsonObj.val = answer;
          break;
        case 'text_box':
          jsonObj.type = 'text';
          break;

        default:
          break;
      }
       let traininghiddenfield:any={
        label:"associated_training",
        name:"associated_training",
        type:'hidden',
        value:this.associated_training_id
      } ;
      let lessonhiddenfields:any={
        label:"lesson_id",
        name:"lesson_id",
        type:'hidden',
        value:this.lessonId
      } 
      let userhiddenfields:any={
        label:"user_id",
        name:"user_id",
        type:'hidden',
        value:this.userId
      } 
      
       tempfrondata.push(jsonObj);
       tempfrondata.push(traininghiddenfield);
       tempfrondata.push(lessonhiddenfields);
       tempfrondata.push(userhiddenfields);
;
    
    }
    if (tempfrondata.length > 0) {
      this.formdata.fields = tempfrondata;
      
    }
   
  }
  
}
