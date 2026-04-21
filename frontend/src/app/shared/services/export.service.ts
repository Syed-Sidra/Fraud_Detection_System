import { Injectable } from '@angular/core';
import { FraudAlert, Transaction } from '../models/models';

@Injectable({ providedIn: 'root' })
export class ExportService {

  // ── Export Alerts to CSV ─────────────────────────────────────────────────
  exportAlertsToCsv(alerts: FraudAlert[], filename = 'fraud-alerts.csv'): void {
    const headers = [
      'Alert ID', 'Alert Time', 'Severity', 'Transaction ID',
      'Account Number', 'User Name', 'Amount (Rs.)', 'Merchant',
      'Location', 'Rule Triggered', 'Detection Reason',
      'Risk Score', 'ML Prediction', 'ML Confidence (%)',
      'Status', 'Resolution Note', 'Resolved At'
    ];

    const rows = alerts.map(a => [
      a.id,
      this.formatDate(a.alertTime),
      a.severity,
      a.transactionId,
      a.accountNumber,
      a.userName ?? '',
      a.amount,
      a.merchantName ?? '',
      a.location ?? '',
      a.ruleTriggered?.replace(/_/g, ' ') ?? '',
      this.escapeCsv(a.fraudReason ?? ''),
      a.riskScore,
      a.mlPrediction != null ? (a.mlPrediction ? 'FRAUD' : 'LEGITIMATE') : 'N/A',
      a.mlConfidence != null ? a.mlConfidence.toFixed(1) : 'N/A',
      a.resolved ? 'RESOLVED' : a.read ? 'REVIEWED' : 'NEW',
      this.escapeCsv(a.resolutionNote ?? ''),
      a.resolvedAt ? this.formatDate(a.resolvedAt) : ''
    ]);

    this.downloadCsv(headers, rows, filename);
  }

  // ── Export Transactions to CSV ───────────────────────────────────────────
  exportTransactionsToCsv(transactions: Transaction[], filename = 'transactions.csv'): void {
    const headers = [
      'Transaction ID', 'Account Number', 'User Name', 'Amount (Rs.)',
      'Merchant', 'Category', 'Location', 'IP Address',
      'Device', 'Type', 'Status', 'Fraud Status',
      'Risk Score', 'Timestamp', 'Simulated'
    ];

    const rows = transactions.map(t => [
      t.transactionId,
      t.accountNumber,
      t.userName ?? '',
      t.amount,
      t.merchantName ?? '',
      t.merchantCategory ?? '',
      t.location ?? '',
      t.ipAddress ?? '',
      t.deviceType ?? '',
      t.transactionType ?? '',
      t.status,
      t.fraudStatus,
      t.riskScore ?? 0,
      this.formatDate(t.timestamp),
      t.simulated ? 'Yes' : 'No'
    ]);

    this.downloadCsv(headers, rows, filename);
  }

  // ── Core CSV builder ─────────────────────────────────────────────────────
  private downloadCsv(headers: string[], rows: any[][], filename: string): void {
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => this.escapeCsv(String(cell ?? ''))).join(','))
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  private escapeCsv(value: string): string {
    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  }

  private formatDate(dateStr: string): string {
    if (!dateStr) return '';
    try {
      return new Date(dateStr).toLocaleString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      });
    } catch { return dateStr; }
  }
}
