import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError, map, shareReplay, timeout } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class FraudService {
    constructor(http) {
        this.http = http;
        this.FRAUD_API = 'http://localhost:8080/fraud';
        this.TIMEOUT = 30000;
    }
    checkFraud(transaction) {
        return this.http
            .post(`${this.FRAUD_API}/check`, this.prepareTransactionRequest(transaction))
            .pipe(timeout(this.TIMEOUT), map((response) => this.normalizeTransaction(response)), catchError(this.handleError.bind(this)));
    }
    getFraudTransactions(refresh = false) {
        return this.loadTransactions(refresh);
    }
    getDashboardStats() {
        return this.loadTransactions().pipe(map((transactions) => this.buildDashboardStats(transactions)));
    }
    getMerchantsList() {
        return this.loadTransactions().pipe(map((transactions) => this.buildMerchantSummaries(transactions)));
    }
    getCategoryFraudData() {
        return this.loadTransactions().pipe(map((transactions) => this.buildCategoryFraud(transactions)));
    }
    getDailyFraudData() {
        return this.loadTransactions().pipe(map((transactions) => this.buildDailyFraud(transactions)));
    }
    getMockCategoryData() {
        return [
            { category: 'ONLINE', percentage: 40 },
            { category: 'ATM', percentage: 25 },
            { category: 'UPI', percentage: 20 },
            { category: 'POS', percentage: 15 }
        ];
    }
    getMockDailyData() {
        return [
            { date: 'Mar 01', avgPercentage: 25, highRisk: 1, mediumRisk: 1 },
            { date: 'Mar 02', avgPercentage: 50, highRisk: 1, mediumRisk: 0 },
            { date: 'Mar 03', avgPercentage: 50, highRisk: 1, mediumRisk: 1 },
            { date: 'Mar 04', avgPercentage: 25, highRisk: 0, mediumRisk: 1 }
        ];
    }
    loadTransactions(refresh = false) {
        if (!this.transactionsCache$ || refresh) {
            this.transactionsCache$ = this.http.get(`${this.FRAUD_API}/transactions`)
                .pipe(timeout(this.TIMEOUT), map((transactions) => Array.isArray(transactions) ? transactions.map((transaction) => this.normalizeTransaction(transaction)) : []), catchError((error) => {
                console.warn('Failed to fetch fraud transactions from API, using mock data:', error);
                return of(this.getMockTransactions());
            }), shareReplay(1));
        }
        return this.transactionsCache$;
    }
    prepareTransactionRequest(transaction) {
        return {
            transactionId: this.optionalText(transaction.transactionId),
            senderName: this.toText(transaction.senderName, 'Unknown Sender'),
            senderAccount: this.toText(transaction.senderAccount, 'NA'),
            receiverName: this.toText(transaction.receiverName, 'Unknown Receiver'),
            receiverAccount: this.toText(transaction.receiverAccount, 'NA'),
            transactionType: this.normalizeTransactionType(transaction.transactionType),
            amount: this.toNumber(transaction.amount),
            channel: this.normalizeChannel(transaction.channel),
            location: this.toText(transaction.location, 'Unknown'),
            deviceId: this.toText(transaction.deviceId, 'UNKNOWN-DEVICE'),
            ipAddress: this.toText(transaction.ipAddress, '0.0.0.0'),
            failedAttempts: this.toInteger(transaction.failedAttempts),
            createdAt: this.normalizeRequestDate(transaction.createdAt)
        };
    }
    normalizeTransaction(transaction) {
        const safeTransaction = transaction ?? {};
        const createdAt = this.normalizeResponseDate(safeTransaction.createdAt);
        const amount = this.toNumber(safeTransaction.amount);
        const riskScore = this.toNumber(safeTransaction.riskScore);
        const status = this.normalizeStatus(safeTransaction.status, riskScore);
        const senderName = this.toText(safeTransaction.senderName, 'Unknown Sender');
        const receiverName = this.toText(safeTransaction.receiverName, 'Unknown Receiver');
        return {
            id: typeof safeTransaction.id === 'number' ? safeTransaction.id : null,
            transactionId: this.toText(safeTransaction.transactionId, `TXN${String(Math.abs(Math.round(amount)) + new Date(createdAt).getTime()).slice(-6).padStart(6, '0')}`),
            senderName,
            senderAccount: this.toText(safeTransaction.senderAccount, 'NA'),
            receiverName,
            receiverAccount: this.toText(safeTransaction.receiverAccount, 'NA'),
            transactionType: this.normalizeTransactionType(safeTransaction.transactionType),
            amount,
            channel: this.normalizeChannel(safeTransaction.channel),
            location: this.toText(safeTransaction.location, 'Unknown'),
            deviceId: this.toText(safeTransaction.deviceId, 'UNKNOWN-DEVICE'),
            ipAddress: this.toText(safeTransaction.ipAddress, '0.0.0.0'),
            failedAttempts: this.toInteger(safeTransaction.failedAttempts),
            status,
            riskScore,
            createdAt,
            date: this.formatDisplayDate(createdAt),
            riskLevel: this.toRiskLevel(riskScore, status)
        };
    }
    buildDashboardStats(transactions) {
        const flaggedTransactions = transactions.filter((transaction) => transaction.status !== 'NORMAL');
        const totalAmount = flaggedTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
        const transactionCount = transactions.length || 1;
        return {
            fraudulentTransactions: flaggedTransactions.length,
            fraudPercentage: +((flaggedTransactions.length / transactionCount) * 100).toFixed(2),
            totalFraudAmount: +totalAmount.toFixed(2),
            highRiskCount: transactions.filter((transaction) => transaction.status === 'FRAUD').length
        };
    }
    buildMerchantSummaries(transactions) {
        const relevantTransactions = transactions.filter((transaction) => transaction.status !== 'NORMAL');
        const source = relevantTransactions.length > 0 ? relevantTransactions : transactions;
        const summaryMap = new Map();
        source.forEach((transaction) => {
            const key = `${transaction.receiverName}::${transaction.channel}`;
            const current = summaryMap.get(key);
            if (current) {
                current.fraudAmount += transaction.amount;
                current.numberOfFrauds += 1;
                current.riskAccumulator += transaction.riskScore;
                return;
            }
            summaryMap.set(key, {
                merchantName: transaction.receiverName,
                category: transaction.channel,
                fraudAmount: transaction.amount,
                numberOfFrauds: 1,
                avgRiskScore: transaction.riskScore,
                riskAccumulator: transaction.riskScore
            });
        });
        return Array.from(summaryMap.values())
            .map(({ riskAccumulator, ...summary }) => ({
            ...summary,
            avgRiskScore: +(riskAccumulator / summary.numberOfFrauds).toFixed(1)
        }))
            .sort((left, right) => right.fraudAmount - left.fraudAmount)
            .slice(0, 8);
    }
    buildCategoryFraud(transactions) {
        const relevantTransactions = transactions.filter((transaction) => transaction.status !== 'NORMAL');
        const source = relevantTransactions.length > 0 ? relevantTransactions : transactions;
        const counts = new Map();
        source.forEach((transaction) => {
            counts.set(transaction.channel, (counts.get(transaction.channel) ?? 0) + 1);
        });
        const total = source.length || 1;
        return Array.from(counts.entries())
            .map(([category, count]) => ({
            category,
            percentage: +((count / total) * 100).toFixed(1)
        }))
            .sort((left, right) => right.percentage - left.percentage);
    }
    buildDailyFraud(transactions) {
        const groupedData = new Map();
        transactions.forEach((transaction) => {
            const date = new Date(transaction.createdAt);
            const key = Number.isNaN(date.getTime()) ? transaction.createdAt : date.toISOString().slice(0, 10);
            const label = Number.isNaN(date.getTime())
                ? transaction.createdAt
                : date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
            const bucket = groupedData.get(key) ?? {
                sortValue: Number.isNaN(date.getTime()) ? 0 : date.getTime(),
                label,
                total: 0,
                flagged: 0,
                highRisk: 0,
                mediumRisk: 0
            };
            bucket.total += 1;
            if (transaction.status !== 'NORMAL') {
                bucket.flagged += 1;
            }
            if (transaction.status === 'FRAUD' || transaction.riskScore >= 120) {
                bucket.highRisk += 1;
            }
            else if (transaction.status === 'SUSPICIOUS' || transaction.riskScore >= 60) {
                bucket.mediumRisk += 1;
            }
            groupedData.set(key, bucket);
        });
        return Array.from(groupedData.values())
            .sort((left, right) => left.sortValue - right.sortValue)
            .map((bucket) => ({
            date: bucket.label,
            avgPercentage: bucket.total ? +((bucket.flagged / bucket.total) * 100).toFixed(2) : 0,
            highRisk: bucket.highRisk,
            mediumRisk: bucket.mediumRisk
        }));
    }
    getMockTransactions() {
        const channels = ['ONLINE', 'ATM', 'UPI', 'POS'];
        const names = ['Sender 1', 'Sender 2', 'Sender 3', 'Sender 4', 'Sender 5', 'Sender 6'];
        const receivers = ['Receiver 1', 'Receiver 2', 'Receiver 3', 'Receiver 4'];
        return Array.from({ length: 20 }, (_, index) => {
            const riskScore = (index % 5) * 35;
            const createdAt = new Date(2026, 2, 1 + index, 9 + (index % 6), 15).toISOString();
            const status = this.normalizeStatus(null, riskScore);
            return {
                id: index + 1,
                transactionId: `TXN${String(index + 1).padStart(6, '0')}`,
                senderName: names[index % names.length],
                senderAccount: `ACC10${index + 1}`,
                receiverName: receivers[index % receivers.length],
                receiverAccount: `ACC50${index + 1}`,
                transactionType: index % 2 === 0 ? 'CREDIT' : 'DEBIT',
                amount: 1000 + (index + 1) * 50,
                channel: channels[index % channels.length],
                location: 'India',
                deviceId: `DEV20${index + 1}`,
                ipAddress: `192.168.1.${index + 1}`,
                failedAttempts: index % 4,
                status,
                riskScore,
                createdAt,
                date: this.formatDisplayDate(createdAt),
                riskLevel: this.toRiskLevel(riskScore, status)
            };
        });
    }
    normalizeTransactionType(value) {
        return this.toText(value, 'DEBIT').toUpperCase() === 'CREDIT' ? 'CREDIT' : 'DEBIT';
    }
    normalizeChannel(value) {
        const normalizedValue = this.toText(value, 'ONLINE').toUpperCase();
        if (normalizedValue === 'ATM' || normalizedValue === 'UPI' || normalizedValue === 'POS') {
            return normalizedValue;
        }
        return 'ONLINE';
    }
    normalizeStatus(value, riskScore) {
        const normalizedValue = this.toText(value, '').toUpperCase();
        if (normalizedValue === 'FRAUD' || normalizedValue === 'SUSPICIOUS' || normalizedValue === 'NORMAL') {
            return normalizedValue;
        }
        if (riskScore >= 120) {
            return 'FRAUD';
        }
        if (riskScore >= 60) {
            return 'SUSPICIOUS';
        }
        return 'NORMAL';
    }
    toRiskLevel(riskScore, status) {
        if (status === 'FRAUD' || riskScore >= 120) {
            return 'HIGH';
        }
        if (status === 'SUSPICIOUS' || riskScore >= 60) {
            return 'MEDIUM';
        }
        return 'LOW';
    }
    normalizeResponseDate(value) {
        if (Array.isArray(value) && value.length >= 3) {
            const [year, month, day, hour = 0, minute = 0, second = 0, nanosecond = 0] = value;
            return new Date(year, month - 1, day, hour, minute, second, Math.round(nanosecond / 1_000_000)).toISOString();
        }
        if (value instanceof Date) {
            return value.toISOString();
        }
        if (typeof value === 'string' && value.trim()) {
            const parsedDate = new Date(value);
            return Number.isNaN(parsedDate.getTime()) ? new Date().toISOString() : parsedDate.toISOString();
        }
        return new Date().toISOString();
    }
    normalizeRequestDate(value) {
        if (typeof value === 'string' && value.trim()) {
            return value.trim();
        }
        if (value instanceof Date) {
            return this.toLocalDateTimeString(value);
        }
        if (Array.isArray(value) && value.length >= 3) {
            const [year, month, day, hour = 0, minute = 0, second = 0] = value;
            return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
        }
        return undefined;
    }
    formatDisplayDate(value) {
        const date = new Date(value);
        return Number.isNaN(date.getTime())
            ? value
            : date.toLocaleString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
    }
    toLocalDateTimeString(date) {
        const pad = (value) => String(value).padStart(2, '0');
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    }
    toText(value, fallback) {
        return typeof value === 'string' && value.trim() ? value.trim() : fallback;
    }
    optionalText(value) {
        return typeof value === 'string' && value.trim() ? value.trim() : undefined;
    }
    toNumber(value) {
        if (typeof value === 'number' && Number.isFinite(value)) {
            return value;
        }
        if (typeof value === 'string' && value.trim()) {
            const parsed = Number(value);
            return Number.isFinite(parsed) ? parsed : 0;
        }
        return 0;
    }
    toInteger(value) {
        return Math.max(0, Math.trunc(this.toNumber(value)));
    }
    handleError(error) {
        let errorMessage = 'An error occurred';
        if (typeof error === 'object' && error !== null) {
            const candidate = error;
            if (candidate.error instanceof ErrorEvent) {
                errorMessage = `Error: ${candidate.error.message}`;
            }
            else if (candidate.status) {
                errorMessage = `Server error: ${candidate.status} - ${candidate.message ?? 'Unknown error'}`;
            }
            else if (candidate.name === 'TimeoutError') {
                errorMessage = 'Request timeout - Server is not responding';
            }
        }
        console.error('Fraud Service Error:', errorMessage, error);
        return throwError(() => new Error(errorMessage));
    }
    static { this.ɵfac = function FraudService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || FraudService)(i0.ɵɵinject(i1.HttpClient)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: FraudService, factory: FraudService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FraudService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.HttpClient }], null); })();
//# sourceMappingURL=fraud.service.js.map