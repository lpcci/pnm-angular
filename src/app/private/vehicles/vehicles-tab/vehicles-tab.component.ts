import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { combineLatest, Subscription, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-vehicles-tab',
  templateUrl: './vehicles-tab.component.html',
  styleUrls: ['./vehicles-tab.component.scss'],
})
export class VehiclesTabComponent implements OnInit, OnDestroy {
  public dataSource: MatTableDataSource<any>;
  public displayedColumns: string[] = [
    'vehicle.libelle',
    'vehicle.description',
    'vehicle.image',
    'vehicle.capacity',
    'action',
  ];

  public vehicles: any[] = [];
  public _vehicles: Subscription;

  constructor() {}

  ngOnInit(): void {}

  public addVehicle(): void {}

  public editVehicle(vehicle: any): void {}

  public deleteVehicle(vehicle: any): void {}

  public ngOnDestroy(): void {
    this._vehicles && this._vehicles.unsubscribe();
  }
}
