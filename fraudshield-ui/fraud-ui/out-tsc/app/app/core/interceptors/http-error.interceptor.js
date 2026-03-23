import { Injectable } from '@angular/core';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import * as i0 from "@angular/core";
export class HttpErrorInterceptor {
    constructor() {
        this.errorSubject = new BehaviorSubject(null);
        this.error$ = this.errorSubject.asObservable();
    }
    intercept(request, next) {
        return next.handle(request).pipe(catchError((error) => {
            const httpError = {
                status: error.status,
                message: this.getErrorMessage(error),
                timestamp: new Date()
            };
            this.errorSubject.next(httpError);
            console.error('HTTP Error:', httpError);
            return throwError(() => error);
        }), finalize(() => {
            // Clean up error after 5 seconds
            setTimeout(() => this.errorSubject.next(null), 5000);
        }));
    }
    getErrorMessage(error) {
        if (error.error instanceof ErrorEvent) {
            return `Client Error: ${error.error.message}`;
        }
        switch (error.status) {
            case 400:
                return 'Bad Request - Please check your input';
            case 401:
                return 'Unauthorized - Please login again';
            case 403:
                return 'Forbidden - You do not have permission';
            case 404:
                return 'Not Found - Resource does not exist';
            case 500:
                return 'Server Error - Please try again later';
            case 503:
                return 'Service Unavailable - Server is down';
            default:
                return `Error ${error.status}: ${error.message || 'An error occurred'}`;
        }
    }
    static { this.ɵfac = function HttpErrorInterceptor_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HttpErrorInterceptor)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: HttpErrorInterceptor, factory: HttpErrorInterceptor.ɵfac }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HttpErrorInterceptor, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=http-error.interceptor.js.map