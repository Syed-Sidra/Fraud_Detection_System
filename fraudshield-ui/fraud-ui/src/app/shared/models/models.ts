export type TransactionType = 'CREDIT' | 'DEBIT';
export type TransactionChannel = 'ATM' | 'ONLINE' | 'UPI' | 'POS';
export type FraudStatus = 'NORMAL' | 'SUSPICIOUS' | 'FRAUD';
export type RiskLevel = 'HIGH' | 'MEDIUM' | 'LOW';
export type BackendDateValue =
  | string
  | Date
  | [number, number, number]
  | [number, number, number, number]
  | [number, number, number, number, number]
  | [number, number, number, number, number, number]
  | [number, number, number, number, number, number, number]
  | null;

export interface TransactionPayload {
  id?: number | null;
  transactionId?: string | null;
  senderName: string;
  senderAccount: string;
  receiverName: string;
  receiverAccount: string;
  transactionType: TransactionType;
  amount: number;
  channel: TransactionChannel;
  location: string;
  deviceId: string;
  ipAddress: string;
  failedAttempts: number;
  status?: FraudStatus | null;
  riskScore?: number | null;
  createdAt?: BackendDateValue;
}

export interface FraudTransaction {
  id: number | null;
  transactionId: string;
  senderName: string;
  senderAccount: string;
  receiverName: string;
  receiverAccount: string;
  transactionType: TransactionType;
  amount: number;
  channel: TransactionChannel;
  location: string;
  deviceId: string;
  ipAddress: string;
  failedAttempts: number;
  status: FraudStatus;
  riskScore: number;
  createdAt: string;
  date: string;
  riskLevel: RiskLevel;
}

export interface MerchantFraudSummary {
  merchantName: string;
  category: TransactionChannel;
  fraudAmount: number;
  numberOfFrauds: number;
  avgRiskScore: number;
}

export interface DashboardStats {
  fraudulentTransactions: number;
  fraudPercentage: number;
  totalFraudAmount: number;
  highRiskCount: number;
}

export interface CategoryFraud {
  category: string;
  percentage: number;
}

export interface DailyFraud {
  date: string;
  avgPercentage: number;
  highRisk: number;
  mediumRisk: number;
}
