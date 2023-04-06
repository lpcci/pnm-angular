import { Component, OnInit, Inject, ViewChild, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Item } from 'src/app/shared/models/item.model';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListService } from 'src/app/core/services/list.service';

@Component({
  selector: 'app-items-dialog',
  templateUrl: './items-dialog.component.html',
  styleUrls: ['./items-dialog.component.scss']
})
export class ItemsDialogComponent implements OnInit, OnDestroy {
  public itemForm: FormGroup;
  @ViewChild(FormGroupDirective) itemFormDirective!: FormGroupDirective
  public dataSource: MatTableDataSource<any>;
  public displayedColumns: string[] = [
    'item.label',
    'action',
  ];

  public items: Item[] = [];
  public _items: Subscription;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { item: Item },
  private dialogRef: MatDialogRef<ItemsDialogComponent>, private listService: ListService) { }

  ngOnInit(): void {
    this.initForm();
    this._items = this.listService.getItemList(this.data.item.id).subscribe((item) => (this.items = item))
  }

  public initForm(): void {
    this.itemForm = new FormGroup({
      label: new FormControl('',[
        Validators.required,
      ]),
    });
  }

  public getItemForm(): Item {
    return {
      id: this.data.item ? this.data.item.id : null,
      inventory_id: this.data.item.id,
      default: 1,
      label: this.itemForm.get('label').value,
    };
  }

  public deleteItem(item: any): void {
    if (confirm(`Voulez-vous vraiment supprimer l'objet ?`)) {
      this.listService.deleteItem(item).subscribe(() => this.fetchData());
    }
  }

  public submit(): void {
    if(this.itemForm && this.itemForm.valid) {
      this.listService.addItem(this.getItemForm()).subscribe(() => this.fetchData())
    }
    this.itemForm.reset();
    this.itemFormDirective.resetForm();

  }

  public fetchData(): void {
    this._items = this.listService
      .getItemList(this.data.item.id)
      .subscribe((item) => (this.items = item));
  }

  public ngOnDestroy(): void {
    this._items && this._items.unsubscribe();
  }

}
