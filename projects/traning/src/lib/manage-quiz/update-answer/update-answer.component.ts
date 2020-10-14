import { Component, OnInit ,Input,ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { DialogBoxComponent } from '../../common/dialog-box/dialog-box.component';
import { MatDialog, MatSort } from '@angular/material';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';


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

  displayedColumns: string[] = ['No','answers','Correct','action'];
  dataSource: MatTableDataSource<PeriodicElement>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

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
    // this.dataSource = this.quizAnswerData;
    this.dataSource = new MatTableDataSource(this.quizAnswerData);

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
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 200);
  }
  

  goToquizList() {
    console.log(this.listingPageRoute + this.lessonId,'++==')
    this.router.navigateByUrl(this.listingPageRoute + this.lessonId);
  }

  // addButton() {
    // this.router.navigateByUrl(this.addPageRoute + this.lessonId);
  // }

  delete(id:any,index){
    this.deleteId = id;
    this.deleteIndex = index;
    let modalData: any = {
      panelClass: 'delete-dialog',
      data: {
        header: "Are you want to delete these record ?",
        // message: "Are you want to delete these record ?",
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
      "token": this.serverDetailsVal.jwttoken,
      "id" : id,
      
    }
    this.apiService.postData(link,data).subscribe((res: any)=>{
      if(res.status="success"){
        this.quizAnswerData.splice(index, 1);
        let allData: PeriodicElement[] = this.quizAnswerData;
        this.dataSource = new MatTableDataSource(allData);
      }
     
    })
  }

  edit(id:any){
    // this.router.navigateByUrl(this.editUrl);
  }
 
}
