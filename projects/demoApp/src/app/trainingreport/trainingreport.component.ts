import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trainingreport',
  templateUrl: './trainingreport.component.html',
  styleUrls: ['./trainingreport.component.css']
})
export class TrainingreportComponent implements OnInit {
  public totalTrainingReportData:any=[];
  constructor(public activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.forEach(data => {
      let result: any;
      result = data.trainingReportData.training_report_data;
      this.totalTrainingReportData = result;
      
    })
  }

}
