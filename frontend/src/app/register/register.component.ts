import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
})
export default class RegisterComponent {
  fb = inject(FormBuilder);
  registerService = inject(AuthService);
  router = inject(Router);
  registerForm: FormGroup;
  constructor() {
    this.registerForm = this.fb.group({
      age: ['', Validators.required],
      email: ['', Validators.required],
      fullName: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirmed: ['', Validators.required],
    });
  }

  register() {
    if (this.registerForm.valid) {
      const { age, email, fullName, password, passwordConfirmed } =
        this.registerForm.value;

      if (password !== passwordConfirmed) {
        return;
      }
      const body = { age, email, fullName, password };

      this.registerService.register(body).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {},
      });
    }
  }
}
