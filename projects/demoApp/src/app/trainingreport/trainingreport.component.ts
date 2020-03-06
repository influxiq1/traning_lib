import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-trainingreport',
  templateUrl: './trainingreport.component.html',
  styleUrls: ['./trainingreport.component.css']
})
export class TrainingreportComponent implements OnInit {
  public jwtToken:any;
  public totalTrainingReportData:any=[];
  public serverDetails: any = {
    "serverUrl": "https://9ozbyvv5v0.execute-api.us-east-1.amazonaws.com/production/api/",
    "jwttoken": ""
  };
  public formSource: any = {
    
    "endpoint": "gettrainingreportdata-count",
    "viewReportEndpoint":"gettrainingreportdata"
  }
  public categoryWiseReportUrl:any="/category-wise-report-view";
  constructor(public activatedRoute : ActivatedRoute,public cookie:CookieService) { 
    this.jwtToken = cookie.get('jwtToken');
    this.serverDetails.jwttoken=this.jwtToken;
  }

  ngOnInit() {
    this.activatedRoute.data.forEach(data => {
      let result: any;
      result = data.trainingReportData.training_report_data;
      this.totalTrainingReportData = result;
      
    })
  }

}