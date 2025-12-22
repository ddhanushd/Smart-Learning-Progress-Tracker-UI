import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private AUTH_API = environment.authBaseUrl;

  constructor(private http: HttpClient) {}

  login(payload: { username: string; password: string }) {
    return this.http.post<any>(`${this.AUTH_API}/login`, payload).pipe(
      tap(res => {
        localStorage.setItem('access_token', res.accessToken);
        localStorage.setItem('refresh_token', res.refreshToken);
      })
    );
  }

  refreshToken() {
    return this.http.post<any>(`${this.AUTH_API}/refresh`, {
      refreshToken: localStorage.getItem('refresh_token')
    });
  }

 logout() {
  return this.http.post(`${this.AUTH_API}/logout`, {}).pipe(
    tap(() => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    })
  );
}


  getAccessToken() {
    return localStorage.getItem('access_token');
  }
}
