import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { forkJoin } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../../core/services/fraud.service";
import * as i2 from "@angular/common";
import * as i3 from "primeng/chart";
function AnalyticsComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 22)(1, "div", 23);
    i0.ɵɵelement(2, "i");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div")(4, "div", 24);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 25);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 26);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const k_r1 = ctx.$implicit;
    const i_r2 = ctx.index;
    i0.ɵɵproperty("ngClass", "d" + (i_r2 + 1));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", k_r1.color);
    i0.ɵɵadvance();
    i0.ɵɵclassMap(k_r1.icon);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(k_r1.value);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(k_r1.label);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("up-text", k_r1.up)("neutral-text", !k_r1.up);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(k_r1.change);
} }
export class AnalyticsComponent {
    constructor(svc) {
        this.svc = svc;
        this.kpis = [
            { label: 'Avg Fraud Amount', value: '$526', change: '+8.4%', up: true, icon: 'fas fa-sack-dollar', color: 'teal' },
            { label: 'Peak Fraud Day', value: 'Dec 21', change: 'Highest spike', up: false, icon: 'fas fa-calendar-exclamation', color: 'orange' },
            { label: 'Top Category', value: 'Grocery', change: '10% share', up: true, icon: 'fas fa-basket-shopping', color: 'green' },
            { label: 'False Positive Rate', value: '0.8%', change: '-0.2% better', up: true, icon: 'fas fa-shield-check', color: 'blue' },
        ];
    }
    ngOnInit() {
        forkJoin({
            daily: this.svc.getDailyFraudData(),
            categories: this.svc.getCategoryFraudData()
        }).subscribe({
            next: ({ daily, categories }) => this.buildCharts(daily, categories),
            error: () => this.buildCharts(this.svc.getMockDailyData(), this.svc.getMockCategoryData())
        });
    }
    buildCharts(daily, cats) {
        const teal = '#009688';
        const grid = 'rgba(0,0,0,0.05)';
        this.trendData = {
            labels: daily.map(d => d.date),
            datasets: [
                { label: 'High Risk', data: daily.map(d => d.highRisk), borderColor: '#ef5350', backgroundColor: 'rgba(239,83,80,0.08)', fill: true, tension: 0.4, borderWidth: 2, pointRadius: 3 },
                { label: 'Medium Risk', data: daily.map(d => d.mediumRisk), borderColor: teal, backgroundColor: 'rgba(0,150,136,0.06)', fill: true, tension: 0.4, borderWidth: 2, pointRadius: 3 }
            ]
        };
        this.trendOpts = {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { position: 'top', labels: { font: { size: 11 }, usePointStyle: true } } },
            scales: { x: { grid: { color: grid }, ticks: { font: { size: 10 }, color: '#94a3b8', maxRotation: 0 } }, y: { grid: { color: grid }, ticks: { font: { size: 10 }, color: '#94a3b8' } } }
        };
        this.pieData = {
            labels: cats.slice(0, 6).map(c => c.category),
            datasets: [{ data: cats.slice(0, 6).map(c => c.percentage), backgroundColor: ['#009688', '#4db6ac', '#80cbc4', '#ef5350', '#ff9800', '#2196f3'], borderWidth: 2, borderColor: '#fff', hoverOffset: 6 }]
        };
        this.pieOpts = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { font: { size: 11 }, usePointStyle: true, padding: 12 } } } };
        this.radarData = {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                { label: 'High Risk', data: [65, 72, 58, 84, 96, 45, 38], borderColor: '#ef5350', backgroundColor: 'rgba(239,83,80,0.12)', borderWidth: 2 },
                { label: 'Medium Risk', data: [55, 62, 50, 74, 80, 40, 30], borderColor: teal, backgroundColor: 'rgba(0,150,136,0.10)', borderWidth: 2 }
            ]
        };
        this.radarOpts = { responsive: true, maintainAspectRatio: false, scales: { r: { grid: { color: grid }, ticks: { color: '#94a3b8', backdropColor: 'transparent', font: { size: 10 } }, pointLabels: { color: '#475569', font: { size: 11 } } } }, plugins: { legend: { position: 'top', labels: { font: { size: 11 }, usePointStyle: true } } } };
        this.polarData = {
            labels: cats.slice(0, 6).map(c => c.category),
            datasets: [{ data: cats.slice(0, 6).map(c => c.percentage), backgroundColor: ['rgba(0,150,136,0.7)', 'rgba(77,182,172,0.7)', 'rgba(128,203,196,0.7)', 'rgba(239,83,80,0.7)', 'rgba(255,152,0,0.7)', 'rgba(33,150,243,0.7)'] }]
        };
        this.polarOpts = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { font: { size: 11 }, usePointStyle: true } } } };
    }
    static { this.ɵfac = function AnalyticsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AnalyticsComponent)(i0.ɵɵdirectiveInject(i1.FraudService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AnalyticsComponent, selectors: [["app-analytics"]], decls: 38, vars: 9, consts: [[1, "page-wrapper"], [1, "page-header", "fade-in-up"], [1, "page-title"], [1, "page-sub"], [1, "kpi-row-4"], ["class", "kpi-card fade-in-up", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "chart-card", "fade-in-up", "d2", 2, "margin-bottom", "16px"], [1, "chart-card-header"], [1, "chart-card-title"], [1, "fas", "fa-chart-area"], [2, "height", "260px"], ["type", "line", "height", "260", 3, "data", "options"], [1, "analytics-grid"], [1, "chart-card", "fade-in-up", "d3"], [1, "fas", "fa-chart-pie"], ["type", "doughnut", "height", "260", 3, "data", "options"], [1, "chart-card", "fade-in-up", "d4"], [1, "fas", "fa-spider"], ["type", "radar", "height", "260", 3, "data", "options"], [1, "chart-card", "fade-in-up", "d5"], [1, "fas", "fa-chart-scatter"], ["type", "polarArea", "height", "260", 3, "data", "options"], [1, "kpi-card", "fade-in-up", 3, "ngClass"], [1, "kpi-icon", 3, "ngClass"], [1, "kpi-value"], [1, "kpi-label"], [1, "kpi-sub"]], template: function AnalyticsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
            i0.ɵɵtext(4, "Fraud Analytics");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p", 3);
            i0.ɵɵtext(6, "Deep-dive into fraud patterns, trends, and risk distribution across time and categories");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(7, "div", 4);
            i0.ɵɵtemplate(8, AnalyticsComponent_div_8_Template, 10, 11, "div", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "div", 6)(10, "div", 7)(11, "div", 8);
            i0.ɵɵelement(12, "i", 9);
            i0.ɵɵtext(13, " Risk Level Trend \u2014 Dec 20\u201331");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "div", 10);
            i0.ɵɵelement(15, "p-chart", 11);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(16, "div", 12)(17, "div", 13)(18, "div", 7)(19, "div", 8);
            i0.ɵɵelement(20, "i", 14);
            i0.ɵɵtext(21, " Fraud by Category (Doughnut)");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(22, "div", 10);
            i0.ɵɵelement(23, "p-chart", 15);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(24, "div", 16)(25, "div", 7)(26, "div", 8);
            i0.ɵɵelement(27, "i", 17);
            i0.ɵɵtext(28, " Weekly Risk Pattern (Radar)");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(29, "div", 10);
            i0.ɵɵelement(30, "p-chart", 18);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(31, "div", 19)(32, "div", 7)(33, "div", 8);
            i0.ɵɵelement(34, "i", 20);
            i0.ɵɵtext(35, " Category Distribution (Polar)");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(36, "div", 10);
            i0.ɵɵelement(37, "p-chart", 21);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("ngForOf", ctx.kpis);
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("data", ctx.trendData)("options", ctx.trendOpts);
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("data", ctx.pieData)("options", ctx.pieOpts);
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("data", ctx.radarData)("options", ctx.radarOpts);
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("data", ctx.polarData)("options", ctx.polarOpts);
        } }, dependencies: [CommonModule, i2.NgClass, i2.NgForOf, ChartModule, i3.UIChart], styles: [".page-header[_ngcontent-%COMP%] { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }\n.kpi-row-4[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 20px; }\n.analytics-grid[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 20px; }\n.up-text[_ngcontent-%COMP%]      { color: var(--success); font-weight: 600; }\n.neutral-text[_ngcontent-%COMP%] { color: var(--text-muted); }\n@media (max-width: 1100px) { .kpi-row-4[_ngcontent-%COMP%] { grid-template-columns: repeat(2, 1fr); } .analytics-grid[_ngcontent-%COMP%] { grid-template-columns: 1fr 1fr; } }\n@media (max-width: 700px)  { .kpi-row-4[_ngcontent-%COMP%] { grid-template-columns: 1fr; } .analytics-grid[_ngcontent-%COMP%] { grid-template-columns: 1fr; } }"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AnalyticsComponent, [{
        type: Component,
        args: [{ selector: 'app-analytics', standalone: true, imports: [CommonModule, ChartModule], template: "<div class=\"page-wrapper\">\n  <div class=\"page-header fade-in-up\">\n    <div>\n      <h1 class=\"page-title\">Fraud Analytics</h1>\n      <p class=\"page-sub\">Deep-dive into fraud patterns, trends, and risk distribution across time and categories</p>\n    </div>\n  </div>\n\n  <!-- KPIs -->\n  <div class=\"kpi-row-4\">\n    <div class=\"kpi-card fade-in-up\" *ngFor=\"let k of kpis; let i = index\" [ngClass]=\"'d' + (i+1)\">\n      <div class=\"kpi-icon\" [ngClass]=\"k.color\"><i [class]=\"k.icon\"></i></div>\n      <div>\n        <div class=\"kpi-value\">{{ k.value }}</div>\n        <div class=\"kpi-label\">{{ k.label }}</div>\n        <div class=\"kpi-sub\" [class.up-text]=\"k.up\" [class.neutral-text]=\"!k.up\">{{ k.change }}</div>\n      </div>\n    </div>\n  </div>\n\n  <!-- Trend chart -->\n  <div class=\"chart-card fade-in-up d2\" style=\"margin-bottom:16px\">\n    <div class=\"chart-card-header\">\n      <div class=\"chart-card-title\"><i class=\"fas fa-chart-area\"></i> Risk Level Trend \u2014 Dec 20\u201331</div>\n    </div>\n    <div style=\"height:260px\">\n      <p-chart type=\"line\" [data]=\"trendData\" [options]=\"trendOpts\" height=\"260\"></p-chart>\n    </div>\n  </div>\n\n  <!-- Bottom charts grid -->\n  <div class=\"analytics-grid\">\n    <div class=\"chart-card fade-in-up d3\">\n      <div class=\"chart-card-header\"><div class=\"chart-card-title\"><i class=\"fas fa-chart-pie\"></i> Fraud by Category (Doughnut)</div></div>\n      <div style=\"height:260px\"><p-chart type=\"doughnut\" [data]=\"pieData\" [options]=\"pieOpts\" height=\"260\"></p-chart></div>\n    </div>\n    <div class=\"chart-card fade-in-up d4\">\n      <div class=\"chart-card-header\"><div class=\"chart-card-title\"><i class=\"fas fa-spider\"></i> Weekly Risk Pattern (Radar)</div></div>\n      <div style=\"height:260px\"><p-chart type=\"radar\" [data]=\"radarData\" [options]=\"radarOpts\" height=\"260\"></p-chart></div>\n    </div>\n    <div class=\"chart-card fade-in-up d5\">\n      <div class=\"chart-card-header\"><div class=\"chart-card-title\"><i class=\"fas fa-chart-scatter\"></i> Category Distribution (Polar)</div></div>\n      <div style=\"height:260px\"><p-chart type=\"polarArea\" [data]=\"polarData\" [options]=\"polarOpts\" height=\"260\"></p-chart></div>\n    </div>\n  </div>\n</div>\n", styles: [".page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }\n.kpi-row-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 20px; }\n.analytics-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 20px; }\n.up-text      { color: var(--success); font-weight: 600; }\n.neutral-text { color: var(--text-muted); }\n@media (max-width: 1100px) { .kpi-row-4 { grid-template-columns: repeat(2, 1fr); } .analytics-grid { grid-template-columns: 1fr 1fr; } }\n@media (max-width: 700px)  { .kpi-row-4 { grid-template-columns: 1fr; } .analytics-grid { grid-template-columns: 1fr; } }\n"] }]
    }], () => [{ type: i1.FraudService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AnalyticsComponent, { className: "AnalyticsComponent", filePath: "src/app/pages/analytics/analytics.component.ts", lineNumber: 15 }); })();
//# sourceMappingURL=analytics.component.js.map