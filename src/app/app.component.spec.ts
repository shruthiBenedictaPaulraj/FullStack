import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes, Router } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { SortPipe } from './sort.pipe';
import { FilterPipe } from './filter.pipe';
import { of } from 'rxjs';
import { UserManagementService } from './user-management.service';
import { HttpClientModule } from '@angular/common/http';

class MockRouter {
  navigate = jasmine.createSpy('navigateByUrl');
  navigateByUrl(data) {
    return of({});
  }
}

const routes: Routes = [
  { path: 'addUser', component: AddUserComponent },
  { path: 'addProject', component: AddProjectComponent },
  { path: 'addTask', component: AddTaskComponent },
  { path: 'viewTask', component: ViewTaskComponent },
];

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, HeaderComponent, AddUserComponent, AddProjectComponent, AddTaskComponent, ViewTaskComponent
        , SortPipe, FilterPipe
      ],
      providers: [{
        provide: Router,
        useClass: MockRouter
      }, UserManagementService],
      imports: [RouterModule.forRoot(routes), FormsModule, ReactiveFormsModule, CommonModule, BrowserModule, HttpClientModule]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('angular');
  });
});
