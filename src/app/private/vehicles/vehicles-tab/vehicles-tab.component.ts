import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Vehicle } from 'src/app/shared/models/vehicle.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VehiclesDialogComponent } from '../vehicles-dialog/vehicles-dialog.component';
@Component({
  selector: 'app-vehicles-tab',
  templateUrl: './vehicles-tab.component.html',
  styleUrls: ['./vehicles-tab.component.scss'],
})
export class VehiclesTabComponent implements OnInit, OnDestroy {
  public dataSource: MatTableDataSource<any>;
  public displayedColumns: string[] = [
    'vehicle.label',
    'vehicle.description',
    'vehicle.image',
    'vehicle.capacity',
    'action',
  ];

  public vehicles: Vehicle[] = [];
  public _vehicles: Subscription;

  private _put: Subscription;
  private _post: Subscription;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  public addVehicle(): void {
    const dialogRef: MatDialogRef<VehiclesDialogComponent> = this.dialog.open(
      VehiclesDialogComponent,
      {
        width: '30vw',
        autoFocus: true,
        data: {
          vehicle: null,
        },
      }
    );
    this._post = dialogRef
      .afterClosed()
      .subscribe((data: { valid: boolean; vehicle: any }) => {
        if (data && data.valid) {
          /* this.vehicleService.addVehicle(data.vehicle).subscribe(); */
        }
      });
  }

  public editVehicle(vehicle: any): void {
    const dialogRef: MatDialogRef<VehiclesDialogComponent> = this.dialog.open(
      VehiclesDialogComponent,
      {
        width: '30vw',
        autoFocus: true,
        data: {
          vehicle: vehicle,
        },
      }
    );
    this._put = dialogRef
      .afterClosed()
      .subscribe((data: { valid: boolean; vehicle: any }) => {
        if (data && data.valid) {
          /* this.vehicleService.updateVehicle(data.vehicle).subscribe(); */
        }
      });
  }

  public deleteVehicle(vehicle: any): void {
    if (confirm('Voulez-vous vraiment supprimer le véhicule ?')) {
      /* this.vehicleService.deleteDelete(vehicle).subscribe(); */
    }
  }

  public ngOnDestroy(): void {
    this._vehicles && this._vehicles.unsubscribe();
    this._post && this._post.unsubscribe();
    this._put && this._put.unsubscribe();
  }
}
