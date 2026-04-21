import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { AuthService } from '../../../core/services/auth.service';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule,
    BadgeModule, AvatarModule, ButtonModule, TagModule, TooltipModule],
  template: `
    <div class="layout-wrapper">
      <nav class="sidebar">
        <div class="sidebar-header">
          <div class="brand">
            <i class="pi pi-shield brand-icon"></i>
            <span class="brand-text">FraudGuard</span>
          </div>
        </div>

        <ul class="nav-menu">
          <!-- Section label: Main -->
          <li class="nav-section">MAIN</li>
          <li *ngFor="let item of mainNav">
            <a *ngIf="!item.adminOnly || role() === 'ADMIN'"
               [routerLink]="item.route" routerLinkActive="active" class="nav-item">
              <i [class]="'pi ' + item.icon"></i>
              <span>{{ item.label }}</span>
              <span *ngIf="item.badge && unreadCount() > 0" class="nav-badge">{{ unreadCount() }}</span>
            </a>
          </li>

          <!-- Section label: Admin only -->
          <li class="nav-section" *ngIf="role() === 'ADMIN'">ADMIN</li>
          <li *ngFor="let item of adminNav">
            <a *ngIf="role() === 'ADMIN'"
               [routerLink]="item.route" routerLinkActive="active" class="nav-item admin-item">
              <i [class]="'pi ' + item.icon"></i>
              <span>{{ item.label }}</span>
            </a>
          </li>
        </ul>

        <div class="sidebar-footer">
          <div class="user-info">
            <p-avatar [label]="userInitial()" styleClass="mr-2" size="normal"
                      shape="circle" [style]="{'background-color': role()==='ADMIN' ? '#ef4444' : '#6366f1','color':'#fff'}"></p-avatar>
            <div class="user-details">
              <div class="user-name">{{ username() }}</div>
              <p-tag [value]="role()" [severity]="role() === 'ADMIN' ? 'danger' : 'info'"
                     styleClass="text-xs"></p-tag>
            </div>
          </div>
          <button pButton icon="pi pi-sign-out" class="p-button-text p-button-rounded logout-btn"
                  pTooltip="Logout" (click)="logout()"></button>
        </div>
      </nav>

      <main class="main-content">
        <header class="topbar">
          <div class="topbar-left">
            <h2 class="page-title">{{ currentPageTitle() }}</h2>
          </div>
          <div class="topbar-right">
            <div class="role-indicator">
              <i class="pi" [class]="role() === 'ADMIN' ? 'pi-shield' : 'pi-eye'"></i>
              <span>{{ role() }}</span>
            </div>
            <div class="simulation-badge" *ngIf="simRunning()">
              <span class="sim-dot"></span>
              <span class="sim-text">Simulation Running</span>
            </div>
            <button pButton icon="pi pi-bell" class="p-button-text p-button-rounded alert-btn"
                    [routerLink]="['/alerts']" pTooltip="Fraud Alerts">
              <span *ngIf="unreadCount() > 0" class="alert-count">{{ unreadCount() }}</span>
            </button>
          </div>
        </header>
        <div class="content-area">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .layout-wrapper { display:flex; height:100vh; overflow:hidden; background:#0f1117; }

    .sidebar { width:240px; min-width:240px; background:#13151e; border-right:1px solid #1e2030; display:flex; flex-direction:column; }
    .sidebar-header { padding:20px 16px; border-bottom:1px solid #1e2030; }
    .brand { display:flex; align-items:center; gap:10px; }
    .brand-icon { font-size:24px; color:#6366f1; }
    .brand-text { font-size:18px; font-weight:700; color:#e2e8f0;
      background:linear-gradient(135deg,#6366f1,#a855f7);
      -webkit-background-clip:text; -webkit-text-fill-color:transparent; }

    .nav-menu { list-style:none; margin:0; padding:10px 0; flex:1; overflow-y:auto; }
    .nav-section { padding:12px 20px 4px; font-size:9px; color:#475569; text-transform:uppercase; font-weight:700; letter-spacing:1.2px; }

    .nav-item { display:flex; align-items:center; gap:12px; padding:10px 20px;
      color:#94a3b8; text-decoration:none; transition:all .2s; font-size:13px; font-weight:500; }
    .nav-item:hover { background:#1e2030; color:#e2e8f0; }
    .nav-item.active { background:linear-gradient(90deg,rgba(99,102,241,.2),transparent); color:#6366f1; border-left:3px solid #6366f1; }
    .nav-item.admin-item:hover { background:rgba(239,68,68,.06); }
    .nav-item.admin-item.active { background:linear-gradient(90deg,rgba(239,68,68,.15),transparent); color:#ef4444; border-left:3px solid #ef4444; }
    .nav-item .pi { font-size:15px; width:18px; text-align:center; }

    .nav-badge { margin-left:auto; background:#ef4444; color:#fff; font-size:11px; font-weight:700; padding:2px 7px; border-radius:10px; animation:pulse 2s infinite; }
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.6}}

    .sidebar-footer { padding:14px 16px; border-top:1px solid #1e2030; display:flex; align-items:center; justify-content:space-between; }
    .user-info { display:flex; align-items:center; gap:10px; }
    .user-name { font-size:13px; font-weight:600; color:#e2e8f0; }
    .logout-btn { color:#ef4444 !important; }

    .main-content { flex:1; display:flex; flex-direction:column; overflow:hidden; }
    .topbar { height:60px; background:#13151e; border-bottom:1px solid #1e2030;
      display:flex; align-items:center; justify-content:space-between; padding:0 24px; }
    .page-title { margin:0; font-size:18px; font-weight:600; color:#e2e8f0; }
    .topbar-right { display:flex; align-items:center; gap:14px; }

    .role-indicator { display:flex; align-items:center; gap:6px; padding:4px 12px; border-radius:20px;
      background:rgba(99,102,241,.12); border:1px solid rgba(99,102,241,.25); font-size:11px; font-weight:700; color:#a5b4fc; }

    .simulation-badge { display:flex; align-items:center; gap:8px; background:rgba(34,197,94,.15);
      border:1px solid rgba(34,197,94,.3); padding:4px 12px; border-radius:20px; }
    .sim-dot { width:8px; height:8px; border-radius:50%; background:#22c55e; animation:pulse 1.5s infinite; }
    .sim-text { font-size:12px; color:#22c55e; font-weight:600; }

    .alert-btn { position:relative; color:#94a3b8 !important; }
    .alert-count { position:absolute; top:-4px; right:-4px; background:#ef4444; color:#fff;
      font-size:10px; font-weight:700; width:18px; height:18px; border-radius:50%;
      display:flex; align-items:center; justify-content:center; animation:pulse 2s infinite; }

    .content-area { flex:1; overflow-y:auto; padding:24px; }
  `]
})
export class LayoutComponent implements OnInit, OnDestroy {
  unreadCount = signal(0);
  simRunning  = signal(false);
  private pollSub?: Subscription;

  // Main nav — visible to all roles
  mainNav = [
    { label: 'Dashboard',    route: '/dashboard',     icon: 'pi-th-large',            badge: false, adminOnly: false },
    { label: 'Live Feed',    route: '/transactions',  icon: 'pi-list',                badge: false, adminOnly: false },
    { label: 'Fraud Alerts', route: '/alerts',        icon: 'pi-exclamation-triangle',badge: true,  adminOnly: false },
    { label: 'Analytics',    route: '/analytics',     icon: 'pi-chart-bar',           badge: false, adminOnly: false },
    { label: 'ML Insights',  route: '/ml-insights',   icon: 'pi-microchip-ai',        badge: false, adminOnly: false },
    { label: 'System Status',route: '/system-status', icon: 'pi-server',              badge: false, adminOnly: false },
  ];

  // Admin-only nav — shown only when role === ADMIN
  adminNav = [
    { label: 'Simulation',      route: '/simulation',      icon: 'pi-play-circle' },
    { label: 'User Management', route: '/user-management', icon: 'pi-users' },
    { label: 'Audit Log',       route: '/audit-log',       icon: 'pi-history' },
  ];

  allNavItems = [...this.mainNav, ...this.adminNav.map(n => ({ ...n, badge: false, adminOnly: true }))];

  constructor(private auth: AuthService, private api: ApiService, private router: Router) {}

  username    = () => this.auth.currentUser()?.username ?? '';
  role        = () => this.auth.currentUser()?.role ?? '';
  userInitial = () => (this.auth.currentUser()?.username ?? 'U')[0].toUpperCase();

  currentPageTitle() {
    const url = this.router.url;
    const all = [...this.mainNav, ...this.adminNav];
    const item = all.find(n => url.startsWith(n.route));
    return item?.label ?? 'FraudGuard';
  }

  ngOnInit() {
    this.refreshAlertCount();
    this.refreshSimStatus();
    this.pollSub = interval(10000).subscribe(() => {
      this.refreshAlertCount();
      this.refreshSimStatus();
    });
  }
  ngOnDestroy() { this.pollSub?.unsubscribe(); }

  private refreshAlertCount() {
    this.api.getUnreadCount().subscribe(r => this.unreadCount.set(r.count));
  }
  private refreshSimStatus() {
    this.api.getSimulationStatus().subscribe(s => this.simRunning.set(s.running));
  }
  logout() { this.auth.logout(); }
}
