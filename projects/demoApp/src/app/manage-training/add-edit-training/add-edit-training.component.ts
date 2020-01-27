import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-edit-training',
  templateUrl: './add-edit-training.component.html',
  styleUrls: ['./add-edit-training.component.css']
})
export class AddEditTrainingComponent implements OnInit {
  title = 'demoApp';
  public formdataval: any;
  public recid: any;
  public listingPageRoute : any="/manage-training/list";
  public serverDetails: any = {
    "serverUrl": "https://9ozbyvv5v0.execute-api.us-east-1.amazonaws.com/production/api/",
    "jwttoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1ODAyMDE1MzcsImlhdCI6MTU4MDExNTEzN30.EfP5ru45maD0LM9NDkGy7xgUUslVcV3ls-k8-Bid9qU"
  };
  public formSource: any = {
    "source":'training_category_management',
    "endpoint": "addorupdatedata",
    "showEndpoint":"datalist",
    "AddheaderText": "Add Training",
    "EditheaderText": "Edit Training",
    "formTitleName": 'Training'
  }
  public additionalData: any = {
    "objectId": "parent_catagory"
  };
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
      { inputtype: 'text', name: 'catagory_name', label: 'Training Title', placeholder: 'Enter Training Title', validationrule: { required: true }, validationerrormsg: 'is required' },

      { inputtype: 'textarea', name: 'description', label: 'Description', placeholder: 'Enter Description'},

      { inputtype: 'text', name: 'priority', label: 'Priority', placeholder: 'Enter Priority', validationrule: { required: true }, validationerrormsg: 'is required' }, 
      {inputtype:'radio',name:'type',value:["User","Salesrep","All"],valuelabel:'',label:"Type",placeholder:"",validationrule:{required:true},validationerrormsg:'', class:'radioclass'},

      // { inputtype: 'text', name: 'catagoryname', label: 'Catagory Name ', placeholder: 'Enter Catagory Name', validationrule: { required: true }, validationerrormsg: 'is required' },

      {inputtype:'select',name:'parent_catagory',label:'Parent Category',defaultchoice:'Select a Parent Category',sourceview:'training_category_management',endpoint:'datalist',selectvalue:'catagory_name',selectid:'_id'},
      
      // {inputtype:'select',name:'state',label:'State/Region',defaultchoice:'Select a State/region',sourceview:'assets/states.json',multiple:true, sourcetype:'static',selectvalue:'name',selectid:'abbreviation',validationrule:{required:true},validationerrormsg:'is required'},
        { inputtype: 'checkbox', name: 'status', label: 'Status', placeholder: 'Enter Status', validationrule: { required: true }, validationerrormsg: 'is required' },
    ];


  }

}
