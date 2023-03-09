import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/shared/model/User';
import { AuthService } from 'src/app/shared/service/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;

  constructor(private authenticationService: AuthService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  async onSubmit(form){
    await this.authenticationService.login(form.value).subscribe({
      next: (value: any) => {
       },
      error: async (error: any) => { 
        if(error?.error?.message){
          const alert = Swal.fire({
            title: 'Error!',
            text: error.error.message,
            icon: 'error',
            confirmButtonText: 'OK'
          })
          return alert;
        } else {
          const alert = Swal.fire({
            title: 'Error!',
            text: 'server error',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        return alert;
        }
      },
      complete:  () => { 
      }
    })
  }
}
