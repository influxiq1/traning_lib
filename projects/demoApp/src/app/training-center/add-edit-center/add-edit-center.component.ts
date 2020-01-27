import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-edit-center',
  templateUrl: './add-edit-center.component.html',
  styleUrls: ['./add-edit-center.component.css']
})
export class AddEditCenterComponent implements OnInit {
  title = 'demoApp';
  public formdataval: any;
  public recid: any;
  public serverDetails: any = {
    "serverUrl": "https://9ozbyvv5v0.execute-api.us-east-1.amazonaws.com/production/api/",
    "jwttoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1ODAxODgzNjIsImlhdCI6MTU4MDEwMTk2Mn0.MMZBG-CG9YQkS4nEQY8_wXBFNBawDMj38qv_DJ4IVk8"
  };
  public formSource: any = {
    "source":'users',
    "endpoint": "addorupdatedata",
    "showEndpoint":"datalist",
    "formTitleName": 'Catagory'
  }
  constructor(public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.recid = params['id'];
      console.log(params['id'])
      if (this.recid !=null && this.recid !='' && this.recid !=undefined) {
        // this.geteditdata()
      }
  });

    this.formdataval = [
      { inputtype: 'text', name: 'catagoryname', label: 'Catagory Name ', placeholder: 'Enter Catagory Name', validationrule: { required: true }, validationerrormsg: 'is required' },

      { inputtype: 'textarea', name: 'description', label: 'description', placeholder: 'Enter Description'},

      {inputtype:'radio',name:'timespan',value:["User","Rep","Admin", "All"],valuelabel:'',label:"Roll Access",placeholder:"",validationrule:{required:true},validationerrormsg:'', class:'radioclass'},

      {inputtype:'select',name:'parentcategory',label:'Parent Category',defaultchoice:'Select a Parent Category',sourceview:'users',endpoint:'datalist',selectvalue:'type',selectid:'_id'},
      {inputtype:'select',name:'state',label:'State/Region',defaultchoice:'Select a State/region',sourceview:'assets/states.json',multiple:true, sourcetype:'static',selectvalue:'name',selectid:'abbreviation',validationrule:{required:true},validationerrormsg:'is required'},
    ];


  }

}
