import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: '',
    loadComponent: () => import('./shared/components/layout/layout.component').then(m => m.LayoutComponent),
    canActivate: [authGuard],
    children: [
      { path: 'dashboard',     loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'transactions',  loadComponent: () => import('./features/transactions/transactions.component').then(m => m.TransactionsComponent) },
      { path: 'alerts',        loadComponent: () => import('./features/alerts/alerts.component').then(m => m.AlertsComponent) },
      { path: 'analytics',     loadComponent: () => import('./features/analytics/analytics.component').then(m => m.AnalyticsComponent) },
      { path: 'simulation',    loadComponent: () => import('./features/simulation/simulation.component').then(m => m.SimulationComponent) },
      // ── NEW ROUTES ─────────────────────────────────────────────────────────────
      { path: 'system-status', loadComponent: () => import('./features/system-status/system-status.component').then(m => m.SystemStatusComponent) },
      { path: 'ml-insights',   loadComponent: () => import('./features/ml-insights/ml-insights.component').then(m => m.MlInsightsComponent) },
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
