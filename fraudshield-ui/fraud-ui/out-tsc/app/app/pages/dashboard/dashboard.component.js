import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { SkeletonModule } from 'primeng/skeleton';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../../core/services/fraud.service";
import * as i2 from "primeng/chart";
import * as i3 from "primeng/table";
import * as i4 from "primeng/api";
function DashboardComponent_ng_template_121_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th");
    i0.ɵɵtext(2, "Merchant name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Category");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Fraud amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th", 80);
    i0.ɵɵtext(8, "Number of frauds");
    i0.ɵɵelementEnd()();
} }
function DashboardComponent_ng_template_122_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 81);
    i0.ɵɵelement(2, "i", 82);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "td")(5, "span", 83);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "td", 84);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td", 80)(10, "span", 16);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const m_r1 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(m_r1.merchantName);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(m_r1.category);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.formatAmt(m_r1.fraudAmount));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(m_r1.numberOfFrauds);
} }
function DashboardComponent_ng_template_123_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 85)(2, "strong");
    i0.ɵɵtext(3, "Grand total");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "td", 86)(5, "strong");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "td", 80)(8, "strong");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r1.formatAmt(ctx_r1.grandTotal()));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.grandCount());
} }
export class DashboardComponent {
    constructor(fraudService) {
        this.fraudService = fraudService;
        this.stats = null;
        this.merchants = [];
        this.categories = [];
        this.dailyData = [];
        // Loading states
        this.isLoading = true;
        this.isStatsLoading = true;
        this.isMerchantsLoading = true;
        this.isCategoriesLoading = true;
        this.isDailyDataLoading = true;
        // Error handling
        this.error = null;
        this.destroy$ = new Subject();
    }
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
    loadDashboardData() {
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
    refreshDashboard() {
        this.loadDashboardData();
    }
    buildCharts() {
        const teal = '#009688';
        const tealL = '#4db6ac';
        const grid = 'rgba(0,0,0,0.05)';
        this.lineChartData = {
            labels: this.dailyData.map(d => d.date),
            datasets: [{ label: 'Avg Fraud %', data: this.dailyData.map(d => d.avgPercentage), borderColor: teal, backgroundColor: 'rgba(0,150,136,0.08)', fill: true, tension: 0.35, borderWidth: 2, pointRadius: 5, pointBackgroundColor: '#fff', pointBorderColor: teal, pointBorderWidth: 2, pointHoverRadius: 7 }]
        };
        this.lineOpts = {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => c.parsed.y.toFixed(3) + '%' } } },
            scales: { x: { grid: { color: grid }, ticks: { font: { size: 10 }, color: '#94a3b8', maxRotation: 0 } }, y: { grid: { color: grid }, ticks: { font: { size: 10 }, color: '#94a3b8', callback: (v) => v.toFixed(2) + '%' } } }
        };
        this.barChartData = {
            labels: this.dailyData.slice(1).map(d => d.date),
            datasets: [
                { label: 'High Risk', data: this.dailyData.slice(1).map(d => d.highRisk), backgroundColor: '#1a2332', borderRadius: 2 },
                { label: 'Medium Risk', data: this.dailyData.slice(1).map(d => d.mediumRisk), backgroundColor: tealL, borderRadius: 2 }
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
            scales: { x: { grid: { color: grid }, ticks: { font: { size: 10 }, color: '#94a3b8', callback: (v) => v + '%' } }, y: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#475569' } } }
        };
    }
    grandTotal() { return this.merchants.reduce((sum, merchant) => sum + merchant.fraudAmount, 0); }
    grandCount() { return this.merchants.reduce((sum, merchant) => sum + merchant.numberOfFrauds, 0); }
    riskSeverity(l) { return { HIGH: 'danger', MEDIUM: 'warning', LOW: 'success' }[l] ?? 'info'; }
    formatAmt(n) { return n >= 1000 ? '$' + (n / 1000).toFixed(1) + 'K' : '$' + n.toFixed(0); }
    static { this.ɵfac = function DashboardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DashboardComponent)(i0.ɵɵdirectiveInject(i1.FraudService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DashboardComponent, selectors: [["app-dashboard"]], decls: 124, vars: 12, consts: [[1, "page-wrapper"], [1, "dash-header", "fade-in-up"], [1, "page-title"], [1, "page-sub"], [1, "dash-header-actions"], [1, "header-badge"], [1, "fas", "fa-circle-check"], [1, "header-badge", "warn"], [1, "fas", "fa-triangle-exclamation"], [1, "kpi-row"], [1, "kpi-card", "fade-in-up", "d1"], [1, "kpi-icon", "teal"], [1, "fas", "fa-credit-card"], [1, "kpi-value"], [1, "kpi-label"], [1, "kpi-sub"], [1, "badge", "badge-danger"], [1, "kpi-card", "fade-in-up", "d2"], [1, "kpi-icon", "orange"], [1, "fas", "fa-percent"], [1, "kpi-card", "fade-in-up", "d3"], [1, "kpi-icon", "red"], [1, "fas", "fa-sack-dollar"], [1, "grid-3"], [1, "chart-card", "map-card", "fade-in-up", "d1"], [1, "chart-card-header"], [1, "chart-card-title"], [1, "fas", "fa-map-location-dot"], [1, "map-wrap"], ["viewBox", "0 0 560 340", "xmlns", "http://www.w3.org/2000/svg", 1, "usa-svg"], ["id", "mapGrad", "x1", "0", "y1", "0", "x2", "1", "y2", "0"], ["offset", "0%", "stop-color", "#e0f2f1"], ["offset", "100%", "stop-color", "#00695c"], ["x", "5", "y", "5", "width", "550", "height", "295", "rx", "6", "fill", "#f8fafc", "stroke", "#e2e8f0"], ["x", "15", "y", "15", "width", "65", "height", "120", "rx", "3", "fill", "#e0f2f1", "stroke", "#b2dfdb", "stroke-width", "0.5"], ["x", "85", "y", "15", "width", "95", "height", "65", "rx", "3", "fill", "#00695c", "stroke", "#004d40"], ["x", "132", "y", "51", "text-anchor", "middle", "font-size", "9", "fill", "white", "font-weight", "700"], ["x", "85", "y", "84", "width", "95", "height", "51", "rx", "3", "fill", "#e0f2f1", "stroke", "#b2dfdb", "stroke-width", "0.5"], ["x", "185", "y", "15", "width", "75", "height", "55", "rx", "3", "fill", "#e0f2f1", "stroke", "#b2dfdb", "stroke-width", "0.5"], ["x", "185", "y", "74", "width", "75", "height", "55", "rx", "3", "fill", "#e0f2f1", "stroke", "#b2dfdb", "stroke-width", "0.5"], ["x", "185", "y", "133", "width", "75", "height", "55", "rx", "3", "fill", "#e0f2f1", "stroke", "#b2dfdb", "stroke-width", "0.5"], ["x", "265", "y", "15", "width", "60", "height", "60", "rx", "3", "fill", "#e0f2f1", "stroke", "#b2dfdb", "stroke-width", "0.5"], ["x", "265", "y", "79", "width", "60", "height", "55", "rx", "3", "fill", "#e0f2f1", "stroke", "#b2dfdb", "stroke-width", "0.5"], ["x", "300", "y", "100", "width", "50", "height", "80", "rx", "3", "fill", "#009688", "stroke", "#00695c", "opacity", "0.85"], ["x", "325", "y", "143", "text-anchor", "middle", "font-size", "8", "fill", "white", "font-weight", "700"], ["x", "300", "y", "185", "width", "45", "height", "65", "rx", "3", "fill", "#00897b", "stroke", "#00695c", "opacity", "0.9"], ["x", "322", "y", "221", "text-anchor", "middle", "font-size", "8", "fill", "white", "font-weight", "700"], ["x", "355", "y", "15", "width", "50", "height", "80", "rx", "3", "fill", "#e0f2f1", "stroke", "#b2dfdb", "stroke-width", "0.5"], ["x", "355", "y", "99", "width", "50", "height", "80", "rx", "3", "fill", "#e0f2f1", "stroke", "#b2dfdb", "stroke-width", "0.5"], ["x", "355", "y", "183", "width", "50", "height", "65", "rx", "3", "fill", "#e0f2f1", "stroke", "#b2dfdb", "stroke-width", "0.5"], ["x", "410", "y", "15", "width", "55", "height", "100", "rx", "3", "fill", "#e0f2f1", "stroke", "#b2dfdb", "stroke-width", "0.5"], ["x", "410", "y", "119", "width", "55", "height", "90", "rx", "3", "fill", "#e0f2f1", "stroke", "#b2dfdb", "stroke-width", "0.5"], ["x", "470", "y", "15", "width", "75", "height", "100", "rx", "3", "fill", "#e0f2f1", "stroke", "#b2dfdb", "stroke-width", "0.5"], ["x", "470", "y", "119", "width", "75", "height", "80", "rx", "3", "fill", "#e0f2f1", "stroke", "#b2dfdb", "stroke-width", "0.5"], ["x", "380", "y", "252", "width", "55", "height", "45", "rx", "3", "fill", "#e0f2f1", "stroke", "#b2dfdb", "stroke-width", "0.5"], ["x", "195", "y", "192", "width", "95", "height", "90", "rx", "3", "fill", "#e0f2f1", "stroke", "#b2dfdb", "stroke-width", "0.5"], ["x", "15", "y", "60", "width", "65", "height", "120", "rx", "3", "fill", "#e0f2f1", "stroke", "#b2dfdb", "stroke-width", "0.5"], ["x", "15", "y", "310", "width", "120", "height", "8", "rx", "4", "fill", "url(#mapGrad)"], ["x", "15", "y", "328", "font-size", "9", "fill", "#64748b"], ["x", "128", "y", "328", "font-size", "9", "fill", "#64748b"], [1, "chart-card", "fade-in-up", "d2"], [1, "fas", "fa-chart-bar"], [2, "height", "290px"], ["type", "bar", "height", "290", 3, "data", "options"], [1, "chart-card", "fade-in-up", "d3"], [1, "fas", "fa-chart-line"], ["type", "line", "height", "290", 3, "data", "options"], [1, "grid-2"], [1, "chart-card", "fade-in-up", "d4"], [1, "fas", "fa-chart-column"], [2, "height", "260px"], ["type", "bar", "height", "260", 3, "data", "options"], [1, "chart-card", "fade-in-up", "d5"], [1, "fas", "fa-store"], [1, "badge", "badge-teal"], [1, "table-responsive"], ["scrollHeight", "220px", 3, "value", "scrollable"], ["pTemplate", "header"], ["pTemplate", "body"], ["pTemplate", "footer"], [2, "text-align", "center"], [1, "merchant-name-cell"], [1, "fas", "fa-user-tie", "mr-icon"], [1, "cat-chip"], [1, "mono", "amt-cell"], ["colspan", "2"], [1, "mono"]], template: function DashboardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
            i0.ɵɵtext(4, "Dashboard for real time credit card fraud detection");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p", 3);
            i0.ɵɵtext(6, "This dashboard assists banking companies to detect and prevent credit card frauds effectively. It includes fraud transactions by category, location, date, merchants etc.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 4)(8, "span", 5);
            i0.ɵɵelement(9, "i", 6);
            i0.ɵɵtext(10, " Live");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "span", 7);
            i0.ɵɵelement(12, "i", 8);
            i0.ɵɵtext(13, " 4 Alerts");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(14, "div", 9)(15, "div", 10)(16, "div", 11);
            i0.ɵɵelement(17, "i", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "div")(19, "div", 13);
            i0.ɵɵtext(20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "div", 14);
            i0.ɵɵtext(22, "Fraudulent Transactions");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "div", 15)(24, "span", 16);
            i0.ɵɵtext(25, "High Risk");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(26, "div", 17)(27, "div", 18);
            i0.ɵɵelement(28, "i", 19);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "div")(30, "div", 13);
            i0.ɵɵtext(31);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "div", 14);
            i0.ɵɵtext(33, "% Fraudulent Transactions");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "div", 15);
            i0.ɵɵtext(35, "of all card transactions");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(36, "div", 20)(37, "div", 21);
            i0.ɵɵelement(38, "i", 22);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "div")(40, "div", 13);
            i0.ɵɵtext(41);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(42, "div", 14);
            i0.ɵɵtext(43, "Total Fraud Transactions Amount");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "div", 15);
            i0.ɵɵtext(45, "USD across all categories");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(46, "div", 23)(47, "div", 24)(48, "div", 25)(49, "div", 26);
            i0.ɵɵelement(50, "i", 27);
            i0.ɵɵtext(51, " Fraudulent transactions by location");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(52, "div", 28);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(53, "svg", 29)(54, "defs")(55, "linearGradient", 30);
            i0.ɵɵelement(56, "stop", 31)(57, "stop", 32);
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(58, "rect", 33)(59, "rect", 34)(60, "rect", 35);
            i0.ɵɵelementStart(61, "text", 36);
            i0.ɵɵtext(62, "Montana");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(63, "rect", 37)(64, "rect", 38)(65, "rect", 39)(66, "rect", 40)(67, "rect", 41)(68, "rect", 42)(69, "rect", 43);
            i0.ɵɵelementStart(70, "text", 44);
            i0.ɵɵtext(71, "Illinois");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(72, "rect", 45);
            i0.ɵɵelementStart(73, "text", 46);
            i0.ɵɵtext(74, "MS");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(75, "rect", 47)(76, "rect", 48)(77, "rect", 49)(78, "rect", 50)(79, "rect", 51)(80, "rect", 52)(81, "rect", 53)(82, "rect", 54)(83, "rect", 55)(84, "rect", 56)(85, "rect", 57);
            i0.ɵɵelementStart(86, "text", 58);
            i0.ɵɵtext(87, "1");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(88, "text", 59);
            i0.ɵɵtext(89, "7");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(90, "div", 60)(91, "div", 25)(92, "div", 26);
            i0.ɵɵelement(93, "i", 61);
            i0.ɵɵtext(94, " Fraud percentage by category");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(95, "div", 62);
            i0.ɵɵelement(96, "p-chart", 63);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(97, "div", 64)(98, "div", 25)(99, "div", 26);
            i0.ɵɵelement(100, "i", 65);
            i0.ɵɵtext(101, " Average fraud percentage by date");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(102, "div", 62);
            i0.ɵɵelement(103, "p-chart", 66);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(104, "div", 67)(105, "div", 68)(106, "div", 25)(107, "div", 26);
            i0.ɵɵelement(108, "i", 69);
            i0.ɵɵtext(109, " Fraud percentage by risk");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(110, "div", 70);
            i0.ɵɵelement(111, "p-chart", 71);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(112, "div", 72)(113, "div", 25)(114, "div", 26);
            i0.ɵɵelement(115, "i", 73);
            i0.ɵɵtext(116, " Fraudulent transactions at merchant");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(117, "span", 74);
            i0.ɵɵtext(118);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(119, "div", 75)(120, "p-table", 76);
            i0.ɵɵtemplate(121, DashboardComponent_ng_template_121_Template, 9, 0, "ng-template", 77)(122, DashboardComponent_ng_template_122_Template, 12, 4, "ng-template", 78)(123, DashboardComponent_ng_template_123_Template, 10, 2, "ng-template", 79);
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            let tmp_2_0;
            i0.ɵɵadvance(20);
            i0.ɵɵtextInterpolate1("", ctx.stats == null ? null : ctx.stats.fraudulentTransactions, ".0");
            i0.ɵɵadvance(11);
            i0.ɵɵtextInterpolate1("", ctx.stats == null ? null : ctx.stats.fraudPercentage == null ? null : ctx.stats.fraudPercentage.toFixed(1), "%");
            i0.ɵɵadvance(10);
            i0.ɵɵtextInterpolate(ctx.formatAmt((tmp_2_0 = ctx.stats == null ? null : ctx.stats.totalFraudAmount) !== null && tmp_2_0 !== undefined ? tmp_2_0 : 0));
            i0.ɵɵadvance(55);
            i0.ɵɵproperty("data", ctx.hBarChartData)("options", ctx.hBarOpts);
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("data", ctx.lineChartData)("options", ctx.lineOpts);
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("data", ctx.barChartData)("options", ctx.barOpts);
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate1("", ctx.merchants.length, " records");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("value", ctx.merchants)("scrollable", true);
        } }, dependencies: [CommonModule, ChartModule, i2.UIChart, TableModule, i3.Table, i4.PrimeTemplate, TagModule, SkeletonModule], styles: [".dash-header[_ngcontent-%COMP%] {\n  display: flex; justify-content: space-between; align-items: flex-start;\n  margin-bottom: 20px; gap: 16px; flex-wrap: wrap;\n  .page-title { font-size: 1.25rem; }\n  .page-sub   { font-size: 12px; color: var(--text-secondary); max-width: 680px; margin-top: 4px; line-height: 1.5; }\n}\n.dash-header-actions[_ngcontent-%COMP%] { display: flex; gap: 8px; flex-shrink: 0; padding-top: 4px; }\n.header-badge[_ngcontent-%COMP%] {\n  display: flex; align-items: center; gap: 6px;\n  padding: 5px 12px; border-radius: 100px; font-size: 12px; font-weight: 600;\n  background: #e8f5e9; color: #2e7d32; border: 1px solid #c8e6c9;\n  i { font-size: 12px; }\n  &.warn { background: #fff3e0; color: #e65100; border-color: #ffe0b2; }\n}\n\n.kpi-row[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 20px; }\n\n.grid-3[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 20px; }\n.grid-2[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 20px; }\n\n.map-wrap[_ngcontent-%COMP%] { position: relative; height: 290px; display: flex; align-items: center; justify-content: center; }\n.usa-svg[_ngcontent-%COMP%]  { width: 100%; height: 100%; }\n\n.merchant-name-cell[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 6px; font-weight: 500; }\n.mr-icon[_ngcontent-%COMP%] { color: var(--text-muted); font-size: 12px; }\n.cat-chip[_ngcontent-%COMP%] { background: var(--primary-bg); color: var(--primary-dark); border-radius: 6px; padding: 2px 8px; font-size: 11px; font-weight: 500; white-space: nowrap; }\n.amt-cell[_ngcontent-%COMP%] { color: var(--primary-dark); font-weight: 600; }\n\n//[_ngcontent-%COMP%]   Responsive\n@media[_ngcontent-%COMP%]   (max-width[_ngcontent-%COMP%]: 1100px) {\n  .grid-3 { grid-template-columns: repeat(2, 1fr); .map-card { grid-column: 1 / -1; } }\n}\n@media (max-width: 900px) {\n  .kpi-row[_ngcontent-%COMP%]  { grid-template-columns: 1fr; }\n  .grid-2[_ngcontent-%COMP%]   { grid-template-columns: 1fr; }\n}\n@media (max-width: 680px) {\n  .grid-3[_ngcontent-%COMP%] { grid-template-columns: 1fr; }\n  .dash-header[_ngcontent-%COMP%] { flex-direction: column; }\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DashboardComponent, [{
        type: Component,
        args: [{ selector: 'app-dashboard', standalone: true, imports: [CommonModule, ChartModule, TableModule, TagModule, SkeletonModule], template: "<div class=\"page-wrapper\">\n  <div class=\"dash-header fade-in-up\">\n    <div>\n      <h1 class=\"page-title\">Dashboard for real time credit card fraud detection</h1>\n      <p class=\"page-sub\">This dashboard assists banking companies to detect and prevent credit card frauds effectively. It includes fraud transactions by category, location, date, merchants etc.</p>\n    </div>\n    <div class=\"dash-header-actions\">\n      <span class=\"header-badge\"><i class=\"fas fa-circle-check\"></i> Live</span>\n      <span class=\"header-badge warn\"><i class=\"fas fa-triangle-exclamation\"></i> 4 Alerts</span>\n    </div>\n  </div>\n\n  <!-- KPI Row -->\n  <div class=\"kpi-row\">\n    <div class=\"kpi-card fade-in-up d1\">\n      <div class=\"kpi-icon teal\"><i class=\"fas fa-credit-card\"></i></div>\n      <div>\n        <div class=\"kpi-value\">{{ stats?.fraudulentTransactions }}.0</div>\n        <div class=\"kpi-label\">Fraudulent Transactions</div>\n        <div class=\"kpi-sub\"><span class=\"badge badge-danger\">High Risk</span></div>\n      </div>\n    </div>\n    <div class=\"kpi-card fade-in-up d2\">\n      <div class=\"kpi-icon orange\"><i class=\"fas fa-percent\"></i></div>\n      <div>\n        <div class=\"kpi-value\">{{ stats?.fraudPercentage?.toFixed(1) }}%</div>\n        <div class=\"kpi-label\">% Fraudulent Transactions</div>\n        <div class=\"kpi-sub\">of all card transactions</div>\n      </div>\n    </div>\n    <div class=\"kpi-card fade-in-up d3\">\n      <div class=\"kpi-icon red\"><i class=\"fas fa-sack-dollar\"></i></div>\n      <div>\n        <div class=\"kpi-value\">{{ formatAmt(stats?.totalFraudAmount ?? 0) }}</div>\n        <div class=\"kpi-label\">Total Fraud Transactions Amount</div>\n        <div class=\"kpi-sub\">USD across all categories</div>\n      </div>\n    </div>\n  </div>\n\n  <!-- Row 2 -->\n  <div class=\"grid-3\">\n    <!-- Map -->\n    <div class=\"chart-card map-card fade-in-up d1\">\n      <div class=\"chart-card-header\">\n        <div class=\"chart-card-title\"><i class=\"fas fa-map-location-dot\"></i> Fraudulent transactions by location</div>\n      </div>\n      <div class=\"map-wrap\">\n        <svg viewBox=\"0 0 560 340\" xmlns=\"http://www.w3.org/2000/svg\" class=\"usa-svg\">\n          <defs>\n            <linearGradient id=\"mapGrad\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"0\">\n              <stop offset=\"0%\" stop-color=\"#e0f2f1\"/><stop offset=\"100%\" stop-color=\"#00695c\"/>\n            </linearGradient>\n          </defs>\n          <!-- Background -->\n          <rect x=\"5\" y=\"5\" width=\"550\" height=\"295\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#e2e8f0\"/>\n          <!-- NW region -->\n          <rect x=\"15\"  y=\"15\"  width=\"65\" height=\"120\" rx=\"3\" fill=\"#e0f2f1\" stroke=\"#b2dfdb\" stroke-width=\"0.5\"/>\n          <!-- Montana (highest fraud) -->\n          <rect x=\"85\"  y=\"15\"  width=\"95\" height=\"65\"  rx=\"3\" fill=\"#00695c\" stroke=\"#004d40\"/>\n          <text x=\"132\" y=\"51\" text-anchor=\"middle\" font-size=\"9\" fill=\"white\" font-weight=\"700\">Montana</text>\n          <!-- ID/WY -->\n          <rect x=\"85\"  y=\"84\"  width=\"95\" height=\"51\"  rx=\"3\" fill=\"#e0f2f1\" stroke=\"#b2dfdb\" stroke-width=\"0.5\"/>\n          <!-- ND/SD/NE -->\n          <rect x=\"185\" y=\"15\"  width=\"75\" height=\"55\"  rx=\"3\" fill=\"#e0f2f1\" stroke=\"#b2dfdb\" stroke-width=\"0.5\"/>\n          <rect x=\"185\" y=\"74\"  width=\"75\" height=\"55\"  rx=\"3\" fill=\"#e0f2f1\" stroke=\"#b2dfdb\" stroke-width=\"0.5\"/>\n          <rect x=\"185\" y=\"133\" width=\"75\" height=\"55\"  rx=\"3\" fill=\"#e0f2f1\" stroke=\"#b2dfdb\" stroke-width=\"0.5\"/>\n          <!-- MN/IA -->\n          <rect x=\"265\" y=\"15\"  width=\"60\" height=\"60\"  rx=\"3\" fill=\"#e0f2f1\" stroke=\"#b2dfdb\" stroke-width=\"0.5\"/>\n          <rect x=\"265\" y=\"79\"  width=\"60\" height=\"55\"  rx=\"3\" fill=\"#e0f2f1\" stroke=\"#b2dfdb\" stroke-width=\"0.5\"/>\n          <!-- Illinois (medium fraud) -->\n          <rect x=\"300\" y=\"100\" width=\"50\" height=\"80\"  rx=\"3\" fill=\"#009688\" stroke=\"#00695c\" opacity=\"0.85\"/>\n          <text x=\"325\" y=\"143\" text-anchor=\"middle\" font-size=\"8\" fill=\"white\" font-weight=\"700\">Illinois</text>\n          <!-- Mississippi (high fraud) -->\n          <rect x=\"300\" y=\"185\" width=\"45\" height=\"65\"  rx=\"3\" fill=\"#00897b\" stroke=\"#00695c\" opacity=\"0.9\"/>\n          <text x=\"322\" y=\"221\" text-anchor=\"middle\" font-size=\"8\" fill=\"white\" font-weight=\"700\">MS</text>\n          <!-- East coast states -->\n          <rect x=\"355\" y=\"15\"  width=\"50\" height=\"80\"  rx=\"3\" fill=\"#e0f2f1\" stroke=\"#b2dfdb\" stroke-width=\"0.5\"/>\n          <rect x=\"355\" y=\"99\"  width=\"50\" height=\"80\"  rx=\"3\" fill=\"#e0f2f1\" stroke=\"#b2dfdb\" stroke-width=\"0.5\"/>\n          <rect x=\"355\" y=\"183\" width=\"50\" height=\"65\"  rx=\"3\" fill=\"#e0f2f1\" stroke=\"#b2dfdb\" stroke-width=\"0.5\"/>\n          <rect x=\"410\" y=\"15\"  width=\"55\" height=\"100\" rx=\"3\" fill=\"#e0f2f1\" stroke=\"#b2dfdb\" stroke-width=\"0.5\"/>\n          <rect x=\"410\" y=\"119\" width=\"55\" height=\"90\"  rx=\"3\" fill=\"#e0f2f1\" stroke=\"#b2dfdb\" stroke-width=\"0.5\"/>\n          <rect x=\"470\" y=\"15\"  width=\"75\" height=\"100\" rx=\"3\" fill=\"#e0f2f1\" stroke=\"#b2dfdb\" stroke-width=\"0.5\"/>\n          <rect x=\"470\" y=\"119\" width=\"75\" height=\"80\"  rx=\"3\" fill=\"#e0f2f1\" stroke=\"#b2dfdb\" stroke-width=\"0.5\"/>\n          <!-- Florida -->\n          <rect x=\"380\" y=\"252\" width=\"55\" height=\"45\"  rx=\"3\" fill=\"#e0f2f1\" stroke=\"#b2dfdb\" stroke-width=\"0.5\"/>\n          <!-- Texas -->\n          <rect x=\"195\" y=\"192\" width=\"95\" height=\"90\"  rx=\"3\" fill=\"#e0f2f1\" stroke=\"#b2dfdb\" stroke-width=\"0.5\"/>\n          <!-- California -->\n          <rect x=\"15\" y=\"60\"  width=\"65\" height=\"120\" rx=\"3\" fill=\"#e0f2f1\" stroke=\"#b2dfdb\" stroke-width=\"0.5\"/>\n          <!-- Legend -->\n          <rect x=\"15\" y=\"310\" width=\"120\" height=\"8\" rx=\"4\" fill=\"url(#mapGrad)\"/>\n          <text x=\"15\"  y=\"328\" font-size=\"9\" fill=\"#64748b\">1</text>\n          <text x=\"128\" y=\"328\" font-size=\"9\" fill=\"#64748b\">7</text>\n        </svg>\n      </div>\n    </div>\n\n    <!-- Horizontal bar chart -->\n    <div class=\"chart-card fade-in-up d2\">\n      <div class=\"chart-card-header\">\n        <div class=\"chart-card-title\"><i class=\"fas fa-chart-bar\"></i> Fraud percentage by category</div>\n      </div>\n      <div style=\"height:290px\">\n        <p-chart type=\"bar\" [data]=\"hBarChartData\" [options]=\"hBarOpts\" height=\"290\"></p-chart>\n      </div>\n    </div>\n\n    <!-- Line chart -->\n    <div class=\"chart-card fade-in-up d3\">\n      <div class=\"chart-card-header\">\n        <div class=\"chart-card-title\"><i class=\"fas fa-chart-line\"></i> Average fraud percentage by date</div>\n      </div>\n      <div style=\"height:290px\">\n        <p-chart type=\"line\" [data]=\"lineChartData\" [options]=\"lineOpts\" height=\"290\"></p-chart>\n      </div>\n    </div>\n  </div>\n\n  <!-- Row 3 -->\n  <div class=\"grid-2\">\n    <!-- Stacked bar -->\n    <div class=\"chart-card fade-in-up d4\">\n      <div class=\"chart-card-header\">\n        <div class=\"chart-card-title\"><i class=\"fas fa-chart-column\"></i> Fraud percentage by risk</div>\n      </div>\n      <div style=\"height:260px\">\n        <p-chart type=\"bar\" [data]=\"barChartData\" [options]=\"barOpts\" height=\"260\"></p-chart>\n      </div>\n    </div>\n\n    <!-- Merchant table -->\n    <div class=\"chart-card fade-in-up d5\">\n      <div class=\"chart-card-header\">\n        <div class=\"chart-card-title\"><i class=\"fas fa-store\"></i> Fraudulent transactions at merchant</div>\n        <span class=\"badge badge-teal\">{{ merchants.length }} records</span>\n      </div>\n      <div class=\"table-responsive\">\n        <p-table [value]=\"merchants\" [scrollable]=\"true\" scrollHeight=\"220px\">\n          <ng-template pTemplate=\"header\">\n            <tr>\n              <th>Merchant name</th>\n              <th>Category</th>\n              <th>Fraud amount</th>\n              <th style=\"text-align:center\">Number of frauds</th>\n            </tr>\n          </ng-template>\n          <ng-template pTemplate=\"body\" let-m>\n            <tr>\n              <td class=\"merchant-name-cell\"><i class=\"fas fa-user-tie mr-icon\"></i>{{ m.merchantName }}</td>\n              <td><span class=\"cat-chip\">{{ m.category }}</span></td>\n              <td class=\"mono amt-cell\">{{ formatAmt(m.fraudAmount) }}</td>\n              <td style=\"text-align:center\"><span class=\"badge badge-danger\">{{ m.numberOfFrauds }}</span></td>\n            </tr>\n          </ng-template>\n          <ng-template pTemplate=\"footer\">\n            <tr>\n              <td colspan=\"2\"><strong>Grand total</strong></td>\n              <td class=\"mono\"><strong>{{ formatAmt(grandTotal()) }}</strong></td>\n              <td style=\"text-align:center\"><strong>{{ grandCount() }}</strong></td>\n            </tr>\n          </ng-template>\n        </p-table>\n      </div>\n    </div>\n  </div>\n</div>\n", styles: [".dash-header {\n  display: flex; justify-content: space-between; align-items: flex-start;\n  margin-bottom: 20px; gap: 16px; flex-wrap: wrap;\n  .page-title { font-size: 1.25rem; }\n  .page-sub   { font-size: 12px; color: var(--text-secondary); max-width: 680px; margin-top: 4px; line-height: 1.5; }\n}\n.dash-header-actions { display: flex; gap: 8px; flex-shrink: 0; padding-top: 4px; }\n.header-badge {\n  display: flex; align-items: center; gap: 6px;\n  padding: 5px 12px; border-radius: 100px; font-size: 12px; font-weight: 600;\n  background: #e8f5e9; color: #2e7d32; border: 1px solid #c8e6c9;\n  i { font-size: 12px; }\n  &.warn { background: #fff3e0; color: #e65100; border-color: #ffe0b2; }\n}\n\n.kpi-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 20px; }\n\n.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 20px; }\n.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 20px; }\n\n.map-wrap { position: relative; height: 290px; display: flex; align-items: center; justify-content: center; }\n.usa-svg  { width: 100%; height: 100%; }\n\n.merchant-name-cell { display: flex; align-items: center; gap: 6px; font-weight: 500; }\n.mr-icon { color: var(--text-muted); font-size: 12px; }\n.cat-chip { background: var(--primary-bg); color: var(--primary-dark); border-radius: 6px; padding: 2px 8px; font-size: 11px; font-weight: 500; white-space: nowrap; }\n.amt-cell { color: var(--primary-dark); font-weight: 600; }\n\n// Responsive\n@media (max-width: 1100px) {\n  .grid-3 { grid-template-columns: repeat(2, 1fr); .map-card { grid-column: 1 / -1; } }\n}\n@media (max-width: 900px) {\n  .kpi-row  { grid-template-columns: 1fr; }\n  .grid-2   { grid-template-columns: 1fr; }\n}\n@media (max-width: 680px) {\n  .grid-3 { grid-template-columns: 1fr; }\n  .dash-header { flex-direction: column; }\n}\n"] }]
    }], () => [{ type: i1.FraudService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "src/app/pages/dashboard/dashboard.component.ts", lineNumber: 19 }); })();
//# sourceMappingURL=dashboard.component.js.map