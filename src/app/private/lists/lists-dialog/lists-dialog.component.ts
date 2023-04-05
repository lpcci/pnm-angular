import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { List } from 'src/app/shared/models/list.model';

@Component({
  selector: 'app-lists-dialog',
  templateUrl: './lists-dialog.component.html',
  styleUrls: ['./lists-dialog.component.scss']
})
export class ListsDialogComponent implements OnInit {
  public listForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { list: List },
    private dialogRef: MatDialogRef<ListsDialogComponent>
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.listForm = new FormGroup({
      label: new FormControl(this.data.list ? this.data.list.label : '', [
        Validators.required,
      ]),
    });
  }

  public getListForm(): List {
    return {
      id: this.data.list ? this.data.list.id : null,
      user_id: 1,
      default: 1,
      label: this.listForm.get('label').value,
    };
  }

  public submit(): void {
    this.dialogRef.close({
      valid: true,
      list: this.getListForm(),
    });
  }
}
