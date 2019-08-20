import { BrowserModule, } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule } from 'primeng/calendar';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AddUserComponent } from './add-user/add-user.component';
import { HeaderComponent } from './header/header.component';
import { UserManagementService } from './user-management.service';
import { FilterPipe } from './filter.pipe';
import { SortPipe } from './sort.pipe';
import { AddProjectComponent } from './add-project/add-project.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    HeaderComponent,
    FilterPipe,
    SortPipe,
    AddProjectComponent,
    AddTaskComponent,
    ViewTaskComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CalendarModule
  ],
  providers: [UserManagementService],
  bootstrap: [AppComponent]
})
export class AppModule { }
