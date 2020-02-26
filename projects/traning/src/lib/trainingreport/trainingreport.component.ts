import { Component, OnInit ,Input} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

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


  
  @Input()
  set TotalTrainingReportData(val: any) {
    this.trainingReportData = (val) || '<no name set>';
    this.dataSource = new MatTableDataSource(this.trainingReportData);
    
  }
  constructor() { }

  ngOnInit() {
  }

}
