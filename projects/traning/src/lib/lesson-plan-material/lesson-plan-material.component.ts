import { Component, OnInit ,Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
@Component({
  selector: 'lib-lesson-plan-material',
  templateUrl: './lesson-plan-material.component.html',
  styleUrls: ['./lesson-plan-material.component.css']
})
export class LessonPlanMaterialComponent implements OnInit {
public  allData:any=[];
public formdata:any = {};
public serverdata:any;
formfieldrefresh: boolean = true;
  updatetable: boolean = true;
  formfieldrefreshdata: any = null;
public selectValue:any=[{}];
@Input()
set lessonplandata(val:any){
this.allData= val;
}
@Input()
set serverDetails(val: {}){
this.serverdata = val;
}
  constructor(public activatedroute:ActivatedRoute,public apiService:ApiService) { 

    
  }

  ngOnInit() {
    this.formdata = {
      successmessage: "Added Successfully !!",
      redirectpath: "/",
      submittext:"Submit",
      // canceltext:"Cancel Now",
      resettext:"Reset This",
      submitactive:true, //optional, default true
      apiUrl: this.serverdata.serverUrl,
      endpoint: '/addorupdatedata',  //change endpoint
      jwttoken: '',
    
      // fields: []
        
    };

let answer:any = [];
let tempfrondata:any = [] ;
let answerForSelect:any = [];
    for(let loop = 0; loop < this.allData.length; loop++) {
      answer = [];
      answerForSelect = [];
 
        if (this.allData[loop].answerdata != null && this.allData[loop].answerdata.length > 1) {
        for (const key in this.allData[loop].answerdata) {
         answer.push({key:key, val:this.allData[loop].answerdata[key].answer});
         answerForSelect.push({val:key, name:this.allData[loop].answerdata[key].answer});
        }
      }
      let jsonObj: any = {
        // heading: '',
        label: this.allData[loop].question,
        name: this.allData[loop]._id,
       
      };
    let selecttypedata:any=[{}];
   
      switch (this.allData[loop].question_type) {
        case 'checkbox':
          jsonObj.type = 'checkbox';
          if (this.allData[loop].answerdata != null && this.allData[loop].answerdata.length > 0) {
            jsonObj.multiple = true;
            jsonObj.val = answer;
            jsonObj.value = []
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


      tempfrondata.push(jsonObj);
;
    // }
    }
    if (tempfrondata.length > 0) {
      this.formdata.fields = tempfrondata;
    }
   
  }
  
}
