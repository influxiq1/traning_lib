import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-list-lession',
  templateUrl: './list-lession.component.html',
  styleUrls: ['./list-lession.component.css']
})
export class ListLessionComponent implements OnInit {
public manageLessionList : any=[];
public isitdna:any=false;
public manageTrainingList : any = [];
public editPageRoute : any="/manage-lesson/edit/";
public addPageRoute : any="/manage-lesson/add";
public manageQuizRoute:any="/manage-quiz/list/";
public serverDetails: any = {
  "serverUrl": "https://obq0e0nxhk.execute-api.us-east-1.amazonaws.com/production/api1/",
  "jwttoken": ""
};
public formSource: any = {
  "source":'manage_lession',
  "endpoint": "lessondelete",
  "deleteManyEndpoint":"lessondeletemany",
  "searchEndpoint":"getlessondata",
  "associatedTrainingSourceName":"training_category_management",
  "statusUpdateEndpoint":"lessonstatusupdate",
  "statusUpdateManyEndpoint":"lessonstatusupdate",
  "statusUpdateSourceName":"manage_lession",
  "trashDataSource":"manage_lession_view",
  "retriveTrashDataEndpoint":"lessonrestoredata",
  "retriveTrashDataSourceName":"manage_lession",
  "trainingCountEndpoint" : "trainingcounts"
}

// public formSource: any = {
//   source: 'manage_lession',
//   endpoint: 'singledeletetrainingdata',
//   deleteManyEndpoint: 'multipledeletetrainingdata',
//   searchEndpoint: 'datalistwithouttoken',
//   associatedTrainingSourceName: 'manage_lession_view',
//   statusUpdateEndpoint: 'statusChange',
//   statusUpdateManyEndpoint: 'statusupdate',
//   statusUpdateSourceName: 'manage_lession',
//   trashDataSource: 'manage_lession_view',
//   retriveTrashDataEndpoint: 'restoretrashdata',
//   retriveTrashDataSourceName: 'manage_lession',
//   trainingCountEndpoint : 'trainingcounts'
// };
public jwtToken:any;
public searchSourceName :any="manage_lession_view";
  constructor(public activatedRoute : ActivatedRoute,public cookie:CookieService) { 
    this.jwtToken = cookie.get('jwtToken');
    this.serverDetails.jwttoken=this.jwtToken;
  }

  ngOnInit() {
    this.activatedRoute.data.forEach(data => {
      let result: any;
      result = data.lessionData.res;
      this.manageLessionList = result;      
    })
  }

}
