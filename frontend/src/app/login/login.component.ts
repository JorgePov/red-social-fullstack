import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export default class LoginComponent {
  fb = inject(FormBuilder)
  loginService = inject(AuthService)
  router = inject(Router)
  loginform: FormGroup
  constructor() {
    this.loginform = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {


    if (this.loginform.valid) {
      const { email, password } = this.loginform.value
      const body = { email, password }

      this.loginService.login(body).subscribe({
        next: (data) => {
          this.loginService.setUserData(data)
          this.router.navigate(['/dashboard/messages'])
        },
        error: (error) => { console.log(error) },
        complete: () => { },
      })
    }
  }
}
