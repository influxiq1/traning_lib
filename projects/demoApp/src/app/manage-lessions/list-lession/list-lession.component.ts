import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
public manageQuizRoute:any="/manage-quiz/list";
public serverDetails: any = {
  "serverUrl": "https://9ozbyvv5v0.execute-api.us-east-1.amazonaws.com/production/api/",
  "jwttoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1Nzk4NDIxNDAsImlhdCI6MTU3OTc1NTc0MH0.9gzREv5uiI4Bp2PMRS2F2fELmmBpztUl8VSFGyoiu-k"
};
public formSource: any = {
  "source":'manage_lession',
  "endpoint": "deletesingledata",
  "searchEndpoint":"datalist"
}
public searchSourceName :any="manage_lession_view";
  constructor(public activatedRoute : ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.forEach(data => {
      let result: any;
      result = data.lessionData.res;
      this.manageLessionList = result;
      console.log("dataaaa",this.manageLessionList);
      
    })
  }

}
