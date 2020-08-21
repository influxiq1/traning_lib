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
  public jwtToken: any;
  public totalTrainingReportData: any = [];
  public popularTrainingData: any = [];
  public popularLessonData: any = [];
  public allCookiesData: any;
  public cookiesData: any;
  public userId: any;
  public userType: any;
  public serverDetails: any = {
    "serverUrl": "https://obq0e0nxhk.execute-api.us-east-1.amazonaws.com/production/api/",
    "jwttoken": ""
  };
  public formSource: any = {

    "endpoint": "gettrainingreportdata-count",
    "viewReportEndpoint": "gettrainingreportdata",
    "trainingCountEndpoint": "trainingcounts"
  }
  public categoryWiseReportUrl: any = "/category-wise-report-view";
  constructor(public activatedRoute: ActivatedRoute, public cookie: CookieService, public httpService: HttpService) {
    this.jwtToken = cookie.get('jwtToken');
    this.serverDetails.jwttoken = this.jwtToken;
    // this.allCookiesData = cookie.getAll();
    // this.cookiesData = JSON.parse(this.allCookiesData.user_details);
    // console.log("sdsdsd",this.cookiesData.type);

    this.userId = JSON.parse(this.cookie.get('userid'));
    this.userType = JSON.parse(this.cookie.get('type'));
    this.getPopularTrainingData();
    this.getPopularLessonData();
  }

  ngOnInit() {
    this.activatedRoute.data.forEach(data => {
      let result: any;
      result = data.trainingReportData.training_report_data;
      this.totalTrainingReportData = result;

    })
  }

  getPopularTrainingData() {
    let endpoint: any = "getpoppulartrainingdata";
    let data: any = {
      "source": "most_popular_training_view",
      "limit": 10,
      "skip": 0,
      "condition": {
        "type": this.userType
      }
    }
    this.httpService.CustomRequest(data, endpoint).subscribe((res: any) => {
      // console.log(">>",res);
      this.popularTrainingData = res.items;
      // console.log("testing data",this.popularTrainingData);

    })
  }

  // getpopularlessondata
  getPopularLessonData() {
    let endpoint: any = "getpopularlessondata";
    let data: any = {
      "source": "most_popular_lesson_view",
      "limit": 10,
      "skip": 0,
      "condition": {
        "type": this.userType
      }
    }
    this.httpService.CustomRequest(data, endpoint).subscribe((res: any) => {
      console.log(">>", res);
      this.popularLessonData= res.items;
      // this.popularTrainingData = res.items;
      // console.log("testing data",this.popularTrainingData);

    })
  }

}
