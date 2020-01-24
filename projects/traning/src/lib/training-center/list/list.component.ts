import { Component, OnInit ,ViewChild,Input,Inject} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { ApiService } from '../../api.service';
import { DialogBoxComponent } from '../../common/dialog-box/dialog-box.component';
import { Router } from '@angular/router';
@Component({
  selector: 'lib-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public trainingCategoryList:any=[];
  public serverDetailsVal:any;
  public formSourceVal:any;
  public lessonData:any=[];
  panelOpenState = false;


  @Input()
  set TrainingCategoryList(val: any) {
    this.trainingCategoryList= (val) || '<no name set>';
    console.log("listinggggg",this.trainingCategoryList);
  }
  @Input()
  set serverDetails(serverDetails: {}) {
    this.serverDetailsVal = (serverDetails) || '<no name set>';
    console.log("server detailsssssss",this.serverDetailsVal);
  }
  @Input()
  set formSource(formSource: any) {
    this.formSourceVal = (formSource) || '<no name set>';
  console.log("form sourceeeee",this.formSourceVal);
  }
  constructor(public dialog: MatDialog,public apiService : ApiService,public router :Router) {

   }

  ngOnInit() {

  }
  onClickCategoryName(val:any){
    const link = this.serverDetailsVal.serverUrl + this.formSourceVal.showEndpoint;
    let data: any ={
      source: this.formSourceVal.source ,
      token:this.serverDetailsVal.jwttoken,
      condition:{
        associated_training_id_object: val
      }
    }
    this.apiService.getData(link, data)
    .subscribe(response=>{
      let result :any=response;
      this.lessonData = result.res;
      console.log("resultttt on click",this.lessonData);
    })
  }

}
