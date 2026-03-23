import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

export interface HttpError {
  status: number;
  message: string;
  timestamp: Date;
}

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  private errorSubject = new BehaviorSubject<HttpError | null>(null);
  public error$ = this.errorSubject.asObservable();

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const httpError: HttpError = {
          status: error.status,
          message: this.getErrorMessage(error),
          timestamp: new Date()
        };

        this.errorSubject.next(httpError);
        console.error('HTTP Error:', httpError);
        
        return throwError(() => error);
      }),
      finalize(() => {
        // Clean up error after 5 seconds
        setTimeout(() => this.errorSubject.next(null), 5000);
      })
    );
  }

  private getErrorMessage(error: HttpErrorResponse): string {
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
}
