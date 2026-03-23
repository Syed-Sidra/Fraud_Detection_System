import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/router";
import * as i3 from "primeng/api";
import * as i4 from "@angular/common";
import * as i5 from "primeng/button";
import * as i6 from "primeng/inputtext";
import * as i7 from "primeng/password";
import * as i8 from "primeng/checkbox";
import * as i9 from "primeng/toast";
const _c0 = () => ["/auth/signup"];
function LoginComponent_small_80_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 45);
    i0.ɵɵtext(1, " Valid email required ");
    i0.ɵɵelementEnd();
} }
function LoginComponent_small_87_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 45);
    i0.ɵɵtext(1, " Password required ");
    i0.ɵɵelementEnd();
} }
export class LoginComponent {
    constructor(fb, router, msg) {
        this.fb = fb;
        this.router = router;
        this.msg = msg;
        this.loading = false;
    }
    ngOnInit() {
        this.form = this.fb.group({
            email: ['admin@fraudshield.com', [Validators.required, Validators.email]],
            password: ['password123', Validators.required],
            remember: [true]
        });
    }
    onSubmit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        this.loading = true;
        // Dummy auth — any credentials work
        setTimeout(() => {
            this.loading = false;
            this.msg.add({ severity: 'success', summary: 'Welcome back!', detail: 'Redirecting to dashboard...' });
            setTimeout(() => this.router.navigate(['/app/dashboard']), 800);
        }, 1200);
    }
    static { this.ɵfac = function LoginComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LoginComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i3.MessageService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LoginComponent, selectors: [["app-login"]], features: [i0.ɵɵProvidersFeature([MessageService])], decls: 102, vars: 10, consts: [[1, "auth-page"], [1, "auth-left"], [1, "auth-logo", "fade-in-left"], [1, "auth-logo-icon"], [1, "fas", "fa-shield-halved"], [1, "auth-brand"], [1, "auth-tagline"], [1, "auth-features"], [1, "auth-feature", "fade-in-left", "d1"], [1, "auth-feature-icon"], [1, "fas", "fa-bolt"], [1, "auth-feature-text"], [1, "auth-feature", "fade-in-left", "d2"], [1, "fas", "fa-map-location-dot"], [1, "auth-feature", "fade-in-left", "d3"], [1, "fas", "fa-chart-line"], [1, "auth-feature", "fade-in-left", "d4"], [1, "fas", "fa-brain"], [1, "auth-stat-row", "fade-in-left", "d5"], [1, "auth-stat"], [1, "auth-stat-val"], [1, "auth-stat-lbl"], [1, "auth-right"], [1, "auth-card", "scale-in"], [1, "auth-card-header"], [1, "auth-card-logo"], [1, "demo-banner"], [1, "fas", "fa-circle-info"], [3, "ngSubmit", "formGroup"], [1, "form-group"], [1, "form-label"], [1, "input-icon-wrap"], [1, "fas", "fa-envelope", "input-icon"], ["pInputText", "", "formControlName", "email", "type", "email", "placeholder", "you@company.com", 1, "w-full", "pl-input"], ["class", "form-error", 4, "ngIf"], [1, "fas", "fa-lock", "input-icon"], ["formControlName", "password", "placeholder", "Your password", "styleClass", "w-full pl-pass", 3, "feedback", "toggleMask"], [1, "form-row-between"], [1, "remember-label"], ["formControlName", "remember", 3, "binary"], ["href", "#", 1, "forgot-link"], ["pButton", "", "type", "submit", "label", "Sign In", "icon", "fas fa-arrow-right-to-bracket", "iconPos", "right", 1, "w-full", "p-button-primary", "login-btn", 3, "loading", "disabled"], [1, "auth-divider"], [1, "auth-footer-text"], [1, "auth-link", 3, "routerLink"], [1, "form-error"]], template: function LoginComponent_Template(rf, ctx) { if (rf & 1) {
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
            i0.ɵɵtext(17, "Real-time Detection");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "p");
            i0.ɵɵtext(19, "Instant alerts on suspicious transactions as they happen");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(20, "div", 12)(21, "div", 9);
            i0.ɵɵelement(22, "i", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "div", 11)(24, "h4");
            i0.ɵɵtext(25, "Location Intelligence");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "p");
            i0.ɵɵtext(27, "Geographic fraud mapping across all merchant locations");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(28, "div", 14)(29, "div", 9);
            i0.ɵɵelement(30, "i", 15);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "div", 11)(32, "h4");
            i0.ɵɵtext(33, "Advanced Analytics");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "p");
            i0.ɵɵtext(35, "Deep insights into fraud patterns and risk scoring");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(36, "div", 16)(37, "div", 9);
            i0.ɵɵelement(38, "i", 17);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "div", 11)(40, "h4");
            i0.ɵɵtext(41, "ML Simulation");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(42, "p");
            i0.ɵɵtext(43, "Predict and simulate fraud scenarios with AI models");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(44, "div", 18)(45, "div", 19)(46, "div", 20);
            i0.ɵɵtext(47, "99.9%");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(48, "div", 21);
            i0.ɵɵtext(49, "Accuracy");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(50, "div", 19)(51, "div", 20);
            i0.ɵɵtext(52, "<50ms");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(53, "div", 21);
            i0.ɵɵtext(54, "Detection");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(55, "div", 19)(56, "div", 20);
            i0.ɵɵtext(57, "10K+");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(58, "div", 21);
            i0.ɵɵtext(59, "Alerts/day");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(60, "div", 22)(61, "div", 23)(62, "div", 24)(63, "div", 25);
            i0.ɵɵelement(64, "i", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(65, "h2");
            i0.ɵɵtext(66, "Sign in to FraudShield");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(67, "p");
            i0.ɵɵtext(68, "Enter your credentials to access the dashboard");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(69, "div", 26);
            i0.ɵɵelement(70, "i", 27);
            i0.ɵɵelementStart(71, "span");
            i0.ɵɵtext(72, "Demo mode \u2014 any credentials work. Pre-filled for quick access.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(73, "form", 28);
            i0.ɵɵlistener("ngSubmit", function LoginComponent_Template_form_ngSubmit_73_listener() { return ctx.onSubmit(); });
            i0.ɵɵelementStart(74, "div", 29)(75, "label", 30);
            i0.ɵɵtext(76, "Email address");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(77, "div", 31);
            i0.ɵɵelement(78, "i", 32)(79, "input", 33);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(80, LoginComponent_small_80_Template, 2, 0, "small", 34);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(81, "div", 29)(82, "label", 30);
            i0.ɵɵtext(83, "Password");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(84, "div", 31);
            i0.ɵɵelement(85, "i", 35)(86, "p-password", 36);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(87, LoginComponent_small_87_Template, 2, 0, "small", 34);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(88, "div", 37)(89, "label", 38);
            i0.ɵɵelement(90, "p-checkbox", 39);
            i0.ɵɵelementStart(91, "span");
            i0.ɵɵtext(92, "Remember me");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(93, "a", 40);
            i0.ɵɵtext(94, "Forgot password?");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(95, "button", 41);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(96, "div", 42);
            i0.ɵɵtext(97, "or");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(98, "p", 43);
            i0.ɵɵtext(99, " Don't have an account? ");
            i0.ɵɵelementStart(100, "a", 44);
            i0.ɵɵtext(101, "Create account");
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            let tmp_1_0;
            let tmp_4_0;
            i0.ɵɵadvance(73);
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("ngIf", ((tmp_1_0 = ctx.form.get("email")) == null ? null : tmp_1_0.invalid) && ((tmp_1_0 = ctx.form.get("email")) == null ? null : tmp_1_0.touched));
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("feedback", false)("toggleMask", true);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ((tmp_4_0 = ctx.form.get("password")) == null ? null : tmp_4_0.invalid) && ((tmp_4_0 = ctx.form.get("password")) == null ? null : tmp_4_0.touched));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("binary", true);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("loading", ctx.loading)("disabled", ctx.loading);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction0(9, _c0));
        } }, dependencies: [CommonModule, i4.NgIf, ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, RouterLink, ButtonModule, i5.ButtonDirective, InputTextModule, i6.InputText, PasswordModule, i7.Password, CheckboxModule, i8.Checkbox, ToastModule, i9.Toast, ProgressSpinnerModule], styles: [".auth-card-header[_ngcontent-%COMP%] {\n  text-align: center; margin-bottom: 24px;\n  h2 { font-size: 1.35rem; font-weight: 700; margin-bottom: 6px; }\n  p  { font-size: 13px; color: var(--text-secondary); }\n}\n.auth-card-logo[_ngcontent-%COMP%] {\n  width: 56px; height: 56px; border-radius: 16px;\n  background: linear-gradient(135deg, var(--primary), var(--primary-light));\n  display: flex; align-items: center; justify-content: center;\n  font-size: 22px; color: white; margin: 0 auto 16px;\n  box-shadow: 0 4px 12px rgba(0,150,136,0.35);\n}\n.demo-banner[_ngcontent-%COMP%] {\n  display: flex; align-items: center; gap: 8px;\n  background: #e3f2fd; border-radius: var(--radius-md);\n  padding: 10px 14px; margin-bottom: 20px;\n  font-size: 12px; color: #1565c0;\n  i { font-size: 14px; flex-shrink: 0; }\n}\n.input-icon-wrap[_ngcontent-%COMP%] { position: relative; display: flex; align-items: center; }\n.input-icon[_ngcontent-%COMP%] {\n  position: absolute; left: 12px; z-index: 2;\n  color: var(--text-muted); font-size: 14px; pointer-events: none;\n}\n.pl-input[_ngcontent-%COMP%] { padding-left: 38px !important; height: 42px !important; width: 100% !important; }\n  .pl-pass { width: 100% !important; }\n  .pl-pass input { padding-left: 38px !important; height: 42px !important; width: 100% !important; }\n\n.form-row-between[_ngcontent-%COMP%] {\n  display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;\n}\n.remember-label[_ngcontent-%COMP%] {\n  display: flex; align-items: center; gap: 8px;\n  font-size: 13px; color: var(--text-secondary); cursor: pointer;\n}\n.forgot-link[_ngcontent-%COMP%] { font-size: 13px; color: var(--primary); text-decoration: none; font-weight: 500; }\n.forgot-link[_ngcontent-%COMP%]:hover { text-decoration: underline; }\n.login-btn[_ngcontent-%COMP%] { height: 44px !important; font-size: 15px !important; border-radius: var(--radius-md) !important; }\n\n.auth-footer-text[_ngcontent-%COMP%] { text-align: center; font-size: 13px; color: var(--text-secondary); }\n.auth-link[_ngcontent-%COMP%] { color: var(--primary); font-weight: 600; text-decoration: none; }\n.auth-link[_ngcontent-%COMP%]:hover { text-decoration: underline; }\n\n.auth-stat-row[_ngcontent-%COMP%] {\n  display: flex; gap: 32px; margin-top: 40px; padding-top: 24px;\n  border-top: 1px solid rgba(255,255,255,0.08); position: relative; z-index: 1;\n}\n.auth-stat-val[_ngcontent-%COMP%] { font-size: 1.3rem; font-weight: 800; color: var(--primary-light); font-family: var(--font-mono); }\n.auth-stat-lbl[_ngcontent-%COMP%] { font-size: 11px; color: rgba(255,255,255,0.5); margin-top: 2px; }"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoginComponent, [{
        type: Component,
        args: [{ selector: 'app-login', standalone: true, imports: [CommonModule, ReactiveFormsModule, RouterLink, ButtonModule, InputTextModule, PasswordModule, CheckboxModule, ToastModule, ProgressSpinnerModule], providers: [MessageService], template: "<p-toast></p-toast>\n<div class=\"auth-page\">\n  <!-- Left branding panel -->\n  <div class=\"auth-left\">\n    <div class=\"auth-logo fade-in-left\">\n      <div class=\"auth-logo-icon\"><i class=\"fas fa-shield-halved\"></i></div>\n      <div>\n        <div class=\"auth-brand\">FraudShield</div>\n        <div class=\"auth-tagline\">Real-time fraud detection platform</div>\n      </div>\n    </div>\n\n    <div class=\"auth-features\">\n      <div class=\"auth-feature fade-in-left d1\">\n        <div class=\"auth-feature-icon\"><i class=\"fas fa-bolt\"></i></div>\n        <div class=\"auth-feature-text\">\n          <h4>Real-time Detection</h4>\n          <p>Instant alerts on suspicious transactions as they happen</p>\n        </div>\n      </div>\n      <div class=\"auth-feature fade-in-left d2\">\n        <div class=\"auth-feature-icon\"><i class=\"fas fa-map-location-dot\"></i></div>\n        <div class=\"auth-feature-text\">\n          <h4>Location Intelligence</h4>\n          <p>Geographic fraud mapping across all merchant locations</p>\n        </div>\n      </div>\n      <div class=\"auth-feature fade-in-left d3\">\n        <div class=\"auth-feature-icon\"><i class=\"fas fa-chart-line\"></i></div>\n        <div class=\"auth-feature-text\">\n          <h4>Advanced Analytics</h4>\n          <p>Deep insights into fraud patterns and risk scoring</p>\n        </div>\n      </div>\n      <div class=\"auth-feature fade-in-left d4\">\n        <div class=\"auth-feature-icon\"><i class=\"fas fa-brain\"></i></div>\n        <div class=\"auth-feature-text\">\n          <h4>ML Simulation</h4>\n          <p>Predict and simulate fraud scenarios with AI models</p>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"auth-stat-row fade-in-left d5\">\n      <div class=\"auth-stat\">\n        <div class=\"auth-stat-val\">99.9%</div>\n        <div class=\"auth-stat-lbl\">Accuracy</div>\n      </div>\n      <div class=\"auth-stat\">\n        <div class=\"auth-stat-val\">&lt;50ms</div>\n        <div class=\"auth-stat-lbl\">Detection</div>\n      </div>\n      <div class=\"auth-stat\">\n        <div class=\"auth-stat-val\">10K+</div>\n        <div class=\"auth-stat-lbl\">Alerts/day</div>\n      </div>\n    </div>\n  </div>\n\n  <!-- Right login form -->\n  <div class=\"auth-right\">\n    <div class=\"auth-card scale-in\">\n      <div class=\"auth-card-header\">\n        <div class=\"auth-card-logo\">\n          <i class=\"fas fa-shield-halved\"></i>\n        </div>\n        <h2>Sign in to FraudShield</h2>\n        <p>Enter your credentials to access the dashboard</p>\n      </div>\n\n      <div class=\"demo-banner\">\n        <i class=\"fas fa-circle-info\"></i>\n        <span>Demo mode \u2014 any credentials work. Pre-filled for quick access.</span>\n      </div>\n\n      <form [formGroup]=\"form\" (ngSubmit)=\"onSubmit()\">\n        <div class=\"form-group\">\n          <label class=\"form-label\">Email address</label>\n          <div class=\"input-icon-wrap\">\n            <i class=\"fas fa-envelope input-icon\"></i>\n            <input pInputText formControlName=\"email\" type=\"email\"\n              placeholder=\"you@company.com\" class=\"w-full pl-input\" />\n          </div>\n          <small class=\"form-error\"\n            *ngIf=\"form.get('email')?.invalid && form.get('email')?.touched\">\n            Valid email required\n          </small>\n        </div>\n\n        <div class=\"form-group\">\n          <label class=\"form-label\">Password</label>\n          <div class=\"input-icon-wrap\">\n            <i class=\"fas fa-lock input-icon\"></i>\n            <p-password formControlName=\"password\" [feedback]=\"false\"\n              placeholder=\"Your password\" [toggleMask]=\"true\"\n              styleClass=\"w-full pl-pass\">\n            </p-password>\n          </div>\n          <small class=\"form-error\"\n            *ngIf=\"form.get('password')?.invalid && form.get('password')?.touched\">\n            Password required\n          </small>\n        </div>\n\n        <div class=\"form-row-between\">\n          <label class=\"remember-label\">\n            <p-checkbox formControlName=\"remember\" [binary]=\"true\"></p-checkbox>\n            <span>Remember me</span>\n          </label>\n          <a href=\"#\" class=\"forgot-link\">Forgot password?</a>\n        </div>\n\n        <button pButton type=\"submit\" label=\"Sign In\" icon=\"fas fa-arrow-right-to-bracket\"\n          iconPos=\"right\" class=\"w-full p-button-primary login-btn\"\n          [loading]=\"loading\" [disabled]=\"loading\">\n        </button>\n      </form>\n\n      <div class=\"auth-divider\">or</div>\n\n      <p class=\"auth-footer-text\">\n        Don't have an account?\n        <a [routerLink]=\"['/auth/signup']\" class=\"auth-link\">Create account</a>\n      </p>\n    </div>\n  </div>\n</div>\n", styles: [".auth-card-header {\n  text-align: center; margin-bottom: 24px;\n  h2 { font-size: 1.35rem; font-weight: 700; margin-bottom: 6px; }\n  p  { font-size: 13px; color: var(--text-secondary); }\n}\n.auth-card-logo {\n  width: 56px; height: 56px; border-radius: 16px;\n  background: linear-gradient(135deg, var(--primary), var(--primary-light));\n  display: flex; align-items: center; justify-content: center;\n  font-size: 22px; color: white; margin: 0 auto 16px;\n  box-shadow: 0 4px 12px rgba(0,150,136,0.35);\n}\n.demo-banner {\n  display: flex; align-items: center; gap: 8px;\n  background: #e3f2fd; border-radius: var(--radius-md);\n  padding: 10px 14px; margin-bottom: 20px;\n  font-size: 12px; color: #1565c0;\n  i { font-size: 14px; flex-shrink: 0; }\n}\n.input-icon-wrap { position: relative; display: flex; align-items: center; }\n.input-icon {\n  position: absolute; left: 12px; z-index: 2;\n  color: var(--text-muted); font-size: 14px; pointer-events: none;\n}\n.pl-input { padding-left: 38px !important; height: 42px !important; width: 100% !important; }\n::ng-deep .pl-pass { width: 100% !important; }\n::ng-deep .pl-pass input { padding-left: 38px !important; height: 42px !important; width: 100% !important; }\n\n.form-row-between {\n  display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;\n}\n.remember-label {\n  display: flex; align-items: center; gap: 8px;\n  font-size: 13px; color: var(--text-secondary); cursor: pointer;\n}\n.forgot-link { font-size: 13px; color: var(--primary); text-decoration: none; font-weight: 500; }\n.forgot-link:hover { text-decoration: underline; }\n.login-btn { height: 44px !important; font-size: 15px !important; border-radius: var(--radius-md) !important; }\n\n.auth-footer-text { text-align: center; font-size: 13px; color: var(--text-secondary); }\n.auth-link { color: var(--primary); font-weight: 600; text-decoration: none; }\n.auth-link:hover { text-decoration: underline; }\n\n.auth-stat-row {\n  display: flex; gap: 32px; margin-top: 40px; padding-top: 24px;\n  border-top: 1px solid rgba(255,255,255,0.08); position: relative; z-index: 1;\n}\n.auth-stat-val { font-size: 1.3rem; font-weight: 800; color: var(--primary-light); font-family: var(--font-mono); }\n.auth-stat-lbl { font-size: 11px; color: rgba(255,255,255,0.5); margin-top: 2px; }\n"] }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.Router }, { type: i3.MessageService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src/app/pages/auth/login/login.component.ts", lineNumber: 21 }); })();
//# sourceMappingURL=login.component.js.map