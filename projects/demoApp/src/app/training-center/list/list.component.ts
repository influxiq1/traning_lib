import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
public manageTrainingList : any=[];
public serverDetails: any = {
  "serverUrl": "https://9ozbyvv5v0.execute-api.us-east-1.amazonaws.com/production/api/",
  "jwttoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1Nzk5NTE2NjksImlhdCI6MTU3OTg2NTI2OX0.1MNS3HhaWRJ-yL63GGdziMDgwTpCuOGiYc9-VRrIGBI"
};
public formSource: any = {
  "source":'manage_lession_view',
  "endpoint": "addorupdatedata",
  "showEndpoint":"datalist",
  "formTitleName": 'Training Center'
}
  constructor(public activatedRoute : ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.forEach(data => {
      let result: any;
      result = data.trainingdata.res;
      this.manageTrainingList = result;
      
    })
  }


}
