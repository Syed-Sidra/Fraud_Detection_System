import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MessageModule } from 'primeng/message';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, InputTextModule, PasswordModule, ButtonModule, DropdownModule, MessageModule],
  template: `
    <div class="auth-wrapper">
      <div class="auth-card">
        <div class="auth-logo"><i class="pi pi-shield"></i></div>
        <h1 class="auth-title">Create Account</h1>
        <p class="auth-subtitle">Join the Fraud Detection Platform</p>

        <p-message *ngIf="error" severity="error" [text]="error" styleClass="w-full mb-3"></p-message>

        <div class="auth-form">
          <div class="field">
            <label>Username</label>
            <input pInputText [(ngModel)]="form.username" placeholder="Enter username" class="w-full" />
          </div>
          <div class="field">
            <label>Email</label>
            <input pInputText [(ngModel)]="form.email" type="email" placeholder="Enter email" class="w-full" />
          </div>
          <div class="field">
            <label>Password</label>
            <p-password [(ngModel)]="form.password" placeholder="Min 6 characters"
                        [toggleMask]="true" styleClass="w-full" inputStyleClass="w-full"></p-password>
          </div>
          <div class="field">
            <label>Role</label>
            <p-dropdown [(ngModel)]="form.role" [options]="roles" placeholder="Select role"
                        styleClass="w-full"></p-dropdown>
          </div>
          <button pButton label="Create Account" icon="pi pi-user-plus"
                  class="w-full login-btn" [loading]="loading" (click)="register()"></button>
        </div>
        <p class="auth-link">Already have an account? <a routerLink="/login">Sign in</a></p>
      </div>
    </div>
  `,
  styles: [`
    .auth-wrapper { min-height:100vh; display:flex; align-items:center; justify-content:center; background:#0f1117; }
    .auth-card { width:420px; background:#13151e; border:1px solid #1e2030; border-radius:20px; padding:40px; }
    .auth-logo { width:64px;height:64px;border-radius:16px;background:linear-gradient(135deg,#6366f1,#a855f7);display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:28px;color:white; }
    .auth-title { text-align:center;margin:0;font-size:28px;font-weight:700;background:linear-gradient(135deg,#6366f1,#a855f7);-webkit-background-clip:text;-webkit-text-fill-color:transparent; }
    .auth-subtitle { text-align:center;color:#64748b;font-size:13px;margin:6px 0 28px; }
    .auth-form { display:flex;flex-direction:column;gap:16px; }
    .field { display:flex;flex-direction:column;gap:6px; }
    label { color:#94a3b8;font-size:13px;font-weight:500; }
    .login-btn { background:linear-gradient(135deg,#6366f1,#a855f7)!important;border:none!important;height:44px;font-weight:600;border-radius:10px!important;margin-top:8px; }
    .auth-link { text-align:center;color:#64748b;font-size:13px;margin:20px 0 0; }
    .auth-link a { color:#6366f1;text-decoration:none;font-weight:600; }
  `]
})
export class RegisterComponent {
  form = { username: '', email: '', password: '', role: 'ANALYST' };
  roles = [{ label: 'Analyst', value: 'ANALYST' }, { label: 'Admin', value: 'ADMIN' }];
  loading = false; error = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    if (!this.form.username || !this.form.email || !this.form.password) {
      this.error = 'All fields required'; return;
    }
    this.loading = true; this.error = '';
    this.auth.register(this.form).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (e) => { this.error = e.error?.message || 'Registration failed'; this.loading = false; }
    });
  }
}
