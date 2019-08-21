import { TestBed, inject } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

import { UserManagementService } from './user-management.service';

describe('UserManagementService', () => {
    let httpClientSpy: {
        get: jasmine.Spy, post: jasmine.Spy, put: jasmine.Spy,
        delete: jasmine.Spy
    };
    let userManagementService: UserManagementService;

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
        userManagementService = new UserManagementService(<any>httpClientSpy, );
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [UserManagementService]
        })
    });

    it('should be created', () => {
        const service: UserManagementService = TestBed.get(UserManagementService);
        expect(service).toBeTruthy();
    });

    it('#getUserService', () => {
        const userList = [];
        httpClientSpy.get.and.returnValue(of(userList));
        userManagementService.getUserService().subscribe(templates =>
            expect(templates).toEqual(userList, 'expected form templates'), fail);
    });

    it('#getProjectService', () => {
        const projectList = [];
        httpClientSpy.get.and.returnValue(of(projectList));
        userManagementService.getProjectService().subscribe(templates =>
            expect(templates).toEqual(projectList, 'expected form templates'), fail);
    });

    it('#getTaskService', () => {
        const taskList = [];
        httpClientSpy.get.and.returnValue(of(taskList));
        userManagementService.getTaskService().subscribe(templates =>
            expect(templates).toEqual(taskList, 'expected form templates'), fail);
    });

    it('#getTaskListViewService', () => {
        const projectTaskList = [];
        httpClientSpy.get.and.returnValue(of(projectTaskList));
        userManagementService.getTaskListViewService().subscribe(templates =>
            expect(templates).toEqual(projectTaskList, 'expected form templates'), fail);
    });

    it('#addNewUserService - post', () => {
        const addNewUserService: any = {};
        httpClientSpy.post.and.returnValue(of(addNewUserService));
        userManagementService.addNewUserService(addNewUserService);
    });

    it('#addNewProjectService - post', () => {
        const addNewProjectService: any = {};
        httpClientSpy.post.and.returnValue(of(addNewProjectService));
        userManagementService.addNewProjectService(addNewProjectService);
    });

    it('#addNewTaskService', () => {
        const addNewTaskService: any = {};
        httpClientSpy.post.and.returnValue(of(addNewTaskService));
        userManagementService.addNewTaskService(addNewTaskService);
    });

    it('#addNewUserService - put', () => {
        const addNewUserService: any = {};
        const input = {
            userId : '1'
        }
        httpClientSpy.put.and.returnValue(of(addNewUserService));
        userManagementService.addNewUserService(input);
    });

    it('#addNewProjectService - put', () => {
        const input = {
            projectId : '1'
        }
        const addNewProjectService: any = {};
        httpClientSpy.put.and.returnValue(of(addNewProjectService));
        userManagementService.addNewProjectService(input);
    });

    it('#updateTaskService', () => {
        const updateTaskService: any = {};
        httpClientSpy.put.and.returnValue(of(updateTaskService));
        userManagementService.updateTaskService(updateTaskService);
    });

    it('#deletUserService', () => {
        const input = {
            userId : '1'
        }
        const deletUserService: any = {};
        httpClientSpy.delete.and.returnValue(of(deletUserService));
        userManagementService.deletUserService(input);
    });

    it('#suspendProjectService', () => {
        const input = {
            projectId : '1'
        }
        const suspendProjectService: any = {};
        httpClientSpy.delete.and.returnValue(of(suspendProjectService));
        userManagementService.suspendProjectService(input);
    });
});
