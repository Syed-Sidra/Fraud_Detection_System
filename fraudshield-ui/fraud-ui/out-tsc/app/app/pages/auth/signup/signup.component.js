import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/router";
import * as i3 from "primeng/api";
import * as i4 from "@angular/common";
import * as i5 from "primeng/button";
import * as i6 from "primeng/inputtext";
import * as i7 from "primeng/password";
import * as i8 from "primeng/toast";
const _c0 = () => ["/auth/login"];
function SignupComponent_small_69_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 46);
    i0.ɵɵtext(1, "Name required");
    i0.ɵɵelementEnd();
} }
function SignupComponent_small_76_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 46);
    i0.ɵɵtext(1, "Organization required");
    i0.ɵɵelementEnd();
} }
function SignupComponent_small_83_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 46);
    i0.ɵɵtext(1, "Valid email required");
    i0.ɵɵelementEnd();
} }
function SignupComponent_small_91_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 46);
    i0.ɵɵtext(1, "Min 8 characters");
    i0.ɵɵelementEnd();
} }
function SignupComponent_small_98_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 46);
    i0.ɵɵtext(1, "Passwords do not match");
    i0.ɵɵelementEnd();
} }
function SignupComponent_small_108_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 46);
    i0.ɵɵtext(1, "You must agree to continue");
    i0.ɵɵelementEnd();
} }
export class SignupComponent {
    constructor(fb, router, msg) {
        this.fb = fb;
        this.router = router;
        this.msg = msg;
        this.loading = false;
    }
    ngOnInit() {
        this.form = this.fb.group({
            fullName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            organization: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', Validators.required],
            agree: [false, Validators.requiredTrue]
        }, { validators: this.matchPasswords });
    }
    matchPasswords(g) {
        return g.get('password')?.value === g.get('confirmPassword')?.value ? null : { mismatch: true };
    }
    onSubmit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        this.loading = true;
        setTimeout(() => {
            this.loading = false;
            this.msg.add({ severity: 'success', summary: 'Account created!', detail: 'Welcome to FraudShield.' });
            setTimeout(() => this.router.navigate(['/app/dashboard']), 900);
        }, 1200);
    }
    static { this.ɵfac = function SignupComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SignupComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i3.MessageService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SignupComponent, selectors: [["app-signup"]], features: [i0.ɵɵProvidersFeature([MessageService])], decls: 114, vars: 14, consts: [[1, "auth-page"], [1, "auth-left"], [1, "auth-logo", "fade-in-left"], [1, "auth-logo-icon"], [1, "fas", "fa-shield-halved"], [1, "auth-brand"], [1, "auth-tagline"], [1, "auth-features"], [1, "auth-feature", "fade-in-left", "d1"], [1, "auth-feature-icon"], [1, "fas", "fa-user-shield"], [1, "auth-feature-text"], [1, "auth-feature", "fade-in-left", "d2"], [1, "fas", "fa-bell"], [1, "auth-feature", "fade-in-left", "d3"], [1, "fas", "fa-file-chart-pie"], [1, "auth-stat-row", "fade-in-left", "d4"], [1, "auth-stat"], [1, "auth-stat-val"], [1, "auth-stat-lbl"], [1, "auth-right"], [1, "auth-card", "scale-in"], [1, "auth-card-header"], [1, "auth-card-logo"], [3, "ngSubmit", "formGroup"], [1, "form-grid"], [1, "form-group"], [1, "form-label"], [1, "input-icon-wrap"], [1, "fas", "fa-user", "input-icon"], ["pInputText", "", "formControlName", "fullName", "placeholder", "John Smith", 1, "w-full", "pl-input"], ["class", "form-error", 4, "ngIf"], [1, "fas", "fa-building", "input-icon"], ["pInputText", "", "formControlName", "organization", "placeholder", "Your bank or company", 1, "w-full", "pl-input"], [1, "fas", "fa-envelope", "input-icon"], ["pInputText", "", "formControlName", "email", "type", "email", "placeholder", "you@company.com", 1, "w-full", "pl-input"], [1, "fas", "fa-lock", "input-icon"], ["formControlName", "password", "placeholder", "Min. 8 characters", "styleClass", "w-full pl-pass", 3, "toggleMask"], ["formControlName", "confirmPassword", "placeholder", "Repeat password", "styleClass", "w-full pl-pass", 3, "feedback", "toggleMask"], [1, "terms-row"], ["type", "checkbox", "formControlName", "agree", "id", "agree"], ["for", "agree"], ["href", "#", 1, "auth-link"], ["pButton", "", "type", "submit", "label", "Create Account", "icon", "fas fa-user-plus", "iconPos", "right", 1, "w-full", "p-button-primary", "signup-btn", 3, "loading", "disabled"], [1, "auth-footer-text"], [1, "auth-link", 3, "routerLink"], [1, "form-error"]], template: function SignupComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "p-toast");
            i0.ɵɵelementStart(1, "div", 0)(2, "div", 1)(3, "div", 2)(4, "div", 3);
            i0.ɵɵelement(5, "i", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "div")(7, "div", 5);
            i0.ɵɵtext(8, "FraudShield");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "div", 6);
            i0.ɵɵtext(10, "Real-time fraud detection platform");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(11, "div", 7)(12, "div", 8)(13, "div", 9);
            i0.ɵɵelement(14, "i", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "div", 11)(16, "h4");
            i0.ɵɵtext(17, "Secure Access");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "p");
            i0.ɵɵtext(19, "Role-based access control for your entire team");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(20, "div", 12)(21, "div", 9);
            i0.ɵɵelement(22, "i", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "div", 11)(24, "h4");
            i0.ɵɵtext(25, "Instant Alerts");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "p");
            i0.ɵɵtext(27, "Get notified the moment fraud is detected");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(28, "div", 14)(29, "div", 9);
            i0.ɵɵelement(30, "i", 15);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "div", 11)(32, "h4");
            i0.ɵɵtext(33, "Detailed Reports");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "p");
            i0.ɵɵtext(35, "Export fraud reports in PDF, CSV and Excel formats");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(36, "div", 16)(37, "div", 17)(38, "div", 18);
            i0.ɵɵtext(39, "500+");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(40, "div", 19);
            i0.ɵɵtext(41, "Banks");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(42, "div", 17)(43, "div", 18);
            i0.ɵɵtext(44, "2M+");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(45, "div", 19);
            i0.ɵɵtext(46, "Transactions");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(47, "div", 17)(48, "div", 18);
            i0.ɵɵtext(49, "$4B+");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(50, "div", 19);
            i0.ɵɵtext(51, "Protected");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(52, "div", 20)(53, "div", 21)(54, "div", 22)(55, "div", 23);
            i0.ɵɵelement(56, "i", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(57, "h2");
            i0.ɵɵtext(58, "Create your account");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(59, "p");
            i0.ɵɵtext(60, "Start detecting fraud in minutes \u2014 free trial, no card required");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(61, "form", 24);
            i0.ɵɵlistener("ngSubmit", function SignupComponent_Template_form_ngSubmit_61_listener() { return ctx.onSubmit(); });
            i0.ɵɵelementStart(62, "div", 25)(63, "div", 26)(64, "label", 27);
            i0.ɵɵtext(65, "Full name *");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(66, "div", 28);
            i0.ɵɵelement(67, "i", 29)(68, "input", 30);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(69, SignupComponent_small_69_Template, 2, 0, "small", 31);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(70, "div", 26)(71, "label", 27);
            i0.ɵɵtext(72, "Organization *");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(73, "div", 28);
            i0.ɵɵelement(74, "i", 32)(75, "input", 33);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(76, SignupComponent_small_76_Template, 2, 0, "small", 31);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(77, "div", 26)(78, "label", 27);
            i0.ɵɵtext(79, "Email address *");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(80, "div", 28);
            i0.ɵɵelement(81, "i", 34)(82, "input", 35);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(83, SignupComponent_small_83_Template, 2, 0, "small", 31);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(84, "div", 25)(85, "div", 26)(86, "label", 27);
            i0.ɵɵtext(87, "Password *");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(88, "div", 28);
            i0.ɵɵelement(89, "i", 36)(90, "p-password", 37);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(91, SignupComponent_small_91_Template, 2, 0, "small", 31);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(92, "div", 26)(93, "label", 27);
            i0.ɵɵtext(94, "Confirm password *");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(95, "div", 28);
            i0.ɵɵelement(96, "i", 36)(97, "p-password", 38);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(98, SignupComponent_small_98_Template, 2, 0, "small", 31);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(99, "div", 39);
            i0.ɵɵelement(100, "input", 40);
            i0.ɵɵelementStart(101, "label", 41);
            i0.ɵɵtext(102, "I agree to the ");
            i0.ɵɵelementStart(103, "a", 42);
            i0.ɵɵtext(104, "Terms of Service");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(105, " and ");
            i0.ɵɵelementStart(106, "a", 42);
            i0.ɵɵtext(107, "Privacy Policy");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(108, SignupComponent_small_108_Template, 2, 0, "small", 31);
            i0.ɵɵelement(109, "button", 43);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(110, "p", 44);
            i0.ɵɵtext(111, " Already have an account? ");
            i0.ɵɵelementStart(112, "a", 45);
            i0.ɵɵtext(113, "Sign in");
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            let tmp_1_0;
            let tmp_2_0;
            let tmp_3_0;
            let tmp_5_0;
            let tmp_8_0;
            let tmp_9_0;
            i0.ɵɵadvance(61);
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("ngIf", ((tmp_1_0 = ctx.form.get("fullName")) == null ? null : tmp_1_0.invalid) && ((tmp_1_0 = ctx.form.get("fullName")) == null ? null : tmp_1_0.touched));
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("ngIf", ((tmp_2_0 = ctx.form.get("organization")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx.form.get("organization")) == null ? null : tmp_2_0.touched));
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("ngIf", ((tmp_3_0 = ctx.form.get("email")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx.form.get("email")) == null ? null : tmp_3_0.touched));
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("toggleMask", true);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ((tmp_5_0 = ctx.form.get("password")) == null ? null : tmp_5_0.invalid) && ((tmp_5_0 = ctx.form.get("password")) == null ? null : tmp_5_0.touched));
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("feedback", false)("toggleMask", true);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.form.hasError("mismatch") && ((tmp_8_0 = ctx.form.get("confirmPassword")) == null ? null : tmp_8_0.touched));
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("ngIf", ((tmp_9_0 = ctx.form.get("agree")) == null ? null : tmp_9_0.invalid) && ((tmp_9_0 = ctx.form.get("agree")) == null ? null : tmp_9_0.touched));
            i0.ɵɵadvance();
            i0.ɵɵproperty("loading", ctx.loading)("disabled", ctx.loading);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction0(13, _c0));
        } }, dependencies: [CommonModule, i4.NgIf, ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.CheckboxControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, RouterLink, ButtonModule, i5.ButtonDirective, InputTextModule, i6.InputText, PasswordModule, i7.Password, ToastModule, i8.Toast], styles: [".auth-card-header[_ngcontent-%COMP%] {\n  text-align: center; margin-bottom: 20px;\n  h2 { font-size: 1.25rem; font-weight: 700; margin-bottom: 4px; }\n  p  { font-size: 12px; color: var(--text-secondary); }\n}\n.auth-card-logo[_ngcontent-%COMP%] {\n  width: 52px; height: 52px; border-radius: 14px;\n  background: linear-gradient(135deg, var(--primary), var(--primary-light));\n  display: flex; align-items: center; justify-content: center;\n  font-size: 20px; color: white; margin: 0 auto 14px;\n  box-shadow: 0 4px 12px rgba(0,150,136,0.35);\n}\n.form-grid[_ngcontent-%COMP%] { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }\n.input-icon-wrap[_ngcontent-%COMP%] { position: relative; display: flex; align-items: center; }\n.input-icon[_ngcontent-%COMP%] { position: absolute; left: 12px; z-index: 2; color: var(--text-muted); font-size: 13px; pointer-events: none; }\n.pl-input[_ngcontent-%COMP%] { padding-left: 36px !important; height: 40px !important; width: 100% !important; }\n  .pl-pass { width: 100% !important; }\n  .pl-pass input { padding-left: 36px !important; height: 40px !important; width: 100% !important; }\n.terms-row[_ngcontent-%COMP%] {\n  display: flex; align-items: flex-start; gap: 8px; margin-bottom: 16px;\n  font-size: 12px; color: var(--text-secondary);\n  input { accent-color: var(--primary); margin-top: 2px; flex-shrink: 0; }\n}\n.signup-btn[_ngcontent-%COMP%] { height: 42px !important; font-size: 14px !important; border-radius: var(--radius-md) !important; margin-bottom: 16px; }\n.auth-footer-text[_ngcontent-%COMP%] { text-align: center; font-size: 13px; color: var(--text-secondary); }\n.auth-link[_ngcontent-%COMP%] { color: var(--primary); font-weight: 600; text-decoration: none; }\n.auth-link[_ngcontent-%COMP%]:hover { text-decoration: underline; }\n.auth-stat-row[_ngcontent-%COMP%] { display: flex; gap: 28px; margin-top: 36px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.08); position: relative; z-index: 1; }\n.auth-stat-val[_ngcontent-%COMP%] { font-size: 1.2rem; font-weight: 800; color: var(--primary-light); font-family: var(--font-mono); }\n.auth-stat-lbl[_ngcontent-%COMP%] { font-size: 11px; color: rgba(255,255,255,0.5); margin-top: 2px; }\n@media (max-width: 480px) { .form-grid[_ngcontent-%COMP%] { grid-template-columns: 1fr; } }"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SignupComponent, [{
        type: Component,
        args: [{ selector: 'app-signup', standalone: true, imports: [CommonModule, ReactiveFormsModule, RouterLink, ButtonModule, InputTextModule, PasswordModule, ToastModule], providers: [MessageService], template: "<p-toast></p-toast>\n<div class=\"auth-page\">\n  <div class=\"auth-left\">\n    <div class=\"auth-logo fade-in-left\">\n      <div class=\"auth-logo-icon\"><i class=\"fas fa-shield-halved\"></i></div>\n      <div>\n        <div class=\"auth-brand\">FraudShield</div>\n        <div class=\"auth-tagline\">Real-time fraud detection platform</div>\n      </div>\n    </div>\n    <div class=\"auth-features\">\n      <div class=\"auth-feature fade-in-left d1\">\n        <div class=\"auth-feature-icon\"><i class=\"fas fa-user-shield\"></i></div>\n        <div class=\"auth-feature-text\">\n          <h4>Secure Access</h4>\n          <p>Role-based access control for your entire team</p>\n        </div>\n      </div>\n      <div class=\"auth-feature fade-in-left d2\">\n        <div class=\"auth-feature-icon\"><i class=\"fas fa-bell\"></i></div>\n        <div class=\"auth-feature-text\">\n          <h4>Instant Alerts</h4>\n          <p>Get notified the moment fraud is detected</p>\n        </div>\n      </div>\n      <div class=\"auth-feature fade-in-left d3\">\n        <div class=\"auth-feature-icon\"><i class=\"fas fa-file-chart-pie\"></i></div>\n        <div class=\"auth-feature-text\">\n          <h4>Detailed Reports</h4>\n          <p>Export fraud reports in PDF, CSV and Excel formats</p>\n        </div>\n      </div>\n    </div>\n    <div class=\"auth-stat-row fade-in-left d4\">\n      <div class=\"auth-stat\">\n        <div class=\"auth-stat-val\">500+</div>\n        <div class=\"auth-stat-lbl\">Banks</div>\n      </div>\n      <div class=\"auth-stat\">\n        <div class=\"auth-stat-val\">2M+</div>\n        <div class=\"auth-stat-lbl\">Transactions</div>\n      </div>\n      <div class=\"auth-stat\">\n        <div class=\"auth-stat-val\">$4B+</div>\n        <div class=\"auth-stat-lbl\">Protected</div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"auth-right\">\n    <div class=\"auth-card scale-in\">\n      <div class=\"auth-card-header\">\n        <div class=\"auth-card-logo\"><i class=\"fas fa-shield-halved\"></i></div>\n        <h2>Create your account</h2>\n        <p>Start detecting fraud in minutes \u2014 free trial, no card required</p>\n      </div>\n\n      <form [formGroup]=\"form\" (ngSubmit)=\"onSubmit()\">\n        <div class=\"form-grid\">\n          <div class=\"form-group\">\n            <label class=\"form-label\">Full name *</label>\n            <div class=\"input-icon-wrap\">\n              <i class=\"fas fa-user input-icon\"></i>\n              <input pInputText formControlName=\"fullName\" placeholder=\"John Smith\" class=\"w-full pl-input\" />\n            </div>\n            <small class=\"form-error\" *ngIf=\"form.get('fullName')?.invalid && form.get('fullName')?.touched\">Name required</small>\n          </div>\n          <div class=\"form-group\">\n            <label class=\"form-label\">Organization *</label>\n            <div class=\"input-icon-wrap\">\n              <i class=\"fas fa-building input-icon\"></i>\n              <input pInputText formControlName=\"organization\" placeholder=\"Your bank or company\" class=\"w-full pl-input\" />\n            </div>\n            <small class=\"form-error\" *ngIf=\"form.get('organization')?.invalid && form.get('organization')?.touched\">Organization required</small>\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <label class=\"form-label\">Email address *</label>\n          <div class=\"input-icon-wrap\">\n            <i class=\"fas fa-envelope input-icon\"></i>\n            <input pInputText formControlName=\"email\" type=\"email\" placeholder=\"you@company.com\" class=\"w-full pl-input\" />\n          </div>\n          <small class=\"form-error\" *ngIf=\"form.get('email')?.invalid && form.get('email')?.touched\">Valid email required</small>\n        </div>\n\n        <div class=\"form-grid\">\n          <div class=\"form-group\">\n            <label class=\"form-label\">Password *</label>\n            <div class=\"input-icon-wrap\">\n              <i class=\"fas fa-lock input-icon\"></i>\n              <p-password formControlName=\"password\" placeholder=\"Min. 8 characters\" [toggleMask]=\"true\" styleClass=\"w-full pl-pass\"></p-password>\n            </div>\n            <small class=\"form-error\" *ngIf=\"form.get('password')?.invalid && form.get('password')?.touched\">Min 8 characters</small>\n          </div>\n          <div class=\"form-group\">\n            <label class=\"form-label\">Confirm password *</label>\n            <div class=\"input-icon-wrap\">\n              <i class=\"fas fa-lock input-icon\"></i>\n              <p-password formControlName=\"confirmPassword\" [feedback]=\"false\" placeholder=\"Repeat password\" [toggleMask]=\"true\" styleClass=\"w-full pl-pass\"></p-password>\n            </div>\n            <small class=\"form-error\" *ngIf=\"form.hasError('mismatch') && form.get('confirmPassword')?.touched\">Passwords do not match</small>\n          </div>\n        </div>\n\n        <div class=\"terms-row\">\n          <input type=\"checkbox\" formControlName=\"agree\" id=\"agree\" />\n          <label for=\"agree\">I agree to the <a href=\"#\" class=\"auth-link\">Terms of Service</a> and <a href=\"#\" class=\"auth-link\">Privacy Policy</a></label>\n        </div>\n        <small class=\"form-error\" *ngIf=\"form.get('agree')?.invalid && form.get('agree')?.touched\">You must agree to continue</small>\n\n        <button pButton type=\"submit\" label=\"Create Account\" icon=\"fas fa-user-plus\"\n          iconPos=\"right\" class=\"w-full p-button-primary signup-btn\"\n          [loading]=\"loading\" [disabled]=\"loading\">\n        </button>\n      </form>\n\n      <p class=\"auth-footer-text\">\n        Already have an account? <a [routerLink]=\"['/auth/login']\" class=\"auth-link\">Sign in</a>\n      </p>\n    </div>\n  </div>\n</div>\n", styles: [".auth-card-header {\n  text-align: center; margin-bottom: 20px;\n  h2 { font-size: 1.25rem; font-weight: 700; margin-bottom: 4px; }\n  p  { font-size: 12px; color: var(--text-secondary); }\n}\n.auth-card-logo {\n  width: 52px; height: 52px; border-radius: 14px;\n  background: linear-gradient(135deg, var(--primary), var(--primary-light));\n  display: flex; align-items: center; justify-content: center;\n  font-size: 20px; color: white; margin: 0 auto 14px;\n  box-shadow: 0 4px 12px rgba(0,150,136,0.35);\n}\n.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }\n.input-icon-wrap { position: relative; display: flex; align-items: center; }\n.input-icon { position: absolute; left: 12px; z-index: 2; color: var(--text-muted); font-size: 13px; pointer-events: none; }\n.pl-input { padding-left: 36px !important; height: 40px !important; width: 100% !important; }\n::ng-deep .pl-pass { width: 100% !important; }\n::ng-deep .pl-pass input { padding-left: 36px !important; height: 40px !important; width: 100% !important; }\n.terms-row {\n  display: flex; align-items: flex-start; gap: 8px; margin-bottom: 16px;\n  font-size: 12px; color: var(--text-secondary);\n  input { accent-color: var(--primary); margin-top: 2px; flex-shrink: 0; }\n}\n.signup-btn { height: 42px !important; font-size: 14px !important; border-radius: var(--radius-md) !important; margin-bottom: 16px; }\n.auth-footer-text { text-align: center; font-size: 13px; color: var(--text-secondary); }\n.auth-link { color: var(--primary); font-weight: 600; text-decoration: none; }\n.auth-link:hover { text-decoration: underline; }\n.auth-stat-row { display: flex; gap: 28px; margin-top: 36px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.08); position: relative; z-index: 1; }\n.auth-stat-val { font-size: 1.2rem; font-weight: 800; color: var(--primary-light); font-family: var(--font-mono); }\n.auth-stat-lbl { font-size: 11px; color: rgba(255,255,255,0.5); margin-top: 2px; }\n@media (max-width: 480px) { .form-grid { grid-template-columns: 1fr; } }\n"] }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.Router }, { type: i3.MessageService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SignupComponent, { className: "SignupComponent", filePath: "src/app/pages/auth/signup/signup.component.ts", lineNumber: 19 }); })();
//# sourceMappingURL=signup.component.js.map