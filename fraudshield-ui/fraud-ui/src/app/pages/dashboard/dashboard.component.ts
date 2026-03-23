import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { SkeletonModule } from 'primeng/skeleton';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FraudService } from '../../core/services/fraud.service';
import { CategoryFraud, DailyFraud, DashboardStats, MerchantFraudSummary } from '../../shared/models/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ChartModule, TableModule, TagModule, SkeletonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  stats: DashboardStats | null = null;
  merchants: MerchantFraudSummary[] = [];
  categories: CategoryFraud[] = [];
  dailyData: DailyFraud[] = [];
  lineChartData: any;
  barChartData: any;
  hBarChartData: any;
  lineOpts: any;
  barOpts: any;
  hBarOpts: any;

  // Loading states
  isLoading = true;
  isStatsLoading = true;
  isMerchantsLoading = true;
  isCategoriesLoading = true;
  isDailyDataLoading = true;

  // Error handling
  error: string | null = null;

  private destroy$ = new Subject<void>();

  constructor(private fraudService: FraudService) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Load all dashboard data asynchronously
   */
  private loadDashboardData(): void {
    this.isLoading = true;
    this.error = null;

    // Load stats
    this.fraudService
      .getDashboardStats()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (stats) => {
          this.stats = stats;
          this.isStatsLoading = false;
        },
        error: (err) => {
          console.error('Error loading stats:', err);
          this.error = 'Failed to load dashboard stats';
          this.isStatsLoading = false;
        }
      });

    // Load merchants
    this.fraudService
      .getMerchantsList()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (merchants) => {
          this.merchants = merchants;
          this.isMerchantsLoading = false;
        },
        error: (err) => {
          console.error('Error loading merchants:', err);
          this.isMerchantsLoading = false;
        }
      });

    // Load categories
    this.fraudService
      .getCategoryFraudData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (categories) => {
          this.categories = categories;
          this.isCategoriesLoading = false;
          this.buildCharts();
        },
        error: (err) => {
          console.error('Error loading categories:', err);
          this.isCategoriesLoading = false;
        }
      });

    // Load daily data
    this.fraudService
      .getDailyFraudData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (dailyData) => {
          this.dailyData = dailyData;
          this.isDailyDataLoading = false;
          this.buildCharts();
        },
        error: (err) => {
          console.error('Error loading daily data:', err);
          this.isDailyDataLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }

  /**
   * Refresh dashboard data
   */
  refreshDashboard(): void {
    this.loadDashboardData();
  }

  private buildCharts() {
    const teal = '#009688'; const tealL = '#4db6ac'; const grid = 'rgba(0,0,0,0.05)';

    this.lineChartData = {
      labels: this.dailyData.map(d => d.date),
      datasets: [{ label: 'Avg Fraud %', data: this.dailyData.map(d => d.avgPercentage), borderColor: teal, backgroundColor: 'rgba(0,150,136,0.08)', fill: true, tension: 0.35, borderWidth: 2, pointRadius: 5, pointBackgroundColor: '#fff', pointBorderColor: teal, pointBorderWidth: 2, pointHoverRadius: 7 }]
    };
    this.lineOpts = {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c: any) => c.parsed.y.toFixed(3) + '%' } } },
      scales: { x: { grid: { color: grid }, ticks: { font: { size: 10 }, color: '#94a3b8', maxRotation: 0 } }, y: { grid: { color: grid }, ticks: { font: { size: 10 }, color: '#94a3b8', callback: (v: number) => v.toFixed(2) + '%' } } }
    };

    this.barChartData = {
      labels: this.dailyData.slice(1).map(d => d.date),
      datasets: [
        { label: 'High Risk',   data: this.dailyData.slice(1).map(d => d.highRisk),   backgroundColor: '#1a2332', borderRadius: 2 },
        { label: 'Medium Risk', data: this.dailyData.slice(1).map(d => d.mediumRisk), backgroundColor: tealL,    borderRadius: 2 }
      ]
    };
    this.barOpts = {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'top', labels: { font: { size: 11 }, usePointStyle: true, pointStyleWidth: 8 } } },
      scales: { x: { stacked: true, grid: { display: false }, ticks: { font: { size: 10 }, color: '#94a3b8', maxRotation: 0 } }, y: { stacked: true, grid: { color: grid }, ticks: { font: { size: 10 }, color: '#94a3b8' } } }
    };

    this.hBarChartData = {
      labels: this.categories.map(c => c.category),
      datasets: [{ label: 'Fraud %', data: this.categories.map(c => c.percentage), backgroundColor: teal, borderRadius: 3, barThickness: 12 }]
    };
    this.hBarOpts = {
      indexAxis: 'y', responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { x: { grid: { color: grid }, ticks: { font: { size: 10 }, color: '#94a3b8', callback: (v: number) => v + '%' } }, y: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#475569' } } }
    };
  }

  grandTotal(): number { return this.merchants.reduce((sum, merchant) => sum + merchant.fraudAmount, 0); }
  grandCount(): number { return this.merchants.reduce((sum, merchant) => sum + merchant.numberOfFrauds, 0); }
  riskSeverity(l: string): string { return ({ HIGH: 'danger', MEDIUM: 'warning', LOW: 'success' } as any)[l] ?? 'info'; }
  formatAmt(n: number): string { return n >= 1000 ? '$' + (n / 1000).toFixed(1) + 'K' : '$' + n.toFixed(0); }
}
