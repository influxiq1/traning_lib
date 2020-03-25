import { Component, OnInit ,ViewChild,Input,Inject} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { ApiService } from '../api.service';
import { DialogBoxComponent } from '../common/dialog-box/dialog-box.component';
import { Router } from '@angular/router';
export interface PeriodicElement {
  question: string;
  priority: string;
  status: string;
  deleteRecord:any;
}
@Component({
  selector: 'lib-manage-quiz',
  templateUrl: './manage-quiz.component.html',
  styleUrls: ['./manage-quiz.component.css']
})
export class ManageQuizComponent implements OnInit {
  public addPageRoute : any;
  public lessonPageRoute : any;
  public serverDetailsVal:any;
  public formSourceVal:any;
  public editPageRoute:any;
  public deleteId:any;
  public deleteIndex:any;
  public dialogRef: any;
  public addUpdateAnswerRoute:any;
  public lessonId:any;
  public dataSource:any;
  public listingData:any=[];
  displayedColumns: string[] = ['question', 'priority', 'status', 'deleteRecord'];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  @Input()           //getting all data from application
  set allDataList(val: any) {
    this.listingData = (val) || 'no name set';
    this.listingData = val;
    this.dataSource = new MatTableDataSource(this.listingData);
    }
  @Input()
  set AddPageRoute(val: any) {
    this.addPageRoute = (val) || '<no name set>';
  }
  @Input()
  set LessonPageRoute(val: any) {
    this.lessonPageRoute = (val) || '<no name set>';
  }
  @Input()
  set serverDetails(serverDetails: {}) {
    this.serverDetailsVal = (serverDetails) || '<no name set>';
  }
  @Input()
  set formSource(formSource: any) {
    this.formSourceVal = (formSource) || '<no name set>';
  }
  @Input()
  set EditPageRoute(val: any) {
    this.editPageRoute = (val) || '<no name set>';
  }
  @Input()
  set AddUpdateAnswerRoute(formSource: any) {
    this.addUpdateAnswerRoute = (formSource) || '<no name set>';
  }
  
  @Input()
  set ParamsId(id: any) {
    this.lessonId = (id) || '<no name set>';
  }
  

  constructor(public dialog: MatDialog,public apiService : ApiService,public router :Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    }, 100);
  }
  addButton(){
    this.router.navigateByUrl(this.addPageRoute + this.lessonId);
  }
  lessonList(){
    this.router.navigateByUrl(this.lessonPageRoute);

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
    statusUpdateModal(id:any,index:any){
      let modalData: any = {
        panelClass: 'dialog',
        data: {
          header: "",
          message: "",
          button1: { text: "Inactive" },
          button2: { text: "Active" },
        }
      }
      this.dialogRef = this.dialog.open(DialogBoxComponent, modalData);
        this.dialogRef.afterClosed().subscribe(result => {
        
          switch (result) {
            case "Inactive":
              this.statusChange(id,index);
              break;
            case "Active":
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
         
          let allData: PeriodicElement[] = this.listingData;
          this.dataSource = new MatTableDataSource(allData);     
         }
                     
      })    
    }

    routerFunction(id:any){
      this.router.navigateByUrl(this.editPageRoute + id);

    }
    goToAnswerPage(id:any){
      let paramsId:any=id;
      this.router.navigateByUrl(this.addUpdateAnswerRoute.addAnswerRoute+paramsId+'/'+ this.lessonId);
    }
    goToUpdateAnswerPage(id:any){
      let paramsId:any=id;
      this.router.navigateByUrl(this.addUpdateAnswerRoute.updateAnswerRoute+paramsId );
    }
}
