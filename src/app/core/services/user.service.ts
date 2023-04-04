import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { LocalStorageService } from 'src/app/shared/service/local-storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly BASE_URL: string = `${environment.settings.protocole}${environment.settings.url}:${environment.settings.port}/api`;
  private accessToken: any;

  constructor(private http: HttpClient, private localStorage: LocalStorageService) {}

  public getUserList(): Observable<any> {
    const url: string = `${this.BASE_URL}/user`;
    this.accessToken = this.localStorage.getData('ACCESS_TOKEN');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    });
    return this.http.get(url, { headers: headers });
  }

  public addUser(user: User): Observable<any> {
    const url: string = `${this.BASE_URL}/user`;
    this.accessToken = this.localStorage.getData('ACCESS_TOKEN');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    });
    return this.http.post(url, user, { headers: headers })
  }

  public updateUser(user: User): Observable<any> {
    const url: string = `${this.BASE_URL}/user/${user.id}`;
    this.accessToken = this.localStorage.getData('ACCESS_TOKEN');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    });
    return this.http
      .put(url, user, { headers: headers })
  }

  public deleteUser(user: User): Observable<any> {
    const url: string = `${this.BASE_URL}/user/${user.id}`;
    this.accessToken = this.localStorage.getData('ACCESS_TOKEN');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    });
    return this.http.delete(url, { headers: headers });
  }
}
