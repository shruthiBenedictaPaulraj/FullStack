import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormBuilder, FormGroup, FormControlName, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserManagementService } from '../user-management.service';
import { AddUserComponent } from './add-user.component';
import { Observable, of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { SortPipe } from '../sort.pipe';
import { FilterPipe } from '../filter.pipe';

class MockUserManagementService {
  constructor() {}
  
  addNewUserService(value): Observable<any> {
    return of({
      data: true
    });
  }

  deletUserService(value): Observable<any> {
    return of({
      data: true
    });
  }

  getUserService(): Observable<any> {
    return of({
      'status': 200,
      'data': [
        {
          'firstName': 'Persia',
          'lastName': 'Paulraj',
          'empId': '459012',
          'userId': '5c600f2cd76fbc29a8501452'
        },
        {
          'firstName': 'Indhu',
          'lastName': 'Prakash',
          'empId': '345678',
          'userId': '5c600fe6b3de090868cc11c4'
        },
        {
          'firstName': 'John',
          'lastName': 'Doe',
          'empId': '254061',
          'userId': '5c6013b3fc99321d0857a001'
        },
        {
          'firstName': 'Dennison',
          'lastName': 'Peter',
          'empId': '453425',
          'userId': '5d556ad090fd270ba06d2548'
        }
      ],
      'message': null
    });
  }
}

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let userManagementService: UserManagementService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddUserComponent, SortPipe, FilterPipe],
      providers: [{
        provide: UserManagementService,
        useClass: MockUserManagementService
      }],
      imports: [FormsModule, ReactiveFormsModule, CommonModule, BrowserModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    userManagementService = TestBed.get(UserManagementService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('To check if the new user is added', () => {
    component.addNewUser(component.addUserForm.value);
    expect(component.userDetails.length).toBeGreaterThan(0);
  });

  it('To check if the details of added user can be edited and updated', () => {
    const obj = {
      'firstName': 'Persia',
      'lastName': 'Paul',
      'empId': '459012',
      'userId': '5c600f2cd76fbc29a8501452'
    };
    component.editUser(obj, 0);
    expect(component.updateFlag).toBeTruthy();
    component.updateUser();
    expect(component.updateFlag).toBeFalsy();
  });

  it('To check if the added user can be deleted', () => {
    const obj = {
      'firstName': 'Persia',
      'lastName': 'Paul',
      'empId': '459012',
      'userId': '5c600f2cd76fbc29a8501452'
    };
    component.deleteUser(obj);
    expect(component.userDetails.length).toBeGreaterThan(0);
  });

  it('To check if the error is handeled for getuserService', () => {
    const spy = spyOn(userManagementService, 'getUserService').and.returnValue(throwError('error'));
    component.getUser();
    expect(component.error).toBeTruthy();
  });

  it('To check if the error is handeled for addNewUserService', () => {
    const spy = spyOn(userManagementService, 'addNewUserService').and.returnValue(throwError('error'));
    component.addNewUser(component.addUserForm.value);
    expect(component.error).toBeTruthy();
  });

  it('To check if the error is handeled for addNewUserService while updating', () => {
    const obj = {
      'firstName': 'Persia',
      'lastName': 'Paul',
      'empId': '459012',
      'userId': '5c600f2cd76fbc29a8501452'
    };
    component.editUser(obj, 0);
    expect(component.updateFlag).toBeTruthy();
    const spy = spyOn(userManagementService, 'addNewUserService').and.returnValue(throwError('error'));
    component.updateUser();
    expect(component.error).toBeTruthy();
  });

  it('To check if the error is handeled for deletUserService', () => {
    const spy = spyOn(userManagementService, 'deletUserService').and.returnValue(throwError('error'));
    const obj = {
      'firstName': 'Persia',
      'lastName': 'Paul',
      'empId': '459012',
      'userId': '5c600f2cd76fbc29a8501452'
    };
    component.deleteUser(obj);
    expect(component.error).toBeTruthy();
  });

  it('To check the sort functionality when the field is mapped', () => {
    component.sort('firstName');
    expect(component.sortField).toBe('firstName');
  });
});
