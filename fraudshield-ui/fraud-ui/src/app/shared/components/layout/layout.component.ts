import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, OverlayPanelModule, TooltipModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  collapsed = signal(false);
  mobileOpen = signal(false);
  isMobile = signal(false);

  navItems = [
    { label: 'Dashboard',    icon: 'fas fa-chart-pie',   route: '/app/dashboard' },
    { label: 'Transactions', icon: 'fas fa-credit-card', route: '/app/transactions', badge: 19 },
    { label: 'Analytics',    icon: 'fas fa-chart-mixed', route: '/app/analytics' },
    { label: 'Simulation',   icon: 'fas fa-flask-vial',  route: '/app/simulation' },
  ];

  alerts = [
    { type: 'danger',  title: 'High-risk transaction',   msg: 'Peter Wills — $1,300 Shopping_pos', time: '2 min ago' },
    { type: 'warning', title: 'Unusual activity pattern', msg: 'Multiple transactions from Montana', time: '15 min ago' },
    { type: 'info',    title: 'Daily fraud report ready', msg: '19 fraudulent transactions flagged', time: '1 hr ago' },
    { type: 'success', title: 'Model retrained',          msg: 'Accuracy improved to 99.2%',        time: '3 hrs ago' },
  ];

  constructor(private router: Router) { this.checkMobile(); }

  @HostListener('window:resize')
  onResize() { this.checkMobile(); }

  private checkMobile() {
    this.isMobile.set(window.innerWidth < 768);
  }

  toggleSidebar() { this.collapsed.update(v => !v); }
  toggleMobile()  { this.mobileOpen.update(v => !v); }
  closeMobile()   { this.mobileOpen.set(false); }
  logout()        { this.router.navigate(['/auth/login']); }

  alertIcon(type: string): string {
    const m: Record<string,string> = { danger:'fa-triangle-exclamation', warning:'fa-circle-exclamation', info:'fa-circle-info', success:'fa-circle-check' };
    return m[type] ?? 'fa-bell';
  }
}
