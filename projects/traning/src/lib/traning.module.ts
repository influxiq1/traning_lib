import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { TraningComponent } from './traning.component';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApiService } from './api.service';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { DemoMaterialModule } from './material-module';
import { AddEditLessionsComponent } from './manage-lessions/add-edit-lessions/add-edit-lessions.component';
import { AddEditCenterComponent } from './training-center/add-edit-center/add-edit-center.component';
import { ListingTrainingComponent } from './manage-training/listing-training/listing-training.component';
import { DialogBoxComponent } from './common/dialog-box/dialog-box.component';
import { ListLessionComponent } from './manage-lessions/list-lession/list-lession.component';
import { CKEditorModule } from 'ngx-ckeditor';
import { FileUploadModule} from 'file-upload-lib-influxiq';
import { ListComponent } from './training-center/list/list.component';

@NgModule({
  declarations: [
    TraningComponent,
    AddEditLessionsComponent,
    AddEditCenterComponent,
    ListingTrainingComponent,
    DialogBoxComponent,
    ListLessionComponent,
    ListComponent
    
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    CKEditorModule,
    FileUploadModule
    
  ],
  exports: [TraningComponent,ListingTrainingComponent,AddEditLessionsComponent,ListLessionComponent,AddEditCenterComponent,ListComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [CookieService, ApiService],
  entryComponents:[DialogBoxComponent]
})
export class TraningModule { }