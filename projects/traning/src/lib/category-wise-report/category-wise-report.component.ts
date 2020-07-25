import { Component, OnInit,Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../api.service';
@Component({
  selector: 'lib-category-wise-report',
  templateUrl: './category-wise-report.component.html',
  styleUrls: ['./category-wise-report.component.css']
})
export class CategoryWiseReportComponent implements OnInit {
  public allData:any;
  public dataSource: any;
  public displayedColumns:any;
  public displaycolvals:any = [];
  public formSourceVal:any;
  public serverDetailsVal:any;
  public lastSearchCondition:any={};
  public categoryWiseReportUrl:any;
  public reportDataCount:any;
  public totalPage:any;
  public sort_val:any;
  public sort_type:any;
  public userId:any;
  public page:any={
    "page_count":50,
    "page_no":1
  }
  public search:any={
    "training_name":""
  }
  @Input()
   set UserId(id:any){
   this.userId = id;
  }
  @Input()
  set serverDetails(serverDetails: {}) {
    this.serverDetailsVal = (serverDetails) || '<no name set>';
    
  }
  @Input()
  set formSource(formSource: any) {
    this.formSourceVal = (formSource) || '<no name set>';
    
  }
 
  @Input()
  set AllData(data: any) {
    this.allData = (data) || '<no name set>';
    console.log("datasource",this.allData);

    this.displayedColumns = [
      {key:"fullname", value:'Name'},
      {key:"training_category_name", value:'Training Name'},
      {key:"totallesson", value:'Total Lesson'},
      {key:"done", value:'Done lessons'},
      {key:"training_percentage_cat", value: "Training Percentage"},
      {key:"lastupdated_training_percentage_at", value: "Last Training Percentage On"}
    ];
    let alldatalist: any = Array.from(this.displayedColumns, (x:any) => x.key);
    this.displaycolvals = ['#'];
    this.displaycolvals = this.displaycolvals.concat(alldatalist);
    this.dataSource = new MatTableDataSource(this.allData);
  }
  constructor(public apiService : ApiService,public router:Router) { 
    this.sort_val = 'training_name',
    this.sort_type='desc'
  }

  ngOnInit() {
    // this.gettrainingreportdatacount();
  }
  //getting the total category wise report data count
  gettrainingreportdatacount(){
    let link = this.serverDetailsVal.serverUrl + this.formSourceVal.endpoint;
    let data:any={
      "condition":{
        user_id : this.userId,
        search : this.lastSearchCondition,
      },
      sort_val: "training_name",
      sort_type:"desc"
    }
     this.apiService.postDatawithoutToken(link,data).subscribe((response:any)=>{
       this.reportDataCount = response.count;
       this.totalPage=Math.round(this.reportDataCount / this.page.page_count);
       
     })
  }
  //geting all the sorted category-wise-report data and include searching 
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
        "user_id" : this.userId,
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
      this.dataSource = new MatTableDataSource(response.categorywisereportdata);
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
