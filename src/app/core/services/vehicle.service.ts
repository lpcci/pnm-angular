import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle } from 'src/app/shared/models/vehicle.model';
import { LocalStorageService } from 'src/app/shared/service/local-storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private readonly BASE_URL: string = `${environment.settings.protocole}${environment.settings.url}:${environment.settings.port}/api`;
  private accessToken: any;

  constructor(private http: HttpClient, private localStorage: LocalStorageService) {}

  public getVehicleList(): Observable<any> {
    const url: string = `${this.BASE_URL}/vehicle`;
    this.accessToken = this.localStorage.getData('ACCESS_TOKEN');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    });
    return this.http.get(url, { headers: headers });
  }

  public addVehicle(vehicle: Vehicle): Observable<any> {
    const url: string = `${this.BASE_URL}/vehicle`;
    this.accessToken = this.localStorage.getData('ACCESS_TOKEN');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    });
    return this.http.post(url, vehicle, { headers: headers })
  }

  public updateVehicle(vehicle: Vehicle): Observable<any> {
    const url: string = `${this.BASE_URL}/vehicle/${vehicle.id}`;
    this.accessToken = this.localStorage.getData('ACCESS_TOKEN');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    });
    return this.http
      .put(url, vehicle, { headers: headers })
  }

  public deleteVehicle(vehicle: Vehicle): Observable<any> {
    const url: string = `${this.BASE_URL}/vehicle/${vehicle.id}`;
    this.accessToken = this.localStorage.getData('ACCESS_TOKEN');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    });
    return this.http.delete(url, { headers: headers });
  }
}
