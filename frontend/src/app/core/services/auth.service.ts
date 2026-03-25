import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthResponse, LoginRequest, RegisterRequest } from '../../shared/models/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API = '/api/auth';
  currentUser = signal<AuthResponse | null>(this.loadUser());

  constructor(private http: HttpClient, private router: Router) {}

  login(req: LoginRequest) {
    return this.http.post<AuthResponse>(`${this.API}/login`, req).pipe(
      tap(res => this.setUser(res))
    );
  }

  register(req: RegisterRequest) {
    return this.http.post<AuthResponse>(`${this.API}/register`, req).pipe(
      tap(res => this.setUser(res))
    );
  }

  logout() {
    localStorage.removeItem('auth');
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean { return !!this.currentUser(); }
  getToken(): string | null { return this.currentUser()?.token ?? null; }
  getRole(): string { return this.currentUser()?.role ?? ''; }

  private setUser(res: AuthResponse) {
    localStorage.setItem('auth', JSON.stringify(res));
    this.currentUser.set(res);
  }

  private loadUser(): AuthResponse | null {
    try { return JSON.parse(localStorage.getItem('auth') || 'null'); }
    catch { return null; }
  }
}
