import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { userLogin, userResponse } from '../interfaces/user';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)

  login(body: userLogin) {
    return this.http.post<userResponse>(`${environment.domain}${environment.pathUrl}/auth/login`, body)
  }

  setUserData(userData: userResponse) {
    localStorage.setItem('user', JSON.stringify(userData))
  }

  getUserData(): userResponse {
    return JSON.parse(localStorage.getItem('user') || '{}')
  }

}
