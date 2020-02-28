import { Component, OnInit ,Input} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { ApiService } from '../api.service';

export interface PeriodicElement {
  _id:string;
  firstname:string;
  no:number;
  lastname: string;
  type: string;
  email: string;
  totalTraining:number;
  lastlessonname: string;
  lasttrainingname: string;
  total_training:number;
  training_percentage:number;
  trainingdone:number;
}
@Component({
  selector: 'lib-trainingreport',
  templateUrl: './trainingreport.component.html',
  styleUrls: ['./trainingreport.component.css']
})

export class TrainingreportComponent implements OnInit {
  displayedColumns: string[] = ['no','firstname','type', 'email','totalTraining','trainingdone','training_percentage', 'lastlessonname','lasttrainingname'];
  
  public trainingReportData : any;
  public dataSource:any;
  public date:any;
  public totalTraining:any;
  public serverDetailsVal:any;
  public trainingCategoryName:any;
  public formSourceVal:any;
  public reportDataCount:any;

  @Input()
  set serverDetails(serverDetails: {}) {
    this.serverDetailsVal = (serverDetails) || '<no name set>';
    console.log("serverdetails",this.serverDetailsVal);
  }
  @Input()
  set formSource(formSource: any) {
    this.formSourceVal = (formSource) || '<no name set>';
    console.log("formsource",this.formSourceVal);
  }
  
  @Input()
  set TotalTrainingReportData(val: any) {
    this.trainingReportData = (val) || '<no name set>';

   for (let loop in this.trainingReportData) {
     if(this.trainingReportData[loop].total_training !=null && this.trainingReportData[loop].total_training !='' && this.trainingReportData[loop].total_training !='NA'){
       console.log("total training",this.trainingReportData[loop].total_training);
       this.totalTraining = this.trainingReportData[loop].total_training;

     }
    // this.date=this.datepipe.transform(this.trainingReportData[loop].lastupdated_training_percentage_at,'MM-dd-yyyy');
     console.log("date++++++",this.date);
    }
    
    // this.date=this.datepipe.transform(this.trainingReportData[0].lastupdated_training_percentage_at,'MM-dd-yyyy');
    console.log("all report data",this.trainingReportData[0].lastupdated_training_percentage_at,this.date);
    // this.trainingReportData.total_training = this.totalTraining;
    this.dataSource = new MatTableDataSource(this.trainingReportData);
    
  }
  constructor(public datepipe : DatePipe,public apiService : ApiService) {
   }

  ngOnInit() {
    this.gettrainingreportdatacount();
  }
  gettrainingreportdatacount(){
    let link = this.serverDetailsVal.serverUrl + this.formSourceVal.endpoint;
     this.apiService.postDatawithoutTokenReportCount(link).subscribe((response:any)=>{
       console.log("response",response);
       this.reportDataCount = response.count;
     })
  }

}
