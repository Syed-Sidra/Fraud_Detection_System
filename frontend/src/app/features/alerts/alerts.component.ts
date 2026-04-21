  import { ExportService } from '../../shared/services/export.service';
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { PaginatorModule } from 'primeng/paginator';
import { BadgeModule } from 'primeng/badge';
import { ApiService } from '../../core/services/api.service';
import { FraudAlert, Severity } from '../../shared/models/models';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  TableModule,
  TagModule,
  ButtonModule,
  DropdownModule,
  DialogModule,
  InputTextareaModule,  // ✅ correct
  ConfirmDialogModule,
  TooltipModule,
  PaginatorModule,
  BadgeModule
],
  template: `
    <div class="alerts-page">

      <!-- HEADER BAR -->
      <div class="alerts-header">
        <div class="header-stats">
          <div class="stat-chip unread" *ngIf="unreadCount() > 0">
            <i class="pi pi-bell"></i> {{ unreadCount() }} Unread
          </div>
          <div class="stat-chip total-a">
            <i class="pi pi-list"></i> {{ totalElements() }} Total
          </div>
        </div>
        <div class="header-actions">
          <p-dropdown [(ngModel)]="severityFilter" [options]="severityOptions"
                      placeholder="All Severities" [showClear]="true" styleClass="filter-dd"
                      (onChange)="onFilter()"></p-dropdown>
          <button pButton label="Mark All Read" icon="pi pi-check-square"
                  class="p-button-outlined p-button-sm" (click)="markAllRead()"></button>

                   <button pButton label="Export CSV" icon="pi pi-download"
                            class="p-button-outlined p-button-sm"
                            (click)="exportCsv()"></button>
        </div>
      </div>

      <!-- ALERT CARDS (for high/critical) -->
      <div class="critical-strip" *ngIf="criticalAlerts().length > 0">
        <div class="strip-label"><i class="pi pi-times-circle"></i> Critical Alerts Requiring Immediate Action</div>
        <div class="critical-cards">
          <div *ngFor="let a of criticalAlerts()" class="critical-card"
               [class.resolved]="a.resolved">
            <div class="cc-top">
              <span class="cc-rule">{{ formatRule(a.ruleTriggered) }}</span>
              <p-tag value="CRITICAL" severity="danger"></p-tag>
            </div>
            <div class="cc-amount">₹{{ a.amount | number:'1.0-0' }}</div>
            <div class="cc-account">{{ a.accountNumber }}</div>
            <div class="cc-reason">{{ a.fraudReason | slice:0:80 }}…</div>
            <div class="cc-time">{{ a.alertTime | date:'dd MMM HH:mm' }}</div>
            <button pButton label="Resolve" icon="pi pi-check" class="p-button-sm p-button-danger cc-btn"
                    *ngIf="!a.resolved" (click)="openResolve(a)"></button>
          </div>
        </div>
      </div>

      <!-- MAIN TABLE -->
      <div class="table-card">
        <p-table [value]="alerts()" [loading]="loading()" styleClass="dark-table"
                 [scrollable]="true" scrollHeight="calc(100vh - 380px)">
          <ng-template pTemplate="header">
            <tr>
              <th>Alert Time</th>
              <th>Severity</th>
              <th>Transaction ID</th>
              <th>Account</th>
              <th>Amount</th>
              <th>Merchant</th>
              <th>Rule Triggered</th>
              <th>Detection Reason</th>
              <th>Risk Score</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-a>
            <tr [class]="'row-sev-' + a.severity.toLowerCase()" [class.resolved-row]="a.resolved">
              <td class="time">{{ a.alertTime | date:'dd/MM HH:mm:ss' }}</td>
              <td>
                <div class="sev-cell">
                  <i class="pi" [class]="sevIcon(a.severity)"
                     [style.color]="sevColor(a.severity)"></i>
                  <p-tag [value]="a.severity" [severity]="sevTag(a.severity)"></p-tag>
                </div>
              </td>
              <td class="mono">{{ a.transactionId }}</td>
              <td class="mono">{{ a.accountNumber }}</td>
              <td class="amount">₹{{ a.amount | number:'1.0-0' }}</td>
              <td>{{ a.merchantName }}</td>
              <td>
                <span class="rule-badge">{{ formatRule(a.ruleTriggered) }}</span>
              </td>
              <td class="reason-cell">
                <span pTooltip="{{ a.fraudReason }}" tooltipPosition="top">
                  {{ a.fraudReason | slice:0:50 }}…
                </span>
              </td>
              <td>
                <div class="risk-display">
                  <div class="risk-track">
                    <div class="risk-fill" [style.width]="a.riskScore + '%'"
                         [class]="'risk-' + riskClass(a.riskScore)"></div>
                  </div>
                  <span [class]="'rs-' + riskClass(a.riskScore)">{{ a.riskScore | number:'1.0-0' }}</span>
                </div>
              </td>
              <td>
                <p-tag *ngIf="a.resolved" value="Resolved" severity="success"></p-tag>
                <p-tag *ngIf="!a.resolved && a.read" value="Reviewed" severity="info"></p-tag>
                <p-tag *ngIf="!a.resolved && !a.read" value="New" severity="danger"></p-tag>
              </td>
              <td>
                <div class="action-btns">
                  <button pButton icon="pi pi-eye" class="p-button-text p-button-sm"
                          pTooltip="View" (click)="viewAlert(a)"></button>
                  <button pButton icon="pi pi-check" class="p-button-text p-button-sm p-button-success"
                          pTooltip="Resolve" *ngIf="!a.resolved" (click)="openResolve(a)"></button>
                </div>
              </td>
            </tr>
          </ng-template>
          <ng-template pTemplate="emptymessage">
            <tr><td colspan="11" class="empty-msg">
              <i class="pi pi-check-circle success-icon"></i><br>
              No fraud alerts found. System is secure.
            </td></tr>
          </ng-template>
        </p-table>
      </div>

      <p-paginator [rows]="pageSize" [totalRecords]="totalElements()"
                   (onPageChange)="onPageChange($event)"></p-paginator>

      <!-- ALERT DETAIL DIALOG -->
      <p-dialog [(visible)]="showDetail" header="Alert Details"
                [modal]="true" [style]="{width:'680px'}" styleClass="dark-dialog">
        <div *ngIf="selectedAlert" class="alert-detail">
          <div class="ad-severity" [class]="'sev-bg-' + selectedAlert.severity.toLowerCase()">
            <i class="pi" [class]="sevIcon(selectedAlert.severity)"></i>
            <span>{{ selectedAlert.severity }} SEVERITY FRAUD ALERT</span>
          </div>
          <div class="ad-reason-box">
            <div class="ad-reason-label">🔍 Detection Reason</div>
            <div class="ad-reason">{{ selectedAlert.fraudReason }}</div>
          </div>
          <div class="ad-grid">
            <div class="ad-item"><span class="adl">Rule Triggered</span><span class="adv rule-text">{{ formatRule(selectedAlert.ruleTriggered) }}</span></div>
            <div class="ad-item"><span class="adl">Risk Score</span><span class="adv" [class]="'rs-' + riskClass(selectedAlert.riskScore)">{{ selectedAlert.riskScore | number:'1.1-1' }} / 100</span></div>
            <div class="ad-item"><span class="adl">Transaction ID</span><span class="adv mono">{{ selectedAlert.transactionId }}</span></div>
            <div class="ad-item"><span class="adl">Account Number</span><span class="adv mono">{{ selectedAlert.accountNumber }}</span></div>
            <div class="ad-item"><span class="adl">User</span><span class="adv">{{ selectedAlert.userName }}</span></div>
            <div class="ad-item"><span class="adl">Amount</span><span class="adv amount">₹{{ selectedAlert.amount | number:'1.2-2' }}</span></div>
            <div class="ad-item"><span class="adl">Merchant</span><span class="adv">{{ selectedAlert.merchantName }}</span></div>
            <div class="ad-item"><span class="adl">Location</span><span class="adv">{{ selectedAlert.location }}</span></div>
            <div class="ad-item"><span class="adl">Alert Time</span><span class="adv">{{ selectedAlert.alertTime | date:'dd MMM yyyy HH:mm:ss' }}</span></div>
            <div class="ad-item"><span class="adl">Txn Time</span><span class="adv">{{ selectedAlert.transactionTimestamp | date:'dd MMM yyyy HH:mm:ss' }}</span></div>
            <div class="ad-item" *ngIf="selectedAlert.mlPrediction !== null">
              <span class="adl">ML Prediction</span>
              <span class="adv" [style.color]="selectedAlert.mlPrediction ? '#ef4444' : '#22c55e'">
                {{ selectedAlert.mlPrediction ? '🤖 FRAUD' : '🤖 LEGITIMATE' }}
                <span *ngIf="selectedAlert.mlConfidence"> ({{ selectedAlert.mlConfidence | number:'1.0-0' }}% confidence)</span>
              </span>
            </div>
          </div>
          <div *ngIf="selectedAlert.resolved" class="resolution-box">
            <div class="rl">✅ Resolution Note</div>
            <div class="rv">{{ selectedAlert.resolutionNote }}</div>
            <div class="rt">Resolved at: {{ selectedAlert.resolvedAt | date:'dd MMM yyyy HH:mm' }}</div>
          </div>
        </div>
        <ng-template pTemplate="footer">
          <button pButton label="Close" icon="pi pi-times" class="p-button-outlined"
                  (click)="showDetail = false"></button>
          <button pButton label="Resolve Alert" icon="pi pi-check" class="p-button-success"
                  *ngIf="selectedAlert && !selectedAlert.resolved"
                  (click)="openResolve(selectedAlert); showDetail = false"></button>
        </ng-template>
      </p-dialog>

      <!-- RESOLVE DIALOG -->
      <p-dialog [(visible)]="showResolve" header="Resolve Alert"
                [modal]="true" [style]="{width:'480px'}" styleClass="dark-dialog">
        <div class="resolve-form">
          <p class="resolve-info">You are resolving alert for account
            <strong>{{ resolveTarget?.accountNumber }}</strong>
            — ₹{{ resolveTarget?.amount | number:'1.0-0' }}
          </p>
          <label>Resolution Note</label>
          <textarea pTextarea [(ngModel)]="resolveNote" rows="4" class="w-full"
                    placeholder="Describe why this is being marked resolved..."></textarea>
        </div>
        <ng-template pTemplate="footer">
          <button pButton label="Cancel" class="p-button-outlined" (click)="showResolve = false"></button>
          <button pButton label="Confirm Resolve" icon="pi pi-check" class="p-button-success"
                  (click)="confirmResolve()"></button>
        </ng-template>
      </p-dialog>
    </div>
  `,
  styles: [`
    .alerts-page { display:flex; flex-direction:column; gap:16px; }
    .alerts-header { display:flex; align-items:center; justify-content:space-between;
      background:#13151e; border:1px solid #1e2030; border-radius:12px; padding:14px 16px; }
    .header-stats { display:flex; gap:10px; }
    .header-actions { display:flex; gap:10px; align-items:center; }
    .stat-chip { display:flex; align-items:center; gap:6px; padding:6px 14px; border-radius:20px; font-size:12px; font-weight:600; }
    .stat-chip.unread { background:rgba(239,68,68,.15); color:#fca5a5; border:1px solid rgba(239,68,68,.3); }
    .stat-chip.total-a { background:rgba(99,102,241,.15); color:#a5b4fc; border:1px solid rgba(99,102,241,.3); }

    .critical-strip { background:rgba(239,68,68,.06); border:1px solid rgba(239,68,68,.2); border-radius:12px; padding:16px; }
    .strip-label { color:#ef4444; font-size:13px; font-weight:700; margin-bottom:12px; display:flex; align-items:center; gap:8px; }
    .critical-cards { display:flex; gap:12px; overflow-x:auto; }
    .critical-card {
      min-width:220px; background:#13151e; border:1px solid rgba(239,68,68,.3);
      border-radius:10px; padding:14px; display:flex; flex-direction:column; gap:6px;
    }
    .critical-card.resolved { opacity:.5; }
    .cc-top { display:flex; justify-content:space-between; align-items:center; }
    .cc-rule { font-size:11px; font-weight:700; color:#e2e8f0; }
    .cc-amount { font-size:22px; font-weight:700; color:#ef4444; }
    .cc-account { font-size:12px; color:#94a3b8; font-family:monospace; }
    .cc-reason { font-size:11px; color:#64748b; }
    .cc-time { font-size:10px; color:#475569; }
    .cc-btn { margin-top:4px; }

    .table-card { background:#13151e; border:1px solid #1e2030; border-radius:12px; overflow:hidden; }
    .mono { font-family:monospace; font-size:12px; color:#94a3b8; }
    .amount { font-weight:700; color:#e2e8f0; }
    .time { font-size:12px; color:#64748b; }
    .sev-cell { display:flex; align-items:center; gap:8px; }
    .rule-badge { background:rgba(99,102,241,.15); color:#a5b4fc; padding:3px 8px; border-radius:6px; font-size:11px; font-weight:600; white-space:nowrap; }
    .reason-cell { font-size:12px; color:#94a3b8; max-width:200px; cursor:pointer; }
    .row-sev-critical { background:rgba(239,68,68,.04) !important; }
    .row-sev-high { background:rgba(249,115,22,.04) !important; }
    .row-sev-medium { background:rgba(245,158,11,.03) !important; }
    .resolved-row { opacity:.6; }
    .action-btns { display:flex; gap:4px; }
    .empty-msg { text-align:center; padding:48px; color:#475569; }
    .success-icon { font-size:40px; color:#22c55e; }

    .risk-display { display:flex; align-items:center; gap:8px; }
    .risk-track { width:50px; height:4px; background:#1e2030; border-radius:2px; overflow:hidden; }
    .risk-fill { height:100%; border-radius:2px; }
    .risk-high { background:#ef4444; }
    .risk-medium { background:#f59e0b; }
    .risk-low { background:#22c55e; }
    .rs-high { color:#ef4444; font-weight:700; font-size:12px; }
    .rs-medium { color:#f59e0b; font-weight:700; font-size:12px; }
    .rs-low { color:#22c55e; font-weight:700; font-size:12px; }

    /* DETAIL */
    .alert-detail { display:flex; flex-direction:column; gap:14px; }
    .ad-severity { display:flex; align-items:center; gap:10px; padding:12px 16px; border-radius:8px; font-weight:700; font-size:14px; }
    .sev-bg-critical { background:rgba(239,68,68,.15); color:#ef4444; }
    .sev-bg-high { background:rgba(249,115,22,.15); color:#f97316; }
    .sev-bg-medium { background:rgba(245,158,11,.15); color:#f59e0b; }
    .sev-bg-low { background:rgba(34,197,94,.15); color:#22c55e; }
    .ad-reason-box { background:rgba(239,68,68,.06); border-left:4px solid #ef4444; padding:12px 16px; border-radius:0 8px 8px 0; }
    .ad-reason-label { font-size:12px; font-weight:700; color:#94a3b8; margin-bottom:6px; }
    .ad-reason { color:#e2e8f0; font-size:14px; line-height:1.5; }
    .ad-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
    .ad-item { background:#0f1117; padding:10px 12px; border-radius:8px; display:flex; flex-direction:column; gap:2px; }
    .adl { font-size:10px; color:#64748b; text-transform:uppercase; }
    .adv { font-size:13px; color:#e2e8f0; font-weight:500; }
    .rule-text { color:#a5b4fc; font-weight:700; }
    .resolution-box { background:rgba(34,197,94,.08); border:1px solid rgba(34,197,94,.2); border-radius:8px; padding:12px 16px; }
    .rl { font-weight:700; color:#22c55e; font-size:12px; margin-bottom:6px; }
    .rv { color:#e2e8f0; font-size:13px; }
    .rt { font-size:11px; color:#64748b; margin-top:6px; }

    .resolve-form { display:flex; flex-direction:column; gap:10px; }
    .resolve-info { color:#94a3b8; font-size:13px; }
    label { color:#94a3b8; font-size:12px; }
  `]
})
export class AlertsComponent implements OnInit {
  alerts = signal<FraudAlert[]>([]);
  criticalAlerts = signal<FraudAlert[]>([]);
  totalElements = signal(0);
  unreadCount = signal(0);
  loading = signal(false);
  pageSize = 20;
  severityFilter: Severity | null = null;
  showDetail = false;
  showResolve = false;
  selectedAlert: FraudAlert | null = null;
  resolveTarget: FraudAlert | null = null;
  resolveNote = '';

  severityOptions = [
    { label: 'All Severities', value: null },
    { label: 'Critical', value: 'CRITICAL' },
    { label: 'High', value: 'HIGH' },
    { label: 'Medium', value: 'MEDIUM' },
    { label: 'Low', value: 'LOW' }
  ];

  constructor(private api: ApiService, private msg: MessageService, private exportSvc: ExportService) {}

  ngOnInit() { this.load(); this.loadCritical(); this.refreshUnread(); }

  load(page = 0) {
    this.loading.set(true);
    this.api.getAlerts(this.severityFilter ?? undefined, page, this.pageSize).subscribe({
      next: r => { this.alerts.set(r.content); this.totalElements.set(r.totalElements); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }

 exportCsv() {
    this.exportSvc.exportAlertsToCsv(
      this.alerts(),
      `fraud-alerts-${new Date().toISOString().slice(0,10)}.csv`
    );
    this.msg.add({ severity: 'info', summary: 'Exported',
      detail: `${this.alerts().length} alerts downloaded as CSV` });
  }

  loadCritical() {
    this.api.getHighRiskAlerts().subscribe(a => this.criticalAlerts.set(a.filter(x => !x.resolved).slice(0, 5)));
  }

  refreshUnread() {
    this.api.getUnreadCount().subscribe(r => this.unreadCount.set(r.count));
  }

  onFilter() { this.load(0); }
  onPageChange(e: any) { this.load(e.page); }

  viewAlert(a: FraudAlert) { this.selectedAlert = a; this.showDetail = true; }

  openResolve(a: FraudAlert) {
    this.resolveTarget = a; this.resolveNote = ''; this.showResolve = true;
  }

  confirmResolve() {
    if (!this.resolveTarget) return;
    this.api.resolveAlert(this.resolveTarget.id, this.resolveNote).subscribe({
      next: () => {
        this.msg.add({ severity: 'success', summary: 'Resolved', detail: 'Alert marked as resolved' });
        this.showResolve = false;
        this.load(); this.loadCritical(); this.refreshUnread();
      },
      error: () => this.msg.add({ severity: 'error', summary: 'Error', detail: 'Failed to resolve alert' })
    });
  }

  markAllRead() {
    this.api.markAllRead().subscribe(() => {
      this.msg.add({ severity: 'info', summary: 'Done', detail: 'All alerts marked as read' });
      this.refreshUnread(); this.load();
    });
  }

  formatRule(rule: string) { return rule?.replace(/_/g, ' ') ?? ''; }
  sevTag(s: string): any { return { CRITICAL: 'danger', HIGH: 'warning', MEDIUM: 'info', LOW: 'success' }[s] ?? 'info'; }
  sevIcon(s: string): string { return { CRITICAL: 'pi-times-circle', HIGH: 'pi-exclamation-triangle', MEDIUM: 'pi-exclamation-circle', LOW: 'pi-info-circle' }[s] ?? 'pi-info-circle'; }
  sevColor(s: string): string { return { CRITICAL: '#ef4444', HIGH: '#f97316', MEDIUM: '#f59e0b', LOW: '#22c55e' }[s] ?? '#94a3b8'; }
  riskClass(score: number): string { return score >= 60 ? 'high' : score >= 25 ? 'medium' : 'low'; }
}
