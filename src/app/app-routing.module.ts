import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';

const routes: Routes = [
  { path: '', redirectTo: '/addUser', pathMatch: 'full' },
  { path: 'addUser', component: AddUserComponent },
  { path: 'addProject', component: AddProjectComponent },
  { path: 'addTask', component: AddTaskComponent },
  { path: 'viewTask', component: ViewTaskComponent },
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);
