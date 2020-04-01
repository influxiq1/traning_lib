import { Component, OnInit ,Input} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

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
@Component({
  selector: 'lib-trainingreport',
  templateUrl: './trainingreport.component.html',
  styleUrls: ['./trainingreport.component.css']
})

export class TrainingreportComponent implements OnInit {
  displayedColumns: string[] = ['no','name','type', 'email','totalTraining','trainingdone','training_percentage','lastupdated_training_percentage_at', 'lastlessonname','lasttrainingname','viewCatReport'];
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
  public search:any={
    "name":"",
    "email":""
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
    this.allCookiesData = cookie.getAll();
    this.cookiesData = JSON.parse(this.allCookiesData.user_details);
    this.userId = this.cookiesData._id;
    this.userType=this.cookiesData.type;
    setTimeout(() => {
      this.trainingCount();
     }, 500);
  
    
   }

  ngOnInit() {
    this.gettrainingreportdatacount();
  }
  trainingCount(){
    let link = this.serverDetailsVal.serverUrl + this.formSourceVal.trainingCountEndpoint;
    this.apiService.postDatawithoutTokenReportCount(link).subscribe((response:any)=>{
        this.trainingCounts.activatedtrainingcount = response.activatedtrainingcount;
        this.trainingCounts.activatedlessoncount = response.activatedlessoncount;
        this.trainingCounts.trashedtrainingcount = response.trashedtrainingcount;
        this.trainingCounts.trashedlessoncount = response.trashedlessoncount;
        this.trainingCounts.totaltrainingcount = response.totaltrainingcount;
        this.trainingCounts.totallessoncount = response.totallessoncount;
    })
  }
 
  //getting the total report data count
  gettrainingreportdatacount(){
    let link = this.serverDetailsVal.serverUrl + this.formSourceVal.endpoint;
    let data:any={
      search : this.lastSearchCondition,
      sort_val: "name",
      sort_type:"desc",
      condition:{}
    }
    if(this.cookiesData.type=='salesrep'){
      data.condition['user_id']= this.userId;
      this.page.page_count = 1;
    }
    if(this.cookiesData.type=='user'){
      data.condition['user_id']= this.userId;
      this.page.page_count = 1;
    }
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
        searchCondition[searchArray[i].key]={$regex : searchArray[i].val};
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
    if(item!=this.sort_val){
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
}
