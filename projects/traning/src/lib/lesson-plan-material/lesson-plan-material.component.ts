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
public formdata:any;
public serverdata:any;
formfieldrefresh: boolean = true;
  updatetable: boolean = true;
  formfieldrefreshdata: any = null;
public selectValue:any=[];
@Input()
set lessonplandata(val:any){
this.allData= val;
console.log("souresh lesson plan",this.allData);
}
@Input()
set serverDetails(val: {}){
this.serverdata = val;
console.log(this.serverdata.serverUrl)
}
  constructor(public activatedroute:ActivatedRoute,public apiService:ApiService) { 
    console.log("route",this.activatedroute.snapshot.params.associated_training);
      
    
    
  
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
      endpoint: 'api/addorupdatedata',  //change endpoint
      jwttoken: '',
    
      fields: []
        
    };


    for(let loop = 0; loop < this.allData.length; loop++) {
      for(let loop2 = 0; loop2 < this.allData[loop].answerdata.length; loop2++) {
      let jsonObj: any = {
        heading: this.allData[loop].question,
        label: this.allData[loop].answerdata[0].answer,
        name: "answer",
        value: this.allData[loop].answerdata[0].answer,
        validations: [
          { rule: 'required' },
          { rule: 'maxLength', value: 10 },
          { rule: 'minLength', value: 2 }
        ]
      };
    let selecttypedata:any=[{}];
    this.selectValue.push(
      { 'name': this.allData[loop].answerdata[0].answer, val: this.allData[loop].answerdata[0].answer }
    );

      switch (this.allData[loop].question_type) {
        case 'checkbox':
          jsonObj.type = 'checkbox';
          break;
        case 'dropdown':
          jsonObj.type = 'select';
          jsonObj.value = this.selectValue;
          break;
        case 'radio_button':
          jsonObj.type = 'radio';

          break;
        case 'text_box':
          jsonObj.type = 'text';
          break;

        default:
          break;
      }



      this.formdata.fields.push(jsonObj);
      // console.log(":objecttt",jsobObj)
    }
    }
    console.log("jhkjkh", this.formdata.fields)
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
