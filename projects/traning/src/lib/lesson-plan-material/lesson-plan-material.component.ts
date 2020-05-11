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
// console.log("souresh lesson plan",this.allData);
}
@Input()
set serverDetails(val: {}){
this.serverdata = val;
// console.log(this.serverdata.serverUrl)
}
  constructor(public activatedroute:ActivatedRoute,public apiService:ApiService) { 
    // console.log("route",this.activatedroute.snapshot.params.associated_training);
      
    
    
  
    // this.update(this.activatedroute.snapshot.params.lesson_id_object);
    
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


    // for (const key in this.allData) {
    //   console.log(this.allData[key]);
    //   for (const keys in this.allData[key].answerdata) {
    //     console.log(this.allData[key].answerdata[keys]);
    //   }
    // }
let answer:any = [];
let tempfrondata:any = [] ;
let answerForSelect:any = [];
    for(let loop = 0; loop < this.allData.length; loop++) {
      answer = [];
      answerForSelect = [];
      // for(let loop2 = 0; loop2 < this.allData[loop].answerdata.length; loop2++) {
        // console.log(this.allData[loop].answerdata,'++++++')
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
        // value: this.allData[loop].answerdata[0].answer,
      };
    let selecttypedata:any=[{}];
    // this.selectValue.push(
    //   { 'name': this.allData[loop].answerdata[0].answer, val: this.allData[loop].answerdata[0].answer }
    // );
   // console.log("selected val+++++++++",this.selectValue);
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
    console.log(":objecttt",this.formdata)
    // console.log("jhkjkh", this.formdata.fields)
  }
  // update(id:any){
  //      this.formdata={
  //         successmessage:"Added Successfully !!",
  //         redirectpath:"/admin/createwebinar",                         // light
  //         submitactive:true, //optional, default true
  //        apiUrl:this.serverdata.serverUrl,
  //         endpoint:'api/webinarupdate',                                // update end point
  //        jwttoken:'',
        
  //       fields:[
  //         {
  //             //heading:"This is Name Header",
  //             label:"Question",
  //             name:"question",
  //             value:this.allData.question,
  //             type:"text",
  //             validations:[
  //                 {rule:'required'},
  //                 // {rule:'maxLength',value:10},
  //                 // {rule:'minLength',value: 2}
  //                 ]
  //         }
  //     ]
  // }
  //     // });
  // }

}
