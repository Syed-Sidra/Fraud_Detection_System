// ---- AUTH ----
export interface LoginRequest { username: string; password: string; }
export interface RegisterRequest { username: string; password: string; email: string; role?: string; }
export interface AuthResponse { token: string; username: string; email: string; role: string; userId: number; }

// ---- TRANSACTION ----
export type FraudStatus = 'NORMAL' | 'SUSPICIOUS' | 'FRAUD';
export type TxnStatus   = 'SUCCESS' | 'PROCESSING' | 'FAILED';

export interface Transaction {
  id: number;
  transactionId: string;
  accountNumber: string;
  userName: string;
  amount: number;
  merchantName: string;
  merchantCategory: string;
  location: string;
  ipAddress: string;
  deviceType: string;
  transactionType: string;
  status: TxnStatus;
  fraudStatus: FraudStatus;
  riskScore: number;
  timestamp: string;
  simulated: boolean;
}

export interface PagedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
}

// ---- ALERT ----
export type Severity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface FraudAlert {
  id: number;
  transactionId: string;
  accountNumber: string;
  userName: string;
  amount: number;
  merchantName: string;
  location: string;
  ruleTriggered: string;
  fraudReason: string;
  riskScore: number;
  severity: Severity;
  read: boolean;
  resolved: boolean;
  resolutionNote: string;
  alertTime: string;
  resolvedAt: string;
  mlPrediction: boolean;
  mlConfidence: number;
  transactionTimestamp: string;
}

// ---- DASHBOARD ----
export interface DashboardStats {
  totalTransactions: number;
  fraudCount: number;
  suspiciousCount: number;
  normalCount: number;
  fraudPercentage: number;
  activeAlerts: number;
  unresolvedAlerts: number;
  unreadAlerts: number;
  criticalAlerts: number;
  highAlerts: number;
  dailyFraudTrend: { date: string; total: number; fraud: number }[];
  fraudByCategory: { category: string; count: number }[];
  alertsByRule: { rule: string; count: number }[];
  alertsBySeverity: { severity: string; count: number }[];
  recentTransactions: Transaction[];
  recentAlerts: FraudAlert[];
}

// ---- SIMULATION ----
export interface SimulationStatus { running: boolean; scenario: string; }
