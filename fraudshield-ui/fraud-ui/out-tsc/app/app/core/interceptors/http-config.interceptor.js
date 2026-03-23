import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class HttpConfigInterceptor {
    intercept(request, next) {
        const clonedRequest = request.clone({
            setHeaders: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        return next.handle(clonedRequest);
    }
    static { this.ɵfac = function HttpConfigInterceptor_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HttpConfigInterceptor)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: HttpConfigInterceptor, factory: HttpConfigInterceptor.ɵfac }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HttpConfigInterceptor, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=http-config.interceptor.js.map