import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserManagementService } from '../user-management.service';
import { Router } from '@angular/router';
import { ViewTaskComponent } from './view-task.component';
import { Observable, of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { SortPipe } from '../sort.pipe';
import { FilterPipe } from '../filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

class MockUserManagementService {
  DataFromViewTaskScreen: any = null;
  FlagFromViewTaskScreen = false;

  constructor() { }

  updateTaskService(value): Observable<any> {
    return of({
      data: true
    });
  }

  getTaskListViewService(): Observable<any> {
    return of({
      'status': 200,
      'data': {
        'projectList': [
          {
            '_id': '5c5ee53f29eeb984311928a6',
            'projectName': 'Brazil Bridge',
            'startDate': '13-1-2016',
            'endDate': '10-9-2017',
            'priority': 5,
            'status': 'Completed',
            'manager': 'John Messiah',
            'noOfTasks': '2',
            'projectId': '1'
          },
          {
            '_id': '5c5ee53f29eeb984311928a7',
            'projectName': 'Hudson Mission',
            'startDate': '12-1-2013',
            'endDate': '13-2-2018',
            'status': 'Completed',
            'priority': 1,
            'manager': 'Andrew Blesswin',
            'noOfTasks': '3',
            'projectId': '2'
          },
          {
            '_id': '5c5ee53f29eeb984311928a8',
            'projectName': 'Tractor World',
            'startDate': '10-2-2018',
            'endDate': '11-4-2019',
            'status': 'In-Progress',
            'priority': 4,
            'manager': 'Andrew Blesswin',
            'noOfTasks': '5',
            'projectId': '3'
          },
          {
            '_id': '5c5ee53f29eeb984311928a9',
            'projectName': 'Philipines Boat',
            'startDate': '01-6-2018',
            'endDate': '10-8-2019',
            'status': 'In-Progress',
            'priority': 9,
            'manager': 'Victor France',
            'noOfTasks': '4',
            'projectId': '4'
          },
          {
            '_id': '5c5ee53f29eeb984311928aa',
            'projectName': 'Norway Harbour',
            'startDate': '',
            'endDate': '',
            'status': '',
            'priority': 9,
            'manager': 'Victor France',
            'noOfTasks': '4',
            'projectId': '5'
          },
          {
            '_id': '5c679a0c168dd21a146a80e2',
            'projectName': 'Sailor Range',
            'startDate': '2019-02-21',
            'endDate': '2019-08-29',
            'priority': 25,
            'manager': 'Persia Paulraj',
            'status': 'Not Updated',
            'noOfTasks': 0,
            'projectId': '5c679a0c168dd21a146a80e1'
          },
          {
            '_id': '5c694bd2808f9616f44c6281',
            'projectName': 'American Ship',
            'startDate': '2019-02-22',
            'endDate': '2020-02-14',
            'priority': 22,
            'manager': 'Indhu Prakash',
            'status': 'Not Updated',
            'noOfTasks': 0,
            'projectId': '5c694bd2808f9616f44c6280'
          },
          {
            '_id': '5d556d183bc60017acd74d4a',
            'projectName': 'Sample Project',
            'startDate': '2019-08-15',
            'endDate': '2020-01-30',
            'priority': 23,
            'manager': 'Dennison Peter',
            'status': 'In-Progress',
            'noOfTasks': 0,
            'projectId': '5d556d183bc60017acd74d49'
          }
        ],
        'taskList': [
          {
            '_id': '5c69713db89f3f057c481d3f',
            'projectId': '5c679a0c168dd21a146a80e1',
            'parentTask': {
              'parentTaskId': '',
              'parentTaskName': ''
            },
            'taskList': [
              {
                'taskId': '5c69713db89f3f057c481d3e',
                'projectId': '5c679a0c168dd21a146a80e1',
                'taskName': 'sffg',
                'startDate': '',
                'endDate': '',
                'priority': '',
                'status': 'Completed',
                'parentTaskId': ''
              }
            ]
          },
          {
            '_id': '5d556dd93bc60017acd74d4c',
            'projectId': '5d556d183bc60017acd74d49',
            'parentTask': {
              'parentTaskName': 'Task 2',
              'parentTaskId': '5d562911272a8514fc0fd043'
            },
            'taskList': [
              {
                'taskId': '5d556dd93bc60017acd74d4b',
                'projectId': '5d556d183bc60017acd74d49',
                'taskName': 'Main Task',
                'startDate': '2019-08-16',
                'endDate': '2019-08-30',
                'priority': '',
                'status': 'In-Progress',
                'parentTaskId': '',
                'parentTaskName': null,
                'parentTaskStatus': null,
                'userId': null
              },
              {
                'taskId': '5d562911272a8514fc0fd043',
                'projectId': '5d556d183bc60017acd74d49',
                'taskName': 'Task 2',
                'startDate': '',
                'endDate': '',
                'priority': '',
                'status': 'Not Updated',
                'parentTaskId': '5d562911272a8514fc0fd043',
                'parentTaskName': null,
                'parentTaskStatus': true,
                'userId': '5d556ad090fd270ba06d2548'
              },
              {
                'taskId': '5d56a442b3077c37c4657707',
                'projectId': '5d556d183bc60017acd74d49',
                'taskName': 'Task 3',
                'startDate': '',
                'endDate': '',
                'priority': '',
                'status': 'Not Updated',
                'parentTaskId': '',
                'parentTaskName': null,
                'parentTaskStatus': null,
                'userId': null
              },
              {
                'taskId': '5d56be38be3d5c3ae46fc270',
                'projectId': '5d556d183bc60017acd74d49',
                'taskName': 'Task 4',
                'startDate': '2019-08-17',
                'endDate': '2019-08-31',
                'priority': '',
                'status': 'In-Progress',
                'parentTaskId': '5d56be38be3d5c3ae46fc270',
                'parentTaskName': null,
                'parentTaskStatus': null,
                'userId': '5d556ad090fd270ba06d2548'
              },
              {
                'taskId': '5d56c3bea7b9183900d21162',
                'projectId': '5d556d183bc60017acd74d49',
                'taskName': 'Task 5',
                'startDate': '2019-08-18',
                'endDate': '2019-09-27',
                'priority': 20,
                'status': 'Yet to start',
                'parentTaskId': '5d562911272a8514fc0fd043',
                'parentTaskName': 'Task 2',
                'parentTaskStatus': false,
                'userId': '5d556ad090fd270ba06d2548'
              },
              {
                'taskId': '5d56c3bea7b9183900d21163',
                'projectId': '5d556d183bc60017acd74d49',
                'taskName': 'Task 6',
                'startDate': '2019-08-18',
                'endDate': '2019-09-27',
                'priority': '0',
                'status': 'Yet to start',
                'parentTaskId': '5d56c3bea7b9183900d21163',
                'parentTaskName': '',
                'parentTaskStatus': null,
                'userId': '5d556ad090fd270ba06d2548'
              },
              {
                'taskId': '5d5779ba64abe524d017fb83',
                'projectId': '5d556d183bc60017acd74d49',
                'taskName': 'Task 7',
                'startDate': '2019-08-18',
                'endDate': '2019-09-21',
                'priority': 10,
                'status': 'Yet to start',
                'parentTaskId': '5d562911272a8514fc0fd043',
                'parentTaskName': 'Task 2',
                'parentTaskStatus': false,
                'userId': '5d556ad090fd270ba06d2548'
              }
            ]
          },
          {
            '_id': '5d558f9a3846692604cb3da1',
            'projectId': '3',
            'parentTask': {
              'parentTaskId': '',
              'parentTaskName': ''
            },
            'taskList': [
              {
                'taskId': '5d558f9a3846692604cb3da0',
                'projectId': '3',
                'taskName': 'Main Task',
                'startDate': '',
                'endDate': '',
                'priority': '',
                'status': 'Completed',
                'parentTaskId': ''
              }
            ]
          }
        ],
        'userList': [
          {
            '_id': '5c5ea72929eeb9843119289b',
            'firstName': 'John',
            'lastName': 'Doey',
            'empId': '254061',
            'userId': ''
          },
          {
            '_id': '5c5ea72929eeb9843119289c',
            'firstName': 'Andrew',
            'lastName': 'Benza',
            'empId': '254063',
            'userId': '2'
          },
          {
            '_id': '5c5ea72929eeb9843119289d',
            'firstName': 'Sam',
            'lastName': 'Lesly',
            'empId': '354062',
            'userId': '3'
          },
          {
            '_id': '5c5ea72929eeb9843119289e',
            'firstName': 'Lesly',
            'lastName': 'Sam',
            'empId': '454061',
            'userId': '4'
          },
          {
            '_id': '5c5ea72929eeb9843119289f',
            'firstName': 'Elise',
            'lastName': 'susan',
            'empId': '354062',
            'userId': '5'
          },
          {
            '_id': '5c5ff4db2b060d3478e45153',
            'firstName': 'Brain',
            'lastName': 'Adam',
            'empId': '445509',
            'userId': ''
          },
          {
            '_id': '5c5ff7da61100f3014338336',
            'firstName': 'Sonia',
            'lastName': 'Mohan',
            'empId': '123459',
            'userId': ''
          },
          {
            '_id': '5c5ffa908d18d60518e11132',
            'firstName': 'Megna',
            'lastName': 'Ashwin',
            'empId': '345678',
            'userId': ''
          },
          {
            '_id': '5c5ffb869a034c26209db704',
            'firstName': 'Daphny',
            'lastName': 'Sam',
            'empId': '123456',
            'userId': ''
          },
          {
            '_id': '5c600b836bed4e29e8ac843b',
            'firstName': 'Priyanka',
            'lastName': 'Raj',
            'empId': '445509',
            'userId': ''
          },
          {
            '_id': '5c600f2cd76fbc29a8501453',
            'firstName': 'Persia',
            'lastName': 'Paulraj',
            'empId': '459012',
            'userId': '5c600f2cd76fbc29a8501452'
          },
          {
            '_id': '5c600fe6b3de090868cc11c5',
            'firstName': 'Indhu',
            'lastName': 'Prakash',
            'empId': '345678',
            'userId': '5c600fe6b3de090868cc11c4'
          },
          {
            '_id': '5c6013b3fc99321d0857a002',
            'firstName': 'John',
            'lastName': 'Doe',
            'empId': '254061',
            'userId': '5c6013b3fc99321d0857a001'
          },
          {
            '_id': '5d556ad090fd270ba06d2549',
            'firstName': 'Dennison',
            'lastName': 'Peter',
            'empId': '453425',
            'userId': '5d556ad090fd270ba06d2548'
          }
        ]
      },
      'message': null
    });
  }
}

class MockRouter {
  navigate = jasmine.createSpy('navigateByUrl');
  navigateByUrl(data) {
    return of({});
  }
}

describe('ViewTaskComponent', () => {
  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;
  let userManagementService: UserManagementService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTaskComponent, SortPipe, FilterPipe],
      providers: [{
        provide: UserManagementService,
        useClass: MockUserManagementService
      }, {
        provide: Router,
        useClass: MockRouter
      }],
      imports: [FormsModule, ReactiveFormsModule, CommonModule, BrowserModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskComponent);
    component = fixture.componentInstance;
    userManagementService = TestBed.get(UserManagementService);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('To check the sort functionality when the field is mapped', () => {
    component.sort('status');
    expect(component.sortField).toBe('status');
  });

  it('To check if the task list of the selected project is mapped and shown', () => {
    component.getSelectedTaskDetails('5d556d183bc60017acd74d49');
    expect(component.taskList.length).toBe(7);
  });

  it('To check if the details of added task can be edited and updated', () => {
    component.selectedProjectValue = {
      '_id': '5d556d183bc60017acd74d4a',
      'projectName': 'Sample Project',
      'startDate': '2019-08-15',
      'endDate': '2020-01-30',
      'priority': 23,
      'manager': 'Dennison Peter',
      'status': 'In-Progress',
      'noOfTasks': 0,
      'projectId': '5d556d183bc60017acd74d49'
    };
    const arr = [
      {
        'taskId': '5d556dd93bc60017acd74d4b',
        'projectId': '5d556d183bc60017acd74d49',
        'taskName': 'Main Task',
        'startDate': '2019-08-16',
        'endDate': '2019-08-30',
        'priority': '',
        'status': 'In-Progress',
        'parentTaskId': '',
        'parentTaskName': null,
        'parentTaskStatus': null,
        'userId': null
      },
      {
        'taskId': '5d562911272a8514fc0fd043',
        'projectId': '5d556d183bc60017acd74d49',
        'taskName': 'Task 2',
        'startDate': '',
        'endDate': '',
        'priority': '',
        'status': 'Not Updated',
        'parentTaskId': '5d562911272a8514fc0fd043',
        'parentTaskName': null,
        'parentTaskStatus': true,
        'userId': '5d556ad090fd270ba06d2548'
      }];
    component.editTask(arr);
    expect(userManagementService.FlagFromViewTaskScreen).toBeTruthy();
  });

  it('To check if the details of added task can be marked as complete', () => {
    const obj = {
      'taskId': '5d556dd93bc60017acd74d4b',
      'projectId': '5d556d183bc60017acd74d49',
      'taskName': 'Main Task',
      'startDate': '2019-08-16',
      'endDate': '2019-08-30',
      'priority': '',
      'status': 'In-Progress',
      'parentTaskId': '',
      'parentTaskName': null,
      'parentTaskStatus': null,
      'userId': null
    };
    component.endTask(obj);
    expect(component.projectList.length).toBeGreaterThan(0);
  });

  it('To check if the error is handeled for getTaskListViewService', () => {
    const spy = spyOn(userManagementService, 'getTaskListViewService').and.returnValue(throwError('error'));
    component.getTaskList();
    expect(component.error).toBeTruthy();
  });

  it('To check if the error is handeled for updateTaskService', () => {
    const spy = spyOn(userManagementService, 'updateTaskService').and.returnValue(throwError('error'));
    const obj = {
      'taskId': '5d556dd93bc60017acd74d4b',
      'projectId': '5d556d183bc60017acd74d49',
      'taskName': 'Main Task',
      'startDate': '2019-08-16',
      'endDate': '2019-08-30',
      'priority': '',
      'status': 'In-Progress',
      'parentTaskId': '',
      'parentTaskName': null,
      'parentTaskStatus': null,
      'userId': null
    };
    component.endTask(obj);
    expect(component.error).toBeTruthy();
  });
});
