
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AddEditLessionsComponent } from '../app/manage-lessions/add-edit-lessions/add-edit-lessions.component';
import { AddEditTrainingComponent } from './manage-training/add-edit-training/add-edit-training.component';
import { AddEditCenterComponent } from './training-center/add-edit-center/add-edit-center.component';
import { ListingTrainingComponent } from './manage-training/listing-training/listing-training.component';
import { ResolveService } from './service/resolve.service';
import { ListLessionComponent } from './manage-lessions/list-lession/list-lession.component';
import { ListComponent } from './training-center/list/list.component';
import { ManageQuizComponent } from './manage-quiz/manage-quiz.component';
import { AddEditComponent } from './manage-quiz/add-edit/add-edit.component';
import { AddUpdateAnswerComponent } from './manage-quiz/add-update-answer/add-update-answer.component';
import { UpdateAnswerComponent } from './manage-quiz/update-answer/update-answer.component';
const appRoutes: Routes = [
    { path: 'home', component: AppComponent },
    { path: 'home/:id', component: AppComponent },
    /**Lession Management **/
    { path: 'manage-lession/add', component: AddEditLessionsComponent },

    { path: 'manage-lession/list', component : ListLessionComponent,
    resolve: { lessionData: ResolveService }, 
    data: { requestcondition: { source: 'manage_lession_view', condition: {} }, endpoint: 'datalist' }},
    { path: 'manage-lession/edit/:id', component: AddEditLessionsComponent },

   /**Training Management**/
    { path: 'manage-training/add', component: AddEditTrainingComponent },

    {
        path: 'manage-training/list', component: ListingTrainingComponent,
        resolve: { trainingdata: ResolveService }, 
        data: { requestcondition: { source: 'training_category_management_view', condition: {} }, endpoint: 'datalist' }
    },
    { path: 'manage-training/edit/:id', component: AddEditTrainingComponent },
    /**Training center**/
    { 
        path : 'training-center/list' , component : ListComponent,
        resolve: { trainingdata: ResolveService }, 
        data: { requestcondition: { source: 'training_category_management_view', condition: {} }, endpoint: 'datalist' }
    },
    { path: 'manage-center/add', component: AddEditCenterComponent },
    { path: 'manage-center/edit/:id', component: AddEditCenterComponent },
    /**Quiz Management**/
    {
      path : 'manage-quiz/list' , component : ManageQuizComponent,
      resolve: { trainingdata: ResolveService }, 
        data: { requestcondition: { source: 'quiz_question_view', condition: {} }, endpoint: 'datalist' }
    },
    {
        path : 'manage-quiz/add', component : AddEditComponent
    },
    {
        path : 'manage-quiz/edit/:_id', component : AddEditComponent,
        resolve: { quizQuestionData: ResolveService }, 
        data: { requestcondition: { source: 'quiz_question', condition: {} }, endpoint: 'datalist' }
    },
    {
      path : 'manage-quiz/add-answer/:id' , component : AddUpdateAnswerComponent
    },
    {
        path : 'manage-quiz/update-answer/:questionId_object',component : UpdateAnswerComponent,
        resolve: { quizQuestionData: ResolveService }, 
        data: { requestcondition: { source: 'quiz_answer', condition: {} }, endpoint: 'datalist' }
    }

]

export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: false });
