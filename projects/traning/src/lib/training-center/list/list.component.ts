import { Component, OnInit ,ViewChild,Input,Inject} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';


export interface DialogData {
  message: string;
}
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
  public dialogRef: any;
  public quizQuestionSource:any;
  public quizQuestion:any;
  public questionArray:any=[];

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
  @Input()
  set QuizQuestionSource(val: any) {
    this.quizQuestionSource = (val) || '<no name set>';
  console.log("form sourceeeee",this.quizQuestionSource);
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
  questionDetails(id:any){
    const link = this.serverDetailsVal.serverUrl + this.formSourceVal.showEndpoint;
    let data: any ={
      source: this.quizQuestionSource,
      token:this.serverDetailsVal.jwttoken,
      condition:{
        lesson_id_object: id
      }
    }
    this.apiService.getData(link, data)
    .subscribe(response=>{
      let result :any=response;
      this.questionArray = result.res;
      for (const i in this.questionArray) {
        this.quizQuestion = this.questionArray[i].question;
        this.openDialog(this.quizQuestion);
      }
    
    })

  }
  openDialog(x: any): void {
    this.dialogRef = this.dialog.open(Dialogtest, {
      width: '250px',
      data: { message: x }
    });
    this.dialogRef.afterClosed().subscribe(result => {
    });
  }

}


@Component({
  selector: 'dialogtest',
  templateUrl: 'modal.html',
})
export class Dialogtest {
  public is_error: any;

  constructor(public dialogRef: MatDialogRef<Dialogtest>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.is_error = data.message;
  }
}
