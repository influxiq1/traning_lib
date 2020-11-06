import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add-edit-lessions',
  templateUrl: './add-edit-lessions.component.html',
  styleUrls: ['./add-edit-lessions.component.css']
})
export class AddEditLessionsComponent implements OnInit {
  title = 'demoApp';
  public formdataval: any;
  public recid: any;
  public listingPageRoute: any = "/manage-lesson/list";
  public pageName: any = "Manage Lesson";
  public isitdna: any = true;

  public serverDetails: any = {
    "serverUrl": "https://obq0e0nxhk.execute-api.us-east-1.amazonaws.com/production/api/",
    "jwttoken": ""
  };
  // public formSource: any = {
  //   "source": 'manage_lession',
  //   "endpoint": "addorupdatelessondata",
  //   "showEndpoint": "getlessondatabyid",
  //   "AddheaderText": "Add Lesson",
  //   "EditheaderText": "Edit Lesson",
  //   "lessonDataEndpoint":"getlessondatabytrainingid"
  // }

  public formSource: any = {
    source: 'manage_lession',
    endpoint: 'addorupdatedata',
    showEndpoint: 'datalist',
    AddheaderText: 'Add Lesson',
    EditheaderText: 'Edit Lesson',
    lessonDataEndpoint: 'getlessondatabytrainingid'
  };
  public additionalData: any = {
    objectId: 'associated_training',
    objectId2: 'prerequisite_lession'
  };
  public configFileUpload: any = {
    baseUrl: "https://fileupload.influxhostserver.com/",
    endpoint: "uploads",
    size: "51200", // kb
    format: ["jpg", "jpeg", "png", "bmp", "zip", 'html', 'mp4', 'mp3', 'doc', 'ppt', 'pptx', 'pdf', 'msword'],  // use all small font
    type: "imageGallery-picture",
    path: "imageGallery",
    prefix: "imageGallery-picture_",
    formSubmit: false,
    conversionNeeded: 1,
    bucketName: "probidfiles-dev.com"
  }
  public jwtToken: any;

  constructor(public route: ActivatedRoute, public cookie: CookieService) {
    this.jwtToken = cookie.get('jwtToken');
    this.serverDetails.jwttoken = this.jwtToken;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.recid = params['id'];
      console.log(params['id'])
      if (this.recid != null && this.recid != '' && this.recid != undefined) {
        // this.geteditdata()
      }
    });

    this.formdataval = [
      { inputtype: 'text', name: 'lession_title', label: 'Title', placeholder: 'Enter Lesson Title', validationrule: { required: true }, validationerrormsg: 'is required' },

      { inputtype: 'textarea', name: 'description', label: 'Description', placeholder: 'Enter Description' },

      { inputtype: 'select', name: 'associated_training', label: 'Associated Training', defaultchoice: 'Select a Training', sourceview: 'training_category_management_view', endpoint: 'datalist', selectvalue: 'catagory_name', selectid: '_id', validationrule: { required: true }, validationerrormsg: 'is required' },

      { inputtype: 'select', name: 'prerequisite_lession', label: 'Prerequisite Lesson', defaultchoice: 'Select a Prerequisite Lesson', sourceview: 'manage_lession_null', endpoint: 'datalist', selectvalue: 'lession_title', selectid: '_id' },

      // { inputtype: 'radio', name: 'test_associate_training', value: ["Yes", "No"], valuelabel: '', label: "Is there a test associated with training ", placeholder: "", validationrule: { required: true }, validationerrormsg: '', class: 'radioclass' },

      { inputtype: 'checkbox', name: 'status', label: 'Active', placeholder: 'Enter Status', validationrule: { required: true }, validationerrormsg: 'is required' },

      { inputtype: 'select', name: 'mediaType', label: 'Training Type', defaultchoice: 'Select a Training Type', sourceview: 'assets/mediaType.json', sourcetype: 'static', selectvalue: 'name', selectid: 'selectname', validationrule: { required: true }, validationerrormsg: 'is required' },

    ];


  }

}
