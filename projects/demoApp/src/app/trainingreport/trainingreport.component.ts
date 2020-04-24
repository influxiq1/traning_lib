import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpService } from '../service/http.service'
@Component({
  selector: 'app-trainingreport',
  templateUrl: './trainingreport.component.html',
  styleUrls: ['./trainingreport.component.css']
})
export class TrainingreportComponent implements OnInit {
  public jwtToken:any;
  public totalTrainingReportData:any=[];
  public popularTrainingData:any=[];
  public allCookiesData:any;
  public cookiesData:any;
  public serverDetails: any = {
    "serverUrl": "https://9ozbyvv5v0.execute-api.us-east-1.amazonaws.com/production/api/",
    "jwttoken": ""
  };
  public formSource: any = {
    
    "endpoint": "gettrainingreportdata-count",
    "viewReportEndpoint":"gettrainingreportdata",
    "trainingCountEndpoint" : "trainingcounts"
  }
  public categoryWiseReportUrl:any="/category-wise-report-view";
  constructor(public activatedRoute : ActivatedRoute,public cookie:CookieService,public httpService:HttpService) { 
    this.jwtToken = cookie.get('jwtToken');
    this.serverDetails.jwttoken=this.jwtToken;
    this.allCookiesData = cookie.getAll();
    this.cookiesData = JSON.parse(this.allCookiesData.user_details);
    console.log("sdsdsd",this.cookiesData.type);
   this.getPopularTrainingData();
  }

  ngOnInit() {
    this.activatedRoute.data.forEach(data => {
      let result: any;
      result = data.trainingReportData.training_report_data;
      this.totalTrainingReportData = result;
      
    })
  }
  getPopularTrainingData(){
    let endpoint : any="getpoppulartrainingdata";
    let data:any={
      "source":"most_popular_training_view",
      "limit":10,
      "skip":0,
      "condition":{
        "type":this.cookiesData.type
      }
    }
    this.httpService.CustomRequest(data,endpoint).subscribe((res:any)=>{
      // console.log("soureshhh",res);
      this.popularTrainingData = res.items;
      // console.log("testing data",this.popularTrainingData);

    })
  }

}
