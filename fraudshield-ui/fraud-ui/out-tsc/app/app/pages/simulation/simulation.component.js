import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { MessageService } from 'primeng/api';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../core/services/fraud.service";
import * as i3 from "primeng/api";
import * as i4 from "@angular/common";
import * as i5 from "primeng/dropdown";
import * as i6 from "primeng/inputnumber";
import * as i7 from "primeng/inputtext";
import * as i8 from "primeng/button";
import * as i9 from "primeng/toast";
import * as i10 from "primeng/tag";
function SimulationComponent_button_15_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 34);
    i0.ɵɵlistener("click", function SimulationComponent_button_15_Template_button_click_0_listener() { const preset_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.applyPreset(preset_r2)); });
    i0.ɵɵelement(1, "i");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const preset_r2 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵclassMap(preset_r2.icon);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", preset_r2.label, " ");
} }
function SimulationComponent_div_76_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 35)(1, "div", 36);
    i0.ɵɵelement(2, "i", 37);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4, "Ready to hit the backend");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Use one of the presets or enter the transaction fields manually, then submit the payload to `/fraud/check`.");
    i0.ɵɵelementEnd()();
} }
function SimulationComponent_div_77_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 38)(1, "div", 39);
    i0.ɵɵelement(2, "div", 40)(3, "div", 41)(4, "div", 42);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h3");
    i0.ɵɵtext(6, "Calling backend fraud engine...");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p");
    i0.ɵɵtext(8, "Waiting for Spring Boot to evaluate the transaction and return risk metadata.");
    i0.ɵɵelementEnd()();
} }
function SimulationComponent_ng_container_78_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 43)(2, "div", 44)(3, "div", 45);
    i0.ɵɵelement(4, "i", 46);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 47);
    i0.ɵɵtext(6, "Transaction ID");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 48);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 44)(10, "div", 49);
    i0.ɵɵelement(11, "i", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 47);
    i0.ɵɵtext(13, "Risk Score");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 51);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "div", 44)(17, "div", 52);
    i0.ɵɵelement(18, "i", 53);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "div", 47);
    i0.ɵɵtext(20, "Risk Level");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "div", 54);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "div", 44)(24, "div", 55);
    i0.ɵɵelement(25, "i", 56);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "div", 47);
    i0.ɵɵtext(27, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "div", 54);
    i0.ɵɵelement(29, "p-tag", 57);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(30, "div", 58)(31, "div", 59)(32, "div", 60);
    i0.ɵɵelement(33, "i", 61);
    i0.ɵɵtext(34, " Score Interpretation ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(35, "div", 62);
    i0.ɵɵelement(36, "div", 63);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "div", 64)(38, "span");
    i0.ɵɵtext(39, "0");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "span");
    i0.ɵɵtext(41, "60");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "span");
    i0.ɵɵtext(43, "120+");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(44, "p", 65);
    i0.ɵɵtext(45);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(46, "div", 66)(47, "div", 59)(48, "div", 60);
    i0.ɵɵelement(49, "i", 67);
    i0.ɵɵtext(50, " Backend Response ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(51, "div", 68)(52, "div", 69)(53, "span");
    i0.ɵɵtext(54, "Sender");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(55, "strong");
    i0.ɵɵtext(56);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(57, "div", 69)(58, "span");
    i0.ɵɵtext(59, "Receiver");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(60, "strong");
    i0.ɵɵtext(61);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(62, "div", 69)(63, "span");
    i0.ɵɵtext(64, "Channel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(65, "strong");
    i0.ɵɵtext(66);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(67, "div", 69)(68, "span");
    i0.ɵɵtext(69, "Type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(70, "strong");
    i0.ɵɵtext(71);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(72, "div", 69)(73, "span");
    i0.ɵɵtext(74, "Amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(75, "strong");
    i0.ɵɵtext(76);
    i0.ɵɵpipe(77, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(78, "div", 69)(79, "span");
    i0.ɵɵtext(80, "Created At");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(81, "strong");
    i0.ɵɵtext(82);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(83, "pre", 70);
    i0.ɵɵtext(84);
    i0.ɵɵpipe(85, "json");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const tx_r4 = ctx.ngIf;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(tx_r4.transactionId);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(tx_r4.riskScore);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(tx_r4.riskLevel);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("red", tx_r4.status === "FRAUD")("green", tx_r4.status === "NORMAL")("orange", tx_r4.status === "SUSPICIOUS");
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("value", tx_r4.status)("severity", ctx_r2.getStatusSeverity(tx_r4.status));
    i0.ɵɵadvance(7);
    i0.ɵɵstyleProp("width", ctx_r2.scoreWidth(tx_r4.riskScore), "%");
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate(ctx_r2.recommendation(tx_r4));
    i0.ɵɵadvance(11);
    i0.ɵɵtextInterpolate(tx_r4.senderName);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(tx_r4.receiverName);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(tx_r4.channel);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(tx_r4.transactionType);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(77, 21, tx_r4.amount, "1.2-2"));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(tx_r4.date);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(85, 24, tx_r4));
} }
export class SimulationComponent {
    constructor(fb, fraudService, messageService) {
        this.fb = fb;
        this.fraudService = fraudService;
        this.messageService = messageService;
        this.destroyRef = inject(DestroyRef);
        this.ipPattern = /^((25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(25[0-5]|2[0-4]\d|1?\d?\d)$/;
        this.loading = signal(false);
        this.result = signal(null);
        this.typeOptions = [
            { label: 'Debit', value: 'DEBIT' },
            { label: 'Credit', value: 'CREDIT' }
        ];
        this.channelOptions = [
            { label: 'Online', value: 'ONLINE' },
            { label: 'ATM', value: 'ATM' },
            { label: 'UPI', value: 'UPI' },
            { label: 'POS', value: 'POS' }
        ];
        this.presets = [
            {
                label: 'Normal Purchase',
                icon: 'fas fa-cart-shopping',
                patch: {
                    senderName: 'Rahul Sharma',
                    senderAccount: 'ACC1025',
                    receiverName: 'QuickPay Merchant',
                    receiverAccount: 'ACC5099',
                    transactionType: 'DEBIT',
                    amount: 1250,
                    channel: 'POS',
                    location: 'Mumbai',
                    deviceId: 'DEV-1140',
                    ipAddress: '192.168.1.18',
                    failedAttempts: 0
                }
            },
            {
                label: 'Odd Hour',
                icon: 'fas fa-moon',
                patch: {
                    senderName: 'Nisha Kapoor',
                    senderAccount: 'ACC2048',
                    receiverName: 'Night Transfer',
                    receiverAccount: 'ACC8801',
                    transactionType: 'DEBIT',
                    amount: 68000,
                    channel: 'ONLINE',
                    location: 'Delhi',
                    deviceId: 'DEV-2209',
                    ipAddress: '10.0.2.15',
                    failedAttempts: 2,
                    createdAt: '2026-03-19T02:15'
                }
            },
            {
                label: 'High Value',
                icon: 'fas fa-sack-dollar',
                patch: {
                    senderName: 'Arjun Mehta',
                    senderAccount: 'ACC7788',
                    receiverName: 'Enterprise Vendor',
                    receiverAccount: 'ACC9922',
                    transactionType: 'DEBIT',
                    amount: 1500000,
                    channel: 'ONLINE',
                    location: 'Bengaluru',
                    deviceId: 'DEV-9901',
                    ipAddress: '172.16.0.12',
                    failedAttempts: 4
                }
            }
        ];
        this.form = this.fb.nonNullable.group({
            transactionId: [''],
            senderName: ['Rahul Sharma', [Validators.required, Validators.maxLength(80)]],
            senderAccount: ['ACC1025', [Validators.required, Validators.minLength(6)]],
            receiverName: ['QuickPay Merchant', [Validators.required, Validators.maxLength(80)]],
            receiverAccount: ['ACC5099', [Validators.required, Validators.minLength(6)]],
            transactionType: ['DEBIT', Validators.required],
            amount: [1250, [Validators.required, Validators.min(1)]],
            channel: ['POS', Validators.required],
            location: ['Mumbai', [Validators.required, Validators.maxLength(60)]],
            deviceId: ['DEV-1140', [Validators.required, Validators.maxLength(60)]],
            ipAddress: ['192.168.1.18', [Validators.required, Validators.pattern(this.ipPattern)]],
            failedAttempts: [0, [Validators.required, Validators.min(0), Validators.max(20)]],
            createdAt: ['']
        });
    }
    applyPreset(preset) {
        this.form.patchValue({
            transactionId: '',
            senderName: preset.patch.senderName ?? this.form.controls.senderName.value,
            senderAccount: preset.patch.senderAccount ?? this.form.controls.senderAccount.value,
            receiverName: preset.patch.receiverName ?? this.form.controls.receiverName.value,
            receiverAccount: preset.patch.receiverAccount ?? this.form.controls.receiverAccount.value,
            transactionType: preset.patch.transactionType ?? this.form.controls.transactionType.value,
            amount: preset.patch.amount ?? this.form.controls.amount.value,
            channel: preset.patch.channel ?? this.form.controls.channel.value,
            location: preset.patch.location ?? this.form.controls.location.value,
            deviceId: preset.patch.deviceId ?? this.form.controls.deviceId.value,
            ipAddress: preset.patch.ipAddress ?? this.form.controls.ipAddress.value,
            failedAttempts: preset.patch.failedAttempts ?? this.form.controls.failedAttempts.value,
            createdAt: preset.patch.createdAt ?? ''
        });
        this.result.set(null);
    }
    runFraudCheck() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            this.messageService.add({
                severity: 'warn',
                summary: 'Check the form',
                detail: 'Fill the required transaction fields before submitting.'
            });
            return;
        }
        this.loading.set(true);
        this.fraudService
            .checkFraud(this.buildPayload())
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (transaction) => {
                this.result.set(transaction);
                this.loading.set(false);
                this.messageService.add({
                    severity: transaction.status === 'FRAUD' ? 'error' : transaction.status === 'SUSPICIOUS' ? 'warn' : 'success',
                    summary: `Status: ${transaction.status}`,
                    detail: `${transaction.transactionId} returned risk score ${transaction.riskScore}.`
                });
            },
            error: (error) => {
                this.loading.set(false);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Fraud check failed',
                    detail: error instanceof Error ? error.message : 'Backend request failed.'
                });
            }
        });
    }
    getStatusSeverity(status) {
        switch (status) {
            case 'NORMAL':
                return 'success';
            case 'SUSPICIOUS':
                return 'warning';
            case 'FRAUD':
                return 'danger';
            default:
                return 'secondary';
        }
    }
    scoreWidth(score) {
        return Math.min(score, 150) / 150 * 100;
    }
    recommendation(transaction) {
        if (transaction.status === 'FRAUD') {
            return 'Block the payment, raise an alert, and verify the sender before allowing any retry.';
        }
        if (transaction.status === 'SUSPICIOUS') {
            return 'Step up authentication and review recent activity on the sender account.';
        }
        return 'Transaction looks normal based on the current rule and model response.';
    }
    buildPayload() {
        const value = this.form.getRawValue();
        return {
            transactionId: value.transactionId.trim() || undefined,
            senderName: value.senderName.trim(),
            senderAccount: value.senderAccount.trim(),
            receiverName: value.receiverName.trim(),
            receiverAccount: value.receiverAccount.trim(),
            transactionType: value.transactionType,
            amount: Number(value.amount),
            channel: value.channel,
            location: value.location.trim(),
            deviceId: value.deviceId.trim(),
            ipAddress: value.ipAddress.trim(),
            failedAttempts: Number(value.failedAttempts),
            createdAt: value.createdAt.trim() || undefined
        };
    }
    static { this.ɵfac = function SimulationComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SimulationComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.FraudService), i0.ɵɵdirectiveInject(i3.MessageService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SimulationComponent, selectors: [["app-simulation"]], features: [i0.ɵɵProvidersFeature([MessageService])], decls: 79, vars: 14, consts: [[1, "page-wrapper"], [1, "page-header", "fade-in-up"], [1, "page-title"], [1, "page-sub"], [1, "sim-layout"], [1, "card", "sim-config", "fade-in-left"], [1, "config-title"], [1, "fas", "fa-terminal"], [1, "preset-row"], ["type", "button", "class", "preset-btn", 3, "click", 4, "ngFor", "ngForOf"], [3, "ngSubmit", "formGroup"], [1, "form-grid"], [1, "form-group", "span-2"], [1, "form-label"], [1, "muted", "small"], ["pInputText", "", "type", "text", "formControlName", "transactionId", "placeholder", "Leave blank to let the backend generate one", 1, "w-full"], [1, "form-group"], ["pInputText", "", "type", "text", "formControlName", "senderName", "placeholder", "Enter sender name", 1, "w-full"], ["pInputText", "", "type", "text", "formControlName", "senderAccount", "placeholder", "ACC1025", 1, "w-full"], ["pInputText", "", "type", "text", "formControlName", "receiverName", "placeholder", "Merchant or receiver name", 1, "w-full"], ["pInputText", "", "type", "text", "formControlName", "receiverAccount", "placeholder", "ACC5099", 1, "w-full"], ["formControlName", "transactionType", "optionLabel", "label", "optionValue", "value", "styleClass", "w-full", "placeholder", "Select type", 3, "options"], ["formControlName", "channel", "optionLabel", "label", "optionValue", "value", "styleClass", "w-full", "placeholder", "Select channel", 3, "options"], ["formControlName", "amount", "mode", "decimal", "inputStyleClass", "w-full", "styleClass", "w-full", 3, "min", "minFractionDigits", "maxFractionDigits"], ["formControlName", "failedAttempts", "inputStyleClass", "w-full", "styleClass", "w-full", 3, "min", "max"], ["pInputText", "", "type", "text", "formControlName", "location", "placeholder", "City or region", 1, "w-full"], ["pInputText", "", "type", "text", "formControlName", "deviceId", "placeholder", "DEV-1140", 1, "w-full"], ["pInputText", "", "type", "text", "formControlName", "ipAddress", "placeholder", "192.168.1.18", 1, "w-full"], ["pInputText", "", "type", "datetime-local", "formControlName", "createdAt", 1, "w-full"], ["pButton", "", "type", "submit", "icon", "fas fa-shield-halved", 1, "w-full", "p-button-primary", "run-btn", 3, "label", "loading"], [1, "sim-results"], ["class", "card empty-state scale-in", 4, "ngIf"], ["class", "card running-state scale-in", 4, "ngIf"], [4, "ngIf"], ["type", "button", 1, "preset-btn", 3, "click"], [1, "card", "empty-state", "scale-in"], [1, "empty-icon"], [1, "fas", "fa-plug-circle-check"], [1, "card", "running-state", "scale-in"], [1, "spin-rings"], [1, "ring", "r1"], [1, "ring", "r2"], [1, "ring", "r3"], [1, "result-kpis", "fade-in-up"], [1, "result-kpi"], [1, "rk-icon", "teal"], [1, "fas", "fa-hashtag"], [1, "rk-label"], [1, "rk-value", "mono-text"], [1, "rk-icon", "blue"], [1, "fas", "fa-gauge-high"], [1, "rk-value", "blue-text"], [1, "rk-icon", "orange"], [1, "fas", "fa-layer-group"], [1, "rk-value"], [1, "rk-icon"], [1, "fas", "fa-shield-halved"], [3, "value", "severity"], [1, "card", "chart-card", "fade-in-up", "d2"], [1, "chart-card-header"], [1, "chart-card-title"], [1, "fas", "fa-wave-square"], [1, "score-track"], [1, "score-fill"], [1, "score-scale"], [1, "rec-text"], [1, "card", "response-card", "fade-in-up", "d3"], [1, "fas", "fa-code"], [1, "detail-grid"], [1, "detail-item"], [1, "response-json"]], template: function SimulationComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "p-toast");
            i0.ɵɵelementStart(1, "div", 0)(2, "div", 1)(3, "div")(4, "h1", 2);
            i0.ɵɵtext(5, "Fraud Check Console");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p", 3);
            i0.ɵɵtext(7, "Submit a transaction payload to your Spring `/fraud/check` endpoint and inspect the response live.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(8, "div", 4)(9, "div", 5)(10, "div", 6);
            i0.ɵɵelement(11, "i", 7);
            i0.ɵɵelementStart(12, "span");
            i0.ɵɵtext(13, "Backend Transaction Payload");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "div", 8);
            i0.ɵɵtemplate(15, SimulationComponent_button_15_Template, 3, 3, "button", 9);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "form", 10);
            i0.ɵɵlistener("ngSubmit", function SimulationComponent_Template_form_ngSubmit_16_listener() { return ctx.runFraudCheck(); });
            i0.ɵɵelementStart(17, "div", 11)(18, "div", 12)(19, "label", 13);
            i0.ɵɵtext(20, "Transaction ID ");
            i0.ɵɵelementStart(21, "span", 14);
            i0.ɵɵtext(22, "(optional)");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(23, "input", 15);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "div", 16)(25, "label", 13);
            i0.ɵɵtext(26, "Sender Name");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(27, "input", 17);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "div", 16)(29, "label", 13);
            i0.ɵɵtext(30, "Sender Account");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(31, "input", 18);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "div", 16)(33, "label", 13);
            i0.ɵɵtext(34, "Receiver Name");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(35, "input", 19);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "div", 16)(37, "label", 13);
            i0.ɵɵtext(38, "Receiver Account");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(39, "input", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(40, "div", 16)(41, "label", 13);
            i0.ɵɵtext(42, "Transaction Type");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(43, "p-dropdown", 21);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "div", 16)(45, "label", 13);
            i0.ɵɵtext(46, "Channel");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(47, "p-dropdown", 22);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(48, "div", 16)(49, "label", 13);
            i0.ɵɵtext(50, "Amount");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(51, "p-inputNumber", 23);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(52, "div", 16)(53, "label", 13);
            i0.ɵɵtext(54, "Failed Attempts");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(55, "p-inputNumber", 24);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(56, "div", 16)(57, "label", 13);
            i0.ɵɵtext(58, "Location");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(59, "input", 25);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(60, "div", 16)(61, "label", 13);
            i0.ɵɵtext(62, "Device ID");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(63, "input", 26);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(64, "div", 16)(65, "label", 13);
            i0.ɵɵtext(66, "IP Address");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(67, "input", 27);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(68, "div", 16)(69, "label", 13);
            i0.ɵɵtext(70, "Created At ");
            i0.ɵɵelementStart(71, "span", 14);
            i0.ɵɵtext(72, "(optional)");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(73, "input", 28);
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(74, "button", 29);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(75, "div", 30);
            i0.ɵɵtemplate(76, SimulationComponent_div_76_Template, 7, 0, "div", 31)(77, SimulationComponent_div_77_Template, 9, 0, "div", 32)(78, SimulationComponent_ng_container_78_Template, 86, 26, "ng-container", 33);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(15);
            i0.ɵɵproperty("ngForOf", ctx.presets);
            i0.ɵɵadvance();
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(27);
            i0.ɵɵproperty("options", ctx.typeOptions);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.channelOptions);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("min", 1)("minFractionDigits", 2)("maxFractionDigits", 2);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("min", 0)("max", 20);
            i0.ɵɵadvance(19);
            i0.ɵɵproperty("label", ctx.loading() ? "Checking..." : "Check Fraud")("loading", ctx.loading());
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", !ctx.result() && !ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.result());
        } }, dependencies: [CommonModule, i4.NgForOf, i4.NgIf, i4.JsonPipe, i4.DecimalPipe, ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, DropdownModule, i5.Dropdown, InputNumberModule, i6.InputNumber, InputTextModule, i7.InputText, ButtonModule, i8.ButtonDirective, ToastModule, i9.Toast, TagModule, i10.Tag], styles: [".page-header[_ngcontent-%COMP%] { margin-bottom: 20px; }\n.sim-layout[_ngcontent-%COMP%] { display: grid; grid-template-columns: minmax(320px, 560px) minmax(320px, 1fr); gap: 20px; align-items: start; }\n\n.sim-config[_ngcontent-%COMP%] { padding: 24px; }\n.config-title[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 10px; font-size: 15px; font-weight: 700; margin-bottom: 20px; }\n.config-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] { color: var(--primary); font-size: 16px; }\n\n.preset-row[_ngcontent-%COMP%] { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }\n.preset-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 7px 12px;\n  border-radius: 8px;\n  border: 1px solid var(--border);\n  background: var(--bg-page);\n  color: var(--text-secondary);\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n  font-family: var(--font-body);\n}\n.preset-btn[_ngcontent-%COMP%]:hover {\n  background: var(--primary-bg);\n  border-color: var(--primary-light);\n  color: var(--primary-dark);\n}\n\n.form-grid[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }\n.form-group[_ngcontent-%COMP%] { margin-bottom: 2px; }\n.span-2[_ngcontent-%COMP%] { grid-column: span 2; }\n.run-btn[_ngcontent-%COMP%] { height: 44px !important; margin-top: 18px; font-size: 15px !important; }\n\n  .sim-config .p-dropdown, \n  .sim-config .p-inputnumber, \n  .sim-config .p-inputtext {\n  width: 100%;\n}\n\n.sim-results[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 16px; min-width: 0; }\n\n.empty-state[_ngcontent-%COMP%] { padding: 48px 32px; text-align: center; }\n.empty-icon[_ngcontent-%COMP%] {\n  width: 72px;\n  height: 72px;\n  border-radius: 20px;\n  background: var(--primary-bg);\n  color: var(--primary);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 28px;\n  margin: 0 auto 20px;\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { font-size: 1.2rem; margin-bottom: 8px; }\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { color: var(--text-secondary); font-size: 13px; }\n\n.running-state[_ngcontent-%COMP%] { padding: 48px; text-align: center; }\n.spin-rings[_ngcontent-%COMP%] { position: relative; width: 72px; height: 72px; margin: 0 auto 24px; }\n.ring[_ngcontent-%COMP%] { position: absolute; inset: 0; border-radius: 50%; border: 2.5px solid transparent; }\n.r1[_ngcontent-%COMP%] { border-top-color: var(--primary); animation: _ngcontent-%COMP%_spin 1.1s linear infinite; }\n.r2[_ngcontent-%COMP%] { inset: 10px; border-top-color: var(--primary-light); animation: _ngcontent-%COMP%_spin 1.6s linear infinite reverse; }\n.r3[_ngcontent-%COMP%] { inset: 20px; border-top-color: #b2dfdb; animation: _ngcontent-%COMP%_spin 2s linear infinite; }\n@keyframes _ngcontent-%COMP%_spin { to { transform: rotate(360deg); } }\n\n.result-kpis[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }\n.result-kpi[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border-radius: var(--radius-lg);\n  padding: 18px;\n  box-shadow: var(--shadow-card);\n  border: 1px solid var(--border-light);\n  text-align: center;\n}\n.rk-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 18px;\n  margin: 0 auto 10px;\n}\n.rk-icon.teal[_ngcontent-%COMP%] { background: var(--primary-bg); color: var(--primary); }\n.rk-icon.blue[_ngcontent-%COMP%] { background: #e3f2fd; color: var(--info); }\n.rk-icon.orange[_ngcontent-%COMP%] { background: #fff3e0; color: var(--warning); }\n.rk-icon.green[_ngcontent-%COMP%] { background: #e8f5e9; color: var(--success); }\n.rk-icon.red[_ngcontent-%COMP%] { background: #fde8e8; color: var(--danger); }\n.rk-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-muted);\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  margin-bottom: 6px;\n  font-family: var(--font-mono);\n}\n.rk-value[_ngcontent-%COMP%] { font-size: 1.15rem; font-weight: 800; font-family: var(--font-mono); }\n.mono-text[_ngcontent-%COMP%] { font-size: 0.9rem; word-break: break-word; }\n.blue-text[_ngcontent-%COMP%] { color: var(--info); }\n\n.score-track[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 12px;\n  border-radius: 999px;\n  background: linear-gradient(90deg, #e8f5e9 0%, #fff3e0 50%, #fde8e8 100%);\n  overflow: hidden;\n  margin-bottom: 10px;\n}\n.score-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  border-radius: inherit;\n  background: linear-gradient(90deg, var(--primary) 0%, var(--warning) 55%, var(--danger) 100%);\n}\n.score-scale[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  color: var(--text-muted);\n  font-size: 11px;\n  font-family: var(--font-mono);\n  margin-bottom: 14px;\n}\n\n.response-card[_ngcontent-%COMP%] { padding: 20px; }\n.detail-grid[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin-bottom: 16px; }\n.detail-item[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border: 1px solid var(--border-light);\n  border-radius: 10px;\n  padding: 12px;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.detail-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; }\n.detail-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { font-size: 13px; }\n.response-json[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 16px;\n  border-radius: 12px;\n  background: #0f172a;\n  color: #e2e8f0;\n  font-size: 12px;\n  line-height: 1.5;\n  overflow: auto;\n}\n\n.rec-text[_ngcontent-%COMP%] { font-size: 13px; color: var(--text-secondary); line-height: 1.6; }\n\n@media (max-width: 1080px) {\n  .sim-layout[_ngcontent-%COMP%] { grid-template-columns: 1fr; }\n  .result-kpis[_ngcontent-%COMP%] { grid-template-columns: repeat(2, minmax(0, 1fr)); }\n}\n\n@media (max-width: 640px) {\n  .form-grid[_ngcontent-%COMP%], \n   .detail-grid[_ngcontent-%COMP%], \n   .result-kpis[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .span-2[_ngcontent-%COMP%] { grid-column: span 1; }\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SimulationComponent, [{
        type: Component,
        args: [{ selector: 'app-simulation', standalone: true, imports: [CommonModule, ReactiveFormsModule, DropdownModule, InputNumberModule, InputTextModule, ButtonModule, ToastModule, TagModule], providers: [MessageService], template: "<p-toast></p-toast>\n<div class=\"page-wrapper\">\n  <div class=\"page-header fade-in-up\">\n    <div>\n      <h1 class=\"page-title\">Fraud Check Console</h1>\n      <p class=\"page-sub\">Submit a transaction payload to your Spring `/fraud/check` endpoint and inspect the response live.</p>\n    </div>\n  </div>\n\n  <div class=\"sim-layout\">\n    <div class=\"card sim-config fade-in-left\">\n      <div class=\"config-title\">\n        <i class=\"fas fa-terminal\"></i>\n        <span>Backend Transaction Payload</span>\n      </div>\n\n      <div class=\"preset-row\">\n        <button *ngFor=\"let preset of presets\" type=\"button\" class=\"preset-btn\" (click)=\"applyPreset(preset)\">\n          <i [class]=\"preset.icon\"></i> {{ preset.label }}\n        </button>\n      </div>\n\n      <form [formGroup]=\"form\" (ngSubmit)=\"runFraudCheck()\">\n        <div class=\"form-grid\">\n          <div class=\"form-group span-2\">\n            <label class=\"form-label\">Transaction ID <span class=\"muted small\">(optional)</span></label>\n            <input pInputText type=\"text\" formControlName=\"transactionId\" class=\"w-full\" placeholder=\"Leave blank to let the backend generate one\" />\n          </div>\n\n          <div class=\"form-group\">\n            <label class=\"form-label\">Sender Name</label>\n            <input pInputText type=\"text\" formControlName=\"senderName\" class=\"w-full\" placeholder=\"Enter sender name\" />\n          </div>\n\n          <div class=\"form-group\">\n            <label class=\"form-label\">Sender Account</label>\n            <input pInputText type=\"text\" formControlName=\"senderAccount\" class=\"w-full\" placeholder=\"ACC1025\" />\n          </div>\n\n          <div class=\"form-group\">\n            <label class=\"form-label\">Receiver Name</label>\n            <input pInputText type=\"text\" formControlName=\"receiverName\" class=\"w-full\" placeholder=\"Merchant or receiver name\" />\n          </div>\n\n          <div class=\"form-group\">\n            <label class=\"form-label\">Receiver Account</label>\n            <input pInputText type=\"text\" formControlName=\"receiverAccount\" class=\"w-full\" placeholder=\"ACC5099\" />\n          </div>\n\n          <div class=\"form-group\">\n            <label class=\"form-label\">Transaction Type</label>\n            <p-dropdown formControlName=\"transactionType\" [options]=\"typeOptions\" optionLabel=\"label\" optionValue=\"value\" styleClass=\"w-full\" placeholder=\"Select type\"></p-dropdown>\n          </div>\n\n          <div class=\"form-group\">\n            <label class=\"form-label\">Channel</label>\n            <p-dropdown formControlName=\"channel\" [options]=\"channelOptions\" optionLabel=\"label\" optionValue=\"value\" styleClass=\"w-full\" placeholder=\"Select channel\"></p-dropdown>\n          </div>\n\n          <div class=\"form-group\">\n            <label class=\"form-label\">Amount</label>\n            <p-inputNumber formControlName=\"amount\" mode=\"decimal\" [min]=\"1\" [minFractionDigits]=\"2\" [maxFractionDigits]=\"2\" inputStyleClass=\"w-full\" styleClass=\"w-full\"></p-inputNumber>\n          </div>\n\n          <div class=\"form-group\">\n            <label class=\"form-label\">Failed Attempts</label>\n            <p-inputNumber formControlName=\"failedAttempts\" [min]=\"0\" [max]=\"20\" inputStyleClass=\"w-full\" styleClass=\"w-full\"></p-inputNumber>\n          </div>\n\n          <div class=\"form-group\">\n            <label class=\"form-label\">Location</label>\n            <input pInputText type=\"text\" formControlName=\"location\" class=\"w-full\" placeholder=\"City or region\" />\n          </div>\n\n          <div class=\"form-group\">\n            <label class=\"form-label\">Device ID</label>\n            <input pInputText type=\"text\" formControlName=\"deviceId\" class=\"w-full\" placeholder=\"DEV-1140\" />\n          </div>\n\n          <div class=\"form-group\">\n            <label class=\"form-label\">IP Address</label>\n            <input pInputText type=\"text\" formControlName=\"ipAddress\" class=\"w-full\" placeholder=\"192.168.1.18\" />\n          </div>\n\n          <div class=\"form-group\">\n            <label class=\"form-label\">Created At <span class=\"muted small\">(optional)</span></label>\n            <input pInputText type=\"datetime-local\" formControlName=\"createdAt\" class=\"w-full\" />\n          </div>\n        </div>\n\n        <button pButton type=\"submit\" class=\"w-full p-button-primary run-btn\"\n          icon=\"fas fa-shield-halved\"\n          [label]=\"loading() ? 'Checking...' : 'Check Fraud'\"\n          [loading]=\"loading()\">\n        </button>\n      </form>\n    </div>\n\n    <div class=\"sim-results\">\n      <div class=\"card empty-state scale-in\" *ngIf=\"!result() && !loading()\">\n        <div class=\"empty-icon\"><i class=\"fas fa-plug-circle-check\"></i></div>\n        <h3>Ready to hit the backend</h3>\n        <p>Use one of the presets or enter the transaction fields manually, then submit the payload to `/fraud/check`.</p>\n      </div>\n\n      <div class=\"card running-state scale-in\" *ngIf=\"loading()\">\n        <div class=\"spin-rings\">\n          <div class=\"ring r1\"></div>\n          <div class=\"ring r2\"></div>\n          <div class=\"ring r3\"></div>\n        </div>\n        <h3>Calling backend fraud engine...</h3>\n        <p>Waiting for Spring Boot to evaluate the transaction and return risk metadata.</p>\n      </div>\n\n      <ng-container *ngIf=\"result() as tx\">\n        <div class=\"result-kpis fade-in-up\">\n          <div class=\"result-kpi\">\n            <div class=\"rk-icon teal\"><i class=\"fas fa-hashtag\"></i></div>\n            <div class=\"rk-label\">Transaction ID</div>\n            <div class=\"rk-value mono-text\">{{ tx.transactionId }}</div>\n          </div>\n          <div class=\"result-kpi\">\n            <div class=\"rk-icon blue\"><i class=\"fas fa-gauge-high\"></i></div>\n            <div class=\"rk-label\">Risk Score</div>\n            <div class=\"rk-value blue-text\">{{ tx.riskScore }}</div>\n          </div>\n          <div class=\"result-kpi\">\n            <div class=\"rk-icon orange\"><i class=\"fas fa-layer-group\"></i></div>\n            <div class=\"rk-label\">Risk Level</div>\n            <div class=\"rk-value\">{{ tx.riskLevel }}</div>\n          </div>\n          <div class=\"result-kpi\">\n            <div class=\"rk-icon\" [class.red]=\"tx.status === 'FRAUD'\" [class.green]=\"tx.status === 'NORMAL'\" [class.orange]=\"tx.status === 'SUSPICIOUS'\">\n              <i class=\"fas fa-shield-halved\"></i>\n            </div>\n            <div class=\"rk-label\">Status</div>\n            <div class=\"rk-value\">\n              <p-tag [value]=\"tx.status\" [severity]=\"getStatusSeverity(tx.status)\"></p-tag>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"card chart-card fade-in-up d2\">\n          <div class=\"chart-card-header\">\n            <div class=\"chart-card-title\">\n              <i class=\"fas fa-wave-square\"></i>\n              Score Interpretation\n            </div>\n          </div>\n          <div class=\"score-track\">\n            <div class=\"score-fill\" [style.width.%]=\"scoreWidth(tx.riskScore)\"></div>\n          </div>\n          <div class=\"score-scale\">\n            <span>0</span>\n            <span>60</span>\n            <span>120+</span>\n          </div>\n          <p class=\"rec-text\">{{ recommendation(tx) }}</p>\n        </div>\n\n        <div class=\"card response-card fade-in-up d3\">\n          <div class=\"chart-card-header\">\n            <div class=\"chart-card-title\">\n              <i class=\"fas fa-code\"></i>\n              Backend Response\n            </div>\n          </div>\n          <div class=\"detail-grid\">\n            <div class=\"detail-item\"><span>Sender</span><strong>{{ tx.senderName }}</strong></div>\n            <div class=\"detail-item\"><span>Receiver</span><strong>{{ tx.receiverName }}</strong></div>\n            <div class=\"detail-item\"><span>Channel</span><strong>{{ tx.channel }}</strong></div>\n            <div class=\"detail-item\"><span>Type</span><strong>{{ tx.transactionType }}</strong></div>\n            <div class=\"detail-item\"><span>Amount</span><strong>{{ tx.amount | number:'1.2-2' }}</strong></div>\n            <div class=\"detail-item\"><span>Created At</span><strong>{{ tx.date }}</strong></div>\n          </div>\n          <pre class=\"response-json\">{{ tx | json }}</pre>\n        </div>\n      </ng-container>\n    </div>\n  </div>\n</div>\n", styles: [".page-header { margin-bottom: 20px; }\n.sim-layout { display: grid; grid-template-columns: minmax(320px, 560px) minmax(320px, 1fr); gap: 20px; align-items: start; }\n\n.sim-config { padding: 24px; }\n.config-title { display: flex; align-items: center; gap: 10px; font-size: 15px; font-weight: 700; margin-bottom: 20px; }\n.config-title i { color: var(--primary); font-size: 16px; }\n\n.preset-row { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }\n.preset-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 7px 12px;\n  border-radius: 8px;\n  border: 1px solid var(--border);\n  background: var(--bg-page);\n  color: var(--text-secondary);\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n  font-family: var(--font-body);\n}\n.preset-btn:hover {\n  background: var(--primary-bg);\n  border-color: var(--primary-light);\n  color: var(--primary-dark);\n}\n\n.form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }\n.form-group { margin-bottom: 2px; }\n.span-2 { grid-column: span 2; }\n.run-btn { height: 44px !important; margin-top: 18px; font-size: 15px !important; }\n\n::ng-deep .sim-config .p-dropdown,\n::ng-deep .sim-config .p-inputnumber,\n::ng-deep .sim-config .p-inputtext {\n  width: 100%;\n}\n\n.sim-results { display: flex; flex-direction: column; gap: 16px; min-width: 0; }\n\n.empty-state { padding: 48px 32px; text-align: center; }\n.empty-icon {\n  width: 72px;\n  height: 72px;\n  border-radius: 20px;\n  background: var(--primary-bg);\n  color: var(--primary);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 28px;\n  margin: 0 auto 20px;\n}\n.empty-state h3 { font-size: 1.2rem; margin-bottom: 8px; }\n.empty-state p { color: var(--text-secondary); font-size: 13px; }\n\n.running-state { padding: 48px; text-align: center; }\n.spin-rings { position: relative; width: 72px; height: 72px; margin: 0 auto 24px; }\n.ring { position: absolute; inset: 0; border-radius: 50%; border: 2.5px solid transparent; }\n.r1 { border-top-color: var(--primary); animation: spin 1.1s linear infinite; }\n.r2 { inset: 10px; border-top-color: var(--primary-light); animation: spin 1.6s linear infinite reverse; }\n.r3 { inset: 20px; border-top-color: #b2dfdb; animation: spin 2s linear infinite; }\n@keyframes spin { to { transform: rotate(360deg); } }\n\n.result-kpis { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }\n.result-kpi {\n  background: var(--bg-card);\n  border-radius: var(--radius-lg);\n  padding: 18px;\n  box-shadow: var(--shadow-card);\n  border: 1px solid var(--border-light);\n  text-align: center;\n}\n.rk-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 18px;\n  margin: 0 auto 10px;\n}\n.rk-icon.teal { background: var(--primary-bg); color: var(--primary); }\n.rk-icon.blue { background: #e3f2fd; color: var(--info); }\n.rk-icon.orange { background: #fff3e0; color: var(--warning); }\n.rk-icon.green { background: #e8f5e9; color: var(--success); }\n.rk-icon.red { background: #fde8e8; color: var(--danger); }\n.rk-label {\n  font-size: 11px;\n  color: var(--text-muted);\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  margin-bottom: 6px;\n  font-family: var(--font-mono);\n}\n.rk-value { font-size: 1.15rem; font-weight: 800; font-family: var(--font-mono); }\n.mono-text { font-size: 0.9rem; word-break: break-word; }\n.blue-text { color: var(--info); }\n\n.score-track {\n  width: 100%;\n  height: 12px;\n  border-radius: 999px;\n  background: linear-gradient(90deg, #e8f5e9 0%, #fff3e0 50%, #fde8e8 100%);\n  overflow: hidden;\n  margin-bottom: 10px;\n}\n.score-fill {\n  height: 100%;\n  border-radius: inherit;\n  background: linear-gradient(90deg, var(--primary) 0%, var(--warning) 55%, var(--danger) 100%);\n}\n.score-scale {\n  display: flex;\n  justify-content: space-between;\n  color: var(--text-muted);\n  font-size: 11px;\n  font-family: var(--font-mono);\n  margin-bottom: 14px;\n}\n\n.response-card { padding: 20px; }\n.detail-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin-bottom: 16px; }\n.detail-item {\n  background: #f8fafc;\n  border: 1px solid var(--border-light);\n  border-radius: 10px;\n  padding: 12px;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.detail-item span { color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; }\n.detail-item strong { font-size: 13px; }\n.response-json {\n  margin: 0;\n  padding: 16px;\n  border-radius: 12px;\n  background: #0f172a;\n  color: #e2e8f0;\n  font-size: 12px;\n  line-height: 1.5;\n  overflow: auto;\n}\n\n.rec-text { font-size: 13px; color: var(--text-secondary); line-height: 1.6; }\n\n@media (max-width: 1080px) {\n  .sim-layout { grid-template-columns: 1fr; }\n  .result-kpis { grid-template-columns: repeat(2, minmax(0, 1fr)); }\n}\n\n@media (max-width: 640px) {\n  .form-grid,\n  .detail-grid,\n  .result-kpis {\n    grid-template-columns: 1fr;\n  }\n\n  .span-2 { grid-column: span 1; }\n}\n"] }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.FraudService }, { type: i3.MessageService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SimulationComponent, { className: "SimulationComponent", filePath: "src/app/pages/simulation/simulation.component.ts", lineNumber: 40 }); })();
//# sourceMappingURL=simulation.component.js.map