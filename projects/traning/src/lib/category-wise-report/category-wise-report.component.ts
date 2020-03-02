import { Component, OnInit,Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
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

  @Input()
  set AllData(data: any) {
    this.allData = (data) || '<no name set>';
    console.log("datasource",this.allData.length);

    this.displayedColumns = [
      {key:"name", value:'Name'},
      {key:"training_name", value:'Training Name'},
      {key:"totallesson", value:'Total Lesson'},
      {key:"done", value:'Done Training'},
      {key:"training_percentage_cat", value: "Training Percentage"},
      {key:"lastupdated_training_percentage_at", value: "Last Training Percentage On"}
    ];
    let alldatalist: any = Array.from(this.displayedColumns, (x:any) => x.key);
    this.displaycolvals = ['#'];
    this.displaycolvals = this.displaycolvals.concat(alldatalist);
    this.dataSource = new MatTableDataSource(this.allData);
  }
  constructor() { 
  }

  ngOnInit() {
  }

}
