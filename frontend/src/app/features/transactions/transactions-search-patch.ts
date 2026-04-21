/*
  PATCH INSTRUCTIONS FOR transactions.component.ts
  ==================================================
  These changes add: Transaction ID search bar + CSV export button

  ── CHANGE 1: Add ExportService to imports ────────────────────────────────────

  import { ExportService } from '../../shared/services/export.service';

  ── CHANGE 2: Add to constructor ──────────────────────────────────────────────

  constructor(
    private api: ApiService,
    private exportSvc: ExportService   // ← add this
  ) {}

  ── CHANGE 3: Add searchTxnId property to the class ──────────────────────────

  searchTxnId = '';
  searchResult: Transaction | null = null;
  showSearchDialog = false;

  ── CHANGE 4: Add these two methods to the class ──────────────────────────────

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

  ── CHANGE 5: Add to template (inside .filters-card, first row) ──────────────

  Add a new filter-group for transaction ID search:

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

  And add export button to filter-actions div:

  <button pButton icon="pi pi-download" label="Export CSV"
          class="p-button-outlined p-button-sm" (click)="exportCsv()"></button>

  ── CHANGE 6: Add search result dialog (after the existing detail dialog) ─────

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
*/

export {};
