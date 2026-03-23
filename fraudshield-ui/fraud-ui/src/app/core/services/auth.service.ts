import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.checkAuth());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<any>(this.getCurrentUser());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {}

  /**
   * Check if user is authenticated
   */
  private checkAuth(): boolean {
    return !!localStorage.getItem('authToken');
  }

  /**
   * Get current user from localStorage
   */
  private getCurrentUser(): any {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }

  /**
   * Login user
   */
  login(email: string, password: string): boolean {
    // Mock authentication - replace with actual API call
    const user = { email, name: email.split('@')[0] };
    localStorage.setItem('authToken', 'mock-token-' + Date.now());
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    this.isAuthenticatedSubject.next(true);
    this.currentUserSubject.next(user);
    return true;
  }

  /**
   * Logout user
   */
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  /**
   * Get current user
   */
  getCurrentUserSync(): any {
    return this.currentUserSubject.value;
  }

  /**
   * Get auth token
   */
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
