import { Component, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar } from "@angular/material";
import { ApiService } from '../../api.service';
import { DialogBoxComponent } from '../../common/dialog-box/dialog-box.component';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Action } from 'rxjs/internal/scheduler/Action';
import { DomSanitizer } from '@angular/platform-browser';




export interface PeriodicElement {
  _id: string;
  select: string;
  no: number;
  lession_title: string;
  description: string;
  test_associate_training: string;
  mediaType: string;
  associated_training: string;
  prerequisite_lession: string;
  status: string;
  deleteRecord: any;
}
export interface AudioVideoDialog {
  type_flag: any;
  data_array: any;
  video_base_url; any;
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
  displayedColumns: string[] = [];
  // dataSource: MatTableDataSource<PeriodicElement>;

  public dataSource: any;
  public listingData: any = [];
  public allDatAfterDelete: any = [];
  public dialogRef: any;
  public deleteId: any;
  public deleteIndex: any;
  public serverDetailsVal: any;
  public formSourceVal: any;
  public editPageRoute: any;
  public addPageRoute: any;
  public searchSourceName: any;
  public manageQuizRoute: any;
  public quizPageRoute: any;
  public allLessonData: any = [];
  public lessonsDataArray: any = [];
  public lessonName: any;
  public status: any;
  public training: any;
  public testAvailability: any;
  public idArray: any = [];
  public allTrashData: any = [];
  public trashFlag: any = 0;
  public dnaFlag: any;
  public trashButtonText: any = "View Trash";
  public trainingCounts: any = {
    "activatedtrainingcount": "",
    "activatedlessoncount": "",
    "trashedtrainingcount": "",
    "trashedlessoncount": "",
    "totaltrainingcount": " ",
    "totallessoncount": " "
  };
  public training_data_Counts: any;
  public status_search_regex: any;
  public searchjson: any = {
    "lession_title_search_regex": "",
    "prerequisite_lession_search_regex": "",
    "has_test_lesson": "",
    "associated_training_search_regex": "",
    "has_lessonplan_regex": "",
    "lessonplan_value_regex": ""
  }
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  selection = new SelectionModel<PeriodicElement>(true, []);



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
  // QuizPageRoute
  @Input()
  set QuizPageRoute(val: any) {
    this.quizPageRoute = (val) || '<no name set>';
  }
  @Input()
  set IsItDna(val: any) {
    this.dnaFlag = val;
    // console.log("dna flag",this.dnaFlag);

  }
  constructor(public dialog: MatDialog, public apiService: ApiService, public router: Router, public snakBar: MatSnackBar, public sanitizer: DomSanitizer) {
    setTimeout(() => {
      this.trainingCount();

    }, 500);
  }

  ngOnInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 100);

    this.getAllLessonData();
    if (this.dnaFlag == true) {
      this.displayedColumns.push('select', 'no', 'lession_title', 'description', 'mediaType', 'associated_training', 'prerequisite_lession', 'has_lessonplan', 'lessonplan_value', 'has_test_lesson', 'test_percentage', 'status', 'deleteRecord');
    } else {
      this.displayedColumns.push('select', 'no', 'lession_title', 'description', 'mediaType', 'associated_training', 'prerequisite_lession', 'status', 'deleteRecord');
    }

  }

  trainingCount() {
    let link = this.serverDetailsVal.serverUrl + this.formSourceVal.trainingCountEndpoint;
    this.apiService.postDatawithoutTokenReportCount(link).subscribe((response: any) => {
      // console.log(response,'response')

      this.trainingCounts.activatedtrainingcount = response.results.activatedtrainingcount;
      this.trainingCounts.activatedlessoncount = response.results.activatedlessoncount;
      this.trainingCounts.trashedtrainingcount = response.results.trashedtrainingcount;
      this.trainingCounts.trashedlessoncount = response.results.trashedlessoncount;
      this.trainingCounts.totaltrainingcount = response.results.totaltraining;
      this.trainingCounts.totallessoncount = response.results.totallesson;

    })


  }
  // for multiple select function start here
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.no + 1}`;
  }
  // for multiple select function end here

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
      "token": this.serverDetailsVal.jwttoken,
      "lesson_id": recordId
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
  filter() {
    let link = this.serverDetailsVal.serverUrl + this.formSourceVal.searchEndpoint;
    let searchval: any = {};

    //  console.log(this.status_search_regex,this.trashFlag)

    if (typeof (this.status_search_regex) != 'undefined') {
      searchval["status_search"] = this.status_search_regex;
    } else {
      searchval["status_search"] = 1;
    }

    if (this.dnaFlag == true) {

      searchval["has_lessonplan_search"] = { $regex: this.searchjson.has_lessonplan_regex.toLowerCase() }
      searchval["lessonplan_value_search"] = { $regex: this.searchjson.lessonplan_value_regex.toLowerCase() }

      if (this.searchjson.has_test_lesson != null && this.searchjson.has_test_lesson != '') {
        searchval["has_test_lesson"] = parseInt(this.searchjson.has_test_lesson);
      }
    }


    searchval["lession_title_search"] = { $regex: this.searchjson.lession_title_search_regex.toLowerCase() }
    searchval["prerequisite_lession_search"] = { $regex: this.searchjson.prerequisite_lession_search_regex.toLowerCase() }

    searchval["associated_training_search"] = { $regex: this.searchjson.associated_training_search_regex.toLowerCase() }


    var data = {
      "source": this.searchSourceName,
      "condition": searchval,
      "token": this.serverDetailsVal.jwttoken
    }
    if (this.trashFlag == 1) {
      data.condition['is_trash'] = { $eq: 1 }
    } else {
      data.condition['is_trash'] = { $ne: 1 }
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


  //for go To Manage lesson plan material page

  manageLessonPlan(id: any) {
    this.router.navigateByUrl(this.manageQuizRoute + id);
  }

  //for go To Manage Quiz Page
  goToManageQuizPage(id: any) {
    // console.log(id,this.quizPageRoute)
    this.router.navigateByUrl(this.quizPageRoute + id);
  }


  getAllLessonData() {
    let link = this.serverDetailsVal.serverUrl + this.formSourceVal.searchEndpoint;
    let data: any = {
      "source": this.formSourceVal.associatedTrainingSourceName,
      "token": this.serverDetailsVal.jwttoken
    }
    this.apiService.postData(link, data).subscribe((response: any) => {
      let result: any;
      if (response.status = "success") {
        result = response.res;
        this.allLessonData = result;
        const map = new Map();
        for (const item of this.allLessonData) {
          if (item.associated_training != 'NA' && item.associated_training != null) {
            if (!map.has(item.associated_training)) {
              map.set(item.associated_training, true);    // set any value to Map
              this.lessonsDataArray.push({
                'val': item.associated_training,
                'name': item.associated_training
              });
            }
          }
        }
      }

    })
  }


  resetSearch() {
    this.searchjson = {
      "lession_title_search_regex": "",
      "prerequisite_lession_search_regex": "",
      "has_test_lesson": "",
      "associated_training_search_regex": "",
      "has_lessonplan_regex": "",
      "lessonplan_value_regex": ""
    }
    this.status_search_regex = '';
    this.dataSource = new MatTableDataSource(this.listingData);

  }
  statusUpdateModal(id: any, index: any) {
    let modalData: any = {
      panelClass: 'delete-dialog',
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
    let data: any = {
      "source": this.formSourceVal.statusUpdateSourceName,
      "_id": id,
      "status": currentStatus
    }
    this.apiService.postDatawithoutToken(link, data).subscribe((response: any) => {
      let result: any;
      if (response.status = true) {
        // if(this.listingData[index].status=="Active"){
        //   this.listingData[index].status = "Inactive"
        // }else{
        //   this.listingData[index].status = "Active"

        // }
        let allData: PeriodicElement[] = this.listingData;
        this.dataSource = new MatTableDataSource(allData);
      }

    })
  }
  deleteAllRecordModalFunction() {

    let modalData: any = {
      panelClass: 'delete-dialog',
      data: {
        header: "Are you want to delete these all record ?",
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
          this.deleteAllRecords();
          break;
      }
    });

  }



  deleteAllRecords() {
    for (let c in this.selection.selected) {
      this.idArray.push(this.selection.selected[c]._id);
    }
    let temparr: any = [];
    let link = this.serverDetailsVal.serverUrl + this.formSourceVal.deleteManyEndpoint;
    let source: any = this.formSourceVal.source;
    let token: any = this.serverDetailsVal.jwttoken;
    for (let val in this.listingData) {
      if (this.idArray.includes(this.listingData[val]._id) == true) {
        temparr.push(val);

      }
    }
    this.apiService.deteteManyTrainingData(link, this.idArray, token, source).subscribe((res: any) => {
      // res.data.ids;
      if (res.status == "success") {
        setTimeout(() => {
          for (let i in temparr) {
            let tval: any = temparr[i] - parseInt(i);
            this.listingData.splice(tval, 1);
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

  statusUpdateAllRecords() {
    for (let c in this.selection.selected) {
      this.idArray.push(this.selection.selected[c]._id);
    }
    let ids: any = this.idArray;
    let modalData: any = {
      panelClass: 'statusupdate-dialog',
      data: {
        header: "You are about to change status of these record(s)",
        message: "",
        button1: { text: "Inactive" },
        button2: { text: "Active" },
      }
    }
    this.dialogRef = this.dialog.open(DialogBoxComponent, modalData);
    this.dialogRef.afterClosed().subscribe(result => {
      let resval = result;
      if (result == "Active") {
        result = 1;
      }
      if (result == "Inactive") {
        result = 0;
      }
      let link = this.serverDetailsVal.serverUrl + this.formSourceVal.statusUpdateManyEndpoint;
      let source: any = this.formSourceVal.source;
      let token: any = this.serverDetailsVal.jwttoken;

      this.apiService.togglestatusmany(link, ids, result, token, source).subscribe((response: any) => {
        if (response.status == "success") {
          let message: any = "Status Updated Successfully";

          let action: any = "Ok";
          this.snakBar.open(message, action, {
            duration: 3000
          })
          for (let c in this.selection.selected) {
            for (let b in this.listingData) {
              if (this.selection.selected[c]._id == this.listingData[b]._id) {
                // console.log(this.selection.selected[c],result, '>>', this.listingData[b])

                if (result == 1) {
                  this.listingData[b].status = 1;
                  // console.log(this.listingData[b].status, '??')
                }
                if (result == 0) {
                  this.listingData[b].status = 0;
                  // console.log(this.listingData[b].status, '?_?')

                }
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
  viewTrash() {
    switch (this.trashButtonText) {
      case 'View Trash':
        this.trashFlag = 1 - this.trashFlag;
        let link = this.serverDetailsVal.serverUrl + this.formSourceVal.searchEndpoint;
        let data: any = {
          "source": this.formSourceVal.trashDataSource,
          "token": this.serverDetailsVal.jwttoken,
          "condition": {
            is_trash: { $eq: 1 }
          }
        }
        this.apiService.postData(link, data).subscribe((response: any) => {
          this.trashButtonText = "Hide Trash";
          this.allTrashData = response.res;
          this.dataSource = new MatTableDataSource(this.allTrashData);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

        })
        break;
      case 'Hide Trash':
        this.trashButtonText = "View Trash";
        this.dataSource = new MatTableDataSource(this.listingData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        break;
    }


  }
  restoreTrashData(trashId: any, index: any) {
    let link = this.serverDetailsVal.serverUrl + this.formSourceVal.retriveTrashDataEndpoint;
    let data: any = {
      "source": this.formSourceVal.retriveTrashDataSourceName,
      "token": this.serverDetailsVal.jwttoken,
      "id": trashId,
      "lesson_id": trashId
    }
    this.apiService.postData(link, data).subscribe((response: any) => {
      if (response.status == "success") {
        this.allTrashData.splice(index, 1);
        let allTrashData: PeriodicElement[] = this.allTrashData;
        this.dataSource = new MatTableDataSource(allTrashData);
        let message: any = "Successfully Restored This Record";
        let action: any = "Ok";
        this.snakBar.open(message, action, {
          duration: 3000
        })
      }

    })
  }
  openModalForAudioVideoFile(flag, data) {
    console.log(flag, "======element", data, 'data');
    let data_array: any = [];
    let val: any = data.video_url;
    let video_base_url: any
    console.log(data, 'fgthyjkl;')

    switch (flag) {
      case 'audioflag':
        data_array = data.audio_array;
        break;
      case 'fileflag':
        data_array = data.file_array;
        break;
      case 'videoflag':
        data_array = data.video_array;


        break;

    }

    console.log(data_array, 'data_array')

    const dialogRef = this.dialog.open(AudioVideoFileDialogComponent, {
      panelClass: 'lesson_videomodal',
      width: '800px',
      height: '500px',
      data: { 'data_array': data_array, 'type_flag': flag, 'video_base_url': video_base_url, 'val': val }
    });
    // dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {

    })

  }

}
@Component({
  selector: 'AudioVideoFileDialog',
  templateUrl: 'AudioVideoFileDialogComponent.html',
  styleUrls: ['./AudioVideoFileDialogComponent.css']

})
export class AudioVideoFileDialogComponent {
  type_flag: any;
  bucket_url: any = 'https://training-centre-bucket.s3.amazonaws.com/lesson-files/';
  data_array: any = {};
  video_base_url: any = 'https://www.youtube.com/embed/';
  video_id: any;

  public video_arr:any=[];


  constructor(
    public dialogRef: MatDialogRef<AudioVideoFileDialogComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: AudioVideoDialog, public sanitizer: DomSanitizer) {

    this.data_array = data.data_array;



    if (data.type_flag == 'videoflag') {

      for (let i in data.data_array) {
        console.log(data.data_array[i])

        var url = this.video_base_url + data.data_array[i].video_url + '?rel=0&modestbranding=1&autoplay=0';

        console.log(url,'url')

        data.data_array[i].safe_url = this.sanitizer.bypassSecurityTrustResourceUrl(url);


        this.video_arr.push(data.data_array[i])
      }

      console.log( data.data_array,' data.data_array')

    }


  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}

