import { Component, OnInit ,Input,ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {MatPaginator} from '@angular/material/paginator';

export interface PeriodicElement {
  _id:string;
  name:string;
  no:number;
  type: string;
  email: string;
  totalTraining:number;
  lastlessonname: string;
  lasttrainingname: string;
  total_training:number;
  training_percentage:number;
  trainingdone:number;
  lastupdated_training_percentage_at:any;
  viewCatReport:any;
}
export interface PeriodicTrainingElement {
  _id:string;
  catagory_name:string;
  parent_catagory:string;
  no:number;
  type: string;
  description_html: string;
  priority:number;
  status: number;
  user_done: number;
}
@Component({
  selector: 'lib-trainingreport',
  templateUrl: './trainingreport.component.html',
  styleUrls: ['./trainingreport.component.css']
})

export class TrainingreportComponent implements OnInit {
  // ,'totalTraining'
  displayedColumns: string[] = ['no','name','type', 'email','trainingdone','training_percentage','lastupdated_training_percentage_at', 'lastlessonname','lasttrainingname','viewCatReport'];
  popularTrainingdisplayedColumns: string[] = ['no','catagory_name','parent_catagory','description_html', 'priority','status','user_done'];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  public totalPage:any;
  public trainingReportData : any;
  public dataSource:any;
  public date:any;
  public totalTraining:any;
  public serverDetailsVal:any;
  public trainingCategoryName:any;
  public formSourceVal:any;
  public reportDataCount:any=0;
  public lastSearchCondition:any={};
  public categoryWiseReportUrl:any;
  public sort_val:any;
  public sort_type:any;
  public allCookiesData:any;
  public cookiesData:any;
  public userId:any;
  public userType:any;
  public allPopularData:any=[];
  public allPopularDataSource:any=[];
  public trainingCounts:any={
    "activatedtrainingcount":"",
    "activatedlessoncount":"",
    "trashedtrainingcount":"",
    "trashedlessoncount":"",
    "totaltrainingcount":" ",
    "totallessoncount":" "
  };

  public page:any={
    "page_count":50,
    "page_no":1
  }
  public populartrainingpage:any={
    "page_count":50,
    "page_no":1
  }
  public search:any={
    "name_s":"",
    "email":"",
    "type":""
  }
  @Input()
  set serverDetails(serverDetails: {}) {
    this.serverDetailsVal = (serverDetails) || '<no name set>';
    
  }
  @Input()
  set CategoryWiseReportUrl(url: any) {
    this.categoryWiseReportUrl = (url) || '<no name set>';
    
  }
  @Input()
  set formSource(formSource: any) {
    this.formSourceVal = (formSource) || '<no name set>';
  }
  @Input()
  set MostPopularTrainingData(allData: any) {
    this.allPopularData = (allData) || '<no name set>';
    this.allPopularDataSource = new MatTableDataSource(this.allPopularData);
    this.allPopularDataSource.paginator = this.paginator;
  }

  
  @Input()
  set TotalTrainingReportData(val: any) {
    this.trainingReportData = (val) || '<no name set>';

   for (let loop in this.trainingReportData) {
     if(this.trainingReportData[loop].total_training !=null && this.trainingReportData[loop].total_training !='' && this.trainingReportData[loop].total_training !='NA'){
       
       this.totalTraining = this.trainingReportData[loop].total_training;

     }
    }
    
    this.dataSource = new MatTableDataSource(this.trainingReportData);
    
  }
  constructor(public datepipe : DatePipe,public apiService : ApiService,public router:Router,public cookie:CookieService) {
    this.sort_val = 'name',
    this.sort_type='desc'
    // this.allCookiesData = cookie.getAll();
    // this.cookiesData = JSON.parse(this.cookie.get('userid'));
    this.userId = JSON.parse(this.cookie.get('userid'));;
    this.userType=JSON.parse(this.cookie.get('type'));;
    setTimeout(() => {
      this.trainingCount();
     }, 500);
   }

  ngOnInit() {
    setTimeout(() => {
      this.allPopularDataSource.paginator = this.paginator;
    }, 100);
    this.gettrainingreportdatacount();
  }
  trainingCount(){
    let link = this.serverDetailsVal.serverUrl + this.formSourceVal.trainingCountEndpoint;
    this.apiService.postDatawithoutTokenReportCount(link).subscribe((response:any)=>{
        this.trainingCounts.activatedtrainingcount = response.results.activatedtrainingcount;
        this.trainingCounts.activatedlessoncount = response.results.activatedlessoncount;
        this.trainingCounts.trashedtrainingcount = response.results.trashedtrainingcount;
        this.trainingCounts.trashedlessoncount = response.results.trashedlessoncount;
        this.trainingCounts.totaltrainingcount = response.results.totaltraining;
        this.trainingCounts.totallessoncount = response.results.totallesson;
    })
  }
 
  //getting the total report data count
  gettrainingreportdatacount(){
    let link = this.serverDetailsVal.serverUrl + this.formSourceVal.endpoint;
    let data:any={
      search : this.lastSearchCondition,
      sort_val: "name_s",
      sort_type:"desc",
      condition:{}
    }
    // if(this.userType=='mentor'){
    //   data.condition['user_id']= this.userId;
    //   this.page.page_count = 1;
    // }
    // if(this.userType=='mentee'){
    //   data.condition['user_id']= this.userId;
    //   this.page.page_count = 1;
    // }
     this.apiService.postDatawithoutToken(link,data).subscribe((response:any)=>{
       this.reportDataCount = response.count;
       this.totalPage=Math.round(this.reportDataCount / this.page.page_count);
       
     })

     
  }

  //geting all the sorted report data and include searching 
  getPageData(){
    let searchCondition:any={};
    let searchVal:any=this.search;
    let searchArray:any=Object.keys(searchVal).map(function(key){
      return {key:key,val:searchVal[key]};
    });
    for (let i in searchArray) {
      if(searchArray[i].val!=null && searchArray[i].val!=''){

        searchCondition[searchArray[i].key]={$regex : (searchArray[i].val).toLowerCase()};
      } 
    }
    searchCondition={$and:[searchCondition]};
    this.lastSearchCondition = searchCondition;

    let link = this.serverDetailsVal.serverUrl + this.formSourceVal.viewReportEndpoint;
    let data: any ={
      token:this.serverDetailsVal.jwttoken,
      condition:{
        "skip":(parseInt(this.page.page_no)-1) * parseInt(this.page.page_count),
        "limit":parseInt(this.page.page_count),
        "search" : searchCondition
      },
      sort_val:this.sort_val,
      sort_type:this.sort_type
      
    }
    this.apiService.postData(link,data).subscribe((response:any)=>{
    if(response.status="success"){
      this.reportDataCount=0;
      this.gettrainingreportdatacount();
      this.dataSource = new MatTableDataSource(response.training_report_data);
    }
    })

  }
  nextPage(flag : string = null){
   if(flag=='prev' && this.page.page_no > 1){
      this.page.page_no--;
   }
   if(flag == null && this.page.page_no < this.reportDataCount / this.page.page_no){
     this.page.page_no++;
   }
   this.getPageData();
  }
  
  categoryWiseReportPage(id:any){
     this.router.navigateByUrl(this.categoryWiseReportUrl+'/'+id);
  }
  sortPageData(item:any){
    if(item != this.sort_val){
      this.sort_type = 'asc',
      this.sort_val = item;
    }else{
      if(this.sort_type=='desc'){
        this.sort_type='asc';
      }else{
        this.sort_type='desc';
      }
      this.getPageData();
    }

    
  }

  reLoadData(){
    this.search={
      "name_s":"",
      "email":"",
      "type":""
    };
    this.dataSource = new MatTableDataSource(this.trainingReportData);
  }
}
