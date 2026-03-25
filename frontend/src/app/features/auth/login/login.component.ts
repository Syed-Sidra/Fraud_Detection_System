import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CardModule, InputTextModule, PasswordModule, ButtonModule, MessageModule],
  template: `
    <div class="auth-wrapper">
      <div class="auth-bg">
        <div class="auth-particles">
          <div class="particle" *ngFor="let p of [1,2,3,4,5,6]"></div>
        </div>
      </div>
      <div class="auth-card">
        <div class="auth-logo">
          <i class="pi pi-shield"></i>
        </div>
        <h1 class="auth-title">FraudGuard</h1>
        <p class="auth-subtitle">Digital Banking Fraud Detection System</p>

        <p-message *ngIf="error" severity="error" [text]="error" styleClass="w-full mb-3"></p-message>

        <div class="auth-form">
          <div class="field">
            <label>Username</label>
            <div class="p-input-icon-left w-full">
              <i class="pi pi-user"></i>
              <input pInputText [(ngModel)]="username" placeholder="Enter username"
                     class="w-full" (keyup.enter)="login()" />
            </div>
          </div>
          <div class="field">
            <label>Password</label>
            <p-password [(ngModel)]="password" placeholder="Enter password"
                        [feedback]="false" [toggleMask]="true" styleClass="w-full"
                        inputStyleClass="w-full" (keyup.enter)="login()"></p-password>
          </div>
          <button pButton label="Sign In" icon="pi pi-sign-in"
                  class="w-full login-btn" [loading]="loading" (click)="login()"></button>
        </div>

        <p class="auth-link">
          Don't have an account? <a routerLink="/register">Create one</a>
        </p>

        <div class="demo-creds">
          <p class="demo-label">Demo Credentials</p>
          <div class="cred-row"><span>Admin:</span><code>admin / admin123</code></div>
          <div class="cred-row"><span>Analyst:</span><code>analyst / analyst123</code></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-wrapper {
      min-height: 100vh; display: flex; align-items: center; justify-content: center;
      background: #0f1117; position: relative; overflow: hidden;
    }
    .auth-bg {
      position: absolute; inset: 0;
      background: radial-gradient(ellipse at 20% 50%, rgba(99,102,241,.15) 0%, transparent 60%),
                  radial-gradient(ellipse at 80% 20%, rgba(168,85,247,.1) 0%, transparent 50%);
    }
    .auth-particles { position: absolute; inset: 0; }
    .particle {
      position: absolute; border-radius: 50%; opacity: .3;
      animation: float 6s ease-in-out infinite;
      background: linear-gradient(135deg, #6366f1, #a855f7);
    }
    .particle:nth-child(1){width:80px;height:80px;top:10%;left:10%;animation-delay:0s}
    .particle:nth-child(2){width:40px;height:40px;top:60%;left:5%;animation-delay:1s}
    .particle:nth-child(3){width:60px;height:60px;top:20%;right:15%;animation-delay:2s}
    .particle:nth-child(4){width:30px;height:30px;top:70%;right:10%;animation-delay:.5s}
    .particle:nth-child(5){width:50px;height:50px;bottom:20%;left:30%;animation-delay:1.5s}
    .particle:nth-child(6){width:70px;height:70px;bottom:10%;right:30%;animation-delay:3s}
    @keyframes float{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-20px) rotate(180deg)}}

    .auth-card {
      position: relative; z-index: 10;
      width: 420px; background: #13151e;
      border: 1px solid #1e2030; border-radius: 20px;
      padding: 40px; box-shadow: 0 25px 50px rgba(0,0,0,.5);
    }
    .auth-logo {
      width: 64px; height: 64px; border-radius: 16px;
      background: linear-gradient(135deg, #6366f1, #a855f7);
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 20px; font-size: 28px; color: white;
    }
    .auth-title { text-align:center; margin:0; font-size:28px; font-weight:700;
      background: linear-gradient(135deg,#6366f1,#a855f7); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
    .auth-subtitle { text-align:center; color:#64748b; font-size:13px; margin:6px 0 28px; }

    .auth-form { display:flex; flex-direction:column; gap:16px; }
    .field { display:flex; flex-direction:column; gap:6px; }
    label { color:#94a3b8; font-size:13px; font-weight:500; }

    .login-btn {
      background: linear-gradient(135deg,#6366f1,#a855f7) !important;
      border: none !important; height: 44px; font-weight:600; font-size:15px;
      border-radius: 10px !important; margin-top:8px;
    }
    .auth-link { text-align:center; color:#64748b; font-size:13px; margin:20px 0 0; }
    .auth-link a { color:#6366f1; text-decoration:none; font-weight:600; }

    .demo-creds {
      margin-top: 20px; background: rgba(99,102,241,.08);
      border: 1px solid rgba(99,102,241,.2); border-radius: 10px; padding: 12px 16px;
    }
    .demo-label { color:#94a3b8; font-size:11px; font-weight:600; text-transform:uppercase; margin:0 0 8px; }
    .cred-row { display:flex; align-items:center; gap:10px; margin:4px 0; color:#64748b; font-size:12px; }
    .cred-row code { background:#1e2030; color:#a5b4fc; padding:2px 8px; border-radius:4px; font-size:12px; }
  `]
})
export class LoginComponent {
  username = ''; password = ''; loading = false; error = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    if (!this.username || !this.password) { this.error = 'Please enter credentials'; return; }
    this.loading = true; this.error = '';
    this.auth.login({ username: this.username, password: this.password }).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (e) => { this.error = e.error?.message || 'Login failed'; this.loading = false; }
    });
  }
}
