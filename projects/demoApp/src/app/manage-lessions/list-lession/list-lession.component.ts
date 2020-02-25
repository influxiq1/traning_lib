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
public manageTrainingList : any = [];
public editPageRoute : any="/manage-lession/edit/";
public addPageRoute : any="/manage-lession/add";
public manageQuizRoute:any="/manage-quiz/list/";
public serverDetails: any = {
  "serverUrl": "https://9ozbyvv5v0.execute-api.us-east-1.amazonaws.com/production/api/",
  "jwttoken": ""
};
public formSource: any = {
  "source":'manage_lession',
  "endpoint": "singledeletetrainingdata",
  "deleteManyEndpoint":"multipledeletetrainingdata",
  "searchEndpoint":"datalist",
  "associatedTrainingSourceName":"training_category_management",
  "statusUpdateEndpoint":"statusChange",
  "statusUpdateManyEndpoint":"statusupdate",
  "statusUpdateSourceName":"manage_lession",
}
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
