
const ALERTS_HEADER_TEMPLATE = `
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
    <button pButton label="Export CSV" icon="pi pi-download"
            class="p-button-outlined p-button-sm"
            (click)="exportCsv()"></button>
    <button pButton label="Mark All Read" icon="pi pi-check-square"
            class="p-button-outlined p-button-sm" (click)="markAllRead()"></button>
  </div>
</div>
`;

export {};
