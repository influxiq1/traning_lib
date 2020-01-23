import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TraningModule } from 'projects/traning/src/public-api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from './material-module';
import { routing } from './route';
import { AddEditTrainingComponent } from './manage-training/add-edit-training/add-edit-training.component';
import { AddEditLessionsComponent } from './manage-lessions/add-edit-lessions/add-edit-lessions.component';
import { AddEditCenterComponent } from './training-center/add-edit-center/add-edit-center.component';
import { ListingTrainingComponent } from './manage-training/listing-training/listing-training.component';
import { ListLessionComponent } from './manage-lessions/list-lession/list-lession.component';
import { ListComponent } from './training-center/list/list.component';
import { ManageQuizComponent } from './manage-quiz/manage-quiz.component';
import { AddEditComponent } from './manage-quiz/add-edit/add-edit.component';
import { AddUpdateAnswerComponent } from './manage-quiz/add-update-answer/add-update-answer.component';
import { UpdateAnswerComponent } from './manage-quiz/update-answer/update-answer.component';


@NgModule({
  declarations: [
    AppComponent,
    AddEditTrainingComponent,
    AddEditLessionsComponent,
    AddEditCenterComponent,
    ListingTrainingComponent,
    ListLessionComponent,
    ListComponent,
    ManageQuizComponent,
    AddEditComponent,
    AddUpdateAnswerComponent,
    UpdateAnswerComponent,
  ],
  imports: [
    routing,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserModule,
    CommonModule,
    TraningModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forRoot([]),
    DemoMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
