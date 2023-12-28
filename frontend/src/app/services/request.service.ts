import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  http = inject(HttpClient)

  requestGeneric<T>(method: string, url: string, body?: object) {
    return this.http.request<T>(method, `${environment.domain}${environment.pathUrl}/${url}`, { body })
  }
}
