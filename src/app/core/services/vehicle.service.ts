import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle } from 'src/app/shared/models/vehicle.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private readonly BASE_URL: string = `${environment.settings.protocole}${environment.settings.url}:${environment.settings.port}/api`;

  constructor(private http: HttpClient) {}

  public getVehicleList(): Observable<any> {
    const url: string = `${this.BASE_URL}/vehicle`;
    return this.http.get(url);
  }

  public addVehicle(vehicle: Vehicle): Observable<any> {
    return;
  }

  public updateVehicle(vehicle: Vehicle): Observable<any> {
    return;
  }

  public deleteVehicle(vehicle: Vehicle): Observable<any> {
    return;
  }
}
