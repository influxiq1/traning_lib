import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'demoApp';
  public formdataval: any;
  public recid: any;
  public serverDetails: any = {
    "serverUrl": "http://127.0.0.1:8000/",
    "jwttoken": ""
  };
  public formSource: any = {
    "source":'users',
    "endpoint": "addorupdatedata",
    "showEndpoint":"datalist",
    "formTitleName": 'Catagory'
  }
  constructor( public route: ActivatedRoute) {

  }
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
