import { Component } from '@angular/core';
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
import * as i0 from "@angular/core";
import * as i1 from "../../core/services/fraud.service";
import * as i2 from "primeng/api";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
import * as i5 from "primeng/table";
import * as i6 from "primeng/tag";
import * as i7 from "primeng/dropdown";
import * as i8 from "primeng/inputtext";
import * as i9 from "primeng/button";
import * as i10 from "primeng/dialog";
import * as i11 from "primeng/toast";
import * as i12 from "primeng/tooltip";
const _c0 = () => ({ width: "520px" });
function TransactionsComponent_ng_template_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th", 23);
    i0.ɵɵtext(2, "#");
    i0.ɵɵelement(3, "p-sortIcon", 24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "th", 25);
    i0.ɵɵtext(5, "Transaction ");
    i0.ɵɵelement(6, "p-sortIcon", 26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th", 27);
    i0.ɵɵtext(8, "Sender ");
    i0.ɵɵelement(9, "p-sortIcon", 28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th", 29);
    i0.ɵɵtext(11, "Receiver ");
    i0.ɵɵelement(12, "p-sortIcon", 30);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th", 31);
    i0.ɵɵtext(14, "Channel ");
    i0.ɵɵelement(15, "p-sortIcon", 32);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "th", 33);
    i0.ɵɵtext(17, "Amount ");
    i0.ɵɵelement(18, "p-sortIcon", 34);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "th", 35);
    i0.ɵɵtext(20, "Risk Score ");
    i0.ɵɵelement(21, "p-sortIcon", 36);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "th", 37);
    i0.ɵɵtext(23, "Status ");
    i0.ɵɵelement(24, "p-sortIcon", 38);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "th", 39);
    i0.ɵɵtext(26, "Date ");
    i0.ɵɵelement(27, "p-sortIcon", 40);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "th");
    i0.ɵɵtext(29, "Actions");
    i0.ɵɵelementEnd()();
} }
function TransactionsComponent_ng_template_27_button_25_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 51);
    i0.ɵɵlistener("click", function TransactionsComponent_ng_template_27_button_25_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const t_r2 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.markLegitimate(t_r2)); });
    i0.ɵɵelementEnd();
} }
function TransactionsComponent_ng_template_27_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td", 41);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 42);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td");
    i0.ɵɵelement(6, "i", 43);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td")(11, "span", 44);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "td", 45)(14, "strong");
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "td", 42);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "td");
    i0.ɵɵelement(19, "p-tag", 46);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "td", 47);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "td")(23, "div", 48)(24, "button", 49);
    i0.ɵɵlistener("click", function TransactionsComponent_ng_template_27_Template_button_click_24_listener() { const t_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.viewDetail(t_r2)); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(25, TransactionsComponent_ng_template_27_button_25_Template, 1, 0, "button", 50);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const t_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("#", t_r2.id, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(t_r2.transactionId);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", t_r2.senderName, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(t_r2.receiverName);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(t_r2.channel);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r2.formatAmt(t_r2.amount));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(t_r2.riskScore);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", t_r2.status)("severity", ctx_r2.getStatusSeverity(t_r2.status));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.formatDate(t_r2.createdAt));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", t_r2.status !== "NORMAL");
} }
function TransactionsComponent_ng_template_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 52);
    i0.ɵɵelement(2, "i", 53)(3, "br");
    i0.ɵɵtext(4, "No transactions match your filters");
    i0.ɵɵelementEnd()();
} }
function TransactionsComponent_div_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 54)(1, "div", 55)(2, "span");
    i0.ɵɵtext(3, "Transaction ID");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "strong", 42);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 55)(7, "span");
    i0.ɵɵtext(8, "Sender");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "strong");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 55)(12, "span");
    i0.ɵɵtext(13, "Sender Account");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "span", 42);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "div", 55)(17, "span");
    i0.ɵɵtext(18, "Receiver");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "strong");
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "div", 55)(22, "span");
    i0.ɵɵtext(23, "Receiver Account");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "span", 42);
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "div", 55)(27, "span");
    i0.ɵɵtext(28, "Type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "span", 44);
    i0.ɵɵtext(30);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(31, "div", 55)(32, "span");
    i0.ɵɵtext(33, "Channel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "span", 44);
    i0.ɵɵtext(35);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(36, "div", 55)(37, "span");
    i0.ɵɵtext(38, "Amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "strong", 56);
    i0.ɵɵtext(40);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(41, "div", 55)(42, "span");
    i0.ɵɵtext(43, "Risk Score");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(44, "strong");
    i0.ɵɵtext(45);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(46, "div", 55)(47, "span");
    i0.ɵɵtext(48, "Risk Level");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(49, "span", 44);
    i0.ɵɵtext(50);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(51, "div", 55)(52, "span");
    i0.ɵɵtext(53, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(54, "p-tag", 46);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(55, "div", 55)(56, "span");
    i0.ɵɵtext(57, "Location");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(58, "span");
    i0.ɵɵtext(59);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(60, "div", 55)(61, "span");
    i0.ɵɵtext(62, "Device ID");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(63, "span", 47);
    i0.ɵɵtext(64);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(65, "div", 55)(66, "span");
    i0.ɵɵtext(67, "IP Address");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(68, "span", 47);
    i0.ɵɵtext(69);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(70, "div", 55)(71, "span");
    i0.ɵɵtext(72, "Failed Attempts");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(73, "strong");
    i0.ɵɵtext(74);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(75, "div", 55)(76, "span");
    i0.ɵɵtext(77, "Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(78, "span", 42);
    i0.ɵɵtext(79);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.selectedTx.transactionId);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.selectedTx.senderName);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.maskAccount(ctx_r2.selectedTx.senderAccount));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.selectedTx.receiverName);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.maskAccount(ctx_r2.selectedTx.receiverAccount));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.selectedTx.transactionType);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.selectedTx.channel);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.formatAmt(ctx_r2.selectedTx.amount));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.selectedTx.riskScore);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.selectedTx.riskLevel);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("value", ctx_r2.selectedTx.status)("severity", ctx_r2.getStatusSeverity(ctx_r2.selectedTx.status));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.selectedTx.location);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.selectedTx.deviceId);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.selectedTx.ipAddress);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.selectedTx.failedAttempts);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.formatDate(ctx_r2.selectedTx.createdAt));
} }
export class TransactionsComponent {
    constructor(svc, msg) {
        this.svc = svc;
        this.msg = msg;
        this.transactions = [];
        this.filtered = [];
        this.searchQuery = '';
        this.selectedRisk = '';
        this.selectedStatus = '';
        this.detailVisible = false;
        this.selectedTx = null;
        this.riskOptions = [{ label: 'All Scores', value: '' }, { label: '0-59', value: '0-59' }, { label: '60-119', value: '60-119' }, { label: '120+', value: '120+' }];
        this.statusOptions = [{ label: 'All Status', value: '' }, { label: 'Fraud', value: 'FRAUD' }, { label: 'Suspicious', value: 'SUSPICIOUS' }, { label: 'Normal', value: 'NORMAL' }];
    }
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
                }
                else {
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
    viewDetail(tx) {
        this.selectedTx = tx;
        this.detailVisible = true;
    }
    markLegitimate(tx) {
        tx.status = 'NORMAL';
        this.msg.add({ severity: 'success', summary: 'Marked legitimate', detail: tx.senderName });
    }
    getStatusSeverity(status) {
        if (!status)
            return 'secondary';
        switch (status.toLowerCase()) {
            case 'normal': return 'success';
            case 'suspicious': return 'warning';
            case 'fraud': return 'danger';
            default: return 'info';
        }
    }
    maskAccount(account) {
        if (!account || account.length < 4)
            return '****';
        return '**** **** **** ' + account.slice(-4);
    }
    formatDate(date) {
        if (!date)
            return '';
        try {
            return new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
        catch {
            return String(date);
        }
    }
    formatAmt(n) {
        if (n == null)
            return '$0.00';
        return n >= 1000 ? '$' + (n / 1000).toFixed(1) + 'K' : '$' + n.toFixed(2);
    }
    totalFraud() {
        return this.filtered
            .filter(t => t.status === 'FRAUD')
            .reduce((sum, transaction) => sum + transaction.amount, 0);
    }
    static { this.ɵfac = function TransactionsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TransactionsComponent)(i0.ɵɵdirectiveInject(i1.FraudService), i0.ɵɵdirectiveInject(i2.MessageService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TransactionsComponent, selectors: [["app-transactions"]], features: [i0.ɵɵProvidersFeature([MessageService])], decls: 31, vars: 21, consts: [[1, "page-wrapper"], [1, "page-header", "fade-in-up"], [1, "page-title"], [1, "page-sub"], [1, "header-kpis"], [1, "mini-kpi", "red"], [1, "fas", "fa-triangle-exclamation"], [1, "mini-kpi", "orange"], [1, "fas", "fa-sack-dollar"], [1, "filters-bar", "card", "fade-in-up", "d1"], [1, "filter-search", "p-input-icon-left"], [1, "fas", "fa-search"], ["pInputText", "", "type", "text", "placeholder", "Search ID, sender, receiver, account...", 1, "search-inp", "w-full", 3, "ngModelChange", "input", "ngModel"], ["optionLabel", "label", "optionValue", "value", "placeholder", "Filter by risk", "styleClass", "filter-drop", 3, "ngModelChange", "onChange", "options", "ngModel", "showClear"], ["optionLabel", "label", "optionValue", "value", "placeholder", "Filter by status", "styleClass", "filter-drop", 3, "ngModelChange", "onChange", "options", "ngModel", "showClear"], ["pButton", "", "label", "Reset", "icon", "fas fa-rotate-left", 1, "p-button-outlined", "p-button-sm", "reset-btn", 3, "click"], [1, "card", "table-card", "fade-in-up", "d2"], ["currentPageReportTemplate", "Showing {first}-{last} of {totalRecords}", 3, "value", "paginator", "rows", "rowHover", "showCurrentPageReport"], ["pTemplate", "header"], ["pTemplate", "body"], ["pTemplate", "emptymessage"], ["header", "Transaction Details", 3, "visibleChange", "visible", "modal", "draggable"], ["class", "detail-body", 4, "ngIf"], ["pSortableColumn", "id"], ["field", "id"], ["pSortableColumn", "transactionId"], ["field", "transactionId"], ["pSortableColumn", "senderName"], ["field", "senderName"], ["pSortableColumn", "receiverName"], ["field", "receiverName"], ["pSortableColumn", "channel"], ["field", "channel"], ["pSortableColumn", "amount"], ["field", "amount"], ["pSortableColumn", "riskScore"], ["field", "riskScore"], ["pSortableColumn", "status"], ["field", "status"], ["pSortableColumn", "createdAt"], ["field", "createdAt"], [1, "mono", "muted"], [1, "mono"], [1, "fas", "fa-user-tie"], [1, "cat-chip"], [1, "mono", "amt"], [3, "value", "severity"], [1, "mono", "muted", "small"], [1, "action-btns"], ["pButton", "", "icon", "fas fa-eye", "pTooltip", "View detail", 1, "p-button-text", "p-button-sm", 3, "click"], ["pButton", "", "icon", "fas fa-check", "class", "p-button-text p-button-sm p-button-success", "pTooltip", "Mark legitimate", 3, "click", 4, "ngIf"], ["pButton", "", "icon", "fas fa-check", "pTooltip", "Mark legitimate", 1, "p-button-text", "p-button-sm", "p-button-success", 3, "click"], ["colspan", "10", 1, "empty-msg"], [1, "fas", "fa-inbox"], [1, "detail-body"], [1, "detail-row"], [1, "amt"]], template: function TransactionsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "p-toast");
            i0.ɵɵelementStart(1, "div", 0)(2, "div", 1)(3, "div")(4, "h1", 2);
            i0.ɵɵtext(5, "Fraud Transactions");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p", 3);
            i0.ɵɵtext(7, "Monitor and investigate suspicious credit card transactions in real time");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "div", 4)(9, "div", 5);
            i0.ɵɵelement(10, "i", 6);
            i0.ɵɵelementStart(11, "span");
            i0.ɵɵtext(12);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(13, "div", 7);
            i0.ɵɵelement(14, "i", 8);
            i0.ɵɵelementStart(15, "span");
            i0.ɵɵtext(16);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(17, "div", 9)(18, "div", 10);
            i0.ɵɵelement(19, "i", 11);
            i0.ɵɵelementStart(20, "input", 12);
            i0.ɵɵtwoWayListener("ngModelChange", function TransactionsComponent_Template_input_ngModelChange_20_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event); return $event; });
            i0.ɵɵlistener("input", function TransactionsComponent_Template_input_input_20_listener() { return ctx.applyFilters(); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(21, "p-dropdown", 13);
            i0.ɵɵtwoWayListener("ngModelChange", function TransactionsComponent_Template_p_dropdown_ngModelChange_21_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.selectedRisk, $event) || (ctx.selectedRisk = $event); return $event; });
            i0.ɵɵlistener("onChange", function TransactionsComponent_Template_p_dropdown_onChange_21_listener() { return ctx.applyFilters(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "p-dropdown", 14);
            i0.ɵɵtwoWayListener("ngModelChange", function TransactionsComponent_Template_p_dropdown_ngModelChange_22_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.selectedStatus, $event) || (ctx.selectedStatus = $event); return $event; });
            i0.ɵɵlistener("onChange", function TransactionsComponent_Template_p_dropdown_onChange_22_listener() { return ctx.applyFilters(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "button", 15);
            i0.ɵɵlistener("click", function TransactionsComponent_Template_button_click_23_listener() { return ctx.resetFilters(); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(24, "div", 16)(25, "p-table", 17);
            i0.ɵɵtemplate(26, TransactionsComponent_ng_template_26_Template, 30, 0, "ng-template", 18)(27, TransactionsComponent_ng_template_27_Template, 26, 11, "ng-template", 19)(28, TransactionsComponent_ng_template_28_Template, 5, 0, "ng-template", 20);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(29, "p-dialog", 21);
            i0.ɵɵtwoWayListener("visibleChange", function TransactionsComponent_Template_p_dialog_visibleChange_29_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.detailVisible, $event) || (ctx.detailVisible = $event); return $event; });
            i0.ɵɵtemplate(30, TransactionsComponent_div_30_Template, 80, 17, "div", 22);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(12);
            i0.ɵɵtextInterpolate1("", ctx.filtered.length, " transactions");
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1("", ctx.formatAmt(ctx.totalFraud()), " total fraud");
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.searchQuery);
            i0.ɵɵadvance();
            i0.ɵɵproperty("options", ctx.riskOptions);
            i0.ɵɵtwoWayProperty("ngModel", ctx.selectedRisk);
            i0.ɵɵproperty("showClear", true);
            i0.ɵɵadvance();
            i0.ɵɵproperty("options", ctx.statusOptions);
            i0.ɵɵtwoWayProperty("ngModel", ctx.selectedStatus);
            i0.ɵɵproperty("showClear", true);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("value", ctx.filtered)("paginator", true)("rows", 10)("rowHover", true)("showCurrentPageReport", true);
            i0.ɵɵadvance(4);
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(20, _c0));
            i0.ɵɵtwoWayProperty("visible", ctx.detailVisible);
            i0.ɵɵproperty("modal", true)("draggable", false);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.selectedTx);
        } }, dependencies: [CommonModule, i3.NgIf, FormsModule, i4.DefaultValueAccessor, i4.NgControlStatus, i4.NgModel, TableModule, i5.Table, i2.PrimeTemplate, i5.SortableColumn, i5.SortIcon, TagModule, i6.Tag, DropdownModule, i7.Dropdown, InputTextModule, i8.InputText, ButtonModule, i9.ButtonDirective, DialogModule, i10.Dialog, ToastModule, i11.Toast, TooltipModule, i12.Tooltip], styles: [".page-header[_ngcontent-%COMP%] { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; gap: 12px; flex-wrap: wrap; }\n.header-kpis[_ngcontent-%COMP%] { display: flex; gap: 10px; flex-wrap: wrap; }\n.mini-kpi[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 8px; padding: 8px 16px; border-radius: 10px; font-size: 13px; font-weight: 600;\n  &.red    { background: #fde8e8; color: #c62828; border: 1px solid #ef9a9a; }\n  &.orange { background: #fff3e0; color: #e65100; border: 1px solid #ffcc80; }\n  i { font-size: 14px; }\n}\n.filters-bar[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 12px; padding: 16px; margin-bottom: 16px; flex-wrap: wrap; }\n.filter-search[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 8px; background: var(--bg-page); border: 1px solid var(--border); border-radius: 9px; padding: 0 14px; flex: 1; min-width: 200px; height: 38px;\n  i { color: var(--text-muted); font-size: 13px; flex-shrink: 0; }\n}\n.search-inp[_ngcontent-%COMP%] { background: none; border: none; outline: none; flex: 1; font-size: 13px; font-family: var(--font-body); }\n  .filter-drop .p-dropdown { height: 38px; border-radius: 9px; font-size: 13px; }\n.reset-btn[_ngcontent-%COMP%] { height: 38px !important; }\n\n.table-card[_ngcontent-%COMP%] { padding: 0; overflow: hidden; }\n.merchant-cell[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 7px; font-weight: 500; i { color: var(--text-muted); font-size: 12px; } }\n.cat-chip[_ngcontent-%COMP%] { background: var(--primary-bg); color: var(--primary-dark); padding: 2px 9px; border-radius: 6px; font-size: 11px; font-weight: 500; white-space: nowrap; }\n.amt[_ngcontent-%COMP%]   { color: var(--primary-dark); }\n.mono[_ngcontent-%COMP%]  { font-family: var(--font-mono); font-size: 12px; }\n.muted[_ngcontent-%COMP%] { color: var(--text-muted); }\n.small[_ngcontent-%COMP%] { font-size: 11px; }\n.action-btns[_ngcontent-%COMP%] { display: flex; gap: 4px; }\n.empty-msg[_ngcontent-%COMP%] { text-align: center; padding: 40px !important; color: var(--text-muted); i { font-size: 28px; margin-bottom: 8px; display: block; } }\n\n.detail-body[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 14px; }\n.detail-row[_ngcontent-%COMP%] { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--border-light); font-size: 13px;\n  span:first-child { color: var(--text-secondary); font-weight: 500; }\n  &:last-child { border: none; }\n}\n.detail-row[_ngcontent-%COMP%]   .amt[_ngcontent-%COMP%] { color: var(--primary-dark); font-size: 15px; font-family: var(--font-mono); }"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TransactionsComponent, [{
        type: Component,
        args: [{ selector: 'app-transactions', standalone: true, imports: [CommonModule, FormsModule, TableModule, TagModule, DropdownModule, InputTextModule, ButtonModule, DialogModule, ToastModule, TooltipModule], providers: [MessageService], template: "<p-toast></p-toast>\n<div class=\"page-wrapper\">\n  <div class=\"page-header fade-in-up\">\n    <div>\n      <h1 class=\"page-title\">Fraud Transactions</h1>\n      <p class=\"page-sub\">Monitor and investigate suspicious credit card transactions in real time</p>\n    </div>\n    <div class=\"header-kpis\">\n      <div class=\"mini-kpi red\">\n        <i class=\"fas fa-triangle-exclamation\"></i>\n        <span>{{ filtered.length }} transactions</span>\n      </div>\n      <div class=\"mini-kpi orange\">\n        <i class=\"fas fa-sack-dollar\"></i>\n        <span>{{ formatAmt(totalFraud()) }} total fraud</span>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"filters-bar card fade-in-up d1\">\n    <div class=\"filter-search p-input-icon-left\">\n      <i class=\"fas fa-search\"></i>\n      <input pInputText type=\"text\" [(ngModel)]=\"searchQuery\" (input)=\"applyFilters()\" placeholder=\"Search ID, sender, receiver, account...\" class=\"search-inp w-full\" />\n    </div>\n    <p-dropdown [options]=\"riskOptions\" [(ngModel)]=\"selectedRisk\" (onChange)=\"applyFilters()\" optionLabel=\"label\" optionValue=\"value\" [showClear]=\"true\" placeholder=\"Filter by risk\" styleClass=\"filter-drop\"></p-dropdown>\n    <p-dropdown [options]=\"statusOptions\" [(ngModel)]=\"selectedStatus\" (onChange)=\"applyFilters()\" optionLabel=\"label\" optionValue=\"value\" [showClear]=\"true\" placeholder=\"Filter by status\" styleClass=\"filter-drop\"></p-dropdown>\n    <button pButton label=\"Reset\" icon=\"fas fa-rotate-left\" class=\"p-button-outlined p-button-sm reset-btn\" (click)=\"resetFilters()\"></button>\n  </div>\n\n  <div class=\"card table-card fade-in-up d2\">\n    <p-table [value]=\"filtered\" [paginator]=\"true\" [rows]=\"10\" [rowHover]=\"true\"\n      [showCurrentPageReport]=\"true\" currentPageReportTemplate=\"Showing {first}-{last} of {totalRecords}\">\n      <ng-template pTemplate=\"header\">\n        <tr>\n          <th pSortableColumn=\"id\">#<p-sortIcon field=\"id\"></p-sortIcon></th>\n          <th pSortableColumn=\"transactionId\">Transaction <p-sortIcon field=\"transactionId\"></p-sortIcon></th>\n          <th pSortableColumn=\"senderName\">Sender <p-sortIcon field=\"senderName\"></p-sortIcon></th>\n          <th pSortableColumn=\"receiverName\">Receiver <p-sortIcon field=\"receiverName\"></p-sortIcon></th>\n          <th pSortableColumn=\"channel\">Channel <p-sortIcon field=\"channel\"></p-sortIcon></th>\n          <th pSortableColumn=\"amount\">Amount <p-sortIcon field=\"amount\"></p-sortIcon></th>\n          <th pSortableColumn=\"riskScore\">Risk Score <p-sortIcon field=\"riskScore\"></p-sortIcon></th>\n          <th pSortableColumn=\"status\">Status <p-sortIcon field=\"status\"></p-sortIcon></th>\n          <th pSortableColumn=\"createdAt\">Date <p-sortIcon field=\"createdAt\"></p-sortIcon></th>\n          <th>Actions</th>\n        </tr>\n      </ng-template>\n      <ng-template pTemplate=\"body\" let-t>\n        <tr>\n          <td class=\"mono muted\">#{{ t.id }}</td>\n          <td class=\"mono\">{{ t.transactionId }}</td>\n          <td><i class=\"fas fa-user-tie\"></i> {{ t.senderName }}</td>\n          <td>{{ t.receiverName }}</td>\n          <td><span class=\"cat-chip\">{{ t.channel }}</span></td>\n          <td class=\"mono amt\"><strong>{{ formatAmt(t.amount) }}</strong></td>\n          <td class=\"mono\">{{ t.riskScore }}</td>\n          <td><p-tag [value]=\"t.status\" [severity]=\"getStatusSeverity(t.status)\"></p-tag></td>\n          <td class=\"mono muted small\">{{ formatDate(t.createdAt) }}</td>\n          <td>\n            <div class=\"action-btns\">\n              <button pButton icon=\"fas fa-eye\" class=\"p-button-text p-button-sm\" (click)=\"viewDetail(t)\" pTooltip=\"View detail\"></button>\n              <button pButton icon=\"fas fa-check\" class=\"p-button-text p-button-sm p-button-success\" (click)=\"markLegitimate(t)\" pTooltip=\"Mark legitimate\" *ngIf=\"t.status !== 'NORMAL'\"></button>\n            </div>\n          </td>\n        </tr>\n      </ng-template>\n      <ng-template pTemplate=\"emptymessage\">\n        <tr>\n          <td colspan=\"10\" class=\"empty-msg\"><i class=\"fas fa-inbox\"></i><br>No transactions match your filters</td>\n        </tr>\n      </ng-template>\n    </p-table>\n  </div>\n</div>\n\n<p-dialog [(visible)]=\"detailVisible\" [modal]=\"true\" header=\"Transaction Details\" [style]=\"{width:'520px'}\" [draggable]=\"false\">\n  <div class=\"detail-body\" *ngIf=\"selectedTx\">\n    <div class=\"detail-row\"><span>Transaction ID</span><strong class=\"mono\">{{ selectedTx.transactionId }}</strong></div>\n    <div class=\"detail-row\"><span>Sender</span><strong>{{ selectedTx.senderName }}</strong></div>\n    <div class=\"detail-row\"><span>Sender Account</span><span class=\"mono\">{{ maskAccount(selectedTx.senderAccount) }}</span></div>\n    <div class=\"detail-row\"><span>Receiver</span><strong>{{ selectedTx.receiverName }}</strong></div>\n    <div class=\"detail-row\"><span>Receiver Account</span><span class=\"mono\">{{ maskAccount(selectedTx.receiverAccount) }}</span></div>\n    <div class=\"detail-row\"><span>Type</span><span class=\"cat-chip\">{{ selectedTx.transactionType }}</span></div>\n    <div class=\"detail-row\"><span>Channel</span><span class=\"cat-chip\">{{ selectedTx.channel }}</span></div>\n    <div class=\"detail-row\"><span>Amount</span><strong class=\"amt\">{{ formatAmt(selectedTx.amount) }}</strong></div>\n    <div class=\"detail-row\"><span>Risk Score</span><strong>{{ selectedTx.riskScore }}</strong></div>\n    <div class=\"detail-row\"><span>Risk Level</span><span class=\"cat-chip\">{{ selectedTx.riskLevel }}</span></div>\n    <div class=\"detail-row\"><span>Status</span><p-tag [value]=\"selectedTx.status\" [severity]=\"getStatusSeverity(selectedTx.status)\"></p-tag></div>\n    <div class=\"detail-row\"><span>Location</span><span>{{ selectedTx.location }}</span></div>\n    <div class=\"detail-row\"><span>Device ID</span><span class=\"mono muted small\">{{ selectedTx.deviceId }}</span></div>\n    <div class=\"detail-row\"><span>IP Address</span><span class=\"mono muted small\">{{ selectedTx.ipAddress }}</span></div>\n    <div class=\"detail-row\"><span>Failed Attempts</span><strong>{{ selectedTx.failedAttempts }}</strong></div>\n    <div class=\"detail-row\"><span>Date</span><span class=\"mono\">{{ formatDate(selectedTx.createdAt) }}</span></div>\n  </div>\n</p-dialog>\n", styles: [".page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; gap: 12px; flex-wrap: wrap; }\n.header-kpis { display: flex; gap: 10px; flex-wrap: wrap; }\n.mini-kpi { display: flex; align-items: center; gap: 8px; padding: 8px 16px; border-radius: 10px; font-size: 13px; font-weight: 600;\n  &.red    { background: #fde8e8; color: #c62828; border: 1px solid #ef9a9a; }\n  &.orange { background: #fff3e0; color: #e65100; border: 1px solid #ffcc80; }\n  i { font-size: 14px; }\n}\n.filters-bar { display: flex; align-items: center; gap: 12px; padding: 16px; margin-bottom: 16px; flex-wrap: wrap; }\n.filter-search { display: flex; align-items: center; gap: 8px; background: var(--bg-page); border: 1px solid var(--border); border-radius: 9px; padding: 0 14px; flex: 1; min-width: 200px; height: 38px;\n  i { color: var(--text-muted); font-size: 13px; flex-shrink: 0; }\n}\n.search-inp { background: none; border: none; outline: none; flex: 1; font-size: 13px; font-family: var(--font-body); }\n::ng-deep .filter-drop .p-dropdown { height: 38px; border-radius: 9px; font-size: 13px; }\n.reset-btn { height: 38px !important; }\n\n.table-card { padding: 0; overflow: hidden; }\n.merchant-cell { display: flex; align-items: center; gap: 7px; font-weight: 500; i { color: var(--text-muted); font-size: 12px; } }\n.cat-chip { background: var(--primary-bg); color: var(--primary-dark); padding: 2px 9px; border-radius: 6px; font-size: 11px; font-weight: 500; white-space: nowrap; }\n.amt   { color: var(--primary-dark); }\n.mono  { font-family: var(--font-mono); font-size: 12px; }\n.muted { color: var(--text-muted); }\n.small { font-size: 11px; }\n.action-btns { display: flex; gap: 4px; }\n.empty-msg { text-align: center; padding: 40px !important; color: var(--text-muted); i { font-size: 28px; margin-bottom: 8px; display: block; } }\n\n.detail-body { display: flex; flex-direction: column; gap: 14px; }\n.detail-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--border-light); font-size: 13px;\n  span:first-child { color: var(--text-secondary); font-weight: 500; }\n  &:last-child { border: none; }\n}\n.detail-row .amt { color: var(--primary-dark); font-size: 15px; font-family: var(--font-mono); }\n"] }]
    }], () => [{ type: i1.FraudService }, { type: i2.MessageService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TransactionsComponent, { className: "TransactionsComponent", filePath: "src/app/pages/transactions/transactions.component.ts", lineNumber: 24 }); })();
//# sourceMappingURL=transactions.component.js.map