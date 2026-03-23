import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';
import { FraudService } from '../../core/services/fraud.service';
import { FraudStatus, FraudTransaction } from '../../shared/models/models';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, TagModule, DropdownModule, InputTextModule, ButtonModule, DialogModule, ToastModule, TooltipModule],
  providers: [MessageService],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  transactions: FraudTransaction[] = [];
  filtered: FraudTransaction[] = [];
  searchQuery = '';
  selectedRisk = '';
  selectedStatus = '';
  detailVisible = false;
  selectedTx: FraudTransaction | null = null;

  riskOptions = [{ label: 'All Scores', value: '' }, { label: '0-59', value: '0-59' }, { label: '60-119', value: '60-119' }, { label: '120+', value: '120+' }];
  statusOptions = [{ label: 'All Status', value: '' }, { label: 'Fraud', value: 'FRAUD' }, { label: 'Suspicious', value: 'SUSPICIOUS' }, { label: 'Normal', value: 'NORMAL' }];

  constructor(private svc: FraudService, private msg: MessageService) {}

  ngOnInit() {
    this.svc.getFraudTransactions().subscribe({
      next: (data) => {
        this.transactions = data;
        this.applyFilters();
      },
      error: (err) => {
        console.error('Error fetching fraud transactions:', err);
        this.msg.add({ severity: 'error', summary: 'Error', detail: 'Failed to load transactions' });
      }
    });
  }

  applyFilters() {
    this.filtered = this.transactions.filter(t => {
      const q = this.searchQuery.toLowerCase();
      const matchQ = !q || 
        t.transactionId.toLowerCase().includes(q) ||
        t.senderName.toLowerCase().includes(q) || 
        t.receiverName.toLowerCase().includes(q) || 
        t.senderAccount.toLowerCase().includes(q) ||
        t.receiverAccount.toLowerCase().includes(q) ||
        t.channel.toLowerCase().includes(q);
      
      let matchRisk = true;
      if (this.selectedRisk) {
        const risk = t.riskScore;

        if (this.selectedRisk.endsWith('+')) {
          matchRisk = risk >= Number(this.selectedRisk.replace('+', ''));
        } else {
          const [min, max] = this.selectedRisk.split('-').map(Number);
          matchRisk = risk >= min && risk <= max;
        }
      }
      
      const matchStatus = !this.selectedStatus || t.status === this.selectedStatus;
      return matchQ && matchRisk && matchStatus;
    });
  }

  resetFilters() {
    this.searchQuery = '';
    this.selectedRisk = '';
    this.selectedStatus = '';
    this.applyFilters();
  }

  viewDetail(tx: FraudTransaction) { 
    this.selectedTx = tx; 
    this.detailVisible = true; 
  }

  markLegitimate(tx: FraudTransaction) { 
    tx.status = 'NORMAL'; 
    this.msg.add({ severity: 'success', summary: 'Marked legitimate', detail: tx.senderName }); 
  }

  getStatusSeverity(status: FraudStatus | string | null | undefined): 'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'contrast' {
    if (!status) return 'secondary';
    switch (status.toLowerCase()) {
      case 'normal': return 'success';
      case 'suspicious': return 'warning';
      case 'fraud': return 'danger';
      default: return 'info';
    }
  }

  maskAccount(account?: string): string {
    if (!account || account.length < 4) return '****';
    return '**** **** **** ' + account.slice(-4);
  }

  formatDate(date?: string | Date): string {
    if (!date) return '';
    try {
      return new Date(date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return String(date);
    }
  }

  formatAmt(n?: number): string {
    if (n == null) return '$0.00';
    return n >= 1000 ? '$' + (n/1000).toFixed(1) + 'K' : '$' + n.toFixed(2); 
  }

  totalFraud(): number { 
    return this.filtered
      .filter(t => t.status === 'FRAUD') 
      .reduce((sum, transaction) => sum + transaction.amount, 0); 
  }
}
