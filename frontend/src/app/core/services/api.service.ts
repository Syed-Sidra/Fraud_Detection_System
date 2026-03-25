import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  DashboardStats, PagedResponse, Transaction, FraudAlert,
  FraudStatus, Severity, SimulationStatus
} from '../../shared/models/models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  // Dashboard
  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>('/api/dashboard/stats');
  }

  // Transactions
  getTransactions(filters: any = {}): Observable<PagedResponse<Transaction>> {
    let params = new HttpParams();
    Object.entries(filters).forEach(([k, v]) => { if (v != null && v !== '') params = params.set(k, String(v)); });
    return this.http.get<PagedResponse<Transaction>>('/api/transactions', { params });
  }

  getTransactionById(id: string): Observable<Transaction> {
    return this.http.get<Transaction>(`/api/transactions/${id}`);
  }

  getLiveFeed(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>('/api/transactions/live-feed');
  }

  getHighRiskAccounts(): Observable<{ accountNumber: string; fraudCount: number }[]> {
    return this.http.get<any[]>('/api/transactions/high-risk-accounts');
  }

  createTransaction(txn: Partial<Transaction>): Observable<Transaction> {
    return this.http.post<Transaction>('/api/transactions', txn);
  }

  // Alerts
  getAlerts(severity?: Severity, page = 0, size = 20): Observable<PagedResponse<FraudAlert>> {
    let params = new HttpParams().set('page', page).set('size', size);
    if (severity) params = params.set('severity', severity);
    return this.http.get<PagedResponse<FraudAlert>>('/api/alerts', { params });
  }

  getHighRiskAlerts(): Observable<FraudAlert[]> {
    return this.http.get<FraudAlert[]>('/api/alerts/high-risk');
  }

  getUnreadCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>('/api/alerts/unread-count');
  }

  markAllRead(): Observable<void> {
    return this.http.put<void>('/api/alerts/mark-all-read', {});
  }

  resolveAlert(id: number, note: string): Observable<FraudAlert> {
    return this.http.put<FraudAlert>(`/api/alerts/${id}/resolve`, { note });
  }

  getAlertsByRule(): Observable<{ rule: string; count: number }[]> {
    return this.http.get<any[]>('/api/alerts/stats/by-rule');
  }

  getAlertsBySeverity(): Observable<{ severity: string; count: number }[]> {
    return this.http.get<any[]>('/api/alerts/stats/by-severity');
  }

  getRecentAlerts(): Observable<FraudAlert[]> {
    return this.http.get<FraudAlert[]>('/api/alerts/recent');
  }

  // Simulation
  startSimulation(scenario: string): Observable<any> {
    return this.http.post('/api/simulation/start', { scenario });
  }

  stopSimulation(): Observable<any> {
    return this.http.post('/api/simulation/stop', {});
  }

  getSimulationStatus(): Observable<SimulationStatus> {
    return this.http.get<SimulationStatus>('/api/simulation/status');
  }

  generateBulk(count: number, scenario: string): Observable<any> {
    return this.http.post('/api/simulation/bulk', { count, scenario });
  }
}
