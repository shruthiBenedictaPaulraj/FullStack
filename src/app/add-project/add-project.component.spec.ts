import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserManagementService } from '../user-management.service';
import { AddProjectComponent } from './add-project.component';
import { Observable, of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { SortPipe } from '../sort.pipe';
import { FilterPipe } from '../filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

class MockUserManagementService {

  constructor() { }

  getProjectService(): Observable<any> {
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
        'managerList': [
          {
            'firstName': 'John',
            'lastName': 'Doey',
            'managerId': ''
          },
          {
            'firstName': 'Andrew',
            'lastName': 'Benza',
            'managerId': '2'
          },
          {
            'firstName': 'Sam',
            'lastName': 'Lesly',
            'managerId': '3'
          },
          {
            'firstName': 'Lesly',
            'lastName': 'Sam',
            'managerId': '4'
          },
          {
            'firstName': 'Elise',
            'lastName': 'susan',
            'managerId': '5'
          },
          {
            'firstName': 'Brain',
            'lastName': 'Adam',
            'managerId': ''
          },
          {
            'firstName': 'Sonia',
            'lastName': 'Mohan',
            'managerId': ''
          },
          {
            'firstName': 'Megna',
            'lastName': 'Ashwin',
            'managerId': ''
          },
          {
            'firstName': 'Daphny',
            'lastName': 'Sam',
            'managerId': ''
          },
          {
            'firstName': 'Priyanka',
            'lastName': 'Raj',
            'managerId': ''
          },
          {
            'firstName': 'Persia',
            'lastName': 'Paulraj',
            'managerId': '5c600f2cd76fbc29a8501452'
          },
          {
            'firstName': 'Indhu',
            'lastName': 'Prakash',
            'managerId': '5c600fe6b3de090868cc11c4'
          },
          {
            'firstName': 'John',
            'lastName': 'Doe',
            'managerId': '5c6013b3fc99321d0857a001'
          },
          {
            'firstName': 'Dennison',
            'lastName': 'Peter',
            'managerId': '5d556ad090fd270ba06d2548'
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
        ]
      },
      'message': null
    });
  }

  addNewProjectService(): Observable<any> {
    return of({
      data: true
    });
  }

  suspendProjectService(): Observable<any> {
    return of({
      data: true
    });
  }
}

describe('AddProjectComponent', () => {
  let component: AddProjectComponent;
  let fixture: ComponentFixture<AddProjectComponent>;
  let userManagementService: UserManagementService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddProjectComponent, SortPipe, FilterPipe],
      providers: [{
        provide: UserManagementService,
        useClass: MockUserManagementService
      }],
      imports: [FormsModule, ReactiveFormsModule, CommonModule, BrowserModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectComponent);
    userManagementService = TestBed.get(UserManagementService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('To check the sort functionality when the field is mapped', () => {
    component.sort('startDate');
    expect(component.sortField).toBe('startDate');
  });

  it('To check if the new project is added', () => {
    component.addNewProject(component.addProjectForm.value);
    expect(component.projectDetails.length).toBeGreaterThan(0);
  });

  it('To check if the details of added project can be edited and updated', () => {
    const obj = {
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
    component.editProject(obj);
    expect(component.updateFlag).toBeTruthy();
    component.updateProject();
    expect(component.updateFlag).toBeFalsy();
  });

  it('To check if the added project can be suspended', () => {
    const obj = {
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
    component.suspendProject(obj);
    expect(component.projectDetails.length).toBeGreaterThan(0);
  });

  it('To check if start and end date flag is set', () => {
    const event = {
      target: {
        checked: true
      }
    };
    component.getState(event);
    expect(component.enableDate).toBeTruthy();
    const event1 = {
      target: {
        checked: false
      }
    };
    component.getState(event1);
    expect(component.enableDate).toBeFalsy();
  });

  it('To check if the manager mapped to the created project is set', () => {
    component.getManagerList('5d556ad090fd270ba06d2548');
    expect(component.addProjectForm.value['manager']).toBe('Dennison Peter');
  });

  it('To check if the error is handeled for getProjectService', () => {
    const spy = spyOn(userManagementService, 'getProjectService').and.returnValue(throwError('error'));
    component.getProject();
    expect(component.error).toBeTruthy();
  });

  it('To check if the error is handeled for addNewProjectService', () => {
    const spy = spyOn(userManagementService, 'addNewProjectService').and.returnValue(throwError('error'));
    const obj = {
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
    component.editProject(obj);
    expect(component.updateFlag).toBeTruthy();
    component.updateProject();
    expect(component.error).toBeTruthy();
  });

  it('To check if the error is handeled for suspendProjectService', () => {
    const spy = spyOn(userManagementService, 'suspendProjectService').and.returnValue(throwError('error'));
    const obj = {
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
    component.suspendProject(obj);
    expect(component.error).toBeTruthy();
  });

  it('To check if Error is handled for addNewProjectService', () => {
    const spy = spyOn(userManagementService, 'addNewProjectService').and.returnValue(throwError('error'));
    component.addNewProject(component.addProjectForm.value);
    expect(component.error).toBeTruthy();
  });
  it('To check if empty response is handled for addNewProjectService', () => {
    const spy = spyOn(userManagementService, 'addNewProjectService').and.returnValue(of({}));
    component.addNewProject(component.addProjectForm.value);
    expect(component.error).toBeFalsy();
  });
  it('To check if the empty respnse is handeled for addNewProjectService', () => {
    const spy = spyOn(userManagementService, 'addNewProjectService').and.returnValue(of({}));
    const obj = {
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
    component.editProject(obj);
    expect(component.updateFlag).toBeTruthy();
    component.updateProject();
    expect(component.error).toBeFalsy();
  });

  it('To check if the empty response is handeled for suspendProjectService', () => {
    const spy = spyOn(userManagementService, 'suspendProjectService').and.returnValue(of({}));
    const obj = {
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
    component.suspendProject(obj);
    expect(component.error).toBeFalsy();
  });

  it('To check the else part of edit', () => {
    const obj = {
      '_id': '5d556d183bc60017acd74d4a',
      'projectName': 'Sample Project',
      'startDate': '',
      'endDate': '',
      'priority': 23,
      'manager': 'Dennison Peter',
      'status': 'In-Progress',
      'noOfTasks': 0,
      'projectId': '5d556d183bc60017acd74d49'
    };
    component.editProject(obj);
    expect(component.updateFlag).toBeTruthy();
  });
});
