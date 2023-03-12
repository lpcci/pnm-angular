import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../model/auth-reponse';
import { User } from '../model/User';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly BASE_URL: string = `${environment.settings.protocole}${environment.settings.url}:${environment.settings.port}/api`;
  authSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  // On passe par une variable publique car on n'expose pas directement un subject
  public readonly isAuth: Observable<boolean> = this.authSubject.asObservable();
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private localStorage: LocalStorageService
  ) {}

  login(user: User): Observable<AuthResponse> {
    const url: string = `${this.BASE_URL}/loginAdmin`;
    user.device_name = 'deviceName';
    return this.httpClient.post(url, user).pipe(
      catchError((error) => {
        if (error.status != 200) {
          return throwError(error);
        }
      }),
      tap(async (res: AuthResponse) => {
        if (res.user) {
          console.log('res : ' + JSON.stringify(res));

          await this.localStorage.saveData('ACCESS_TOKEN', res.access_token);
          await this.localStorage.saveData(
            'EXPIRES_IN',
            res.expired_at.toString()
          );
          await this.localStorage.saveData('USER', JSON.stringify(res.user));
          this.authSubject.next(true);
          this.router.navigateByUrl('/home', { replaceUrl: true });
        }
      })
    );
  }

  async logout() {
    await this.localStorage.clearData();
    this.authSubject.next(false);
    this.router.navigateByUrl('', { replaceUrl: true });
  }

  getIsAuth() {
    return this.isAuth;
  }
}
