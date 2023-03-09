import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../model/auth-reponse';
import { User } from '../model/User';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private router: Router, private localStorage: LocalStorageService) { }

  login(user: User): Observable<AuthResponse> {
    user.device_name = "deviceName";
    return this.httpClient.post(`${environment.uriAPI}/loginAdmin`, user)
    .pipe(
      catchError(error => {
        if (error.status != 200) {
          return throwError(error);
        }
      }),
      tap(async (res:AuthResponse) => {

        if (res.user) {
          console.log("res : " + JSON.stringify(res));

          await this.localStorage.saveData(
              "ACCESS_TOKEN",
              res.access_token,
            );
          await this.localStorage.saveData(
              "EXPIRES_IN",
              res.expired_at.toString(),
            );
          await this.localStorage.saveData(
              "USER",
              JSON.stringify(res.user),
            );
          // this.authSubject.next(true);
          this.router.navigateByUrl('/vehicles', {replaceUrl:true});
        }
      })
    );
  }

}
