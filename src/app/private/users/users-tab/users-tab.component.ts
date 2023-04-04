import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/shared/models/user.model';
import { UsersDialogComponent } from '../users-dialog/users-dialog.component';

@Component({
  selector: 'app-users-tab',
  templateUrl: './users-tab.component.html',
  styleUrls: ['./users-tab.component.scss']
})
export class UsersTabComponent implements OnInit {
  public dataSource: MatTableDataSource<any>;
  public displayedColumns: string[] = [
    'user.name',
    'user.firstname',
    'user.lastname',
    'user.email',
    'user.is_admin',
    'action',
  ];

  public users: User[] = [];
  public _users: Subscription;

  private _put: Subscription;
  private _post: Subscription;

  constructor(private dialog: MatDialog, private userService: UserService) { }

  ngOnInit(): void {
    this._users = this.userService
      .getUserList()
      .subscribe((user) => (this.users = user));
  }

  public addUser(): void {
    const dialogRef: MatDialogRef<UsersDialogComponent> = this.dialog.open(
      UsersDialogComponent,
      {
        width: '30vw',
        autoFocus: true,
        data: {
          user: null,
        },
      }
    );
    this._post = dialogRef
      .afterClosed()
      .subscribe((data: { valid: boolean; user: any }) => {
        if (data && data.valid) {
          this.userService.addUser(data.user).subscribe(() => this.fetchData());
        }
      });
  }

  public editUser(user: any): void {
    console.log(user);
    const dialogRef: MatDialogRef<UsersDialogComponent> = this.dialog.open(
      UsersDialogComponent,
      {
        width: '30vw',
        autoFocus: true,
        data: {
          user: user,
        },
      }
    );
    this._put = dialogRef
      .afterClosed()
      .subscribe((data: { valid: boolean; user: any }) => {
        if (data && data.valid) {
          this.userService.updateUser(data.user).subscribe(() => this.fetchData());
        }
      });
  }

  public deleteUser(user: any): void {
    if (confirm(`Voulez-vous vraiment supprimer l'utilisateur ?`)) {
      this.userService.deleteUser(user).subscribe(() => this.fetchData());
    }
  }

  public fetchData(): void {
    this._users = this.userService
      .getUserList()
      .subscribe((user) => (this.users = user));
  }

  public ngOnDestroy(): void {
    this._users && this._users.unsubscribe();
    this._post && this._post.unsubscribe();
    this._put && this._put.unsubscribe();
  }

}
