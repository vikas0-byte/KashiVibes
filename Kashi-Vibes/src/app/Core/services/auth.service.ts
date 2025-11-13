import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';

// Tumhare existing interfaces use karo
import { LoginRequest, RegisterRequest, AuthResponse, User } from '../../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  
  // Tumhare existing signals
  private _isAuthenticated = signal<boolean>(this.hasToken());
  private _currentUser = signal<User | null>(this.getUserFromStorage());
  
  public isAuthenticated = this._isAuthenticated.asReadonly();
  public currentUser = this._currentUser.asReadonly();

  // Existing methods ko backend API calls se update karo
  login(loginRequest: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, loginRequest)
      .pipe(
        tap(response => {
          if (response.success && response.token && response.user) {
            this.setAuthData(response.token, response.user);
          }
        })
      );
  }

  register(registerRequest: RegisterRequest): Observable<AuthResponse> {
  // ConfirmPassword ko include karo
  return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, registerRequest)
    .pipe(
      tap(response => {
        if (response.success && response.token && response.user) {
          this.setAuthData(response.token, response.user);
        }
      })
    );
}

  // Tumhare existing methods yahi rahenge
  private setAuthData(token: string, user: User): void {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_data', JSON.stringify(user));
    this._isAuthenticated.set(true);
    this._currentUser.set(user);
  }

  private getUserFromStorage(): User | null {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    this._isAuthenticated.set(false);
    this._currentUser.set(null);
  }

  // isAuthenticated(): boolean {
  //   return this._isAuthenticated();
  // }
} 