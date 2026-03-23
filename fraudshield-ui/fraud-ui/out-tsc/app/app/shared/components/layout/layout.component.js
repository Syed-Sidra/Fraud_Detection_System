import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TooltipModule } from 'primeng/tooltip';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@angular/common";
import * as i3 from "primeng/overlaypanel";
import * as i4 from "primeng/tooltip";
function LayoutComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 60);
    i0.ɵɵlistener("click", function LayoutComponent_div_0_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeMobile()); });
    i0.ɵɵelementEnd();
} }
function LayoutComponent_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 61)(1, "span", 62);
    i0.ɵɵtext(2, "FraudShield");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 63);
    i0.ɵɵtext(4, "v2.0");
    i0.ɵɵelementEnd()();
} }
function LayoutComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64);
    i0.ɵɵtext(1, "NAVIGATION");
    i0.ɵɵelementEnd();
} }
function LayoutComponent_a_9_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 67);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r5 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r5.label);
} }
function LayoutComponent_a_9_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 68);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r5 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r5.badge);
} }
function LayoutComponent_a_9_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 65);
    i0.ɵɵlistener("click", function LayoutComponent_a_9_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeMobile()); });
    i0.ɵɵelementStart(1, "span", 14);
    i0.ɵɵelement(2, "i");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, LayoutComponent_a_9_span_3_Template, 2, 1, "span", 16)(4, LayoutComponent_a_9_span_4_Template, 2, 1, "span", 66);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("routerLink", item_r5.route)("pTooltip", ctx_r2.collapsed() ? item_r5.label : "");
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(item_r5.icon);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r2.collapsed());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", item_r5.badge && !ctx_r2.collapsed());
} }
function LayoutComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64);
    i0.ɵɵtext(1, "ACCOUNT");
    i0.ɵɵelementEnd();
} }
function LayoutComponent_span_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 67);
    i0.ɵɵtext(1, "Logout");
    i0.ɵɵelementEnd();
} }
function LayoutComponent_div_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 69)(1, "div", 70);
    i0.ɵɵtext(2, "AD");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 71)(4, "div", 72);
    i0.ɵɵtext(5, "Admin User");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 73);
    i0.ɵɵtext(7, "Fraud Analyst");
    i0.ɵɵelementEnd()()();
} }
function LayoutComponent_div_59_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 74)(1, "div", 75);
    i0.ɵɵelement(2, "i", 19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 76)(4, "div", 77);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 78);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 79);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const a_r8 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassMap("notif-" + a_r8.type);
    i0.ɵɵadvance();
    i0.ɵɵclassMap("notif-icon-" + a_r8.type);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r2.alertIcon(a_r8.type));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(a_r8.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(a_r8.msg);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(a_r8.time);
} }
export class LayoutComponent {
    constructor(router) {
        this.router = router;
        this.collapsed = signal(false);
        this.mobileOpen = signal(false);
        this.isMobile = signal(false);
        this.navItems = [
            { label: 'Dashboard', icon: 'fas fa-chart-pie', route: '/app/dashboard' },
            { label: 'Transactions', icon: 'fas fa-credit-card', route: '/app/transactions', badge: 19 },
            { label: 'Analytics', icon: 'fas fa-chart-mixed', route: '/app/analytics' },
            { label: 'Simulation', icon: 'fas fa-flask-vial', route: '/app/simulation' },
        ];
        this.alerts = [
            { type: 'danger', title: 'High-risk transaction', msg: 'Peter Wills — $1,300 Shopping_pos', time: '2 min ago' },
            { type: 'warning', title: 'Unusual activity pattern', msg: 'Multiple transactions from Montana', time: '15 min ago' },
            { type: 'info', title: 'Daily fraud report ready', msg: '19 fraudulent transactions flagged', time: '1 hr ago' },
            { type: 'success', title: 'Model retrained', msg: 'Accuracy improved to 99.2%', time: '3 hrs ago' },
        ];
        this.checkMobile();
    }
    onResize() { this.checkMobile(); }
    checkMobile() {
        this.isMobile.set(window.innerWidth < 768);
    }
    toggleSidebar() { this.collapsed.update(v => !v); }
    toggleMobile() { this.mobileOpen.update(v => !v); }
    closeMobile() { this.mobileOpen.set(false); }
    logout() { this.router.navigate(['/auth/login']); }
    alertIcon(type) {
        const m = { danger: 'fa-triangle-exclamation', warning: 'fa-circle-exclamation', info: 'fa-circle-info', success: 'fa-circle-check' };
        return m[type] ?? 'fa-bell';
    }
    static { this.ɵfac = function LayoutComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LayoutComponent)(i0.ɵɵdirectiveInject(i1.Router)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LayoutComponent, selectors: [["app-layout"]], hostBindings: function LayoutComponent_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("resize", function LayoutComponent_resize_HostBindingHandler() { return ctx.onResize(); }, false, i0.ɵɵresolveWindow);
        } }, decls: 85, vars: 15, consts: [["alertPanel", ""], ["userPanel", ""], ["class", "mobile-overlay", 3, "click", 4, "ngIf"], [1, "app-shell"], [1, "sidebar"], [1, "sidebar-brand"], [1, "brand-icon"], [1, "fas", "fa-shield-halved"], ["class", "brand-text", 4, "ngIf"], ["class", "nav-section-label", 4, "ngIf"], [1, "sidebar-nav"], ["class", "nav-item", "routerLinkActive", "active", "tooltipPosition", "right", 3, "routerLink", "pTooltip", "click", 4, "ngFor", "ngForOf"], [1, "sidebar-bottom"], ["tooltipPosition", "right", 1, "nav-item", "logout-item", 3, "click", "pTooltip"], [1, "nav-icon"], [1, "fas", "fa-arrow-right-from-bracket"], ["class", "nav-label", 4, "ngIf"], ["class", "sidebar-user", 4, "ngIf"], [1, "collapse-btn", 3, "click"], [1, "fas", 3, "ngClass"], [1, "main-area"], [1, "topbar"], [1, "topbar-left"], [1, "mobile-menu-btn", 3, "click"], [1, "fas", "fa-bars"], [1, "topbar-breadcrumb"], [1, "fas", "fa-shield-halved", "topbar-logo-icon"], [1, "topbar-brand"], [1, "topbar-sep"], [1, "topbar-page"], [1, "topbar-center"], [1, "topbar-search"], [1, "fas", "fa-search"], ["type", "text", "placeholder", "Search transactions, merchants..."], [1, "topbar-right"], [1, "topbar-btn", 3, "click"], [1, "fas", "fa-bell"], [1, "topbar-badge"], [1, "topbar-status"], [1, "status-dot"], [1, "status-text"], [1, "topbar-avatar", 3, "click"], [1, "fas", "fa-chevron-down"], [1, "notif-panel"], [1, "notif-header"], [1, "notif-count"], [1, "notif-list"], ["class", "notif-item", 3, "class", 4, "ngFor", "ngForOf"], [1, "notif-footer"], [1, "user-panel"], [1, "user-panel-info"], [1, "up-avatar"], [1, "up-name"], [1, "up-email"], [1, "up-divider"], [1, "up-item"], [1, "fas", "fa-user"], [1, "fas", "fa-gear"], [1, "up-item", "danger", 3, "click"], [1, "page-content"], [1, "mobile-overlay", 3, "click"], [1, "brand-text"], [1, "brand-name"], [1, "brand-version"], [1, "nav-section-label"], ["routerLinkActive", "active", "tooltipPosition", "right", 1, "nav-item", 3, "click", "routerLink", "pTooltip"], ["class", "nav-badge", 4, "ngIf"], [1, "nav-label"], [1, "nav-badge"], [1, "sidebar-user"], [1, "user-avatar"], [1, "user-info"], [1, "user-name"], [1, "user-role"], [1, "notif-item"], [1, "notif-icon-wrap"], [1, "notif-body"], [1, "notif-title"], [1, "notif-msg"], [1, "notif-time"]], template: function LayoutComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵtemplate(0, LayoutComponent_div_0_Template, 1, 0, "div", 2);
            i0.ɵɵelementStart(1, "div", 3)(2, "aside", 4)(3, "div", 5)(4, "div", 6);
            i0.ɵɵelement(5, "i", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(6, LayoutComponent_div_6_Template, 5, 0, "div", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(7, LayoutComponent_div_7_Template, 2, 0, "div", 9);
            i0.ɵɵelementStart(8, "nav", 10);
            i0.ɵɵtemplate(9, LayoutComponent_a_9_Template, 5, 6, "a", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "div", 12);
            i0.ɵɵtemplate(11, LayoutComponent_div_11_Template, 2, 0, "div", 9);
            i0.ɵɵelementStart(12, "button", 13);
            i0.ɵɵlistener("click", function LayoutComponent_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.logout()); });
            i0.ɵɵelementStart(13, "span", 14);
            i0.ɵɵelement(14, "i", 15);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(15, LayoutComponent_span_15_Template, 2, 0, "span", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(16, LayoutComponent_div_16_Template, 8, 0, "div", 17);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "button", 18);
            i0.ɵɵlistener("click", function LayoutComponent_Template_button_click_17_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.toggleSidebar()); });
            i0.ɵɵelement(18, "i", 19);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(19, "div", 20)(20, "header", 21)(21, "div", 22)(22, "button", 23);
            i0.ɵɵlistener("click", function LayoutComponent_Template_button_click_22_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.toggleMobile()); });
            i0.ɵɵelement(23, "i", 24);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "div", 25);
            i0.ɵɵelement(25, "i", 26);
            i0.ɵɵelementStart(26, "span", 27);
            i0.ɵɵtext(27, "FraudShield");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "span", 28);
            i0.ɵɵtext(29, "/");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "span", 29);
            i0.ɵɵtext(31, "Dashboard");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(32, "div", 30)(33, "div", 31);
            i0.ɵɵelement(34, "i", 32)(35, "input", 33);
            i0.ɵɵelementStart(36, "kbd");
            i0.ɵɵtext(37, "Ctrl+K");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(38, "div", 34)(39, "button", 35);
            i0.ɵɵlistener("click", function LayoutComponent_Template_button_click_39_listener($event) { i0.ɵɵrestoreView(_r1); const alertPanel_r6 = i0.ɵɵreference(51); return i0.ɵɵresetView(alertPanel_r6.toggle($event)); });
            i0.ɵɵelement(40, "i", 36);
            i0.ɵɵelementStart(41, "span", 37);
            i0.ɵɵtext(42, "4");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(43, "div", 38);
            i0.ɵɵelement(44, "span", 39);
            i0.ɵɵelementStart(45, "span", 40);
            i0.ɵɵtext(46, "Live");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(47, "div", 41);
            i0.ɵɵlistener("click", function LayoutComponent_Template_div_click_47_listener($event) { i0.ɵɵrestoreView(_r1); const userPanel_r7 = i0.ɵɵreference(63); return i0.ɵɵresetView(userPanel_r7.toggle($event)); });
            i0.ɵɵtext(48, " AD ");
            i0.ɵɵelement(49, "i", 42);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(50, "p-overlayPanel", null, 0)(52, "div", 43)(53, "div", 44)(54, "span");
            i0.ɵɵtext(55, "Notifications");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(56, "span", 45);
            i0.ɵɵtext(57);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(58, "div", 46);
            i0.ɵɵtemplate(59, LayoutComponent_div_59_Template, 10, 8, "div", 47);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(60, "div", 48);
            i0.ɵɵtext(61, "View all notifications");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(62, "p-overlayPanel", null, 1)(64, "div", 49)(65, "div", 50)(66, "div", 51);
            i0.ɵɵtext(67, "AD");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(68, "div")(69, "div", 52);
            i0.ɵɵtext(70, "Admin User");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(71, "div", 53);
            i0.ɵɵtext(72, "admin@fraudshield.com");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelement(73, "div", 54);
            i0.ɵɵelementStart(74, "button", 55);
            i0.ɵɵelement(75, "i", 56);
            i0.ɵɵtext(76, " Profile");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(77, "button", 55);
            i0.ɵɵelement(78, "i", 57);
            i0.ɵɵtext(79, " Settings");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(80, "button", 58);
            i0.ɵɵlistener("click", function LayoutComponent_Template_button_click_80_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.logout()); });
            i0.ɵɵelement(81, "i", 15);
            i0.ɵɵtext(82, " Logout");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(83, "main", 59);
            i0.ɵɵelement(84, "router-outlet");
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.mobileOpen());
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("collapsed", ctx.collapsed())("mobile-open", ctx.mobileOpen());
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngIf", !ctx.collapsed());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.collapsed());
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.navItems);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", !ctx.collapsed());
            i0.ɵɵadvance();
            i0.ɵɵproperty("pTooltip", ctx.collapsed() ? "Logout" : "");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", !ctx.collapsed());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.collapsed());
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngClass", ctx.collapsed() ? "fa-chevron-right" : "fa-chevron-left");
            i0.ɵɵadvance(39);
            i0.ɵɵtextInterpolate1("", ctx.alerts.length, " new");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.alerts);
        } }, dependencies: [CommonModule, i2.NgClass, i2.NgForOf, i2.NgIf, RouterOutlet, RouterLink, RouterLinkActive, OverlayPanelModule, i3.OverlayPanel, TooltipModule, i4.Tooltip], styles: ["//[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   Shell[_ngcontent-%COMP%]   layout[_ngcontent-%COMP%]   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.app-shell[_ngcontent-%COMP%] {\n  display: flex;\n  height: 100vh;\n  overflow: hidden;\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   Sidebar[_ngcontent-%COMP%]   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.sidebar[_ngcontent-%COMP%] {\n  width: var(--sidebar-w);\n  min-width: var(--sidebar-w);\n  height: 100vh;\n  background: var(--bg-sidebar);\n  display: flex;\n  flex-direction: column;\n  transition: width 0.25s ease, min-width 0.25s ease;\n  position: relative;\n  overflow: hidden;\n  z-index: 100;\n\n  &.collapsed {\n    width: var(--sidebar-collapsed);\n    min-width: var(--sidebar-collapsed);\n  }\n}\n\n.sidebar-brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 20px 18px 16px;\n  border-bottom: 1px solid rgba(255,255,255,0.06);\n  min-height: 64px;\n}\n.brand-icon[_ngcontent-%COMP%] {\n  width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0;\n  background: linear-gradient(135deg, var(--primary), var(--primary-light));\n  display: flex; align-items: center; justify-content: center;\n  font-size: 16px; color: white;\n  box-shadow: 0 2px 8px rgba(0,150,136,0.4);\n}\n.brand-name[_ngcontent-%COMP%] { font-size: 15px; font-weight: 800; color: white; display: block; line-height: 1.2; }\n.brand-version[_ngcontent-%COMP%] { font-size: 10px; color: rgba(255,255,255,0.35); font-family: var(--font-mono); }\n\n.nav-section-label[_ngcontent-%COMP%] {\n  font-size: 9px; font-weight: 700; letter-spacing: 0.12em;\n  color: rgba(255,255,255,0.3); padding: 14px 20px 6px;\n  text-transform: uppercase; white-space: nowrap;\n}\n\n.sidebar-nav[_ngcontent-%COMP%] { flex: 1; padding: 8px 10px; display: flex; flex-direction: column; gap: 2px; }\n\n.nav-item[_ngcontent-%COMP%] {\n  display: flex; align-items: center; gap: 12px;\n  padding: 10px 12px; border-radius: 10px;\n  color: rgba(255,255,255,0.55); font-size: 13.5px; font-weight: 500;\n  cursor: pointer; text-decoration: none; transition: all 0.18s;\n  white-space: nowrap; border: none; background: none; width: 100%; text-align: left;\n  position: relative;\n\n  &:hover {\n    background: rgba(255,255,255,0.06);\n    color: rgba(255,255,255,0.85);\n  }\n\n  &.active {\n    background: linear-gradient(135deg, rgba(0,150,136,0.25), rgba(0,150,136,0.12));\n    color: var(--primary-light);\n    box-shadow: inset 3px 0 0 var(--primary-light);\n\n    .nav-icon i { color: var(--primary-light); }\n  }\n}\n.nav-icon[_ngcontent-%COMP%] { width: 20px; text-align: center; flex-shrink: 0; i { font-size: 15px; } }\n.nav-label[_ngcontent-%COMP%] { flex: 1; }\n.nav-badge[_ngcontent-%COMP%] {\n  background: var(--danger); color: white; border-radius: 100px;\n  font-size: 10px; font-weight: 700; padding: 1px 7px; font-family: var(--font-mono);\n}\n\n.sidebar-bottom[_ngcontent-%COMP%] {\n  padding: 8px 10px 16px;\n  border-top: 1px solid rgba(255,255,255,0.06);\n}\n.logout-item[_ngcontent-%COMP%] { color: rgba(255,255,255,0.4) !important; &:hover { color: #ef9a9a !important; background: rgba(239,83,80,0.08) !important; } }\n\n.sidebar-user[_ngcontent-%COMP%] {\n  display: flex; align-items: center; gap: 10px;\n  padding: 12px 12px 4px; margin-top: 8px;\n}\n.user-avatar[_ngcontent-%COMP%] {\n  width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0;\n  background: linear-gradient(135deg, var(--primary), var(--primary-light));\n  display: flex; align-items: center; justify-content: center;\n  font-size: 12px; font-weight: 700; color: white;\n}\n.user-name[_ngcontent-%COMP%] { font-size: 13px; font-weight: 600; color: white; }\n.user-role[_ngcontent-%COMP%] { font-size: 11px; color: rgba(255,255,255,0.4); }\n\n.collapse-btn[_ngcontent-%COMP%] {\n  position: absolute; bottom: 140px; right: -12px;\n  width: 24px; height: 24px; border-radius: 50%;\n  background: var(--bg-card); border: 1px solid var(--border);\n  display: flex; align-items: center; justify-content: center;\n  cursor: pointer; font-size: 10px; color: var(--text-secondary);\n  box-shadow: var(--shadow-sm); transition: all 0.2s;\n  z-index: 10;\n  &:hover { background: var(--primary-bg); color: var(--primary); border-color: var(--primary-light); }\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   Main[_ngcontent-%COMP%]   area[_ngcontent-%COMP%]   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.main-area[_ngcontent-%COMP%] {\n  flex: 1; display: flex; flex-direction: column; overflow: hidden; min-width: 0;\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   Topbar[_ngcontent-%COMP%]   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.topbar[_ngcontent-%COMP%] {\n  height: var(--navbar-h);\n  background: var(--bg-card);\n  border-bottom: 1px solid var(--border);\n  display: flex; align-items: center; gap: 12px;\n  padding: 0 20px; flex-shrink: 0;\n  box-shadow: 0 1px 4px rgba(0,0,0,0.04);\n  z-index: 50;\n}\n.topbar-left[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 12px; min-width: 0; }\n.mobile-menu-btn[_ngcontent-%COMP%] {\n  display: none; background: none; border: none; cursor: pointer;\n  width: 36px; height: 36px; border-radius: 8px; color: var(--text-secondary);\n  font-size: 16px; align-items: center; justify-content: center; transition: all 0.2s;\n  &:hover { background: var(--bg-page); color: var(--primary); }\n}\n.topbar-breadcrumb[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 6px; }\n.topbar-logo-icon[_ngcontent-%COMP%] { color: var(--primary); font-size: 16px; }\n.topbar-brand[_ngcontent-%COMP%] { font-size: 14px; font-weight: 700; color: var(--text-primary); }\n.topbar-sep[_ngcontent-%COMP%]   { color: var(--text-muted); font-size: 14px; }\n.topbar-page[_ngcontent-%COMP%]  { font-size: 13px; color: var(--text-muted); }\n\n.topbar-center[_ngcontent-%COMP%] { flex: 1; display: flex; justify-content: center; padding: 0 20px; }\n.topbar-search[_ngcontent-%COMP%] {\n  display: flex; align-items: center; gap: 8px;\n  background: var(--bg-page); border: 1px solid var(--border);\n  border-radius: 10px; padding: 0 14px; width: 100%; max-width: 380px; height: 38px;\n  transition: border-color 0.2s, box-shadow 0.2s;\n  i { color: var(--text-muted); font-size: 13px; flex-shrink: 0; }\n  input {\n    background: none; border: none; outline: none; flex: 1;\n    font-size: 13px; font-family: var(--font-body); color: var(--text-primary);\n    &::placeholder { color: var(--text-muted); }\n  }\n  kbd { background: var(--border-light); border: 1px solid var(--border); border-radius: 4px; padding: 1px 6px; font-size: 10px; color: var(--text-muted); font-family: var(--font-mono); }\n  &:focus-within { border-color: var(--primary-light); box-shadow: 0 0 0 3px rgba(0,150,136,0.08); }\n}\n\n.topbar-right[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 8px; }\n.topbar-btn[_ngcontent-%COMP%] {\n  position: relative; width: 36px; height: 36px; border-radius: 9px;\n  border: 1px solid var(--border); background: none;\n  display: flex; align-items: center; justify-content: center;\n  font-size: 14px; color: var(--text-secondary); cursor: pointer; transition: all 0.2s;\n  &:hover { background: var(--primary-bg); color: var(--primary); border-color: var(--primary-light); }\n}\n.topbar-badge[_ngcontent-%COMP%] {\n  position: absolute; top: -4px; right: -4px; width: 18px; height: 18px;\n  border-radius: 50%; background: var(--danger); color: white;\n  font-size: 9px; font-weight: 700; display: flex; align-items: center; justify-content: center;\n  border: 2px solid white; font-family: var(--font-mono);\n}\n.topbar-status[_ngcontent-%COMP%] {\n  display: flex; align-items: center; gap: 6px;\n  background: #e8f5e9; border: 1px solid #c8e6c9; border-radius: 100px;\n  padding: 4px 12px; font-size: 12px; color: #2e7d32; font-weight: 600;\n}\n.status-dot[_ngcontent-%COMP%] {\n  width: 7px; height: 7px; border-radius: 50%; background: var(--success);\n  animation: pulse 2s infinite;\n}\n.status-text[_ngcontent-%COMP%] { white-space: nowrap; }\n\n.topbar-avatar[_ngcontent-%COMP%] {\n  display: flex; align-items: center; gap: 6px;\n  background: linear-gradient(135deg, var(--primary), var(--primary-light));\n  color: white; font-size: 12px; font-weight: 700;\n  padding: 6px 12px; border-radius: 9px; cursor: pointer; transition: all 0.2s;\n  i { font-size: 10px; opacity: 0.8; }\n  &:hover { box-shadow: 0 2px 8px rgba(0,150,136,0.35); }\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   Notification[_ngcontent-%COMP%]   panel[_ngcontent-%COMP%]   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.notif-panel[_ngcontent-%COMP%] { width: 340px; }\n.notif-header[_ngcontent-%COMP%] { display: flex; justify-content: space-between; align-items: center; padding: 14px 16px; border-bottom: 1px solid var(--border); font-weight: 600; font-size: 14px; }\n.notif-count[_ngcontent-%COMP%] { font-size: 11px; background: var(--danger); color: white; padding: 2px 8px; border-radius: 100px; font-weight: 600; font-family: var(--font-mono); }\n.notif-list[_ngcontent-%COMP%] { max-height: 320px; overflow-y: auto; }\n.notif-item[_ngcontent-%COMP%] { display: flex; gap: 12px; padding: 12px 16px; border-bottom: 1px solid var(--border-light); cursor: pointer; transition: background 0.15s; &:hover { background: var(--bg-page); } }\n.notif-icon-wrap[_ngcontent-%COMP%] { width: 34px; height: 34px; border-radius: 9px; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }\n.notif-icon-danger[_ngcontent-%COMP%]  { background: #fde8e8; color: var(--danger); }\n.notif-icon-warning[_ngcontent-%COMP%] { background: #fff3e0; color: var(--warning); }\n.notif-icon-info[_ngcontent-%COMP%]    { background: #e3f2fd; color: var(--info); }\n.notif-icon-success[_ngcontent-%COMP%] { background: #e8f5e9; color: var(--success); }\n.notif-title[_ngcontent-%COMP%] { font-size: 12px; font-weight: 600; margin-bottom: 2px; }\n.notif-msg[_ngcontent-%COMP%]   { font-size: 11px; color: var(--text-secondary); }\n.notif-time[_ngcontent-%COMP%]  { font-size: 10px; color: var(--text-muted); margin-top: 3px; font-family: var(--font-mono); }\n.notif-footer[_ngcontent-%COMP%] { padding: 12px; text-align: center; font-size: 12px; color: var(--primary); font-weight: 600; cursor: pointer; border-top: 1px solid var(--border-light); &:hover { background: var(--primary-bg); } }\n\n//[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   User[_ngcontent-%COMP%]   dropdown[_ngcontent-%COMP%]   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.user-panel[_ngcontent-%COMP%] { width: 220px; }\n.user-panel-info[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 10px; padding: 14px 16px; }\n.up-avatar[_ngcontent-%COMP%] { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), var(--primary-light)); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: white; flex-shrink: 0; }\n.up-name[_ngcontent-%COMP%]  { font-size: 13px; font-weight: 600; }\n.up-email[_ngcontent-%COMP%] { font-size: 11px; color: var(--text-muted); }\n.up-divider[_ngcontent-%COMP%] { height: 1px; background: var(--border); margin: 4px 0; }\n.up-item[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 10px; padding: 10px 16px; font-size: 13px; color: var(--text-primary); background: none; border: none; width: 100%; cursor: pointer; transition: background 0.15s; i { width: 14px; color: var(--text-muted); } &:hover { background: var(--bg-page); } &.danger { color: var(--danger); i { color: var(--danger); } &:hover { background: #fde8e8; } } }\n\n//[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   Page[_ngcontent-%COMP%]   content[_ngcontent-%COMP%]   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.page-content[_ngcontent-%COMP%] { flex: 1; overflow-y: auto; background: var(--bg-page); }\n\n//[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   Mobile[_ngcontent-%COMP%]   overlay[_ngcontent-%COMP%]   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.mobile-overlay[_ngcontent-%COMP%] {\n  display: none; position: fixed; inset: 0;\n  background: rgba(0,0,0,0.4); z-index: 99;\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   Responsive[_ngcontent-%COMP%]   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n@media[_ngcontent-%COMP%]   (max-width[_ngcontent-%COMP%]: 768px) {\n  .mobile-menu-btn { display: flex !important; }\n  .topbar-search   { display: none; }\n  .topbar-breadcrumb .topbar-brand, .topbar-sep, .topbar-page { display: none; }\n  .status-text { display: none; }\n\n  .sidebar {\n    position: fixed; top: 0; left: 0; height: 100vh; z-index: 200;\n    transform: translateX(-100%); transition: transform 0.25s ease;\n    width: var(--sidebar-w) !important; min-width: var(--sidebar-w) !important;\n\n    &.mobile-open { transform: translateX(0); }\n  }\n  .mobile-overlay { display: block; }\n  .collapse-btn { display: none; }\n}\n\n@media (max-width: 480px) {\n  .topbar[_ngcontent-%COMP%] { padding: 0 12px; }\n  .topbar-status[_ngcontent-%COMP%] { display: none; }\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LayoutComponent, [{
        type: Component,
        args: [{ selector: 'app-layout', standalone: true, imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, OverlayPanelModule, TooltipModule], template: "<!-- Mobile overlay -->\n<div class=\"mobile-overlay\" *ngIf=\"mobileOpen()\" (click)=\"closeMobile()\"></div>\n\n<div class=\"app-shell\">\n  <!-- \u2500\u2500 Sidebar \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->\n  <aside class=\"sidebar\" [class.collapsed]=\"collapsed()\" [class.mobile-open]=\"mobileOpen()\">\n    <!-- Brand -->\n    <div class=\"sidebar-brand\">\n      <div class=\"brand-icon\"><i class=\"fas fa-shield-halved\"></i></div>\n      <div class=\"brand-text\" *ngIf=\"!collapsed()\">\n        <span class=\"brand-name\">FraudShield</span>\n        <span class=\"brand-version\">v2.0</span>\n      </div>\n    </div>\n\n    <!-- Nav label -->\n    <div class=\"nav-section-label\" *ngIf=\"!collapsed()\">NAVIGATION</div>\n\n    <!-- Nav items -->\n    <nav class=\"sidebar-nav\">\n      <a *ngFor=\"let item of navItems\"\n        class=\"nav-item\"\n        [routerLink]=\"item.route\"\n        routerLinkActive=\"active\"\n        [pTooltip]=\"collapsed() ? item.label : ''\"\n        tooltipPosition=\"right\"\n        (click)=\"closeMobile()\">\n        <span class=\"nav-icon\"><i [class]=\"item.icon\"></i></span>\n        <span class=\"nav-label\" *ngIf=\"!collapsed()\">{{ item.label }}</span>\n        <span class=\"nav-badge\" *ngIf=\"item.badge && !collapsed()\">{{ item.badge }}</span>\n      </a>\n    </nav>\n\n    <!-- Bottom -->\n    <div class=\"sidebar-bottom\">\n      <div class=\"nav-section-label\" *ngIf=\"!collapsed()\">ACCOUNT</div>\n      <button class=\"nav-item logout-item\" (click)=\"logout()\"\n        [pTooltip]=\"collapsed() ? 'Logout' : ''\" tooltipPosition=\"right\">\n        <span class=\"nav-icon\"><i class=\"fas fa-arrow-right-from-bracket\"></i></span>\n        <span class=\"nav-label\" *ngIf=\"!collapsed()\">Logout</span>\n      </button>\n\n      <div class=\"sidebar-user\" *ngIf=\"!collapsed()\">\n        <div class=\"user-avatar\">AD</div>\n        <div class=\"user-info\">\n          <div class=\"user-name\">Admin User</div>\n          <div class=\"user-role\">Fraud Analyst</div>\n        </div>\n      </div>\n    </div>\n\n    <!-- Collapse toggle (desktop only) -->\n    <button class=\"collapse-btn\" (click)=\"toggleSidebar()\">\n      <i class=\"fas\" [ngClass]=\"collapsed() ? 'fa-chevron-right' : 'fa-chevron-left'\"></i>\n    </button>\n  </aside>\n\n  <!-- \u2500\u2500 Main area \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->\n  <div class=\"main-area\">\n    <!-- Topbar -->\n    <header class=\"topbar\">\n      <div class=\"topbar-left\">\n        <!-- Mobile hamburger -->\n        <button class=\"mobile-menu-btn\" (click)=\"toggleMobile()\">\n          <i class=\"fas fa-bars\"></i>\n        </button>\n        <!-- Breadcrumb / page title -->\n        <div class=\"topbar-breadcrumb\">\n          <i class=\"fas fa-shield-halved topbar-logo-icon\"></i>\n          <span class=\"topbar-brand\">FraudShield</span>\n          <span class=\"topbar-sep\">/</span>\n          <span class=\"topbar-page\">Dashboard</span>\n        </div>\n      </div>\n\n      <div class=\"topbar-center\">\n        <div class=\"topbar-search\">\n          <i class=\"fas fa-search\"></i>\n          <input type=\"text\" placeholder=\"Search transactions, merchants...\" />\n          <kbd>Ctrl+K</kbd>\n        </div>\n      </div>\n\n      <div class=\"topbar-right\">\n        <!-- Alert badge -->\n        <button class=\"topbar-btn\" (click)=\"alertPanel.toggle($event)\">\n          <i class=\"fas fa-bell\"></i>\n          <span class=\"topbar-badge\">4</span>\n        </button>\n\n        <!-- Status indicator -->\n        <div class=\"topbar-status\">\n          <span class=\"status-dot\"></span>\n          <span class=\"status-text\">Live</span>\n        </div>\n\n        <!-- Avatar -->\n        <div class=\"topbar-avatar\" (click)=\"userPanel.toggle($event)\">\n          AD\n          <i class=\"fas fa-chevron-down\"></i>\n        </div>\n      </div>\n    </header>\n\n    <!-- Notification panel -->\n    <p-overlayPanel #alertPanel>\n      <div class=\"notif-panel\">\n        <div class=\"notif-header\">\n          <span>Notifications</span>\n          <span class=\"notif-count\">{{ alerts.length }} new</span>\n        </div>\n        <div class=\"notif-list\">\n          <div class=\"notif-item\" *ngFor=\"let a of alerts\" [class]=\"'notif-' + a.type\">\n            <div class=\"notif-icon-wrap\" [class]=\"'notif-icon-' + a.type\">\n              <i class=\"fas\" [ngClass]=\"alertIcon(a.type)\"></i>\n            </div>\n            <div class=\"notif-body\">\n              <div class=\"notif-title\">{{ a.title }}</div>\n              <div class=\"notif-msg\">{{ a.msg }}</div>\n              <div class=\"notif-time\">{{ a.time }}</div>\n            </div>\n          </div>\n        </div>\n        <div class=\"notif-footer\">View all notifications</div>\n      </div>\n    </p-overlayPanel>\n\n    <!-- User panel -->\n    <p-overlayPanel #userPanel>\n      <div class=\"user-panel\">\n        <div class=\"user-panel-info\">\n          <div class=\"up-avatar\">AD</div>\n          <div>\n            <div class=\"up-name\">Admin User</div>\n            <div class=\"up-email\">admin&#64;fraudshield.com</div>\n          </div>\n        </div>\n        <div class=\"up-divider\"></div>\n        <button class=\"up-item\"><i class=\"fas fa-user\"></i> Profile</button>\n        <button class=\"up-item\"><i class=\"fas fa-gear\"></i> Settings</button>\n        <button class=\"up-item danger\" (click)=\"logout()\"><i class=\"fas fa-arrow-right-from-bracket\"></i> Logout</button>\n      </div>\n    </p-overlayPanel>\n\n    <!-- Page content -->\n    <main class=\"page-content\">\n      <router-outlet></router-outlet>\n    </main>\n  </div>\n</div>\n\n\n", styles: ["// \u2500\u2500 Shell layout \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.app-shell {\n  display: flex;\n  height: 100vh;\n  overflow: hidden;\n}\n\n// \u2500\u2500 Sidebar \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.sidebar {\n  width: var(--sidebar-w);\n  min-width: var(--sidebar-w);\n  height: 100vh;\n  background: var(--bg-sidebar);\n  display: flex;\n  flex-direction: column;\n  transition: width 0.25s ease, min-width 0.25s ease;\n  position: relative;\n  overflow: hidden;\n  z-index: 100;\n\n  &.collapsed {\n    width: var(--sidebar-collapsed);\n    min-width: var(--sidebar-collapsed);\n  }\n}\n\n.sidebar-brand {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 20px 18px 16px;\n  border-bottom: 1px solid rgba(255,255,255,0.06);\n  min-height: 64px;\n}\n.brand-icon {\n  width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0;\n  background: linear-gradient(135deg, var(--primary), var(--primary-light));\n  display: flex; align-items: center; justify-content: center;\n  font-size: 16px; color: white;\n  box-shadow: 0 2px 8px rgba(0,150,136,0.4);\n}\n.brand-name { font-size: 15px; font-weight: 800; color: white; display: block; line-height: 1.2; }\n.brand-version { font-size: 10px; color: rgba(255,255,255,0.35); font-family: var(--font-mono); }\n\n.nav-section-label {\n  font-size: 9px; font-weight: 700; letter-spacing: 0.12em;\n  color: rgba(255,255,255,0.3); padding: 14px 20px 6px;\n  text-transform: uppercase; white-space: nowrap;\n}\n\n.sidebar-nav { flex: 1; padding: 8px 10px; display: flex; flex-direction: column; gap: 2px; }\n\n.nav-item {\n  display: flex; align-items: center; gap: 12px;\n  padding: 10px 12px; border-radius: 10px;\n  color: rgba(255,255,255,0.55); font-size: 13.5px; font-weight: 500;\n  cursor: pointer; text-decoration: none; transition: all 0.18s;\n  white-space: nowrap; border: none; background: none; width: 100%; text-align: left;\n  position: relative;\n\n  &:hover {\n    background: rgba(255,255,255,0.06);\n    color: rgba(255,255,255,0.85);\n  }\n\n  &.active {\n    background: linear-gradient(135deg, rgba(0,150,136,0.25), rgba(0,150,136,0.12));\n    color: var(--primary-light);\n    box-shadow: inset 3px 0 0 var(--primary-light);\n\n    .nav-icon i { color: var(--primary-light); }\n  }\n}\n.nav-icon { width: 20px; text-align: center; flex-shrink: 0; i { font-size: 15px; } }\n.nav-label { flex: 1; }\n.nav-badge {\n  background: var(--danger); color: white; border-radius: 100px;\n  font-size: 10px; font-weight: 700; padding: 1px 7px; font-family: var(--font-mono);\n}\n\n.sidebar-bottom {\n  padding: 8px 10px 16px;\n  border-top: 1px solid rgba(255,255,255,0.06);\n}\n.logout-item { color: rgba(255,255,255,0.4) !important; &:hover { color: #ef9a9a !important; background: rgba(239,83,80,0.08) !important; } }\n\n.sidebar-user {\n  display: flex; align-items: center; gap: 10px;\n  padding: 12px 12px 4px; margin-top: 8px;\n}\n.user-avatar {\n  width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0;\n  background: linear-gradient(135deg, var(--primary), var(--primary-light));\n  display: flex; align-items: center; justify-content: center;\n  font-size: 12px; font-weight: 700; color: white;\n}\n.user-name { font-size: 13px; font-weight: 600; color: white; }\n.user-role { font-size: 11px; color: rgba(255,255,255,0.4); }\n\n.collapse-btn {\n  position: absolute; bottom: 140px; right: -12px;\n  width: 24px; height: 24px; border-radius: 50%;\n  background: var(--bg-card); border: 1px solid var(--border);\n  display: flex; align-items: center; justify-content: center;\n  cursor: pointer; font-size: 10px; color: var(--text-secondary);\n  box-shadow: var(--shadow-sm); transition: all 0.2s;\n  z-index: 10;\n  &:hover { background: var(--primary-bg); color: var(--primary); border-color: var(--primary-light); }\n}\n\n// \u2500\u2500 Main area \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.main-area {\n  flex: 1; display: flex; flex-direction: column; overflow: hidden; min-width: 0;\n}\n\n// \u2500\u2500 Topbar \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.topbar {\n  height: var(--navbar-h);\n  background: var(--bg-card);\n  border-bottom: 1px solid var(--border);\n  display: flex; align-items: center; gap: 12px;\n  padding: 0 20px; flex-shrink: 0;\n  box-shadow: 0 1px 4px rgba(0,0,0,0.04);\n  z-index: 50;\n}\n.topbar-left { display: flex; align-items: center; gap: 12px; min-width: 0; }\n.mobile-menu-btn {\n  display: none; background: none; border: none; cursor: pointer;\n  width: 36px; height: 36px; border-radius: 8px; color: var(--text-secondary);\n  font-size: 16px; align-items: center; justify-content: center; transition: all 0.2s;\n  &:hover { background: var(--bg-page); color: var(--primary); }\n}\n.topbar-breadcrumb { display: flex; align-items: center; gap: 6px; }\n.topbar-logo-icon { color: var(--primary); font-size: 16px; }\n.topbar-brand { font-size: 14px; font-weight: 700; color: var(--text-primary); }\n.topbar-sep   { color: var(--text-muted); font-size: 14px; }\n.topbar-page  { font-size: 13px; color: var(--text-muted); }\n\n.topbar-center { flex: 1; display: flex; justify-content: center; padding: 0 20px; }\n.topbar-search {\n  display: flex; align-items: center; gap: 8px;\n  background: var(--bg-page); border: 1px solid var(--border);\n  border-radius: 10px; padding: 0 14px; width: 100%; max-width: 380px; height: 38px;\n  transition: border-color 0.2s, box-shadow 0.2s;\n  i { color: var(--text-muted); font-size: 13px; flex-shrink: 0; }\n  input {\n    background: none; border: none; outline: none; flex: 1;\n    font-size: 13px; font-family: var(--font-body); color: var(--text-primary);\n    &::placeholder { color: var(--text-muted); }\n  }\n  kbd { background: var(--border-light); border: 1px solid var(--border); border-radius: 4px; padding: 1px 6px; font-size: 10px; color: var(--text-muted); font-family: var(--font-mono); }\n  &:focus-within { border-color: var(--primary-light); box-shadow: 0 0 0 3px rgba(0,150,136,0.08); }\n}\n\n.topbar-right { display: flex; align-items: center; gap: 8px; }\n.topbar-btn {\n  position: relative; width: 36px; height: 36px; border-radius: 9px;\n  border: 1px solid var(--border); background: none;\n  display: flex; align-items: center; justify-content: center;\n  font-size: 14px; color: var(--text-secondary); cursor: pointer; transition: all 0.2s;\n  &:hover { background: var(--primary-bg); color: var(--primary); border-color: var(--primary-light); }\n}\n.topbar-badge {\n  position: absolute; top: -4px; right: -4px; width: 18px; height: 18px;\n  border-radius: 50%; background: var(--danger); color: white;\n  font-size: 9px; font-weight: 700; display: flex; align-items: center; justify-content: center;\n  border: 2px solid white; font-family: var(--font-mono);\n}\n.topbar-status {\n  display: flex; align-items: center; gap: 6px;\n  background: #e8f5e9; border: 1px solid #c8e6c9; border-radius: 100px;\n  padding: 4px 12px; font-size: 12px; color: #2e7d32; font-weight: 600;\n}\n.status-dot {\n  width: 7px; height: 7px; border-radius: 50%; background: var(--success);\n  animation: pulse 2s infinite;\n}\n.status-text { white-space: nowrap; }\n\n.topbar-avatar {\n  display: flex; align-items: center; gap: 6px;\n  background: linear-gradient(135deg, var(--primary), var(--primary-light));\n  color: white; font-size: 12px; font-weight: 700;\n  padding: 6px 12px; border-radius: 9px; cursor: pointer; transition: all 0.2s;\n  i { font-size: 10px; opacity: 0.8; }\n  &:hover { box-shadow: 0 2px 8px rgba(0,150,136,0.35); }\n}\n\n// \u2500\u2500 Notification panel \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.notif-panel { width: 340px; }\n.notif-header { display: flex; justify-content: space-between; align-items: center; padding: 14px 16px; border-bottom: 1px solid var(--border); font-weight: 600; font-size: 14px; }\n.notif-count { font-size: 11px; background: var(--danger); color: white; padding: 2px 8px; border-radius: 100px; font-weight: 600; font-family: var(--font-mono); }\n.notif-list { max-height: 320px; overflow-y: auto; }\n.notif-item { display: flex; gap: 12px; padding: 12px 16px; border-bottom: 1px solid var(--border-light); cursor: pointer; transition: background 0.15s; &:hover { background: var(--bg-page); } }\n.notif-icon-wrap { width: 34px; height: 34px; border-radius: 9px; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }\n.notif-icon-danger  { background: #fde8e8; color: var(--danger); }\n.notif-icon-warning { background: #fff3e0; color: var(--warning); }\n.notif-icon-info    { background: #e3f2fd; color: var(--info); }\n.notif-icon-success { background: #e8f5e9; color: var(--success); }\n.notif-title { font-size: 12px; font-weight: 600; margin-bottom: 2px; }\n.notif-msg   { font-size: 11px; color: var(--text-secondary); }\n.notif-time  { font-size: 10px; color: var(--text-muted); margin-top: 3px; font-family: var(--font-mono); }\n.notif-footer { padding: 12px; text-align: center; font-size: 12px; color: var(--primary); font-weight: 600; cursor: pointer; border-top: 1px solid var(--border-light); &:hover { background: var(--primary-bg); } }\n\n// \u2500\u2500 User dropdown \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.user-panel { width: 220px; }\n.user-panel-info { display: flex; align-items: center; gap: 10px; padding: 14px 16px; }\n.up-avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), var(--primary-light)); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: white; flex-shrink: 0; }\n.up-name  { font-size: 13px; font-weight: 600; }\n.up-email { font-size: 11px; color: var(--text-muted); }\n.up-divider { height: 1px; background: var(--border); margin: 4px 0; }\n.up-item { display: flex; align-items: center; gap: 10px; padding: 10px 16px; font-size: 13px; color: var(--text-primary); background: none; border: none; width: 100%; cursor: pointer; transition: background 0.15s; i { width: 14px; color: var(--text-muted); } &:hover { background: var(--bg-page); } &.danger { color: var(--danger); i { color: var(--danger); } &:hover { background: #fde8e8; } } }\n\n// \u2500\u2500 Page content \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.page-content { flex: 1; overflow-y: auto; background: var(--bg-page); }\n\n// \u2500\u2500 Mobile overlay \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.mobile-overlay {\n  display: none; position: fixed; inset: 0;\n  background: rgba(0,0,0,0.4); z-index: 99;\n}\n\n// \u2500\u2500 Responsive \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n@media (max-width: 768px) {\n  .mobile-menu-btn { display: flex !important; }\n  .topbar-search   { display: none; }\n  .topbar-breadcrumb .topbar-brand, .topbar-sep, .topbar-page { display: none; }\n  .status-text { display: none; }\n\n  .sidebar {\n    position: fixed; top: 0; left: 0; height: 100vh; z-index: 200;\n    transform: translateX(-100%); transition: transform 0.25s ease;\n    width: var(--sidebar-w) !important; min-width: var(--sidebar-w) !important;\n\n    &.mobile-open { transform: translateX(0); }\n  }\n  .mobile-overlay { display: block; }\n  .collapse-btn { display: none; }\n}\n\n@media (max-width: 480px) {\n  .topbar { padding: 0 12px; }\n  .topbar-status { display: none; }\n}\n"] }]
    }], () => [{ type: i1.Router }], { onResize: [{
            type: HostListener,
            args: ['window:resize']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LayoutComponent, { className: "LayoutComponent", filePath: "src/app/shared/components/layout/layout.component.ts", lineNumber: 14 }); })();
//# sourceMappingURL=layout.component.js.map