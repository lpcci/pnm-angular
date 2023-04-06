import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Vehicle } from 'src/app/shared/models/vehicle.model';

@Component({
  selector: 'app-vehicles-dialog',
  templateUrl: './vehicles-dialog.component.html',
  styleUrls: ['./vehicles-dialog.component.scss'],
})
export class VehiclesDialogComponent implements OnInit {
  public vehicleForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { vehicle: Vehicle },
    private dialogRef: MatDialogRef<VehiclesDialogComponent>
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.vehicleForm = new FormGroup({
      label: new FormControl(this.data.vehicle ? this.data.vehicle.label : '', [
        Validators.required,
      ]),
      description: new FormControl(
        this.data.vehicle ? this.data.vehicle.description : '',
        [Validators.required]
      ),
      image: new FormControl(this.data.vehicle ? this.data.vehicle.image : '', [
        Validators.required,
      ]),
      capacity: new FormControl(
        this.data.vehicle ? this.data.vehicle.capacity : '',
        [Validators.required]
      ),
    });
  }

  public getVehicleForm(): Vehicle {
    return {
      id: this.data.vehicle ? this.data.vehicle.id : null,
      label: this.vehicleForm.get('label').value,
      description: this.vehicleForm.get('description').value,
      image: this.vehicleForm.get('image').value,
      capacity: this.vehicleForm.get('capacity').value,
    };
  }

  public submit(): void {
    this.dialogRef.close({
      valid: true,
      vehicle: this.getVehicleForm(),
    });
  }
}
