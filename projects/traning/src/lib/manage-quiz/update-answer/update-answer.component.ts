import { Component, OnInit ,Input} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { DialogBoxComponent } from '../../common/dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';

export interface PeriodicElement {
  position: string;
  checked:string,
  deleteAction:string
}
@Component({
  selector: 'lib-update-answer',
  templateUrl: './update-answer.component.html',
  styleUrls: ['./update-answer.component.css']
})

export class UpdateAnswerComponent implements OnInit {
  public quizAnswerData:any=[];
  myModel: boolean=true;
  public deleteId:any;
  public deleteIndex:any;
  public dialogRef: any;
  public serverDetailsVal:any;
  public formSourceVal:any;
  public listingPageRoute : any;
  public lessonId:any;

  displayedColumns: string[] = ['position','checked','deleteAction'];
  dataSource: MatTableDataSource<PeriodicElement>;


  @Input()
  set serverDetails(serverDetails: {}) {
    this.serverDetailsVal = (serverDetails) || '<no name set>';    
  }

  @Input()
  set formSource(formSource: any) {
    this.formSourceVal = (formSource) || '<no name set>';
  }
  @Input()
  set DataList(val: any) {
    this.quizAnswerData = (val) || '<no name set>';
    
    this.dataSource = this.quizAnswerData;
  }
  @Input()
  set ListingPageRoute(val: any) {
    this.listingPageRoute = (val) || '<no name set>';
  }
  @Input()
  set LessonId(val: any) {
    this.lessonId = (val) || '<no name set>';
  }
  constructor(public dialog : MatDialog,public apiService:ApiService,public router : Router) { 

  }

  ngOnInit() {
  }
  
  delete(id:any,index){
    this.deleteId = id;
    this.deleteIndex = index;
    let modalData: any = {
      panelClass: 'delete-dialog',
      data: {
        header: "Message",
        message: "Are you want to delete these record ?",
        button1: { text: "No" },
        button2: { text: "Yes" },
      }
    }
    this.dialogRef = this.dialog.open(DialogBoxComponent, modalData);
      this.dialogRef.afterClosed().subscribe(result => {
      
        switch (result) {
          case "No":
            break;
          case "Yes":
            this.deleteFunction(id,index);
            break;
        }
      });

  }
  deleteFunction(id:any,index:any){
    let link = this.serverDetailsVal.serverUrl + this.formSourceVal.deleteendpoint;
    let data:any = {
      "source" : this.formSourceVal.source,
      "id" : id,
      "token": this.serverDetailsVal.jwttoken
    }
    this.apiService.postData(link,data).subscribe((res: any)=>{
      if(res.status="success"){
        this.quizAnswerData.splice(index, 1);
        let allData: PeriodicElement[] = this.quizAnswerData;
        this.dataSource = new MatTableDataSource(allData);
      }
     
    })
  }
 
}
