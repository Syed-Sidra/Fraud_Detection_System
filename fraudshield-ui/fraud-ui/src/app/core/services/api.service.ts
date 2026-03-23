import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap, timeout } from 'rxjs/operators';
import { DashboardStats, TransactionPayload } from '../../shared/models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_URL = 'http://localhost:8080/api';
  private readonly FRAUD_API = 'http://localhost:8080/fraud';
  private readonly TIMEOUT = 30000; // 30 seconds

  // Loading state
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoadingSubject.asObservable();

  // Error state
  private errorSubject = new BehaviorSubject<string | null>(null);
  public error$ = this.errorSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Check fraud for a transaction
   */
  checkFraud(transaction: TransactionPayload): Observable<TransactionPayload> {
    this.setLoading(true);
    return this.http
      .post<TransactionPayload>(`${this.FRAUD_API}/check`, transaction)
      .pipe(
        timeout(this.TIMEOUT),
        tap(response => {
          console.log('Fraud check completed:', response);
          this.setLoading(false);
          this.clearError();
        }),
        catchError(error => {
          this.setLoading(false);
          return this.handleError(error);
        })
      );
  }

  /**
   * Get dashboard statistics (mock for now, replace with real endpoint when available)
   */
  getDashboardStats(): Observable<DashboardStats> {
    this.setLoading(true);
    // Replace with actual endpoint when backend is ready
    return new Observable(observer => {
      setTimeout(() => {
        const stats: DashboardStats = {
          fraudulentTransactions: 19,
          fraudPercentage: 0.034,
          totalFraudAmount: 10000,
          highRiskCount: 7
        };
        observer.next(stats);
        observer.complete();
        this.setLoading(false);
      }, 500);
    });
  }

  /**
   * Set loading state
   */
  private setLoading(isLoading: boolean): void {
    this.isLoadingSubject.next(isLoading);
  }

  /**
   * Clear error
   */
  private clearError(): void {
    this.errorSubject.next(null);
  }

  /**
   * Set error
   */
  private setError(error: string): void {
    this.errorSubject.next(error);
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.status) {
      errorMessage = `Server Error ${error.status}: ${error.message || 'Unknown error'}`;
    } else if (error.name === 'TimeoutError') {
      errorMessage = 'Request timeout - Please check your connection';
    }
    
    console.error('API Service Error:', errorMessage, error);
    this.setError(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
