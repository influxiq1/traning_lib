import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-wise-report',
  templateUrl: './category-wise-report.component.html',
  styleUrls: ['./category-wise-report.component.css']
})
export class CategoryWiseReportComponent implements OnInit {
public allData:any=[];
  constructor(public activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.forEach(data => {
      this.allData = data.trainingReportData.categorywisereportdata;
    })
  }

}
