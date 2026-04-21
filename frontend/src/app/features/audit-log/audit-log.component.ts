import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { ExportService } from '../../shared/services/export.service';

interface AuditEntry {
  id: number;
  username: string;
  userRole: string;
  action: string;
  entityType: string;
  entityId: string;
  details: string;
  timestamp: string;
}

@Component({
  selector: 'app-audit-log',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, TagModule,
    ButtonModule, InputTextModule, DropdownModule, PaginatorModule],
  template: `
    <div class="audit-page">

      <!-- HEADER -->
      <div class="audit-header">
        <div class="audit-header-left">
          <div class="audit-icon"><i class="pi pi-history"></i></div>
          <div>
            <h2>Audit Log</h2>
            <p>Complete history of all user actions — Admin view only</p>
          </div>
        </div>
        <button pButton label="Export CSV" icon="pi pi-download"
                class="p-button-outlined p-button-sm"
                (click)="exportCsv()"></button>
      </div>

      <!-- FILTERS -->
      <div class="filters-bar">
        <div class="filter-group">
          <label>Username</label>
          <input pInputText [(ngModel)]="filterUsername"
                 placeholder="Search by user..." class="filter-input"
                 (keyup.enter)="load(0)" />
        </div>
        <div class="filter-group">
          <label>Action Type</label>
          <p-dropdown [(ngModel)]="filterAction" [options]="actionOptions"
                      placeholder="All Actions" [showClear]="true"
                      styleClass="filter-dd" (onChange)="load(0)"></p-dropdown>
        </div>
        <div class="filter-actions">
          <button pButton label="Search" icon="pi pi-search" (click)="load(0)"></button>
          <button pButton label="Reset" icon="pi pi-refresh" class="p-button-outlined" (click)="reset()"></button>
        </div>
      </div>

      <!-- TABLE -->
      <div class="table-card">
        <p-table [value]="logs()" [loading]="loading()" styleClass="dark-table"
                 [scrollable]="true" scrollHeight="calc(100vh - 360px)">
          <ng-template pTemplate="header">
            <tr>
              <th>#</th>
              <th>Timestamp</th>
              <th>User</th>
              <th>Role</th>
              <th>Action</th>
              <th>Entity</th>
              <th>Details</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-log>
            <tr>
              <td class="id-cell">{{ log.id }}</td>
              <td class="time-cell">{{ log.timestamp | date:'dd MMM yyyy HH:mm:ss' }}</td>
              <td>
                <div class="user-chip">
                  <span class="user-initial">{{ log.username[0]?.toUpperCase() }}</span>
                  <span class="username">{{ log.username }}</span>
                </div>
              </td>
              <td>
                <p-tag [value]="log.userRole?.replace('ROLE_','')"
                       [severity]="log.userRole?.includes('ADMIN') ? 'danger' : 'info'"
                       styleClass="text-xs">
                </p-tag>
              </td>
              <td>
                <span class="action-badge" [class]="'action-' + actionClass(log.action)">
                  {{ formatAction(log.action) }}
                </span>
              </td>
              <td>
                <span *ngIf="log.entityType" class="entity-chip">
                  {{ log.entityType }}
                  <span *ngIf="log.entityId && log.entityId !== 'ALL'"
                        class="entity-id">#{{ log.entityId }}</span>
                </span>
              </td>
              <td class="details-cell">{{ log.details }}</td>
            </tr>
          </ng-template>
          <ng-template pTemplate="emptymessage">
            <tr><td colspan="7" class="empty-msg">
              <i class="pi pi-clock"></i><br>No audit entries yet. Actions will appear here as users interact with the system.
            </td></tr>
          </ng-template>
        </p-table>
      </div>

      <p-paginator [rows]="pageSize" [totalRecords]="totalElements()"
                   [first]="currentPage() * pageSize"
                   (onPageChange)="onPageChange($event)"></p-paginator>
    </div>
  `,
  styles: [`
    .audit-page { display:flex; flex-direction:column; gap:16px; }

    .audit-header { display:flex; align-items:center; justify-content:space-between;
      background:#13151e; border:1px solid #1e2030; border-radius:14px; padding:16px 20px; }
    .audit-header-left { display:flex; align-items:center; gap:14px; }
    .audit-icon { width:44px; height:44px; border-radius:12px;
      background:rgba(99,102,241,.2); border:1px solid rgba(99,102,241,.3);
      display:flex; align-items:center; justify-content:center; font-size:20px; color:#6366f1; }
    .audit-header h2 { margin:0; font-size:17px; color:#e2e8f0; font-weight:600; }
    .audit-header p  { margin:4px 0 0; font-size:12px; color:#64748b; }

    .filters-bar { display:flex; gap:12px; align-items:flex-end;
      background:#13151e; border:1px solid #1e2030; border-radius:12px; padding:14px 16px; }
    .filter-group { display:flex; flex-direction:column; gap:4px; }
    .filter-group label { font-size:11px; color:#64748b; font-weight:600; text-transform:uppercase; }
    .filter-input { width:200px; height:38px; }
    .filter-dd    { min-width:200px; }
    .filter-actions { display:flex; gap:8px; margin-left:auto; }

    .table-card { background:#13151e; border:1px solid #1e2030; border-radius:12px; overflow:hidden; }

    .id-cell   { color:#475569; font-size:12px; font-family:monospace; }
    .time-cell { font-size:12px; color:#64748b; white-space:nowrap; }

    .user-chip { display:flex; align-items:center; gap:8px; }
    .user-initial { width:26px; height:26px; border-radius:50%; background:#6366f1;
      color:white; font-size:11px; font-weight:700; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
    .username { font-size:13px; font-weight:500; color:#e2e8f0; }

    .action-badge { font-size:11px; font-weight:600; padding:3px 10px; border-radius:6px; white-space:nowrap; }
    .action-resolve  { background:rgba(34,197,94,.15);  color:#22c55e; }
    .action-simulate { background:rgba(99,102,241,.15); color:#a5b4fc; }
    .action-user     { background:rgba(245,158,11,.15); color:#f59e0b; }
    .action-ml       { background:rgba(168,85,247,.15); color:#d8b4fe; }
    .action-read     { background:rgba(100,116,139,.15);color:#94a3b8; }
    .action-export   { background:rgba(6,182,212,.15);  color:#22d3ee; }
    .action-login    { background:rgba(59,130,246,.15); color:#60a5fa; }

    .entity-chip { background:#1e2030; padding:2px 8px; border-radius:6px;
      font-size:11px; color:#94a3b8; display:inline-flex; align-items:center; gap:4px; }
    .entity-id { color:#64748b; }

    .details-cell { font-size:12px; color:#64748b; max-width:300px; }
    .empty-msg { text-align:center; padding:48px; color:#475569; }
  `]
})
export class AuditLogComponent implements OnInit {
  logs         = signal<AuditEntry[]>([]);
  totalElements= signal(0);
  loading      = signal(false);
  currentPage  = signal(0);
  pageSize     = 25;
  filterUsername = '';
  filterAction: string | null = null;

  actionOptions = [
    { label: 'Alert Resolved',     value: 'ALERT_RESOLVED' },
    { label: 'Alerts Read',        value: 'ALERTS_MARKED_READ' },
    { label: 'Simulation Started', value: 'SIMULATION_STARTED' },
    { label: 'Simulation Stopped', value: 'SIMULATION_STOPPED' },
    { label: 'Bulk Generated',     value: 'BULK_GENERATED' },
    { label: 'ML Trained',         value: 'ML_MODEL_TRAINED' },
    { label: 'User Created',       value: 'USER_CREATED' },
    { label: 'User Activated',     value: 'USER_ACTIVATED' },
    { label: 'User Deactivated',   value: 'USER_DEACTIVATED' },
    { label: 'Export CSV',         value: 'EXPORT_CSV' },
    { label: 'Login',              value: 'LOGIN' },
  ];

  constructor(private http: HttpClient, private exportSvc: ExportService) {}

  ngOnInit() { this.load(0); }

  load(page: number) {
    this.loading.set(true);
    this.currentPage.set(page);
    let params = new HttpParams()
      .set('page', page).set('size', this.pageSize);
    if (this.filterUsername) params = params.set('username', this.filterUsername);
    if (this.filterAction)   params = params.set('action', this.filterAction);

    this.http.get<any>('/api/audit', { params })
      .pipe(catchError(() => of({ content: [], totalElements: 0, totalPages: 0 })))
      .subscribe(r => {
        this.logs.set(r.content ?? []);
        this.totalElements.set(r.totalElements ?? 0);
        this.loading.set(false);
      });
  }

  reset() {
    this.filterUsername = '';
    this.filterAction = null;
    this.load(0);
  }

  onPageChange(e: any) { this.load(e.page); }

  exportCsv() {
    const rows = this.logs();
    if (!rows.length) return;
    const headers = ['ID','Timestamp','Username','Role','Action','Entity Type','Entity ID','Details'];
    const data = rows.map(r => [
      r.id, r.timestamp, r.username, r.userRole?.replace('ROLE_',''),
      r.action, r.entityType, r.entityId, r.details
    ]);
    const csv = [headers, ...data].map(row =>
      row.map(c => `"${String(c ?? '').replace(/"/g,'""')}"`).join(',')
    ).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = 'audit-log.csv';
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
  }

  formatAction(a: string): string {
    return a?.replace(/_/g, ' ') ?? '';
  }

  actionClass(a: string): string {
    if (a?.includes('RESOLVED') || a?.includes('ACTIVATED')) return 'resolve';
    if (a?.includes('SIMULATION') || a?.includes('BULK')) return 'simulate';
    if (a?.includes('USER')) return 'user';
    if (a?.includes('ML')) return 'ml';
    if (a?.includes('READ')) return 'read';
    if (a?.includes('EXPORT')) return 'export';
    if (a?.includes('LOGIN')) return 'login';
    return 'read';
  }
}
