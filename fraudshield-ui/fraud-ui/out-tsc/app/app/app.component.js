import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import * as i0 from "@angular/core";
import * as i1 from "primeng/toast";
export class AppComponent {
    static { this.ɵfac = function AppComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AppComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AppComponent, selectors: [["app-root"]], features: [i0.ɵɵProvidersFeature([MessageService])], decls: 2, vars: 1, consts: [["position", "top-right", 3, "life"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "p-toast", 0)(1, "router-outlet");
        } if (rf & 2) {
            i0.ɵɵproperty("life", 3500);
        } }, dependencies: [RouterOutlet, ToastModule, i1.Toast], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AppComponent, [{
        type: Component,
        args: [{
                selector: 'app-root',
                standalone: true,
                imports: [RouterOutlet, ToastModule],
                providers: [MessageService],
                template: `
    <p-toast position="top-right" [life]="3500"></p-toast>
    <router-outlet></router-outlet>
  `
            }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src/app/app.component.ts", lineNumber: 16 }); })();
//# sourceMappingURL=app.component.js.map