import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ApiService } from '../../core/services/api.service';
import { DashboardStats } from '../../shared/models/models';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, FormsModule, ChartModule, CardModule, DropdownModule, TableModule, TagModule],
  template: `
    <div class="analytics-page">

      <div class="analytics-grid">
        <!-- Fraud Trend Line Chart -->
        <div class="chart-card span-2">
          <div class="ch"><h3>📈 Fraud Detection Trend (30 Days)</h3></div>
          <p-chart type="line" [data]="trendData()" [options]="lineOpts" height="280px"></p-chart>
        </div>

        <!-- Severity Doughnut -->
        <div class="chart-card">
          <div class="ch"><h3>🔴 Alert Severity Distribution</h3></div>
          <p-chart type="doughnut" [data]="severityData()" [options]="donutOpts" height="260px"></p-chart>
        </div>

        <!-- Fraud by Category Bar -->
        <div class="chart-card span-2">
          <div class="ch"><h3>🏪 Fraud by Merchant Category</h3></div>
          <p-chart type="bar" [data]="categoryData()" [options]="barOpts" height="260px"></p-chart>
        </div>

        <!-- Fraud by Rule Bar -->
        <div class="chart-card">
          <div class="ch"><h3>⚙️ Alerts by Detection Rule</h3></div>
          <p-chart type="bar" [data]="ruleData()" [options]="hBarOpts" height="260px"></p-chart>
        </div>

        <!-- Total vs Fraud Pie -->
        <div class="chart-card">
          <div class="ch"><h3>🥧 Transaction Status Mix</h3></div>
          <p-chart type="pie" [data]="mixData()" [options]="donutOpts" height="260px"></p-chart>
        </div>

        <!-- High Risk Accounts Table -->
        <div class="chart-card span-2">
          <div class="ch"><h3>⚠️ High Risk Accounts</h3></div>
          <p-table [value]="highRisk()" styleClass="dark-table" [rows]="8" [scrollable]="true" scrollHeight="220px">
            <ng-template pTemplate="header">
              <tr><th>#</th><th>Account Number</th><th>Fraud Count</th><th>Risk Level</th></tr>
            </ng-template>
            <ng-template pTemplate="body" let-r let-i="rowIndex">
              <tr>
                <td>{{ i + 1 }}</td>
                <td class="mono">{{ r.accountNumber }}</td>
                <td class="fraud-count">{{ r.fraudCount }}</td>
                <td>
                  <p-tag [value]="r.fraudCount >= 5 ? 'CRITICAL' : r.fraudCount >= 3 ? 'HIGH' : 'MEDIUM'"
                         [severity]="r.fraudCount >= 5 ? 'danger' : r.fraudCount >= 3 ? 'warning' : 'info'"></p-tag>
                </td>
              </tr>
            </ng-template>
          </p-table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .analytics-page { }
    .analytics-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
    .chart-card { background:#13151e; border:1px solid #1e2030; border-radius:16px; padding:20px; }
    .chart-card.span-2 { grid-column:span 2; }
    .ch h3 { margin:0 0 16px; font-size:15px; color:#e2e8f0; font-weight:600; }
    .mono { font-family:monospace; font-size:12px; color:#94a3b8; }
    .fraud-count { font-weight:700; color:#ef4444; font-size:16px; }
  `]
})
export class AnalyticsComponent implements OnInit {
  stats = signal<DashboardStats | null>(null);
  highRisk = signal<any[]>([]);

  lineOpts = {
    plugins: { legend: { labels: { color: '#94a3b8' } } },
    scales: { x: { ticks: { color: '#64748b' }, grid: { color: '#1e2030' } }, y: { ticks: { color: '#64748b' }, grid: { color: '#1e2030' } } },
    responsive: true, maintainAspectRatio: false
  };
  donutOpts = { plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8', padding: 14 } } }, responsive: true, maintainAspectRatio: false };
  barOpts = {
    plugins: { legend: { display: false } },
    scales: { x: { ticks: { color: '#64748b' }, grid: { color: '#1e2030' } }, y: { ticks: { color: '#64748b' }, grid: { color: '#1e2030' } } },
    responsive: true, maintainAspectRatio: false
  };
  hBarOpts = {
    indexAxis: 'y' as const,
    plugins: { legend: { display: false } },
    scales: { x: { ticks: { color: '#64748b' }, grid: { color: '#1e2030' } }, y: { ticks: { color: '#64748b', font: { size: 10 } }, grid: { color: '#1e2030' } } },
    responsive: true, maintainAspectRatio: false
  };

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getDashboardStats().subscribe(s => this.stats.set(s));
    this.api.getHighRiskAccounts().subscribe(d => this.highRisk.set(d));
  }

  trendData() {
    const t = this.stats()?.dailyFraudTrend ?? [];
    return {
      labels: t.map(x => x.date),
      datasets: [
        { label: 'Total Transactions', data: t.map(x => x.total), borderColor: '#6366f1', backgroundColor: 'rgba(99,102,241,.15)', tension: .4, fill: true, pointRadius: 3 },
        { label: 'Fraud Detected', data: t.map(x => x.fraud), borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,.1)', tension: .4, fill: true, pointRadius: 3 }
      ]
    };
  }

  severityData() {
    const s = this.stats()?.alertsBySeverity ?? [];
    const c: any = { CRITICAL: '#ef4444', HIGH: '#f97316', MEDIUM: '#f59e0b', LOW: '#22c55e' };
    return { labels: s.map(x => x.severity), datasets: [{ data: s.map(x => x.count), backgroundColor: s.map(x => c[x.severity]) }] };
  }

  categoryData() {
    const c = this.stats()?.fraudByCategory ?? [];
    return {
      labels: c.map(x => x.category),
      datasets: [{ data: c.map(x => x.count), backgroundColor: ['#6366f1','#ef4444','#f59e0b','#22c55e','#a855f7','#06b6d4','#f97316'], borderRadius: 6 }]
    };
  }

  ruleData() {
    const r = this.stats()?.alertsByRule ?? [];
    return {
      labels: r.map(x => String(x.rule ?? '').replace(/_/g, ' ')),
      datasets: [{ data: r.map(x => x.count), backgroundColor: '#6366f1', borderRadius: 4 }]
    };
  }

  mixData() {
    const s = this.stats();
    return {
      labels: ['Normal', 'Suspicious', 'Fraud'],
      datasets: [{ data: [s?.normalCount ?? 0, s?.suspiciousCount ?? 0, s?.fraudCount ?? 0], backgroundColor: ['#22c55e', '#f59e0b', '#ef4444'] }]
    };
  }
}
