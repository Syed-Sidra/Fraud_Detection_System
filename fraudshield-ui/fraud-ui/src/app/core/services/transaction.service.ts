import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, timeout } from 'rxjs/operators';
import { TransactionPayload } from '../../shared/models/models';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private readonly API_URL = 'http://localhost:8080/api/transactions';
  private readonly TIMEOUT = 30000; // 30 seconds

  constructor(private http: HttpClient) {}

  /**
   * Generate a single random transaction
   */
  generateSingleTransaction(): Observable<TransactionPayload> {
    return this.http
      .post<TransactionPayload>(`${this.API_URL}/generate`, {})
      .pipe(
        timeout(this.TIMEOUT),
        tap(response => console.log('Single transaction generated:', response)),
        catchError(this.handleError)
      );
  }

  /**
   * Generate bulk transactions
   */
  generateBulkTransactions(count: number): Observable<TransactionPayload[]> {
    const params = new HttpParams().set('count', count.toString());
    return this.http
      .post<TransactionPayload[]>(`${this.API_URL}/generate/bulk`, {}, { params })
      .pipe(
        timeout(this.TIMEOUT),
        tap(response => console.log(`${response.length} transactions generated`, response)),
        catchError(this.handleError)
      );
  }

  /**
   * Submit manual transaction
   */
  submitManualTransaction(transaction: TransactionPayload): Observable<TransactionPayload> {
    return this.http
      .post<TransactionPayload>(`${this.API_URL}/manual`, transaction)
      .pipe(
        timeout(this.TIMEOUT),
        tap(response => console.log('Manual transaction submitted:', response)),
        catchError(this.handleError)
      );
  }

  /**
   * Error handling
   */
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.status) {
      errorMessage = `Server error: ${error.status} - ${error.message}`;
    } else if (error.name === 'TimeoutError') {
      errorMessage = 'Request timeout - Server is not responding';
    }
    
    console.error('Transaction Service Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
