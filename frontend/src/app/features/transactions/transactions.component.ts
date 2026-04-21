import { ExportService } from '../../shared/services/export.service';
import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { interval, Subscription } from 'rxjs';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { PaginatorModule } from 'primeng/paginator';
import { SliderModule } from 'primeng/slider';
import { ApiService } from '../../core/services/api.service';
import { Transaction } from '../../shared/models/models';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, TagModule, ButtonModule,
    InputTextModule, DropdownModule, CalendarModule, DialogModule, TooltipModule,
    PaginatorModule, SliderModule],
  template: `
    <div class="transactions-page">

      <!-- FILTERS BAR -->
      <div class="filters-card">
        <div class="filters-row">
          <div class="filter-group">
            <label>Fraud Status</label>
            <p-dropdown [(ngModel)]="filters.fraudStatus" [options]="statusOptions"
                        placeholder="All Statuses" [showClear]="true" styleClass="filter-dd"
                        (onChange)="onFilter()"></p-dropdown>
          </div>
          <div class="filter-group">
            <label>Account Number</label>
            <input pInputText [(ngModel)]="filters.accountNumber"
                   placeholder="Search account..." class="filter-input"
                   (keyup.enter)="onFilter()" />
          </div>
          <div class="filter-group">
            <label>Min Amount (₹)</label>
            <input pInputText [(ngModel)]="filters.minAmount" type="number"
                   placeholder="0" class="filter-input" (keyup.enter)="onFilter()" />
          </div>
          <div class="filter-group">
            <label>Max Amount (₹)</label>
            <input pInputText [(ngModel)]="filters.maxAmount" type="number"
                   placeholder="999999" class="filter-input" (keyup.enter)="onFilter()" />
          </div>
          <div class="filter-group">
            <label>Date Range</label>
            <p-calendar [(ngModel)]="dateRange" selectionMode="range"
                        placeholder="Select dates" styleClass="filter-dd"
                        [readonlyInput]="true" (onSelect)="onDateSelect()"></p-calendar>
          </div>

          <div class="filter-group">
                    <label>Transaction ID</label>
                    <div style="display:flex;gap:6px">
                      <input pInputText [(ngModel)]="searchTxnId"
                             placeholder="TXN123..." style="width:170px;height:38px"
                             (keyup.enter)="searchById()" />
                      <button pButton icon="pi pi-search" class="p-button-sm"
                              pTooltip="Search by ID" (click)="searchById()"></button>
                    </div>
                  </div>

          <div class="filter-actions">
            <button pButton label="Search" icon="pi pi-search" (click)="onFilter()"></button>
            <button pButton label="Reset" icon="pi pi-refresh" class="p-button-outlined" (click)="resetFilters()"></button>
            <button pButton icon="pi pi-download" label="Export CSV"
                      class="p-button-outlined p-button-sm" (click)="exportCsv()"></button>

          </div>
        </div>
      </div>

      <!-- STATS STRIP -->
      <div class="stats-strip">
        <div class="stat-chip total"><i class="pi pi-list"></i> {{ totalElements() }} Total</div>
        <div class="stat-chip fraud"><i class="pi pi-times-circle"></i> Fraud: filtered</div>
        <div class="live-toggle">
          <button pButton [icon]="autoRefresh() ? 'pi pi-pause' : 'pi pi-play'"
                  [label]="autoRefresh() ? 'Pause Live' : 'Resume Live'"
                  [class]="autoRefresh() ? 'p-button-success p-button-sm' : 'p-button-outlined p-button-sm'"
                  (click)="toggleAutoRefresh()">
          </button>
          <span *ngIf="autoRefresh()" class="live-label"><span class="live-dot"></span>LIVE</span>
        </div>
      </div>

      <!-- TABLE -->
      <div class="table-card">
        <p-table [value]="transactions()" [loading]="loading()" styleClass="dark-table"
                 [scrollable]="true" scrollHeight="calc(100vh - 380px)">
          <ng-template pTemplate="header">
            <tr>
              <th>Transaction ID</th>
              <th>Account</th>
              <th>User</th>
              <th>Amount</th>
              <th>Merchant</th>
              <th>Location</th>
              <th>Device</th>
              <th>Time</th>
              <th>Status</th>
              <th>Fraud Status</th>
              <th>Risk Score</th>
              <th>Actions</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-t>
            <tr [class]="'row-' + t.fraudStatus.toLowerCase()">
              <td class="mono">{{ t.transactionId }}</td>
              <td class="mono">{{ t.accountNumber }}</td>
              <td>{{ t.userName }}</td>
              <td class="amount">₹{{ t.amount | number:'1.2-2' }}</td>
              <td>{{ t.merchantName }}</td>
              <td><i class="pi pi-map-marker loc-icon"></i> {{ t.location }}</td>
              <td>{{ t.deviceType }}</td>
              <td class="time">{{ t.timestamp | date:'dd/MM HH:mm:ss' }}</td>
              <td><p-tag [value]="t.status" [severity]="txnSeverity(t.status)"></p-tag></td>
              <td>
                <p-tag [value]="t.fraudStatus" [severity]="fraudSeverity(t.fraudStatus)"
                       [icon]="fraudIcon(t.fraudStatus)"></p-tag>
              </td>
              <td>
                <div class="risk-display">
                  <div class="risk-track">
                    <div class="risk-fill" [style.width]="t.riskScore + '%'"
                         [class]="'risk-' + riskClass(t.riskScore)"></div>
                  </div>
                  <span [class]="'risk-score-' + riskClass(t.riskScore)">{{ t.riskScore | number:'1.0-0' }}</span>
                </div>
              </td>
              <td>
                <button pButton icon="pi pi-eye" class="p-button-text p-button-sm"
                        pTooltip="View Details" (click)="viewDetail(t)"></button>
              </td>
            </tr>
          </ng-template>
          <ng-template pTemplate="emptymessage">
            <tr><td colspan="12" class="empty-msg">
              <i class="pi pi-inbox"></i><br>No transactions found
            </td></tr>
          </ng-template>
        </p-table>
      </div>

      <!-- PAGINATOR -->
      <p-paginator [rows]="pageSize" [totalRecords]="totalElements()"
                   [first]="currentPage() * pageSize"
                   (onPageChange)="onPageChange($event)"></p-paginator>

      <!-- DETAIL DIALOG -->
      <p-dialog [(visible)]="showDetail" header="Transaction Details"
                [modal]="true" [style]="{width:'600px'}" styleClass="dark-dialog">
        <div *ngIf="selectedTxn" class="txn-detail">
          <div class="detail-header" [class]="'fraud-' + selectedTxn.fraudStatus.toLowerCase()">
            <div class="detail-id">{{ selectedTxn.transactionId }}</div>
            <p-tag [value]="selectedTxn.fraudStatus" [severity]="fraudSeverity(selectedTxn.fraudStatus)"></p-tag>
          </div>
          <div class="detail-grid">
            <div class="detail-item"><span class="dl">Account</span><span class="dv">{{ selectedTxn.accountNumber }}</span></div>
            <div class="detail-item"><span class="dl">User</span><span class="dv">{{ selectedTxn.userName }}</span></div>
            <div class="detail-item"><span class="dl">Amount</span><span class="dv amount">₹{{ selectedTxn.amount | number:'1.2-2' }}</span></div>
            <div class="detail-item"><span class="dl">Merchant</span><span class="dv">{{ selectedTxn.merchantName }}</span></div>
            <div class="detail-item"><span class="dl">Category</span><span class="dv">{{ selectedTxn.merchantCategory }}</span></div>
            <div class="detail-item"><span class="dl">Location</span><span class="dv">{{ selectedTxn.location }}</span></div>
            <div class="detail-item"><span class="dl">IP Address</span><span class="dv mono">{{ selectedTxn.ipAddress }}</span></div>
            <div class="detail-item"><span class="dl">Device</span><span class="dv">{{ selectedTxn.deviceType }}</span></div>
            <div class="detail-item"><span class="dl">Type</span><span class="dv">{{ selectedTxn.transactionType }}</span></div>
            <div class="detail-item"><span class="dl">Status</span><span class="dv">{{ selectedTxn.status }}</span></div>
            <div class="detail-item"><span class="dl">Risk Score</span>
              <span class="dv" [class]="'risk-score-' + riskClass(selectedTxn.riskScore)">
                {{ selectedTxn.riskScore | number:'1.1-1' }} / 100</span>
            </div>
            <div class="detail-item"><span class="dl">Timestamp</span><span class="dv">{{ selectedTxn.timestamp | date:'dd MMM yyyy HH:mm:ss' }}</span></div>
            <div class="detail-item"><span class="dl">Simulated</span><span class="dv">{{ selectedTxn.simulated ? 'Yes' : 'No' }}</span></div>
          </div>
        </div>
      </p-dialog>
      <p-dialog [(visible)]="showSearchDialog" header="Transaction Found"
                  [modal]="true" [style]="{width:'600px'}" styleClass="dark-dialog">
          <div *ngIf="searchResult" class="txn-detail">
            <div class="detail-header" [class]="'fraud-' + searchResult.fraudStatus.toLowerCase()">
              <div class="detail-id">{{ searchResult.transactionId }}</div>
              <p-tag [value]="searchResult.fraudStatus"
                     [severity]="fraudSeverity(searchResult.fraudStatus)"></p-tag>
            </div>
            <div class="detail-grid">
              <div class="detail-item"><span class="dl">Account</span><span class="dv">{{ searchResult.accountNumber }}</span></div>
              <div class="detail-item"><span class="dl">Amount</span><span class="dv amount">₹{{ searchResult.amount | number:'1.2-2' }}</span></div>
              <div class="detail-item"><span class="dl">Merchant</span><span class="dv">{{ searchResult.merchantName }}</span></div>
              <div class="detail-item"><span class="dl">Location</span><span class="dv">{{ searchResult.location }}</span></div>
              <div class="detail-item"><span class="dl">Risk Score</span><span class="dv">{{ searchResult.riskScore }}</span></div>
              <div class="detail-item"><span class="dl">Timestamp</span><span class="dv">{{ searchResult.timestamp | date:'dd MMM yyyy HH:mm:ss' }}</span></div>
            </div>
          </div>
          <div *ngIf="!searchResult" class="empty-msg">
            <i class="pi pi-search"></i><br>Transaction "{{ searchTxnId }}" not found.
          </div>
        </p-dialog>
    </div>
  `,
  styles: [`
    .transactions-page { display:flex; flex-direction:column; gap:16px; }

    .filters-card {
      background:#13151e; border:1px solid #1e2030; border-radius:12px; padding:16px;


    }
    .filters-row { display:flex; flex-wrap:wrap; gap:12px; align-items:flex-end; }
    .filter-group { display:flex; flex-direction:column; gap:4px; }
    .filter-group label { color:#64748b; font-size:11px; font-weight:600; text-transform:uppercase; }
    .filter-input { width:160px; height:38px; }
    .filter-actions { display:flex; gap:8px; margin-left:auto; }

    .stats-strip { display:flex; align-items:center; gap:12px; }
    .stat-chip { display:flex; align-items:center; gap:6px; padding:6px 14px;
      border-radius:20px; font-size:12px; font-weight:600; }
    .stat-chip.total { background:rgba(99,102,241,.15); color:#a5b4fc; border:1px solid rgba(99,102,241,.3); }
    .stat-chip.fraud { background:rgba(239,68,68,.15); color:#fca5a5; border:1px solid rgba(239,68,68,.3); }
    .live-toggle { margin-left:auto; display:flex; align-items:center; gap:10px; }
    .live-label { display:flex; align-items:center; gap:6px; font-size:11px; color:#22c55e; font-weight:700; }
    .live-dot { display:inline-block; width:6px; height:6px; border-radius:50%; background:#22c55e; animation:pulse 1.5s infinite; }
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}

    .table-card { background:#13151e; border:1px solid #1e2030; border-radius:12px; overflow:hidden; }
    .mono { font-family:monospace; font-size:12px; color:#94a3b8; }
    .amount { font-weight:700; color:#e2e8f0; }
    .time { font-size:12px; color:#64748b; }
    .loc-icon { color:#6366f1; font-size:11px; }

    .row-fraud { background:rgba(239,68,68,.04) !important; }
    .row-suspicious { background:rgba(245,158,11,.04) !important; }

    .risk-display { display:flex; align-items:center; gap:8px; }
    .risk-track { width:60px; height:5px; background:#1e2030; border-radius:3px; overflow:hidden; }
    .risk-fill { height:100%; border-radius:3px; transition:width .3s; }
    .risk-high { background:#ef4444; }
    .risk-medium { background:#f59e0b; }
    .risk-low { background:#22c55e; }
    .risk-score-high { color:#ef4444; font-weight:700; font-size:13px; }
    .risk-score-medium { color:#f59e0b; font-weight:700; font-size:13px; }
    .risk-score-low { color:#22c55e; font-weight:700; font-size:13px; }

    .empty-msg { text-align:center; padding:40px; color:#475569; }

    /* DETAIL */
    .txn-detail {}
    .detail-header { display:flex; align-items:center; justify-content:space-between;
      padding:16px; border-radius:8px; margin-bottom:16px; }
    .fraud-fraud { background:rgba(239,68,68,.1); }
    .fraud-suspicious { background:rgba(245,158,11,.1); }
    .fraud-normal { background:rgba(34,197,94,.1); }
    .detail-id { font-family:monospace; font-weight:700; color:#e2e8f0; font-size:14px; }
    .detail-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
    .detail-item { display:flex; flex-direction:column; gap:2px;
      background:#0f1117; padding:10px 12px; border-radius:8px; }
    .dl { font-size:11px; color:#64748b; text-transform:uppercase; }
    .dv { font-size:14px; color:#e2e8f0; font-weight:500; }
  `]
})
export class TransactionsComponent implements OnInit, OnDestroy {
  transactions = signal<Transaction[]>([]);
  totalElements = signal(0);
  loading = signal(false);
  autoRefresh = signal(true);
  currentPage = signal(0);
  pageSize = 20;
  showDetail = false;
  selectedTxn: Transaction | null = null;
  dateRange: Date[] = [];
  private sub?: Subscription;
  searchTxnId = '';
  searchResult: Transaction | null = null;
  showSearchDialog = false;

  filters: any = { fraudStatus: null, accountNumber: '', minAmount: null, maxAmount: null };

  statusOptions = [
    { label: 'All Statuses', value: null },
    { label: 'Normal', value: 'NORMAL' },
    { label: 'Suspicious', value: 'SUSPICIOUS' },
    { label: 'Fraud', value: 'FRAUD' }
  ];

  constructor(private api: ApiService, private exportSvc: ExportService) {}

  ngOnInit() {
    this.load();
    this.sub = interval(8000).subscribe(() => { if (this.autoRefresh()) this.load(); });
  }
  ngOnDestroy() { this.sub?.unsubscribe(); }

  load() {
    this.loading.set(true);
    const params: any = { page: this.currentPage(), size: this.pageSize };
    if (this.filters.fraudStatus) params.fraudStatus = this.filters.fraudStatus;
    if (this.filters.accountNumber) params.accountNumber = this.filters.accountNumber;
    if (this.filters.minAmount) params.minAmount = this.filters.minAmount;
    if (this.filters.maxAmount) params.maxAmount = this.filters.maxAmount;
    if (this.dateRange[0]) params.startDate = this.dateRange[0].toISOString();
    if (this.dateRange[1]) params.endDate = this.dateRange[1].toISOString();

    this.api.getTransactions(params).subscribe({
      next: r => { this.transactions.set(r.content); this.totalElements.set(r.totalElements); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }

searchById() {
    if (!this.searchTxnId.trim()) return;
    this.api.getTransactionById(this.searchTxnId.trim()).subscribe({
      next: (t) => { this.searchResult = t; this.showSearchDialog = true; },
      error: () => this.searchResult = null
    });
  }

  exportCsv() {
    this.exportSvc.exportTransactionsToCsv(
      this.transactions(),
      `transactions-${new Date().toISOString().slice(0,10)}.csv`
    );
  }


  onFilter() { this.currentPage.set(0); this.load(); }
  onDateSelect() { if (this.dateRange[1]) this.onFilter(); }
  resetFilters() { this.filters = { fraudStatus: null, accountNumber: '', minAmount: null, maxAmount: null }; this.dateRange = []; this.onFilter(); }
  onPageChange(e: any) { this.currentPage.set(e.page); this.load(); }
  toggleAutoRefresh() { this.autoRefresh.update(v => !v); }
  viewDetail(t: Transaction) { this.selectedTxn = t; this.showDetail = true; }

  fraudSeverity(s: string): any { return { FRAUD: 'danger', SUSPICIOUS: 'warning', NORMAL: 'success' }[s] ?? 'info'; }
  txnSeverity(s: string): any { return { SUCCESS: 'success', PROCESSING: 'info', FAILED: 'danger' }[s] ?? 'info'; }
  fraudIcon(s: string): string { return { FRAUD: 'pi pi-times', SUSPICIOUS: 'pi pi-exclamation-triangle', NORMAL: 'pi pi-check' }[s] ?? ''; }
  riskClass(score: number): string { return score >= 60 ? 'high' : score >= 25 ? 'medium' : 'low'; }
}
