import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../user-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  projectList: Array<Object> = [];
  taskList: Array<Object> = [];
  sortField = '';
  searchField = '';
  selectedProjectValue: any;
  responseData: any;
  selectedProject;
  error = false;
  constructor(private userManagementService: UserManagementService, private router: Router) { }

  ngOnInit() {
    this.getTaskList();
  }
  getTaskList() {
    this.userManagementService.getTaskListViewService().subscribe(res => {
      this.responseData = res.data;
      const projectData = this.processData(res.data);
      this.projectList = projectData;
    }, (error) => {
      this.error = true;
    });
  }

  processData(data) {
    const val = [];
    for (let i = 0; i < data['projectList'].length; i++) {
      Object.assign(data['projectList'][i], {
        taskList: []
      });
      for (let j = 0; j < data['taskList'].length; j++) {
        if (data['projectList'][i]['projectId'] === data['taskList'][j]['projectId']) {
          data['projectList'][i]['taskList'] = data['taskList'][j]['taskList'];
        }
      }
      val.push(data['projectList'][i]);
    }
    return val;
  }

  getSelectedTaskDetails(selectedProject) {
    for (let i = 0; i < this.projectList.length; i++) {
      if (this.projectList[i]['projectId'] === selectedProject) {
        this.selectedProjectValue = this.projectList[i];
        this.searchField = this.projectList[i]['projectName'];
        this.taskList = this.projectList[i]['taskList'];
      }
    }
  }
  sort(field) {
    this.sortField = field;
  }
  editTask(subTask) {
    const obj = Object.assign({
      subTask: subTask,
      project: this.selectedProjectValue,
      user: this.responseData['userList']
    });
    this.userManagementService.DataFromViewTaskScreen = obj;
    this.userManagementService.FlagFromViewTaskScreen = true;
    this.router.navigateByUrl('/addTask');
  }
  endTask(subTask) {
    let val = null;
    for (let i = 0; i < this.responseData['taskList'].length; i++) {
      for (let j = 0; j < this.responseData['taskList'][i]['taskList'].length; j++) {
        if (subTask['taskId'] === this.responseData['taskList'][i]['taskList'][j]['taskId']) {
          this.responseData['taskList'][i]['taskList'][j]['status'] = 'Completed';
          val = this.responseData['taskList'][i];
        }
      }
    }
    this.userManagementService.updateTaskService(val).subscribe(res => {
      this.getTaskList();
      alert(`The task is marked as 'Complete' successfully`);
    }, (error) => {
      this.error = true;
    });
  }
}
