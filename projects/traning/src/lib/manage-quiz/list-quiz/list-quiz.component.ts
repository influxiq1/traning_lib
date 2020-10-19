import { Component, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { ApiService } from '../../api.service';
import { DialogBoxComponent } from '../../common/dialog-box/dialog-box.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PeriodicElement } from '../../manage-training/listing-training/listing-training.component';


@Component({
  selector: 'lib-list-quiz',
  templateUrl: './list-quiz.component.html',
  styleUrls: ['./list-quiz.component.css']
})
export class ListQuizComponent implements OnInit {

  public lessonPageRoute: any;
  public serverDetailsVal: any;
  public formSourceVal: any;
  public editPageRoute: any;
  public deleteId: any;
  public deleteIndex: any;
  public dialogRef: any;
  public addUpdateAnswerRoute: any;
  public dataSource: any;
  public listingData: any = [];
  displayedColumns: string[] = ['No', 'question', 'description_html', 'question_type', 'priority', 'status', 'created_at', 'deleteRecord'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;


  public paramsId: any;
  public lessonId: any;
  public addPageRoute: any;
  public lessonList: any;

  @Input()           //getting all data from application
  set allDataList(val: any) {
    this.listingData = (val) || 'no name set';
    this.listingData = val;
    this.dataSource = new MatTableDataSource(this.listingData);
    // console.log(this.listingData, 'listingData')
  }
  @Input()
  set AddPageRoute(val: any) {
    this.addPageRoute = (val) || '<no name set>';
  }
  @Input()
  set LessonList(val: any) {
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
  set LessonId(id: any) {
    this.lessonId = (id) || '<no name set>';
  }


  constructor(public dialog: MatDialog, public apiService: ApiService, public router: Router) {

    // console.log(this.listingData,'>>>>>')


  }

  ngOnInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    }, 100);
  }

  addButton() {
    this.router.navigateByUrl(this.addPageRoute + this.lessonId);
  }

  goTolessonList() {
    // console.log(this.lessonPageRoute,'lessonList')
    this.router.navigateByUrl(this.lessonPageRoute);
  }


  // routerFunction
  routerFunction(id: any) {
    this.router.navigateByUrl(this.editPageRoute + id + '/' + this.lessonId);
  }

  goToAnswerPage(id:any){
    this.router.navigateByUrl(this.addUpdateAnswerRoute.addAnswerRoute + id + '/' +this.lessonId);
  }

  goToUpdateAnswerPage(id: any) {
    this.router.navigateByUrl(this.addUpdateAnswerRoute.updateAnswerRoute + id + '/' +this.lessonId);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  deleteRecord(id: any, index: any) {
    this.deleteId = id;
    this.deleteIndex = index;
    let modalData: any = {
      panelClass: 'delete-dialog',
      data: {
        header: "Are you want to delete these record ?",
        message: "",
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
      "token": this.serverDetailsVal.jwttoken
    }
    this.apiService.postData(link, data).subscribe((res: any) => {
      if (res.status = "success") {
        this.listingData.splice(index, 1);
        let allData: PeriodicElement[] = this.listingData;
        this.dataSource = new MatTableDataSource(allData);
      }

    })

  }
  statusUpdateModal(id: any, index: any) {
    let modalData: any = {
      panelClass: 'dialog',
      data: {
        header: "You are about to change status of these record(s)",
        message: "",
        button1: { text: "Inactive" },
        button2: { text: "Active" },
      }
    }
    this.dialogRef = this.dialog.open(DialogBoxComponent, modalData);
    this.dialogRef.afterClosed().subscribe(result => {
      let currentStatus: any;
      if (result == 'Inactive') {
        currentStatus = 0;
      } else {
        currentStatus = 1
      }
      switch (result) {
        case "Inactive":
          this.statusChange(id, index, currentStatus);
          break;
        case "Active":
          this.statusChange(id, index, currentStatus);
          break;
      }
    });

  }
  statusChange(id: any, index: any, currentStatus: any) {
    let link = this.serverDetailsVal.serverUrl + this.formSourceVal.statusUpdateEndpoint;
    let data1: any = {
      "source": this.formSourceVal.statusUpdateSourceName,
      data: {
        "id": id,
        "status": currentStatus
      }
    }
    this.apiService.postDatawithoutToken(link, data1).subscribe((response: any) => {
      let result: any;
      if (response.status = 'success') {
        this.listingData[index].status = currentStatus;
        // if (this.listingData[index].status == "Active") {
        //   this.listingData[index].status = "Inactive"
        // } else {
        //   this.listingData[index].status = "Active"
        // }

        // for(let i in this.listingData){
        //   if(this.listingData[i]._id == id){
        //   }
        // }

        let allData: PeriodicElement[] = this.listingData;
        this.dataSource = new MatTableDataSource(allData);
      }

    })
  }




}
