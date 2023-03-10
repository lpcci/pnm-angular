import { Component } from '@angular/core';
import { AuthService } from './shared/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pnm-angular';
  isAuth = false;

  constructor(private authenticationService: AuthService){
    console.log(this.authenticationService.getIsAuth());
    this.authenticationService.getIsAuth().subscribe(value => {
      this.isAuth = value;
    });
  }
}
