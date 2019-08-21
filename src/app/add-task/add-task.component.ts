import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormControlName, Validators } from '@angular/forms';
import { UserManagementService } from '../user-management.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit, OnDestroy {
  addTaskForm: FormGroup;
  projectList: Array<Object> = [];
  userList: Array<Object> = [];
  taskList: Array<Object> = [];
  enableDate = true;
  selectedProject = '';
  selectedParentTask = '';
  selectedUser = '';
  updateFlag = false;
  parentTaskList: Array<Object> = [];
  dataFromViewTask: Object;
  changeProjectFlag = false;
  today: any;
  tomorrow: any;
  error = false;

  constructor(private formBuilder: FormBuilder, private userManagementService: UserManagementService) {
    const currentDate: Date = new Date();
    let dd: any = currentDate.getDate();
    let mm: any = currentDate.getMonth() + 1;
    const yyyy: any = currentDate.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    this.today = yyyy + '-' + mm + '-' + dd;
    const tomorrowDate = new Date(currentDate);
    tomorrowDate.setDate(currentDate.getDate() + 1);
    let dd1: any = tomorrowDate.getDate();
    let mm1: any = tomorrowDate.getMonth() + 1;
    const yyyy1: any = tomorrowDate.getFullYear();
    if (dd < 10) {
      dd1 = '0' + dd1;
    }
    if (mm1 < 10) {
      mm1 = '0' + mm1;
    }
    this.tomorrow = yyyy1 + '-' + mm1 + '-' + dd1;
  }

  ngOnInit() {
    this.getTask();
    this.buildaddTaskFormValidation();
    if (this.userManagementService.DataFromViewTaskScreen != null) {
      this.dataFromViewTask = this.userManagementService.DataFromViewTaskScreen;
      this.updateFlag = true;
      this.changeProjectFlag = true;
      this.addTaskForm.patchValue({
        projectName: this.dataFromViewTask['project']['projectName'],
        projectId: this.dataFromViewTask['project']['projectId'],
        taskName: this.dataFromViewTask['subTask']['taskName'],
        parentTaskStatus: this.dataFromViewTask['subTask']['parentTaskStatus'] ?
          this.dataFromViewTask['subTask']['parentTaskStatus'] : false,
        parentTaskName: this.dataFromViewTask['subTask']['parentTaskName'],
        parentTaskId: this.dataFromViewTask['subTask']['parentTaskId'],
        startDate: this.dataFromViewTask['subTask']['startDate'],
        endDate: this.dataFromViewTask['subTask']['endDate'],
        priority: this.dataFromViewTask['subTask']['priority'],
        userId: this.dataFromViewTask['subTask']['userId'],
        user: '',
        taskId: this.dataFromViewTask['subTask']['taskId']
      });
      if (this.addTaskForm.value.parentTaskStatus === true) {
        this.enableDate = false;
      }
      this.userList = this.dataFromViewTask['user'];
      this.getParentTask(this.dataFromViewTask['subTask']['parentTaskId']);
      this.getUserList(this.dataFromViewTask['subTask']['userId']);
    }
  }
  buildaddTaskFormValidation() {
    this.addTaskForm = this.formBuilder.group({
      projectName: ['', Validators.required],
      projectId: ['', Validators.required],
      taskName: ['', Validators.required],
      parentTaskStatus: [false],
      parentTaskName: [''],
      parentTaskId: [''],
      startDate: [this.today],
      endDate: [this.tomorrow],
      priority: ['0'],
      userId: [''],
      taskId: [''],
      user: ['', Validators.required],
    });
  }
  getTask() {
    this.userManagementService.getTaskService().subscribe(val => {
      this.projectList = val.data['projectList'];
      this.userList = val.data['userList'];
    }, (error) => {
      this.error = true;
      console.log(error);
    });
  }
  getState(event) {
    if (event.target.checked) {
      this.addTaskForm.get('parentTaskStatus').setValue(true);
      this.addTaskForm.get('startDate').setValue('');
      this.addTaskForm.get('endDate').setValue('');
      this.enableDate = false;
    } else {
      this.addTaskForm.get('parentTaskStatus').setValue(false);
      this.addTaskForm.get('startDate').setValue(this.today);
      this.addTaskForm.get('endDate').setValue(this.tomorrow);
      this.enableDate = true;
    }
  }
  getProjectList(selectedProject) {
    this.addTaskForm.get('projectId').setValue(selectedProject);
    for (let i = 0; i < this.projectList.length; i++) {
      if (this.projectList[i]['projectId'] === selectedProject) {
        this.addTaskForm.get('projectName').setValue(this.projectList[i]['projectName']);
        this.openParentListModel(this.addTaskForm.value);
      }
    }
  }
  openParentListModel(formValue) {
    const val = [];
    for (let i = 0; i < this.projectList.length; i++) {
      if (this.projectList[i]['projectId'] === formValue.projectId) {
        for (let j = 0; j < this.projectList[i]['taskList'].length; j++) {
          if (this.projectList[i]['taskList'][j]['parentTaskStatus']) {
            val.push(this.projectList[i]['taskList'][j]);
          }
        }
      }
    }
    this.parentTaskList = val;
  }
  getParentTask(selectedParentTask) {
    this.addTaskForm.get('parentTaskId').setValue(selectedParentTask);
    for (let i = 0; i < this.projectList.length; i++) {
      if (this.projectList[i]['projectId'] === this.addTaskForm.value.projectId) {
        for (let j = 0; j < this.projectList[i]['taskList'].length; j++) {
          if (this.projectList[i]['taskList'][j]['taskId'] === selectedParentTask) {
            this.addTaskForm.get('parentTaskName').setValue(this.projectList[i]['taskList'][j]['taskName']);
          }
        }
      }
    }
  }
  getUserList(selectedUser) {
    this.addTaskForm.get('userId').setValue(selectedUser);
    for (let i = 0; i < this.userList.length; i++) {
      if (this.userList[i]['userId'] === selectedUser) {
        const name = this.userList[i]['firstName'] + ' ' + this.userList[i]['lastName'];
        this.addTaskForm.get('user').setValue(name);
      }
    }
  }
  addNewTask(formValue) {
    let obj = [];
    for (let i = 0; i < this.projectList.length; i++) {
      if (formValue['projectId'] === this.projectList[i]['projectId']) {
        obj = this.projectList[i]['taskList'];
      }
    }
    const statusTemp = 'Not Updated';
    // console.log(Date.parse(formValue.startDate) > new Date());
    const value = {
      'projectId': formValue.projectId,
      'parentTask': {
        'parentTaskId': formValue.parentTaskId,
        'parentTaskName': formValue.parentTaskName,
      },
      'taskList': [{
        'taskId': '',
        'projectId': formValue.projectId,
        'taskName': formValue.taskName,
        'startDate': formValue.startDate,
        'endDate': formValue.endDate,
        'priority': formValue.priority,
        'status': statusTemp,
        'parentTaskId': formValue.parentTaskId,
        'parentTaskName': formValue.parentTaskName,
        'parentTaskStatus': formValue.parentTaskStatus,
        'userId': formValue.userId
      }]
    };
    obj.push(value.taskList[0]);
    if (obj.length > 1) {
      const val = Object.assign({}, formValue, {
        taskList: obj
      });
      this.userManagementService.updateTaskService(val).subscribe(res => {
        this.reset();
        alert(`New Task is added successfully`);
        console.log(res);
      }, (error) => {
        this.error = true;
        console.log(error);
      });
    } else {
      this.userManagementService.addNewTaskService(formValue).subscribe(res => {
        this.reset();
        if (res) {
          this.userManagementService.getTaskService().subscribe(val => {
            this.projectList = val.data['projectList'];
            this.userList = val.data['userList'];
            alert(`New Task is added successfully`);
          }, (error) => {
            this.error = true;
            console.log(error);
          });
        }
      },
        (error) => {
          this.error = true;
          console.log(error);
        });
    }
  }
  reset() {
    this.updateFlag = false;
    this.changeProjectFlag = false;
    this.enableDate = true;
    this.addTaskForm.reset();
  }
  updateTask(formValue) {
    let obj = [];
    for (let i = 0; i < this.projectList.length; i++) {
      if (formValue['projectId'] === this.projectList[i]['projectId']) {
        obj = this.projectList[i]['taskList'];
      }
    }
    let flag = false;
    for (let j = 0; j < obj.length; j++) {
      if (obj[j]['taskId'] === formValue.taskId) {
        obj[j]['taskId'] = formValue.taskId;
        obj[j]['projectId'] = formValue.projectId;
        obj[j]['taskName'] = formValue.taskName;
        obj[j]['startDate'] = formValue.startDate;
        obj[j]['endDate'] = formValue.endDate;
        obj[j]['priority'] = formValue.priority;
        obj[j]['status'] = formValue.status;
        obj[j]['parentTaskId'] = formValue.parentTaskId;
        obj[j]['parentTaskName'] = formValue.parentTaskName;
        obj[j]['parentTaskStatus'] = formValue.parentTaskStatus;
        obj[j]['userId'] = formValue.userId;
        flag = false;
        break;
      } else {
        flag = true;
      }
    }
    // if (flag) {
    //   const statusTemp = 'Not Updated';
    //   const value = {
    //     'projectId': formValue.projectId,
    //     'parentTask': {
    //       'parentTaskId': formValue.parentTaskId,
    //       'parentTaskName': formValue.parentTaskName,
    //     },
    //     'taskList': [{
    //       'taskId': formValue.taskId,
    //       'projectId': formValue.projectId,
    //       'taskName': formValue.taskName,
    //       'startDate': formValue.startDate,
    //       'endDate': formValue.endDate,
    //       'priority': formValue.priority,
    //       'status': statusTemp,
    //       'parentTaskId': formValue.parentTaskId,
    //       'parentTaskName': formValue.parentTaskName,
    //       'parentTaskStatus': formValue.parentTaskStatus,
    //       'userId': formValue.userId,
    //     }]
    //   };
    //   obj.push(value.taskList[0]);
    // }
    const val = Object.assign({}, formValue, {
      taskList: obj
    });
    this.userManagementService.updateTaskService(val).subscribe(res => {
      this.reset();
      alert(`Task is updated successfully`);
      console.log(res);
    }, (error) => {
      this.error = true;
      console.log(error);
    });
  }
  ngOnDestroy() {
    this.userManagementService.DataFromViewTaskScreen = null;
    this.updateFlag = false;
    this.changeProjectFlag = false;
  }
}
