import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { ActivatedRoute, Router } from '@angular/router';
export interface DialogData { 
  header: string,
  message: string,
  button1: { text: string },
  button2: { text: string },
}
@Component({
  selector: 'lib-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})

export class DialogBoxComponent implements OnInit {
  public data: any;

  constructor(public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData, public router: Router) {
    this.data = dialogData;
  }

  ngOnInit() {
  }
  button1() {
    this.dialogRef.close(this.data.button1.text);
  }

  button2() {
    this.dialogRef.close(this.data.button2.text);
  }

}
