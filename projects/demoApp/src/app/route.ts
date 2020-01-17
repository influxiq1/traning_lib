
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AddEditLessionsComponent } from '../app/manage-lessions/add-edit-lessions/add-edit-lessions.component';
import { AddEditTrainingComponent } from './manage-training/add-edit-training/add-edit-training.component';
import { AddEditCenterComponent } from './training-center/add-edit-center/add-edit-center.component';
import { ListingTrainingComponent } from './manage-training/listing-training/listing-training.component';
import { ResolveService } from './service/resolve.service';
const appRoutes: Routes = [

    // { path: '', redirectTo:'/login', pathMatch: 'full' },
    { path: 'home', component: AppComponent },
    { path: 'home/:id', component: AppComponent },
    { path: 'manage-lession/add', component: AddEditLessionsComponent },
    { path: 'manage-lession/edit/:id', component: AddEditLessionsComponent },
    { path: 'manage-training/add', component: AddEditTrainingComponent },

    {
        path: 'manage-training/list', component: ListingTrainingComponent,
        resolve: { trainingdata: ResolveService }, 
        data: { requestcondition: { source: 'training_category_management', condition: {} }, endpoint: 'datalist' }
    },
    { path: 'manage-training/edit/:id', component: AddEditTrainingComponent },
    { path: 'manage-center/add', component: AddEditCenterComponent },
    { path: 'manage-center/edit/:id', component: AddEditCenterComponent }
]

export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: false });
