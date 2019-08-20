import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormControlName, Validators } from '@angular/forms';
import { UserManagementService } from '../user-management.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  addProjectForm: FormGroup;
  projectDetails: Array<Object> = [];
  searchField = '';
  sortField = '';
  enableDate = false;
  selectedManager = '';
  managersList: Array<Object> = [];
  updateFlag = false;
  editedProjectDetails: Object = {};
  today: any;
  tomorrow: any;
  error = false;
  @ViewChild('projectNameRef') projectNameRefElm: ElementRef;

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
    this.buildaddProjectFormValidation();
    this.getProject();
  }

  buildaddProjectFormValidation() {
    this.addProjectForm = this.formBuilder.group({
      projectName: ['', Validators.required],
      startDate: [],
      endDate: [],
      priority: ['0'],
      managerId: [''],
      manager: ['', Validators.required],
    });
  }
  getManagerList(selectedManager) {
    this.addProjectForm.get('managerId').setValue(selectedManager);
    for (let i = 0; i < this.managersList.length; i++) {
      if (this.managersList[i]['managerId'] === selectedManager) {
        const name = this.managersList[i]['firstName'] + ' ' + this.managersList[i]['lastName'];
        this.addProjectForm.get('manager').setValue(name);
      }
    }
  }
  getState(event){
    if (event.target.checked) {
      this.addProjectForm.get('startDate').setValue(this.today);
      this.addProjectForm.get('endDate').setValue(this.today);
      this.enableDate = true;
    } else {
      this.enableDate = false;
      this.addProjectForm.get('startDate').setValue('');
      this.addProjectForm.get('endDate').setValue('');
    }
  }
  getProject() {
    this.userManagementService.getProjectService().subscribe(val => {
      const data = this.processData(val.data);
      this.projectDetails = data;
      this.managersList = val.data['managerList'];
    }, (error) => {
      this.error = true;
      console.log(error);
    });
  }
  processData(data) {
    const val = [];
    for (let i = 0; i < data['projectList'].length; i++) {
      for (let j = 0; j < data['taskList'].length; j++) {
        if (data['projectList'][i]['projectId'] === data['taskList'][j]['projectId']) {
          data['projectList'][i]['noOfTasks'] = data['taskList'][j]['taskList'].length;
        }
      }
      val.push(data['projectList'][i]);
    }
    return val;
  }

  addNewProject(formValue) {
    this.userManagementService.addNewProjectService(formValue).subscribe(res => {
      if (res) {
        this.addProjectForm.reset();
        this.userManagementService.getProjectService().subscribe(val => {
          const data = this.processData(val.data);
          this.projectDetails = data;
          this.managersList = val.data['managerList'];
          alert(`New Project is added successfully`);
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
  sort(field) {
    this.sortField = field;
  }
  editProject(project) {
    this.reset();
    this.addProjectForm.patchValue(project);
    if (project.startDate || project.endDate) {
      this.enableDate = true;
    }
    this.updateFlag = true;
    this.editedProjectDetails = project;
    this.projectNameRefElm.nativeElement.focus();
  }
  updateProject() {
    const formValue = this.addProjectForm.value;
    const requestParam = {
      'projectName': formValue['projectName'],
      'startDate': formValue['startDate'],
      'endDate': formValue['endDate'],
      'priority': formValue['priority'],
      'manager': formValue['manager'],
      'status': this.editedProjectDetails['status'],
      'noOfTasks': this.editedProjectDetails['noOfTasks'],
      'projectId': this.editedProjectDetails['projectId']
    };
    // console.log(this.addProjectForm , formValue)
    this.userManagementService.addNewProjectService(requestParam).subscribe(res => {
      if (res) {
        this.userManagementService.getProjectService().subscribe(val => {
          const data = this.processData(val.data);
          this.projectDetails = data;
          this.managersList = val.data['managerList'];
          this.updateFlag = false;
          this.addProjectForm.reset();
          alert(`Project details are updated successfully`);
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
  suspendProject(project) {
    this.userManagementService.suspendProjectService(project).subscribe(res => {
      if (res) {
        this.userManagementService.getProjectService().subscribe(val => {
          const data = this.processData(val.data);
          this.projectDetails = data;
          this.managersList = val.data['managerList'];
          alert(`The Project is suspended successfully`);
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
  reset() {
    this.addProjectForm.reset();
    this.updateFlag = false;
    this.enableDate = false;
  }

}
