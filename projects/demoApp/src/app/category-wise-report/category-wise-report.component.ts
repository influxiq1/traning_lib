import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-category-wise-report',
  templateUrl: './category-wise-report.component.html',
  styleUrls: ['./category-wise-report.component.css']
})
export class CategoryWiseReportComponent implements OnInit {
public jwtToken:any;
public allData:any=[];
public user_id:any;
public serverDetails: any = {
  "serverUrl": "https://9ozbyvv5v0.execute-api.us-east-1.amazonaws.com/production/api/",
  "jwttoken": ""
};
public formSource: any = {
  
  "endpoint": "getcategorywisetrainingreportdata-count",
  "viewReportEndpoint":"getcategorywisereportdata"
}
constructor(public activatedRoute : ActivatedRoute,public cookie:CookieService) { 
  this.jwtToken = cookie.get('jwtToken');
  this.serverDetails.jwttoken=this.jwtToken;
  this.user_id = this.activatedRoute.snapshot.params.user_id;
}

  ngOnInit() {
    this.activatedRoute.data.forEach(data => {
      this.allData = data.trainingReportData.categorywisereportdata;
    })
  }

}
