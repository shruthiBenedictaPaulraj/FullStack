import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormControlName, Validators } from '@angular/forms';
import { UserManagementService } from '../user-management.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addUserForm: FormGroup;
  userDetails: Array<Object> = [];
  searchField = '';
  sortField = '';
  sortFirstName = false;
  sortLastName = false;
  sortEmpId = false;
  updateFlag = false;
  editedUserDetails: object;
  error = false;
  @ViewChild('firstName') firstNameRefElm: ElementRef;

  constructor(private formBuilder: FormBuilder, private userManagementService: UserManagementService) { }

  ngOnInit() {
    this.buildAddUserFormValidation();
    this.getUser();
  }

  buildAddUserFormValidation() {
    this.addUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      empId: ['', Validators.required],
    });
  }
  getUser() {
    this.userManagementService.getUserService().subscribe(val => {
      this.userDetails = val.data;
    }, (error) => {
      this.error = true;
    });
  }
  addNewUser(formValue) {
    this.userManagementService.addNewUserService(formValue).subscribe(res => {
      if (res.data) {
        this.userManagementService.getUserService().subscribe(val => {
          this.addUserForm.reset();
          this.userDetails = val.data;
          alert('New User is added successfully');
        }, (error) => {
          this.error = true;
        });
      }
    },
      (error) => {
        this.error = true;
      });
  }
  sort(field) {
    this.sortField = field;
  }
  editUser(user, index) {
    this.addUserForm.patchValue(user);
    this.updateFlag = true;
    this.editedUserDetails = user;
    this.firstNameRefElm.nativeElement.focus();
  }
  updateUser() {
    const requestParam = {
      'firstName': this.addUserForm.value['firstName'],
      'lastName': this.addUserForm.value['lastName'],
      'empId': this.addUserForm.value['empId'],
      'userId': this.editedUserDetails['userId']
    };
    this.userManagementService.addNewUserService(requestParam).subscribe(res => {
      if (res.data) {
        this.userManagementService.getUserService().subscribe(val => {
          this.reset();
          this.userDetails = val.data;
          alert('User details are updated successfully');
        }, (error) => {
          this.error = true;
        });
      }
    },
      (error) => {
        this.error = true;
      });
  }
  deleteUser(user) {
    this.userManagementService.deletUserService(user).subscribe(res => {
      if (res.data) {
        this.userManagementService.getUserService().subscribe(val => {
          this.userDetails = val.data;
          alert('User details are deleted successfully');
        }, (error) => {
          this.error = true;
        });
      }
    },
      (error) => {
        this.error = true;
      });
  }
  reset() {
    this.addUserForm.reset();
    this.updateFlag = false;

  }
}
