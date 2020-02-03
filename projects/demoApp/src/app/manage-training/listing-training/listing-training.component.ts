import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-listing-training',
  templateUrl: './listing-training.component.html',
  styleUrls: ['./listing-training.component.css']
})
export class ListingTrainingComponent implements OnInit {
public manageTrainingList : any = [];
public editPageRoute : any="/manage-training/edit/";
public addPageRoute : any="/manage-training/add";
public searchSourceName : any="training_category_management_view";
public serverDetails: any = {
  "serverUrl": "https://9ozbyvv5v0.execute-api.us-east-1.amazonaws.com/production/api/",
  "jwttoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1ODA3OTI3MzIsImlhdCI6MTU4MDcwNjMzMn0.kPY8xA70kLfgdfcRFb4-7j7178W_kQfn5DFvHcRv0_E"
};
public formSource: any = {
  "source":'training_category_management',
  "endpoint": "deletesingledata",
  "searchEndpoint":"datalist",
  "statusUpdateEndpoint":"statusChange",
  "statusUpdateSourceName":"training_category_management",
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
