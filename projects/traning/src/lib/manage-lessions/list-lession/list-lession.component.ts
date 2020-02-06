import { Component, OnInit ,ViewChild,Input,Inject} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections';

import {MatTableDataSource} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { ApiService } from '../../api.service';
import { DialogBoxComponent } from '../../common/dialog-box/dialog-box.component';
import { Router } from '@angular/router';
export interface PeriodicElement {
  select:string;
  no:number;
  lession_title: string;
  description: string;
  test_associate_training: string;
  mediaType: string;
  associated_training: string;
  prerequisite_lession:string;
  status:string;
  deleteRecord:any;
}

export interface DialogData {
  message: string;
}
@Component({
  selector: 'lib-list-lession',
  templateUrl: './list-lession.component.html',
  styleUrls: ['./list-lession.component.css']
})
export class ListLessionComponent implements OnInit {
  displayedColumns: string[] = ['select','no','lession_title', 'description', 'test_associate_training', 'mediaType','associated_training','prerequisite_lession','status','deleteRecord'];
  // dataSource: MatTableDataSource<PeriodicElement>;

  public dataSource: any;
  public listingData :any=[];
  public dialogRef: any;
  public deleteId : any;
  public deleteIndex : any;
  public serverDetailsVal : any;
  public formSourceVal : any;
  public editPageRoute : any;
  public addPageRoute : any;
  public searchSourceName:any;
  public manageQuizRoute:any;
  public allLessonData : any = [];
  public lessonName:any;
  public training:any;
  public testAvailability:any;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  selection = new SelectionModel<PeriodicElement>(true, []);
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.no + 1}`;
  }

  @Input()           //getting all data from application
  set allDataList(val: any) {
    this.listingData = (val) || 'no name set';
    this.listingData = val;
    this.dataSource = new MatTableDataSource(this.listingData);

  }
  @Input()
  set serverDetails(serverDetails: {}) {
    this.serverDetailsVal = (serverDetails) || '<no name set>';
  }
  @Input()
  set formSource(formSource: any) {
    this.formSourceVal = (formSource) || '<no name set>';
    console.log("form source",this.formSourceVal);
  }
  @Input()
  set EditPageRoute(val: any) {
    this.editPageRoute = (val) || '<no name set>';
  }

  @Input()
  set AddPageRoute(val: any) {
    this.addPageRoute = (val) || '<no name set>';
  }
  @Input()
  set SearchSourceName(val: any) {
    this.searchSourceName = (val) || '<no name set>';
  }
  @Input()
  set ManageQuizRoute(val: any) {
    this.manageQuizRoute = (val) || '<no name set>';
  }
  constructor(public dialog: MatDialog,public apiService : ApiService,public router :Router) {
   }

  ngOnInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    }, 100);
    this.getAllLessonData();

  }
  deleteRecord(id:any,index:any){
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
    deleteFunction(recordId:any,index:number){
  
      let link = this.serverDetailsVal.serverUrl + this.formSourceVal.endpoint;
      let data:any = {
        "source" : this.formSourceVal.source,
        "id" : recordId,
        "token": this.serverDetailsVal.jwttoken
      }
      this.apiService.postData(link,data).subscribe((res: any)=>{
        if(res.status="success"){
          this.listingData.splice(index, 1);
          let allData: PeriodicElement[] = this.listingData;
          this.dataSource = new MatTableDataSource(allData);
        }
       
      })
  
    }
    routerFunction(paramId:any){
      this.router.navigateByUrl(this.editPageRoute + paramId);
    }
    addButton(){
      this.router.navigateByUrl(this.addPageRoute);
  
    }
    filterByTrainingName(key: string, value: string){
      if(value == "0"){
        this.dataSource = new MatTableDataSource(this.listingData);
      }
      else{
        let searchJson: any = {};
        searchJson[key] = value.toLowerCase();
        let link = this.serverDetailsVal.serverUrl + this.formSourceVal.searchEndpoint;
        var data = {
          "source": this.searchSourceName,
          "condition": searchJson,
          "token": this.serverDetailsVal.jwttoken
        }
        this.apiService.postData(link,data).subscribe(response => {
          let result : any=response;
          this.dataSource = result.res;
          });
      }
  
    
  }
  manageQuiz(id:any){
    this.router.navigateByUrl(this.manageQuizRoute + id);
  }
  getAllLessonData(){
    let link = this.serverDetailsVal.serverUrl + this.formSourceVal.searchEndpoint;
    let data:any = {
      "source" :   this.formSourceVal.associatedTrainingSourceName,
      "token": this.serverDetailsVal.jwttoken
    }
    this.apiService.postData(link,data).subscribe((response: any)=>{
      let result :any;
      if(response.status="success"){
       result = response.res;
       this.allLessonData = result;
      console.log("all leson data",result);
      }
     
    })
  }
  resetSearch(){
  this.lessonName = "";
  this.training = "";
  this.testAvailability = "";
  this.dataSource = new MatTableDataSource(this.listingData);

  }
  statusUpdateModal(id:any,index:any){
    let modalData: any = {
      panelClass: 'delete-dialog',
      data: {
        header: "Message",
        message: "Are you sure you want to change these status?",
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
            this.statusChange(id,index);
            break;
        }
      });

  }
  statusChange(id:any,index:any){
    let link = this.serverDetailsVal.serverUrl + this.formSourceVal.statusUpdateEndpoint;
    let data:any = {
      "source" :   this.formSourceVal.statusUpdateSourceName,
      "_id_status": id
    }
    this.apiService.postDatawithoutToken(link,data).subscribe((response: any)=>{
      let result :any;
      if(response.status=true){
        if(this.listingData[index].status=="Active"){
          this.listingData[index].status = "Inactive"
        }else{
          this.listingData[index].status = "Active"

        }
        console.log("souresh testtt",this.listingData[index].status);
        let allData: PeriodicElement[] = this.listingData;
        this.dataSource = new MatTableDataSource(allData);     
       }
     
    })
  }
   
  deleteAllRecords(){

  }
  statusUpdateAllRecords(){
    console.log("selected souresh",this.selection.selected.length);

  }

}
