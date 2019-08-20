import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserManagementService {

  DataFromViewTaskScreen: any = null;
  FlagFromViewTaskScreen = false;
  FlagFromViewTaskScreen$: Observable<boolean>;

  constructor(private http: HttpClient) { }

  /** Services for Add User Page starts here */

  addNewUserService(value): Observable<any> {
    // const url = '/assets/data/addUser.json';
    const url = '/api/addUser';
    if (value.userId) {
      return this.http.put(url, value);
    } else {
      return this.http.post(url, value);
    }
  }

  deletUserService(value): Observable<any> {
    // const url = '/assets/data/deleteUser.json';
    const url = '/api/deleteUser/' + value.userId;
    return this.http.delete(url, value);
  }

  getUserService(): Observable<any> {
    // const url = '/assets/data/getUser.json';
    const url = '/api/getUser';
    return this.http.get(url);
  }

  /** Services for Add User Page ends here */

  /** Services for Add Project Page starts here */

  getProjectService(): Observable<any> {
    // const url = '/assets/data/getProject.json';
    const url = '/api/getProject';
    return this.http.get(url);
  }

  addNewProjectService(value): Observable<any> {
    const url = '/api/addProject';
    if (value.projectId) {
      return this.http.put(url, value);
    } else {
      return this.http.post(url, value);
    }
  }

  suspendProjectService(value): Observable<any> {
    const url = '/api/suspendProject/' + value.projectId;
    // const url = '/assets/data/addUser.json';
    return this.http.delete(url, value);
  }

  /** Services for Add Project Page ends here */

  /** Services for Add Task Page starts here */

  getTaskService(): Observable<any> {
    // const url = '/assets/data/addTaskGet.json';
    const url = '/api/addTaskGet';
    return this.http.get(url);
  }

  addNewTaskService(param): Observable<any> {
    const url = '/api/addNewTask';
    // const url = '/assets/data/getProject.json';
    return this.http.post(url, param);
  }

  updateTaskService(param): Observable<any> {
    const url = '/api/updateTask';
    // const url = '/assets/data/getProject.json';
    return this.http.put(url, param);
  }

  /** Services for Add Task Page ends here */
  /** Services for View Task Page starts here */

  getTaskListViewService(): Observable<any> {
    // const url = '/assets/data/viewTaskGet.json';
    const url = '/api/viewTaskGet';
    return this.http.get(url);
  }

  /** Services for View Task Page ends here */
}
