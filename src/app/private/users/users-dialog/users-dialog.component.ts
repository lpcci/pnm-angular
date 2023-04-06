import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-users-dialog',
  templateUrl: './users-dialog.component.html',
  styleUrls: ['./users-dialog.component.scss']
})
export class UsersDialogComponent implements OnInit {
  public userForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    private dialogRef: MatDialogRef<UsersDialogComponent>
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.userForm = new FormGroup({
      name: new FormControl(this.data.user ? this.data.user.name : '', [
        Validators.required,
      ]),
      firstname: new FormControl(
        this.data.user ? this.data.user.firstname : '',
        [Validators.required]
      ),
      lastname: new FormControl(this.data.user ? this.data.user.lastname : '', [
        Validators.required,
      ]),
      email: new FormControl(
        this.data.user ? {value: this.data.user.email, disabled: true}: '',
        [Validators.required]
      ),
      is_admin: new FormControl(
        this.data.user ? this.data.user.is_admin : '',
        [Validators.required]
      ),
    });
  }

  public getUserForm(): User {
    return {
      id: this.data.user ? this.data.user.id : null,
      name: this.userForm.get('name').value,
      firstname: this.userForm.get('firstname').value,
      lastname: this.userForm.get('lastname').value,
      email: this.userForm.get('email').value,
      is_admin: this.userForm.get('is_admin').value
    };
  }

  public submit(): void {
    this.dialogRef.close({
      valid: true,
      user: this.getUserForm(),
    });
  }
}
