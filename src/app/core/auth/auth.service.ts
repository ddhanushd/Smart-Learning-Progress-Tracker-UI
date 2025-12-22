import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API = 'http://localhost:8080/api/v1/auth';

  constructor(private http: HttpClient) {}

  login(payload: { email: string; password: string }) {
    return this.http.post<any>(`${this.API}/login`, payload)
      .pipe(
        tap(res => {
          localStorage.setItem('access_token', res.accessToken);
          localStorage.setItem('refresh_token', res.refreshToken);
        })
      );
    }
    
    refreshToken() {
    const refreshToken = localStorage.getItem('refresh_token');
    return this.http.post<any>(`${this.API}/refresh`, { refreshToken })
      .pipe(
        tap(res => {
          localStorage.setItem('access_token', res.accessToken);
        })
      );
  }

  logout() {
    localStorage.clear();
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }
}
