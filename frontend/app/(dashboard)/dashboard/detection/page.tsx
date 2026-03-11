"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  generateTransactions, 
  generateDetectionResult, 
  formatINR, 
  FRAUD_THRESHOLD,
  type Transaction,
  type DetectionResult
} from "@/lib/transaction-utils"
import { Search, AlertTriangle, Shield, Eye, RefreshCw, Download, User, CreditCard, MapPin, Clock, Hash, Phone, Mail } from "lucide-react"

const detectionRules = [
  {
    id: 1,
    name: "High Value Transaction",
    description: `Flag transactions above ${formatINR(FRAUD_THRESHOLD)}`,
    status: "active",
    triggered: 45,
  },
  {
    id: 2,
    name: "Unusual Location",
    description: "Detect transactions from suspicious geographic locations",
    status: "active",
    triggered: 23,
  },
  {
    id: 3,
    name: "Rapid Succession",
    description: "Multiple transactions within 5 minutes",
    status: "active",
    triggered: 12,
  },
  {
    id: 4,
    name: "Velocity Check",
    description: "Daily spending limit exceeded",
    status: "inactive",
    triggered: 8,
  },
]

interface FlaggedTransaction {
  transaction: Transaction
  detection: DetectionResult
}

export default function DetectionPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [flaggedTransactions, setFlaggedTransactions] = useState<FlaggedTransaction[]>([])
  const [selectedTransaction, setSelectedTransaction] = useState<FlaggedTransaction | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    refreshData()
  }, [])

  const refreshData = () => {
    setIsRefreshing(true)
    const transactions = generateTransactions(30, 40) // Higher fraud percentage for detection page
    const flagged = transactions
      .filter(tx => tx.isFraud)
      .map(tx => ({
        transaction: tx,
        detection: generateDetectionResult(tx)
      }))
    setFlaggedTransactions(flagged)
    setTimeout(() => setIsRefreshing(false), 500)
  }

  const filteredTransactions = flaggedTransactions.filter(
    (item) =>
      item.transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.detection.ruleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.transaction.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const viewTransaction = (item: FlaggedTransaction) => {
    setSelectedTransaction(item)
    setIsDetailOpen(true)
  }

  const exportTransactionData = (item: FlaggedTransaction) => {
    const exportData = {
      transaction: item.transaction,
      detection: item.detection
    }
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `detection-${item.transaction.id}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Fraud Detection</h1>
          <p className="text-muted-foreground mt-1">
            Monitor and manage fraud detection rules and flagged transactions
          </p>
        </div>
        <Button
          variant="outline"
          onClick={refreshData}
          disabled={isRefreshing}
          className="border-border hover:bg-secondary"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Detection Rules */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Detection Rules</CardTitle>
          <CardDescription className="text-muted-foreground">
            Active rules for anomaly detection (Threshold: {formatINR(FRAUD_THRESHOLD)})
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {detectionRules.map((rule) => (
              <div
                key={rule.id}
                className="p-4 rounded-lg bg-secondary/50 border border-border"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${rule.status === "active" ? "bg-primary/10" : "bg-muted"}`}>
                      <Shield className={`h-4 w-4 ${rule.status === "active" ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <div>
                      <p className="font-medium text-card-foreground">{rule.name}</p>
                      <p className="text-sm text-muted-foreground">{rule.description}</p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      rule.status === "active"
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {rule.status}
                  </span>
                </div>
                <div className="mt-3 text-sm text-muted-foreground">
                  Triggered: <span className="text-card-foreground font-medium">{rule.triggered}</span> times this month
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Flagged Transactions */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-card-foreground">Flagged Transactions</CardTitle>
              <CardDescription className="text-muted-foreground">
                {filteredTransactions.length} transactions flagged by detection rules
              </CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-input border-border text-card-foreground"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No flagged transactions found
              </div>
            ) : (
              filteredTransactions.map((item) => (
                <div
                  key={item.transaction.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border"
                >
                  <div className="flex items-center gap-4">
                    <AlertTriangle
                      className={`h-5 w-5 ${
                        item.detection.riskScore >= 80
                          ? "text-destructive"
                          : item.detection.riskScore >= 60
                          ? "text-chart-3"
                          : "text-chart-2"
                      }`}
                    />
                    <div>
                      <p className="text-sm font-medium text-card-foreground">
                        {item.transaction.id} - {formatINR(item.transaction.amount)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.detection.ruleName} | {item.transaction.customerName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-card-foreground">Risk: {item.detection.riskScore}%</p>
                      <p
                        className={`text-xs ${
                          item.transaction.status === "flagged"
                            ? "text-chart-3"
                            : item.transaction.status === "blocked"
                            ? "text-destructive"
                            : "text-primary"
                        }`}
                      >
                        {item.transaction.status.charAt(0).toUpperCase() + item.transaction.status.slice(1)}
                      </p>
                    </div>
                    <Button 
                      size="sm" 
                      variant="default" 
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={() => viewTransaction(item)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Transaction Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-2xl bg-card border-border max-h-[90vh] overflow-y-auto">
          {selectedTransaction && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <AlertTriangle className={`h-5 w-5 ${
                    selectedTransaction.detection.riskScore >= 80
                      ? "text-destructive"
                      : selectedTransaction.detection.riskScore >= 60
                      ? "text-chart-3"
                      : "text-chart-2"
                  }`} />
                  <DialogTitle className="text-card-foreground">
                    Flagged Transaction Details
                  </DialogTitle>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium uppercase ${
                    selectedTransaction.transaction.status === "blocked"
                      ? "bg-destructive/20 text-destructive"
                      : "bg-chart-3/20 text-chart-3"
                  }`}>
                    {selectedTransaction.transaction.status}
                  </span>
                </div>
                <DialogDescription className="text-muted-foreground">
                  Transaction {selectedTransaction.transaction.id}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Fraud Reason - Prominent */}
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                  <h4 className="text-sm font-semibold text-destructive flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4" />
                    Why This Transaction Was Flagged
                  </h4>
                  <p className="text-sm text-card-foreground">{selectedTransaction.detection.reason}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedTransaction.detection.flags.map((flag, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 rounded text-xs bg-destructive/20 text-destructive"
                      >
                        {flag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Customer Details */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-card-foreground flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    Customer Details
                  </h4>
                  <div className="grid grid-cols-2 gap-3 p-4 rounded-lg bg-secondary/50 border border-border">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Customer Name</p>
                      <p className="text-sm font-medium text-card-foreground">{selectedTransaction.transaction.customerName}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Customer ID</p>
                      <p className="text-sm font-mono text-card-foreground">{selectedTransaction.transaction.customerId}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Phone className="h-3 w-3" /> Phone
                      </p>
                      <p className="text-sm text-card-foreground">{selectedTransaction.transaction.phoneNumber}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" /> Email
                      </p>
                      <p className="text-sm text-card-foreground">{selectedTransaction.transaction.email}</p>
                    </div>
                  </div>
                </div>

                {/* Transaction Details */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-card-foreground flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-primary" />
                    Transaction Details
                  </h4>
                  <div className="grid grid-cols-2 gap-3 p-4 rounded-lg bg-secondary/50 border border-border">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Hash className="h-3 w-3" /> Transaction ID
                      </p>
                      <p className="text-sm font-mono text-card-foreground">{selectedTransaction.transaction.id}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Amount</p>
                      <p className={`text-sm font-semibold ${selectedTransaction.transaction.amount > FRAUD_THRESHOLD ? "text-destructive" : "text-card-foreground"}`}>
                        {formatINR(selectedTransaction.transaction.amount)}
                        {selectedTransaction.transaction.amount > FRAUD_THRESHOLD && (
                          <span className="ml-2 text-xs font-normal">(Above threshold)</span>
                        )}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Type</p>
                      <p className="text-sm text-card-foreground">{selectedTransaction.transaction.type}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" /> Timestamp
                      </p>
                      <p className="text-sm text-card-foreground">{selectedTransaction.transaction.timestamp}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">From Account</p>
                      <p className="text-sm font-mono text-card-foreground">{selectedTransaction.transaction.accountFrom}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">To Account</p>
                      <p className="text-sm font-mono text-card-foreground">{selectedTransaction.transaction.accountTo}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> Location
                      </p>
                      <p className="text-sm text-card-foreground">{selectedTransaction.transaction.location}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">IP Address</p>
                      <p className="text-sm font-mono text-card-foreground">{selectedTransaction.transaction.ipAddress}</p>
                    </div>
                    <div className="space-y-1 col-span-2">
                      <p className="text-xs text-muted-foreground">Merchant</p>
                      <p className="text-sm text-card-foreground">{selectedTransaction.transaction.merchantName}</p>
                    </div>
                  </div>
                </div>

                {/* Detection Info */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-card-foreground flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    Detection Info
                  </h4>
                  <div className="p-4 rounded-lg bg-secondary/50 border border-border space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Rule ID</p>
                        <p className="text-sm font-mono text-card-foreground">{selectedTransaction.detection.ruleId}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Rule Name</p>
                        <p className="text-sm text-card-foreground">{selectedTransaction.detection.ruleName}</p>
                      </div>
                    </div>

                    {/* Risk Score Bar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">Risk Score</p>
                        <p className="text-sm font-semibold text-card-foreground">{selectedTransaction.detection.riskScore}%</p>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all ${
                            selectedTransaction.detection.riskScore >= 80 
                              ? "bg-destructive" 
                              : selectedTransaction.detection.riskScore >= 60
                              ? "bg-chart-3"
                              : "bg-chart-2"
                          }`}
                          style={{ width: `${selectedTransaction.detection.riskScore}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter className="mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setIsDetailOpen(false)}
                  className="border-border text-card-foreground"
                >
                  Close
                </Button>
                <Button 
                  onClick={() => exportTransactionData(selectedTransaction)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
