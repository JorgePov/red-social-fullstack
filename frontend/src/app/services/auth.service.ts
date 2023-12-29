import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  passwordChange,
  userLogin,
  userRegister,
  userResponse,
} from '../interfaces/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  router = inject(Router);

  login(body: userLogin) {
    return this.http.post<userResponse>(
      `${environment.domain}${environment.pathUrl}/auth/login`,
      body
    );
  }

  register(body: userRegister) {
    return this.http.post<string>(
      `${environment.domain}${environment.pathUrl}/auth/register`,
      body
    );
  }

  changedPassword(body: passwordChange) {
    return this.http.post<string>(
      `${environment.domain}${environment.pathUrl}/auth/change-password`,
      body
    );
  }

  setUserData(userData: userResponse) {
    localStorage.setItem('user', JSON.stringify(userData));
  }

  getUserData(): userResponse {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
