import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { ChartModule } from 'primeng/chart';
import { SkeletonModule } from 'primeng/skeleton';
import { TooltipModule } from 'primeng/tooltip';
import { ApiService } from '../../core/services/api.service';
import { DashboardStats, Transaction, FraudAlert } from '../../shared/models/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, CardModule, TableModule, TagModule,
    ButtonModule, ProgressBarModule, ChartModule, SkeletonModule, TooltipModule],
  template: `
    <div class="dashboard">

      <!-- KPI CARDS -->
      <div class="kpi-grid">
        <div class="kpi-card total">
          <div class="kpi-icon"><i class="pi pi-list"></i></div>
          <div class="kpi-body">
            <div class="kpi-value">{{ stats()?.totalTransactions | number }}</div>
            <div class="kpi-label">Total Transactions</div>
          </div>
          <div class="kpi-trend up"><i class="pi pi-arrow-up"></i> Live</div>
        </div>

        <div class="kpi-card fraud">
          <div class="kpi-icon"><i class="pi pi-times-circle"></i></div>
          <div class="kpi-body">
            <div class="kpi-value">{{ stats()?.fraudCount | number }}</div>
            <div class="kpi-label">Fraud Detected</div>
            <div class="kpi-sub">{{ stats()?.fraudPercentage | number:'1.1-1' }}% of total</div>
          </div>
          <div class="kpi-bar">
            <p-progressBar [value]="stats()?.fraudPercentage ?? 0" [showValue]="false"
                           styleClass="fraud-bar"></p-progressBar>
          </div>
        </div>

        <div class="kpi-card suspicious">
          <div class="kpi-icon"><i class="pi pi-exclamation-circle"></i></div>
          <div class="kpi-body">
            <div class="kpi-value">{{ stats()?.suspiciousCount | number }}</div>
            <div class="kpi-label">Suspicious</div>
          </div>
        </div>

        <div class="kpi-card alerts">
          <div class="kpi-icon"><i class="pi pi-bell"></i></div>
          <div class="kpi-body">
            <div class="kpi-value">{{ stats()?.activeAlerts | number }}</div>
            <div class="kpi-label">Active Alerts</div>
            <div class="kpi-sub kpi-critical">{{ stats()?.criticalAlerts }} Critical</div>
          </div>
          <a [routerLink]="['/alerts']" class="kpi-action">View All →</a>
        </div>
      </div>

      <!-- CHARTS ROW -->
      <div class="charts-row">
        <div class="chart-card wide">
          <div class="chart-header">
            <h3>Fraud Trend (30 Days)</h3>
          </div>
          <p-chart type="line" [data]="trendChartData()" [options]="lineOptions" height="220px"></p-chart>
        </div>

        <div class="chart-card">
          <div class="chart-header"><h3>Alerts by Severity</h3></div>
          <p-chart type="doughnut" [data]="severityChartData()" [options]="doughnutOptions" height="220px"></p-chart>
        </div>

        <div class="chart-card">
          <div class="chart-header"><h3>Fraud by Category</h3></div>
          <p-chart type="bar" [data]="categoryChartData()" [options]="barOptions" height="220px"></p-chart>
        </div>
      </div>

      <!-- TABLES ROW -->
      <div class="tables-row">
        <!-- RECENT TRANSACTIONS (LIVE FEED) -->
        <div class="table-card wide">
          <div class="table-header">
            <h3><span class="live-dot"></span> Live Transaction Feed</h3>
            <a [routerLink]="['/transactions']" class="view-all">View All</a>
          </div>
          <p-table [value]="stats()?.recentTransactions ?? []" [rows]="8"
                   styleClass="dark-table" [scrollable]="true" scrollHeight="320px">
            <ng-template pTemplate="header">
              <tr>
                <th>TXN ID</th><th>Account</th><th>Amount</th>
                <th>Merchant</th><th>Status</th><th>Risk</th>
              </tr>
            </ng-template>
            <ng-template pTemplate="body" let-t>
              <tr [class]="'row-' + t.fraudStatus.toLowerCase()">
                <td class="txn-id">{{ t.transactionId | slice:0:12 }}…</td>
                <td>{{ t.accountNumber }}</td>
                <td class="amount">₹{{ t.amount | number:'1.0-0' }}</td>
                <td>{{ t.merchantName }}</td>
                <td><p-tag [value]="t.fraudStatus" [severity]="fraudSeverity(t.fraudStatus)"></p-tag></td>
                <td>
                  <div class="risk-cell">
                    <div class="risk-bar" [style.width]="t.riskScore + '%'"
                         [class]="'risk-' + riskLevel(t.riskScore)"></div>
                    <span>{{ t.riskScore | number:'1.0-0' }}</span>
                  </div>
                </td>
              </tr>
            </ng-template>
          </p-table>
        </div>

        <!-- RECENT ALERTS -->
        <div class="table-card">
          <div class="table-header">
            <h3><i class="pi pi-bell alert-icon"></i> Recent Alerts</h3>
            <a [routerLink]="['/alerts']" class="view-all">View All</a>
          </div>
          <div class="alert-list">
            <div *ngFor="let a of stats()?.recentAlerts ?? []"
                 class="alert-item" [class]="'sev-' + a.severity.toLowerCase()">
              <div class="alert-sev-icon">
                <i class="pi" [class]="severityIcon(a.severity)"></i>
              </div>
              <div class="alert-body">
                <div class="alert-rule">{{ formatRule(a.ruleTriggered) }}</div>
                <div class="alert-account">{{ a.accountNumber }} · ₹{{ a.amount | number:'1.0-0' }}</div>
                <div class="alert-reason">{{ a.fraudReason | slice:0:60 }}…</div>
              </div>
              <div class="alert-meta">
                <p-tag [value]="a.severity" [severity]="sevTag(a.severity)" styleClass="text-xs"></p-tag>
                <div class="alert-time">{{ timeAgo(a.alertTime) }}</div>
              </div>
            </div>
            <div *ngIf="!stats()?.recentAlerts?.length" class="empty-alerts">
              <i class="pi pi-check-circle"></i>
              <p>No recent alerts</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .dashboard { display:flex; flex-direction:column; gap:24px; }

    /* KPI */
    .kpi-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
    .kpi-card {
      background:#13151e; border:1px solid #1e2030; border-radius:16px;
      padding:20px; display:flex; flex-direction:column; gap:12px;
      position:relative; overflow:hidden;
    }
    .kpi-card::before {
      content:''; position:absolute; top:0; left:0; right:0; height:3px;
    }
    .kpi-card.total::before { background:linear-gradient(90deg,#6366f1,#a855f7); }
    .kpi-card.fraud::before { background:linear-gradient(90deg,#ef4444,#f97316); }
    .kpi-card.suspicious::before { background:linear-gradient(90deg,#f59e0b,#fbbf24); }
    .kpi-card.alerts::before { background:linear-gradient(90deg,#22c55e,#10b981); }

    .kpi-icon { font-size:24px; }
    .kpi-card.total .kpi-icon { color:#6366f1; }
    .kpi-card.fraud .kpi-icon { color:#ef4444; }
    .kpi-card.suspicious .kpi-icon { color:#f59e0b; }
    .kpi-card.alerts .kpi-icon { color:#22c55e; }

    .kpi-value { font-size:32px; font-weight:700; color:#e2e8f0; line-height:1; }
    .kpi-label { font-size:13px; color:#64748b; margin-top:4px; }
    .kpi-sub { font-size:11px; color:#94a3b8; margin-top:2px; }
    .kpi-critical { color:#ef4444 !important; font-weight:600; }
    .kpi-trend { font-size:11px; font-weight:600; color:#22c55e; }
    .kpi-action { color:#6366f1; font-size:12px; text-decoration:none; font-weight:600; }

    /* CHARTS */
    .charts-row { display:grid; grid-template-columns:2fr 1fr 1fr; gap:16px; }
    .chart-card {
      background:#13151e; border:1px solid #1e2030; border-radius:16px; padding:20px;
    }
    .chart-card.wide { }
    .chart-header h3 { margin:0 0 16px; font-size:15px; color:#e2e8f0; font-weight:600; }

    /* TABLES */
    .tables-row { display:grid; grid-template-columns:3fr 2fr; gap:16px; }
    .table-card {
      background:#13151e; border:1px solid #1e2030; border-radius:16px;
      padding:20px; overflow:hidden;
    }
    .table-header {
      display:flex; align-items:center; justify-content:space-between; margin-bottom:16px;
    }
    .table-header h3 { margin:0; font-size:15px; color:#e2e8f0; font-weight:600;
      display:flex; align-items:center; gap:8px; }
    .view-all { color:#6366f1; font-size:12px; text-decoration:none; font-weight:600; }

    .live-dot { display:inline-block; width:8px; height:8px; border-radius:50%;
      background:#22c55e; animation:pulse 1.5s infinite; }
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}

    .txn-id { font-family:monospace; font-size:12px; color:#94a3b8; }
    .amount { font-weight:600; color:#e2e8f0; }

    .row-fraud { background:rgba(239,68,68,.05) !important; }
    .row-suspicious { background:rgba(245,158,11,.05) !important; }

    .risk-cell { display:flex; align-items:center; gap:8px; font-size:12px; color:#94a3b8; }
    .risk-bar { height:4px; border-radius:2px; min-width:4px; }
    .risk-high { background:#ef4444; }
    .risk-medium { background:#f59e0b; }
    .risk-low { background:#22c55e; }

    /* ALERT LIST */
    .alert-list { display:flex; flex-direction:column; gap:10px; max-height:360px; overflow-y:auto; }
    .alert-item {
      display:flex; align-items:flex-start; gap:12px; padding:12px;
      border-radius:10px; border:1px solid;
    }
    .alert-item.sev-critical { background:rgba(239,68,68,.08); border-color:rgba(239,68,68,.2); }
    .alert-item.sev-high { background:rgba(249,115,22,.08); border-color:rgba(249,115,22,.2); }
    .alert-item.sev-medium { background:rgba(245,158,11,.08); border-color:rgba(245,158,11,.2); }
    .alert-item.sev-low { background:rgba(34,197,94,.08); border-color:rgba(34,197,94,.2); }

    .alert-sev-icon { font-size:18px; padding-top:2px; }
    .sev-critical .alert-sev-icon { color:#ef4444; }
    .sev-high .alert-sev-icon { color:#f97316; }
    .sev-medium .alert-sev-icon { color:#f59e0b; }
    .sev-low .alert-sev-icon { color:#22c55e; }

    .alert-body { flex:1; min-width:0; }
    .alert-rule { font-size:13px; font-weight:600; color:#e2e8f0; }
    .alert-account { font-size:12px; color:#94a3b8; margin:2px 0; }
    .alert-reason { font-size:11px; color:#64748b; }
    .alert-meta { display:flex; flex-direction:column; align-items:flex-end; gap:6px; }
    .alert-time { font-size:10px; color:#475569; }
    .alert-icon { color:#ef4444; }

    .empty-alerts { text-align:center; padding:40px; color:#475569; }
    .empty-alerts i { font-size:32px; color:#22c55e; }
    .empty-alerts p { margin:10px 0 0; }
  `]
})
export class DashboardComponent implements OnInit, OnDestroy {
  stats = signal<DashboardStats | null>(null);
  private sub?: Subscription;

  lineOptions = {
    plugins: { legend: { labels: { color: '#94a3b8' } } },
    scales: {
      x: { ticks: { color: '#64748b' }, grid: { color: '#1e2030' } },
      y: { ticks: { color: '#64748b' }, grid: { color: '#1e2030' } }
    },
    responsive: true, maintainAspectRatio: false
  };
  doughnutOptions = {
    plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8', padding: 12 } } },
    responsive: true, maintainAspectRatio: false
  };
  barOptions = {
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: '#64748b' }, grid: { color: '#1e2030' } },
      y: { ticks: { color: '#64748b' }, grid: { color: '#1e2030' } }
    },
    responsive: true, maintainAspectRatio: false
  };

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.load();
    this.sub = interval(15000).subscribe(() => this.load());
  }
  ngOnDestroy() { this.sub?.unsubscribe(); }

  private load() {
    this.api.getDashboardStats().subscribe(s => this.stats.set(s));
  }

  trendChartData() {
    const trend = this.stats()?.dailyFraudTrend ?? [];
    return {
      labels: trend.map(t => t.date),
      datasets: [
        { label: 'Total', data: trend.map(t => t.total), borderColor: '#6366f1', backgroundColor: 'rgba(99,102,241,.1)', tension: .4, fill: true },
        { label: 'Fraud', data: trend.map(t => t.fraud), borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,.1)', tension: .4, fill: true }
      ]
    };
  }

  severityChartData() {
    const bySev = this.stats()?.alertsBySeverity ?? [];
    const colors = { CRITICAL: '#ef4444', HIGH: '#f97316', MEDIUM: '#f59e0b', LOW: '#22c55e' };
    return {
      labels: bySev.map(s => s.severity),
      datasets: [{ data: bySev.map(s => s.count), backgroundColor: bySev.map(s => (colors as any)[s.severity] ?? '#6366f1') }]
    };
  }

  categoryChartData() {
    const byCat = this.stats()?.fraudByCategory ?? [];
    return {
      labels: byCat.map(c => c.category),
      datasets: [{ data: byCat.map(c => c.count), backgroundColor: '#6366f1', borderRadius: 6 }]
    };
  }

  fraudSeverity(status: string): any {
    return { FRAUD: 'danger', SUSPICIOUS: 'warning', NORMAL: 'success' }[status] ?? 'info';
  }

  sevTag(sev: string): any {
    return { CRITICAL: 'danger', HIGH: 'warning', MEDIUM: 'info', LOW: 'success' }[sev] ?? 'info';
  }

  severityIcon(sev: string): string {
    return { CRITICAL: 'pi-times-circle', HIGH: 'pi-exclamation-triangle', MEDIUM: 'pi-exclamation-circle', LOW: 'pi-info-circle' }[sev] ?? 'pi-info-circle';
  }

  riskLevel(score: number): string {
    if (score >= 60) return 'high';
    if (score >= 25) return 'medium';
    return 'low';
  }

  formatRule(rule: string): string {
    return rule?.replace(/_/g, ' ') ?? '';
  }

  timeAgo(ts: string): string {
    const diff = Date.now() - new Date(ts).getTime();
    const m = Math.floor(diff / 60000);
    if (m < 1) return 'Just now';
    if (m < 60) return `${m}m ago`;
    return `${Math.floor(m / 60)}h ago`;
  }
}
