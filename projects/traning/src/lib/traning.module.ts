// import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { AddAudioVideoFileDialogComponent, TraningComponent, videoDialogComponent } from './traning.component';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApiService } from './api.service';
import { CommonModule } from '@angular/common';
// import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { DemoMaterialModule } from './material-module';
import { AddEditLessionsComponent } from './manage-lessions/add-edit-lessions/add-edit-lessions.component';
import { AddEditCenterComponent } from './training-center/add-edit-center/add-edit-center.component';
import { ListingTrainingComponent } from './manage-training/listing-training/listing-training.component';
import { DialogBoxComponent } from './common/dialog-box/dialog-box.component';
import { AudioVideoFileDialogComponent, ListLessionComponent } from './manage-lessions/list-lession/list-lession.component';
import { CKEditorModule } from 'ngx-ckeditor';
import { FileUploadModule} from 'file-upload-lib-influxiq';
import { ListComponent,Dialogtest } from './training-center/list/list.component';
import { ManageQuizComponent, questionDataModalComponent } from './manage-quiz/manage-quiz.component';
import { AddEditComponent } from './manage-quiz/add-edit/add-edit.component';
import { AddUpdateAnswerComponent } from './manage-quiz/add-update-answer/add-update-answer.component';
import { UpdateAnswerComponent } from './manage-quiz/update-answer/update-answer.component';
// import { LoginComponent } from './login/login.component';
import { LoginfortrainingComponent } from './loginfortraining/loginfortraining.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { TrainingreportComponent } from './trainingreport/trainingreport.component';
import { DatePipe } from '@angular/common';
import { CategoryWiseReportComponent } from './category-wise-report/category-wise-report.component';
import { TrainingCenterDnaComponent, PurchaseModalComponent, ReviewLessonPlanComponent, ScheduleModalComponent, UnlockLessonModalComponent, LessonVideoModalComponent, LessonQuizModalComponent, PreviewContentDialog } from './training-center-dna/training-center-dna.component';
import { LessonPlanMaterialComponent } from './lesson-plan-material/lesson-plan-material.component';
import { ListingModule } from 'listing-angular7';
// import { CKEditorModule } from 'ngx-ckeditor';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { ListQuizComponent } from './manage-quiz/list-quiz/list-quiz.component';
import { AddEditQuizComponent } from './manage-quiz/add-edit-quiz/add-edit-quiz.component';
import { AudioServiceService } from './audio-service.service';
import {  DetailsPipe } from './pipe/details.pipe';
import { TrainingCentreBetoParedesComponent ,PreviewContentDialogBeto, BetoparedesLessonVideoModalComponent, LessonQuizBetoparedesModalComponent} from './training-centre-beto-paredes/training-centre-beto-paredes.component';



@NgModule({
  declarations: [
    TraningComponent,
    AddEditLessionsComponent,
    AddEditCenterComponent,
    ListingTrainingComponent,
    DialogBoxComponent,
    ListLessionComponent,
    ListComponent,
    Dialogtest,
    ManageQuizComponent,
    AddEditComponent,
    AddUpdateAnswerComponent,
    UpdateAnswerComponent,
    // LoginComponent,
    LoginfortrainingComponent,
    TrainingreportComponent,
    CategoryWiseReportComponent,
    TrainingCenterDnaComponent,
    LessonPlanMaterialComponent,
    PurchaseModalComponent,
    ReviewLessonPlanComponent,
    ScheduleModalComponent,
    questionDataModalComponent,
    UnlockLessonModalComponent,
    videoDialogComponent,
    LessonVideoModalComponent,
    ListQuizComponent,
    AddEditQuizComponent,
    LessonQuizModalComponent,
    AddAudioVideoFileDialogComponent,
    AudioVideoFileDialogComponent,
    PreviewContentDialog,
    DetailsPipe,
    TrainingCentreBetoParedesComponent,
    PreviewContentDialogBeto,
    BetoparedesLessonVideoModalComponent,
    LessonQuizBetoparedesModalComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    // BrowserModule,
    // BrowserAnimationsModule,
    DemoMaterialModule,
    CKEditorModule,
    FileUploadModule,
    MatCarouselModule.forRoot(),
    ListingModule,
    CKEditorModule,
    NgxYoutubePlayerModule.forRoot()
  ],
  exports: [TraningComponent,ListingTrainingComponent,AddEditLessionsComponent,ListLessionComponent,LoginfortrainingComponent,AddEditCenterComponent,ListComponent,ManageQuizComponent,AddEditComponent,AddUpdateAnswerComponent,UpdateAnswerComponent,Dialogtest,TrainingreportComponent,CategoryWiseReportComponent,TrainingCenterDnaComponent,LessonPlanMaterialComponent,ListQuizComponent,AddEditQuizComponent,TrainingCentreBetoParedesComponent
  ],
  
  schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [CookieService, ApiService,DatePipe,AudioServiceService],
  entryComponents:[DialogBoxComponent,Dialogtest,PurchaseModalComponent,ReviewLessonPlanComponent,ScheduleModalComponent,questionDataModalComponent,UnlockLessonModalComponent,videoDialogComponent,LessonVideoModalComponent,LessonQuizModalComponent,AddAudioVideoFileDialogComponent,AudioVideoFileDialogComponent,PreviewContentDialog,PreviewContentDialogBeto,BetoparedesLessonVideoModalComponent,LessonQuizBetoparedesModalComponent]
})
export class TraningModule { }