import { Component, OnInit ,Input} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { DatePipe } from '@angular/common';
export interface PeriodicElement {
  _id:string;
  firstname:string;
  no:number;
  lastname: string;
  type: string;
  email: string;
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
  displayedColumns: string[] = ['no','firstname','type', 'email','total_training','trainingdone','training_percentage', 'lastlessonname','lasttrainingname'];
  
  public trainingReportData : any;
  public dataSource:any;
  public date:any;

  
  @Input()
  set TotalTrainingReportData(val: any) {
    this.trainingReportData = (val) || '<no name set>';
   for (let loop in this.trainingReportData) {
    this.date=this.datepipe.transform(this.trainingReportData[loop].lastupdated_training_percentage_at,'MM-dd-yyyy');
     console.log("date++++++",this.date);
    }
    
    // this.date=this.datepipe.transform(this.trainingReportData[0].lastupdated_training_percentage_at,'MM-dd-yyyy');
    console.log("all report data",this.trainingReportData[0].lastupdated_training_percentage_at,this.date);
    this.dataSource = new MatTableDataSource(this.trainingReportData);
    
  }
  constructor(public datepipe : DatePipe) {
    // this.datepipe.transform(this.trainingReportData.lastupdated_training_percentage_at,'MM-dd-yyyy');
    // console.log("date format",this.trainingReportData[0].lastupdated_training_percentage_at);
   }

  ngOnInit() {
  }

}
