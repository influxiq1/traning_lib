import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
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
public serverDetails: any = {
  "serverUrl": "https://9ozbyvv5v0.execute-api.us-east-1.amazonaws.com/production/api/",
  "jwttoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1Nzk1ODI1MzEsImlhdCI6MTU3OTQ5NjEzMX0.KqgDVvDh0Z8pMOIfuN_dTpBvrYe_KfEOC6kCrH6eZT4"
};
public formSource: any = {
  "source":'training_category_management',
  "endpoint": "deletesingledata",
}
  constructor(public activatedRoute : ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.forEach(data => {
      let result: any;
      result = data.trainingdata.res;
      this.manageTrainingList = result;
      console.log("video dataaaa",this.manageTrainingList);
      
    })
  }

}
