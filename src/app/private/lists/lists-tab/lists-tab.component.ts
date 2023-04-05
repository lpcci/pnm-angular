import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ListService } from 'src/app/core/services/list.service';
import { List } from 'src/app/shared/models/list.model';
import { ListsDialogComponent } from '../lists-dialog/lists-dialog.component';

@Component({
  selector: 'app-lists-tab',
  templateUrl: './lists-tab.component.html',
  styleUrls: ['./lists-tab.component.scss']
})
export class ListsTabComponent implements OnInit {
  public dataSource: MatTableDataSource<any>;
  public displayedColumns: string[] = [
    'list.label',
    'action',
  ];

  public lists: List[] = [];
  public _lists: Subscription;

  private _put: Subscription;
  private _post: Subscription;

  constructor(
    private dialog: MatDialog,
    private listService: ListService
  ) {}

  ngOnInit(): void {
    this._lists = this.listService
      .getListList()
      .subscribe((list) => (this.lists = list));

  }

  public addList(): void {
    const dialogRef: MatDialogRef<ListsDialogComponent> = this.dialog.open(
      ListsDialogComponent,
      {
        width: '30vw',
        autoFocus: true,
        data: {
          list: null,
        },
      }
    );
    this._post = dialogRef
      .afterClosed()
      .subscribe((data: { valid: boolean; list: any }) => {
        if (data && data.valid) {
          this.listService.addList(data.list).subscribe(() => this.fetchData());
        }
      });
  }

  public editList(list: any): void {
    const dialogRef: MatDialogRef<ListsDialogComponent> = this.dialog.open(
      ListsDialogComponent,
      {
        width: '30vw',
        autoFocus: true,
        data: {
          list: list,
        },
      }
    );
    this._put = dialogRef
      .afterClosed()
      .subscribe((data: { valid: boolean; list: any }) => {
        if (data && data.valid) {
          this.listService.updateList(data.list).subscribe(() => this.fetchData());
        }
      });
  }

  public deleteList(list: any): void {
    if (confirm('Voulez-vous vraiment supprimer la liste ?')) {
      this.listService.deleteList(list).subscribe(() => this.fetchData());
    }
  }

  public fetchData(): void {
    this._lists = this.listService
      .getListList()
      .subscribe((list) => (this.lists = list));
  }

  public ngOnDestroy(): void {
    this._lists && this._lists.unsubscribe();
    this._post && this._post.unsubscribe();
    this._put && this._put.unsubscribe();
  }
}
