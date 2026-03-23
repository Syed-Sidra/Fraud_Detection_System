import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { forkJoin } from 'rxjs';
import { FraudService } from '../../core/services/fraud.service';
import { CategoryFraud, DailyFraud } from '../../shared/models/models';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  trendData: any; trendOpts: any;
  pieData: any; pieOpts: any;
  radarData: any; radarOpts: any;
  polarData: any; polarOpts: any;

  kpis = [
    { label: 'Avg Fraud Amount', value: '$526', change: '+8.4%', up: true,   icon: 'fas fa-sack-dollar', color: 'teal' },
    { label: 'Peak Fraud Day',   value: 'Dec 21', change: 'Highest spike', up: false, icon: 'fas fa-calendar-exclamation', color: 'orange' },
    { label: 'Top Category',     value: 'Grocery', change: '10% share',   up: true,   icon: 'fas fa-basket-shopping', color: 'green' },
    { label: 'False Positive Rate', value: '0.8%', change: '-0.2% better', up: true,  icon: 'fas fa-shield-check', color: 'blue' },
  ];

  constructor(private svc: FraudService) {}

  ngOnInit() {
    forkJoin({
      daily: this.svc.getDailyFraudData(),
      categories: this.svc.getCategoryFraudData()
    }).subscribe({
      next: ({ daily, categories }) => this.buildCharts(daily, categories),
      error: () => this.buildCharts(this.svc.getMockDailyData(), this.svc.getMockCategoryData())
    });
  }

  buildCharts(daily: DailyFraud[], cats: CategoryFraud[]) {
    const teal  = '#009688'; const grid = 'rgba(0,0,0,0.05)';

    this.trendData = {
      labels: daily.map(d => d.date),
      datasets: [
        { label: 'High Risk',   data: daily.map(d => d.highRisk),   borderColor: '#ef5350', backgroundColor: 'rgba(239,83,80,0.08)', fill: true, tension: 0.4, borderWidth: 2, pointRadius: 3 },
        { label: 'Medium Risk', data: daily.map(d => d.mediumRisk), borderColor: teal,      backgroundColor: 'rgba(0,150,136,0.06)', fill: true, tension: 0.4, borderWidth: 2, pointRadius: 3 }
      ]
    };
    this.trendOpts = {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'top', labels: { font: { size: 11 }, usePointStyle: true } } },
      scales: { x: { grid: { color: grid }, ticks: { font: { size: 10 }, color: '#94a3b8', maxRotation: 0 } }, y: { grid: { color: grid }, ticks: { font: { size: 10 }, color: '#94a3b8' } } }
    };

    this.pieData = {
      labels: cats.slice(0, 6).map(c => c.category),
      datasets: [{ data: cats.slice(0, 6).map(c => c.percentage), backgroundColor: ['#009688','#4db6ac','#80cbc4','#ef5350','#ff9800','#2196f3'], borderWidth: 2, borderColor: '#fff', hoverOffset: 6 }]
    };
    this.pieOpts = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { font: { size: 11 }, usePointStyle: true, padding: 12 } } } };

    this.radarData = {
      labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
      datasets: [
        { label: 'High Risk',   data: [65,72,58,84,96,45,38], borderColor: '#ef5350', backgroundColor: 'rgba(239,83,80,0.12)', borderWidth: 2 },
        { label: 'Medium Risk', data: [55,62,50,74,80,40,30], borderColor: teal,      backgroundColor: 'rgba(0,150,136,0.10)', borderWidth: 2 }
      ]
    };
    this.radarOpts = { responsive: true, maintainAspectRatio: false, scales: { r: { grid: { color: grid }, ticks: { color: '#94a3b8', backdropColor: 'transparent', font: { size: 10 } }, pointLabels: { color: '#475569', font: { size: 11 } } } }, plugins: { legend: { position: 'top', labels: { font: { size: 11 }, usePointStyle: true } } } };

    this.polarData = {
      labels: cats.slice(0,6).map(c => c.category),
      datasets: [{ data: cats.slice(0,6).map(c => c.percentage), backgroundColor: ['rgba(0,150,136,0.7)','rgba(77,182,172,0.7)','rgba(128,203,196,0.7)','rgba(239,83,80,0.7)','rgba(255,152,0,0.7)','rgba(33,150,243,0.7)'] }]
    };
    this.polarOpts = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { font: { size: 11 }, usePointStyle: true } } } };
  }
}
