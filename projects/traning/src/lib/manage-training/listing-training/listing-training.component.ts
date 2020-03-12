import { Component, OnInit ,ViewChild,Input,Inject} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections';

import {MatTableDataSource} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar } from "@angular/material";
import { ApiService } from '../../api.service';
import { DialogBoxComponent } from '../../common/dialog-box/dialog-box.component';
import { Router } from '@angular/router';


export interface PeriodicElement {
  _id:string;
  select:string;
  no:number;
  catagory_name: string;
  description: string;
  priority: string;
  parent_catagory: string;
  status: string;
  deleteRecord: any;
}
const ALLDATA: PeriodicElement[] = [];
export interface DialogData {
  message: string;
}

@Component({
  selector: 'lib-listing-training',
  templateUrl: './listing-training.component.html',
  styleUrls: ['./listing-training.component.css']
})

export class ListingTrainingComponent implements OnInit {
  displayedColumns: string[] = ['select','no','catagory_name', 'description', 'priority', 
  'parent_catagory', 'status', 'deleteRecord'];
  public dataSource: any;
  public listingData: any = [];
  public dialogRef: any;
  public deleteId: any;
  public deleteIndex: any;
  public serverDetailsVal: any;
  public formSourceVal: any;
  public editPageRoute: any;
  public addPageRoute: any;
  public searchSourceName: any;
  public additionalinfo: any;
  public searchResults: any = [];
  public trainingTitle:any;
  public status:any
  public idArray:any=[];
  public allTrashData:any=[];
  public trashFlag:any=0;
  public trashButtonText:any="View Trash";
  public trainingCounts:any={
    "activatedtrainingcount":"",
    "activatedlessoncount":"",
    "trashedtrainingcount":"",
    "trashedlessoncount":"",
    "totaltrainingcount":" ",
    "totallessoncount":" "
  };
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
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
    // this.dataSource.paginator = this.paginator;
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
  set AddPageRoute(val: any) {
    this.addPageRoute = (val) || '<no name set>';
  }

  @Input()
  set SearchSourceName(val: any) {
    this.searchSourceName = (val) || '<no name set>';
  }

  constructor(public dialog: MatDialog, public apiService: ApiService, public router: Router,public snakBar:MatSnackBar) {
   setTimeout(() => {
    this.trainingCount();
   }, 500);
    
  }

  ngOnInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    }, 100);

  }
  trainingCount(){
    let link = this.serverDetailsVal.serverUrl + this.formSourceVal.trainingCountEndpoint;
    this.apiService.postDatawithoutTokenReportCount(link).subscribe((response:any)=>{
        this.trainingCounts.activatedtrainingcount = response.activatedtrainingcount;
        this.trainingCounts.activatedlessoncount = response.activatedlessoncount;
        this.trainingCounts.trashedtrainingcount = response.trashedtrainingcount;
        this.trainingCounts.trashedlessoncount = response.trashedlessoncount;
        this.trainingCounts.totaltrainingcount = response.totaltrainingcount;
        this.trainingCounts.totallessoncount = response.totallessoncount;
    })
  }

  deleteRecord(id: any, index: any) {
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
          this.deleteFunction(id, index);
          break;
      }
    });

  }
  deleteFunction(recordId: any, index: number) {

    let link = this.serverDetailsVal.serverUrl + this.formSourceVal.endpoint;
    let data: any = {
      "source": this.formSourceVal.source,
      "id": recordId,
      "token": this.serverDetailsVal.jwttoken,
      "associated_training":recordId
    }
    this.apiService.postData(link, data).subscribe((res: any) => {
      if (res.status = "success") {
        this.listingData.splice(index, 1);
        let allData: PeriodicElement[] = this.listingData;
        this.dataSource = new MatTableDataSource(allData);
      }

    })

  }
  routerFunction(paramId: any) {
    this.router.navigateByUrl(this.editPageRoute + paramId);
  }
  addButton() {
    this.router.navigateByUrl(this.addPageRoute);

  }

  filterByTrainingName(key: string, value: string) {
  if(value == "Select a status"){
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
    this.apiService.postData(link, data).subscribe(response => {
      let result: any = response;
      this.dataSource = result.res;
      let allData: PeriodicElement[] = this.dataSource;
      this.dataSource = new MatTableDataSource(allData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
 

  }
  resetSearch(){
    this.trainingTitle = "";
    this.status = "";
    this.dataSource = new MatTableDataSource(this.listingData);

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
  deleteAllRecordModalFunction(){
    
    let modalData: any = {
      panelClass: 'delete-dialog',
      data: {
        header: "Message",
        message: "Are you want to delete these all record ?",
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
            this.deleteAllRecords();
            break;
        }
      });
    
    }

  

  deleteAllRecords(){
    for (let c in this.selection.selected) {
      this.idArray.push(this.selection.selected[c]._id);
    }
    let temparr:any=[];
    let link = this.serverDetailsVal.serverUrl + this.formSourceVal.deleteManyEndpoint;
    let source :any= this.formSourceVal.source;
    let token:any= this.serverDetailsVal.jwttoken
    for (let val in this.listingData) {
      if(this.idArray.includes(this.listingData[val]._id)==true){
        temparr.push(val);
        
      }   
    } 
    this.apiService.deteteManyTrainingData(link,this.idArray,token,source).subscribe((res:any)=>{
    
        // res.data.ids;
        if(res.status == "success"){
          setTimeout(() => {
            for(let i in temparr){
              let tval:any=temparr[i]-parseInt(i);
              this.listingData.splice(tval,1);
            }
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.selection.clear();
            let allData: PeriodicElement[] = this.listingData;
            this.dataSource = new MatTableDataSource(allData);
          }, 1000);
        }
        
        
   })

  }


  statusUpdateAllRecords(){
    for (let c in this.selection.selected) {
      this.idArray.push(this.selection.selected[c]._id);
    }
    let ids:any=this.idArray;
    let modalData: any = {
      panelClass: 'statusupdate-dialog',
      data: {
        header: "",
        message: "",
        button1: { text: "Inactive" },
        button2: { text: "Active" },
      }
    }
    this.dialogRef = this.dialog.open(DialogBoxComponent, modalData);
      this.dialogRef.afterClosed().subscribe(result => {
      let resval=result;
      if (result == "Active")
        result = parseInt("1");
      else
        result = parseInt("0");

      let link = this.serverDetailsVal.serverUrl + this.formSourceVal.statusUpdateManyEndpoint;
      let source :any= this.formSourceVal.source;
      let token:any= this.serverDetailsVal.jwttoken;
      
      this.apiService.togglestatusmany(link,ids,result,token,source).subscribe((response:any)=>{
       if(response.status == "success"){
         let message:any = "Status Updated Successfully";
         
         let action : any="Ok";
         this.snakBar.open(message,action,{
           duration:3000
         })
         for(let c in this.selection.selected){
          for(let b in this.listingData){
            if(this.listingData[b]._id==this.selection.selected[c]._id){
              this.listingData[b].status=resval;
            }
          }
        }
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.selection.clear();
            let allData: PeriodicElement[] = this.listingData;
            this.dataSource = new MatTableDataSource(allData);        

       }
      
      })

      });
    
  }
  viewTrash(){
    this.trashFlag = 1-this.trashFlag;
    if(this.trashFlag==1){
       this.trashButtonText="Hide Trash";
    }
    let link = this.serverDetailsVal.serverUrl + this.formSourceVal.searchEndpoint;
    let data:any = {
      "source" :   this.formSourceVal.trashDataSource,
      "token": this.serverDetailsVal.jwttoken,
      "condition":{
        is_trash: {$eq: 1}
      }
    }
    this.apiService.postData(link,data).subscribe((response: any)=>{
      this.allTrashData = response.res;
      this.dataSource = new MatTableDataSource(this.allTrashData);
     
    })

  }
  restoreTrashData(trashId:any,index:any){
    let link = this.serverDetailsVal.serverUrl + this.formSourceVal.retriveTrashDataEndpoint;
   let data:any={
     "source":this.formSourceVal.retriveTrashDataSourceName,
     "token":this.serverDetailsVal.jwttoken,
     "id":trashId,
     "associated_training":trashId
   }
   this.apiService.postData(link,data).subscribe((response: any)=>{
    if(response.status=="success"){
      this.listingData.splice(index, 1);
      let allTrashData: PeriodicElement[] = this.listingData;
      this.dataSource = new MatTableDataSource(allTrashData);
      let message:any = "Successfully Restored This Record";
      let action : any="Ok";
      this.snakBar.open(message,action,{
        duration:3000
      })
    }
   
  })
  }
}

