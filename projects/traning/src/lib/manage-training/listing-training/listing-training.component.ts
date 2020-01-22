import { Component, OnInit ,ViewChild,Input,Inject} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { ApiService } from '../../api.service';
import { DialogBoxComponent } from '../../common/dialog-box/dialog-box.component';
import { Router } from '@angular/router';
export interface PeriodicElement {
  catagory_name: string;
  description: string;
  priority: string;
  parent_catagory: string;
  status: string;
  deleteRecord:any;
}

export interface DialogData {
  message: string;
}

@Component({
  selector: 'lib-listing-training',
  templateUrl: './listing-training.component.html',
  styleUrls: ['./listing-training.component.css']
})

export class ListingTrainingComponent implements OnInit {
  displayedColumns: string[] = ['catagory_name', 'description', 'priority', 'parent_catagory','status','deleteRecord'];
  dataSource: MatTableDataSource<PeriodicElement>;
  public listingData :any=[];
  public dialogRef: any;
  public deleteId : any;
  public deleteIndex : any;
  public serverDetailsVal : any;
  public formSourceVal : any;
  public editPageRoute : any;
  public addPageRoute : any;
  public searchSourceName:any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @Input()           //getting all data from application
  set allDataList(val: any) {
    this.listingData = (val) || 'no name set';
    this.listingData = val;
    this.dataSource = this.listingData;
    this.dataSource.paginator = this.paginator;

    console.log("ggggggggggg",this.listingData);
  }
  @Input()
  set serverDetails(serverDetails: {}) {
    this.serverDetailsVal = (serverDetails) || '<no name set>';
    console.log(this.serverDetailsVal);
  }
  @Input()
  set formSource(formSource: any) {
    this.formSourceVal = (formSource) || '<no name set>';
    console.log("form source",this.formSourceVal);
  }
  @Input()
  set EditPageRoute(val: any) {
    this.editPageRoute = (val) || '<no name set>';
    console.log("form source",this.editPageRoute);
  }

  @Input()
  set AddPageRoute(val: any) {
    this.addPageRoute = (val) || '<no name set>';
    console.log("form source",this.addPageRoute);
  }

  @Input()
  set SearchSourceName(val: any) {
    this.searchSourceName = (val) || '<no name set>';
    console.log("form source",this.searchSourceName);
  }

  constructor(public dialog: MatDialog,public apiService : ApiService,public router :Router) { 

  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
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
    
      let searchJson: any = {};
      searchJson[key] = value.toLowerCase();
      let link = this.serverDetailsVal.serverUrl + this.formSourceVal.searchEndpoint;
      var data = {
        "source": this.searchSourceName,
        "condition": searchJson,
        "token": this.serverDetailsVal.jwttoken
      }
      this.apiService.postData(link,data).subscribe(Response => {
        console.log("resulr searchhh",Response);
          // this.dataSource = Response.res;
        });
    
  }
}

