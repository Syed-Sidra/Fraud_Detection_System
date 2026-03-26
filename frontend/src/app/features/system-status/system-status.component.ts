import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription, forkJoin } from 'rxjs';
import { catchError, of } from 'rxjs';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressBarModule } from 'primeng/progressbar';
import { ApiService } from '../../core/services/api.service';
import { HttpClient } from '@angular/common/http';

interface ServiceHealth {
  name: string;
  url: string;
  status: 'UP' | 'DOWN' | 'CHECKING';
  latency: number;
  lastChecked: Date;
  icon: string;
}

interface ApiLogEntry {
  id: number;
  method: string;
  endpoint: string;
  status: number;
  latency: number;
  timestamp: Date;
  ip: string;
}

@Component({
  selector: 'app-system-status',
  standalone: true,
  imports: [CommonModule, CardModule, TagModule, ButtonModule, TableModule,
    ChartModule, TooltipModule, ProgressBarModule],
  template: `
    <div class="status-page">

      <!-- OVERALL STATUS BANNER -->
      <div class="overall-banner" [class.all-good]="allServicesUp()" [class.degraded]="!allServicesUp()">
        <div class="banner-left">
          <div class="banner-icon">
            <i class="pi" [class]="allServicesUp() ? 'pi-check-circle' : 'pi-exclamation-triangle'"></i>
          </div>
          <div>
            <div class="banner-title">{{ allServicesUp() ? 'All Systems Operational' : 'System Degraded' }}</div>
            <div class="banner-sub">Last checked: {{ lastChecked() | date:'HH:mm:ss' }}</div>
          </div>
        </div>
        <button pButton icon="pi pi-refresh" label="Refresh Now"
                class="p-button-outlined p-button-sm refresh-btn"
                [loading]="checking()" (click)="checkAll()"></button>
      </div>

      <!-- SERVICE HEALTH CARDS -->
      <div class="services-grid">
        <div *ngFor="let svc of services()" class="svc-card" [class]="'svc-' + svc.status.toLowerCase()">
          <div class="svc-top">
            <div class="svc-icon-wrap">
              <i class="pi" [class]="svc.icon"></i>
            </div>
            <div class="svc-info">
              <div class="svc-name">{{ svc.name }}</div>
              <div class="svc-url">{{ svc.url }}</div>
            </div>
          </div>
          <div class="svc-bottom">
            <div class="svc-status-row">
              <p-tag [value]="svc.status"
                     [severity]="svc.status === 'UP' ? 'success' : svc.status === 'CHECKING' ? 'info' : 'danger'">
              </p-tag>
              <span class="svc-latency" *ngIf="svc.status === 'UP'">{{ svc.latency }}ms</span>
            </div>
            <div class="latency-bar" *ngIf="svc.status === 'UP'">
              <div class="latency-fill"
                   [style.width]="Math.min((svc.latency / 500) * 100, 100) + '%'"
                   [class]="svc.latency < 100 ? 'lat-fast' : svc.latency < 300 ? 'lat-medium' : 'lat-slow'">
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- STATS ROW -->
      <div class="stats-row">
        <div class="stat-box">
          <div class="stat-icon db"><i class="pi pi-database"></i></div>
          <div class="stat-content">
            <div class="stat-val">{{ ingestionStats().totalTransactions | number }}</div>
            <div class="stat-lbl">Total Transactions</div>
          </div>
        </div>
        <div class="stat-box">
          <div class="stat-icon alert-ic"><i class="pi pi-bell"></i></div>
          <div class="stat-content">
            <div class="stat-val">{{ ingestionStats().activeAlerts | number }}</div>
            <div class="stat-lbl">Active Alerts</div>
          </div>
        </div>
        <div class="stat-box">
          <div class="stat-icon sim"><i class="pi pi-play-circle"></i></div>
          <div class="stat-content">
            <div class="stat-val">{{ simStatus().running ? 'RUNNING' : 'STOPPED' }}</div>
            <div class="stat-lbl">Simulation — {{ simStatus().scenario }}</div>
          </div>
        </div>
        <div class="stat-box">
          <div class="stat-icon ml-ic"><i class="pi pi-microchip-ai"></i></div>
          <div class="stat-content">
            <div class="stat-val">{{ mlInfo().loaded ? mlInfo().accuracy + '%' : 'N/A' }}</div>
            <div class="stat-lbl">ML Model Accuracy</div>
          </div>
        </div>
      </div>

      <!-- BOTTOM ROW -->
      <div class="bottom-row">

        <!-- API ENDPOINT LOG -->
        <div class="log-card">
          <div class="log-header">
            <h3><i class="pi pi-list"></i> API Endpoints</h3>
            <span class="endpoint-count">{{ endpoints.length }} registered</span>
          </div>
          <p-table [value]="endpoints" styleClass="dark-table" [scrollable]="true" scrollHeight="360px">
            <ng-template pTemplate="header">
              <tr>
                <th>Method</th><th>Endpoint</th><th>Description</th><th>Auth</th>
              </tr>
            </ng-template>
            <ng-template pTemplate="body" let-ep>
              <tr>
                <td><span class="method-badge" [class]="'method-' + ep.method.toLowerCase()">{{ ep.method }}</span></td>
                <td class="mono">{{ ep.path }}</td>
                <td class="ep-desc">{{ ep.description }}</td>
                <td>
                  <i class="pi" [class]="ep.auth ? 'pi-lock ep-lock' : 'pi-lock-open ep-open'"
                     [pTooltip]="ep.auth ? 'JWT Required' : 'Public'"></i>
                </td>
              </tr>
            </ng-template>
          </p-table>
        </div>

        <!-- ENVIRONMENT INFO -->
        <div class="env-card">
          <div class="log-header"><h3><i class="pi pi-cog"></i> Environment</h3></div>
          <div class="env-list">
            <div class="env-item" *ngFor="let e of envInfo">
              <span class="env-key">{{ e.key }}</span>
              <span class="env-val" [class.env-masked]="e.masked">{{ e.masked ? '••••••••' : e.value }}</span>
            </div>
          </div>

          <div class="log-header" style="margin-top:20px"><h3><i class="pi pi-chart-line"></i> Uptime</h3></div>
          <div class="uptime-bar-wrap">
            <div class="uptime-label">
              <span>System Uptime (last 30 checks)</span>
              <span class="uptime-pct">{{ uptimePct() }}%</span>
            </div>
            <p-progressBar [value]="uptimePct()" [showValue]="false" styleClass="uptime-bar"></p-progressBar>
          </div>
          <div class="uptime-dots">
            <div *ngFor="let u of uptimeHistory()" class="uptime-dot"
                 [class.dot-up]="u" [class.dot-down]="!u"
                 [pTooltip]="u ? 'UP' : 'DOWN'">
            </div>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .status-page { display:flex; flex-direction:column; gap:20px; }

    .overall-banner {
      display:flex; align-items:center; justify-content:space-between;
      padding:16px 20px; border-radius:14px; border:1px solid;
    }
    .all-good  { background:rgba(34,197,94,.08); border-color:rgba(34,197,94,.3); }
    .degraded  { background:rgba(239,68,68,.08); border-color:rgba(239,68,68,.3); }
    .banner-left { display:flex; align-items:center; gap:14px; }
    .banner-icon { font-size:28px; }
    .all-good .banner-icon { color:#22c55e; }
    .degraded .banner-icon { color:#ef4444; }
    .banner-title { font-size:16px; font-weight:600; color:#e2e8f0; }
    .banner-sub { font-size:12px; color:#64748b; margin-top:2px; }
    .refresh-btn { color:#94a3b8 !important; border-color:#2d3148 !important; }

    .services-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
    .svc-card {
      background:#13151e; border:1px solid #1e2030; border-radius:14px;
      padding:16px; display:flex; flex-direction:column; gap:12px;
    }
    .svc-card.svc-up     { border-color:rgba(34,197,94,.25); }
    .svc-card.svc-down   { border-color:rgba(239,68,68,.25); background:rgba(239,68,68,.04); }
    .svc-card.svc-checking { border-color:rgba(99,102,241,.25); }
    .svc-top { display:flex; align-items:center; gap:12px; }
    .svc-icon-wrap { width:40px; height:40px; border-radius:10px; background:#1e2030;
      display:flex; align-items:center; justify-content:center; font-size:18px; }
    .svc-up   .svc-icon-wrap { color:#22c55e; }
    .svc-down .svc-icon-wrap { color:#ef4444; }
    .svc-checking .svc-icon-wrap { color:#6366f1; }
    .svc-name { font-size:14px; font-weight:600; color:#e2e8f0; }
    .svc-url  { font-size:11px; color:#64748b; margin-top:2px; font-family:monospace; }
    .svc-status-row { display:flex; align-items:center; gap:10px; }
    .svc-latency { font-size:12px; color:#94a3b8; }
    .latency-bar { height:3px; background:#1e2030; border-radius:2px; overflow:hidden; margin-top:6px; }
    .latency-fill { height:100%; border-radius:2px; transition:width .5s; }
    .lat-fast   { background:#22c55e; }
    .lat-medium { background:#f59e0b; }
    .lat-slow   { background:#ef4444; }

    .stats-row { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; }
    .stat-box { background:#13151e; border:1px solid #1e2030; border-radius:14px;
      padding:16px; display:flex; align-items:center; gap:14px; }
    .stat-icon { width:44px; height:44px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:20px; }
    .stat-icon.db       { background:rgba(99,102,241,.15); color:#6366f1; }
    .stat-icon.alert-ic { background:rgba(239,68,68,.15); color:#ef4444; }
    .stat-icon.sim      { background:rgba(34,197,94,.15); color:#22c55e; }
    .stat-icon.ml-ic    { background:rgba(168,85,247,.15); color:#a855f7; }
    .stat-val { font-size:22px; font-weight:700; color:#e2e8f0; line-height:1; }
    .stat-lbl { font-size:11px; color:#64748b; margin-top:4px; }

    .bottom-row { display:grid; grid-template-columns:3fr 2fr; gap:16px; }
    .log-card, .env-card { background:#13151e; border:1px solid #1e2030; border-radius:14px; padding:20px; }
    .log-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; }
    .log-header h3 { margin:0; font-size:15px; color:#e2e8f0; font-weight:600;
      display:flex; align-items:center; gap:8px; }
    .endpoint-count { font-size:12px; color:#64748b; }

    .method-badge { font-size:10px; font-weight:700; padding:3px 8px; border-radius:5px; }
    .method-get    { background:rgba(34,197,94,.15); color:#22c55e; }
    .method-post   { background:rgba(99,102,241,.15); color:#6366f1; }
    .method-put    { background:rgba(245,158,11,.15); color:#f59e0b; }
    .method-delete { background:rgba(239,68,68,.15); color:#ef4444; }
    .mono { font-family:monospace; font-size:11px; color:#94a3b8; }
    .ep-desc { font-size:12px; color:#64748b; }
    .ep-lock { color:#ef4444; font-size:13px; }
    .ep-open { color:#22c55e; font-size:13px; }

    .env-list { display:flex; flex-direction:column; gap:8px; }
    .env-item { display:flex; justify-content:space-between; padding:8px 12px;
      background:#0f1117; border-radius:8px; align-items:center; }
    .env-key { font-size:12px; color:#64748b; }
    .env-val { font-size:12px; color:#e2e8f0; font-family:monospace; }
    .env-masked { color:#475569; letter-spacing:2px; }

    .uptime-bar-wrap { margin-bottom:10px; }
    .uptime-label { display:flex; justify-content:space-between; font-size:12px; color:#64748b; margin-bottom:6px; }
    .uptime-pct { color:#22c55e; font-weight:700; }
    .uptime-dots { display:flex; gap:4px; flex-wrap:wrap; margin-top:10px; }
    .uptime-dot { width:14px; height:14px; border-radius:3px; }
    .dot-up   { background:rgba(34,197,94,.4); }
    .dot-down { background:rgba(239,68,68,.4); }
  `]
})
export class SystemStatusComponent implements OnInit, OnDestroy {
  services = signal<ServiceHealth[]>([
    { name: 'Spring Boot API',  url: 'localhost:8080', status: 'CHECKING', latency: 0, lastChecked: new Date(), icon: 'pi-server' },
    { name: 'MySQL Database',   url: 'localhost:3306', status: 'CHECKING', latency: 0, lastChecked: new Date(), icon: 'pi-database' },
    { name: 'Python ML Service',url: 'localhost:8000', status: 'CHECKING', latency: 0, lastChecked: new Date(), icon: 'pi-microchip-ai' },
  ]);

  ingestionStats = signal({ totalTransactions: 0, activeAlerts: 0 });
  simStatus      = signal({ running: false, scenario: 'MIXED' });
  mlInfo         = signal({ loaded: false, accuracy: 0, type: '' });
  checking       = signal(false);
  lastChecked    = signal(new Date());
  uptimeHistory  = signal<boolean[]>(Array(30).fill(true));

  private sub?: Subscription;
  protected Math = Math;

  endpoints = [
    { method:'POST', path:'/api/auth/login',           description:'User login → JWT',             auth:false },
    { method:'POST', path:'/api/auth/register',        description:'Register new user',             auth:false },
    { method:'GET',  path:'/api/auth/health',          description:'API health check',              auth:false },
    { method:'GET',  path:'/api/dashboard/stats',      description:'Full dashboard statistics',     auth:true  },
    { method:'GET',  path:'/api/transactions',         description:'List transactions w/ filters',  auth:true  },
    { method:'POST', path:'/api/transactions',         description:'Save new transaction',          auth:true  },
    { method:'GET',  path:'/api/transactions/live-feed',description:'Latest 20 transactions',      auth:true  },
    { method:'GET',  path:'/api/alerts',               description:'List fraud alerts',             auth:true  },
    { method:'PUT',  path:'/api/alerts/{id}/resolve',  description:'Resolve an alert',             auth:true  },
    { method:'GET',  path:'/api/alerts/unread-count',  description:'Unread alert badge count',      auth:true  },
    { method:'POST', path:'/api/simulation/start',     description:'Start simulation engine',       auth:true  },
    { method:'POST', path:'/api/simulation/stop',      description:'Stop simulation engine',        auth:true  },
    { method:'POST', path:'/api/simulation/bulk',      description:'Bulk generate transactions',    auth:true  },
    { method:'GET',  path:'/api/ml/status',            description:'ML service health check',       auth:true  },
    { method:'POST', path:'/api/ml/train',             description:'Trigger model retraining',      auth:true  },
    { method:'GET',  path:'/api/ml/info',              description:'Model accuracy & features',     auth:true  },
    { method:'POST', path:'/api/test/email',           description:'Send test email alert',         auth:true  },
  ];

  envInfo = [
    { key: 'Backend Port',    value: '8080',                    masked: false },
    { key: 'Frontend Port',   value: '4200',                    masked: false },
    { key: 'ML Service Port', value: '8000',                    masked: false },
    { key: 'Database',        value: 'fraud_detection_db',      masked: false },
    { key: 'JWT Expiry',      value: '24 hours',                masked: false },
    { key: 'SMTP Host',       value: 'smtp.gmail.com:587',      masked: false },
    { key: 'Email Password',  value: '••••••••',                masked: true  },
    { key: 'JWT Secret',      value: '••••••••',                masked: true  },
  ];

  constructor(private api: ApiService, private http: HttpClient) {}

  ngOnInit() {
    this.checkAll();
    this.sub = interval(30000).subscribe(() => this.checkAll());
  }
  ngOnDestroy() { this.sub?.unsubscribe(); }

  allServicesUp(): boolean {
    return this.services().every(s => s.status === 'UP');
  }

  uptimePct(): number {
    const hist = this.uptimeHistory();
    return Math.round((hist.filter(Boolean).length / hist.length) * 100);
  }

  checkAll() {
    this.checking.set(true);
    this.lastChecked.set(new Date());

    // Check backend health
    const t0 = Date.now();
    this.http.get('/api/auth/health').pipe(catchError(() => of(null))).subscribe(res => {
      this.updateService(0, !!res, Date.now() - t0);
    });

    // MySQL — inferred from dashboard stats response
    const t1 = Date.now();
    this.api.getDashboardStats().pipe(catchError(() => of(null))).subscribe(res => {
      this.updateService(1, !!res, Date.now() - t1);
      if (res) {
        this.ingestionStats.set({ totalTransactions: res.totalTransactions, activeAlerts: res.activeAlerts });
      }
    });

    // ML service
    const t2 = Date.now();
    this.http.get<any>('/api/ml/status').pipe(catchError(() => of(null))).subscribe(res => {
      this.updateService(2, !!res?.available, Date.now() - t2);
      if (res?.available) {
        this.http.get<any>('/api/ml/info').pipe(catchError(() => of(null))).subscribe(info => {
          if (info) this.mlInfo.set({ loaded: info.loaded, accuracy: info.accuracy_percent ?? 0, type: info.type ?? '' });
        });
      }
    });

    // Simulation status
    this.api.getSimulationStatus().pipe(catchError(() => of({ running: false, scenario: 'MIXED' }))).subscribe(s => {
      this.simStatus.set(s);
    });

    setTimeout(() => this.checking.set(false), 2000);
  }

  private updateService(idx: number, up: boolean, latency: number) {
    const svcs = [...this.services()];
    svcs[idx] = { ...svcs[idx], status: up ? 'UP' : 'DOWN', latency, lastChecked: new Date() };
    this.services.set(svcs);

    const hist = [...this.uptimeHistory()];
    hist.push(up);
    if (hist.length > 30) hist.shift();
    this.uptimeHistory.set(hist);
  }
}
