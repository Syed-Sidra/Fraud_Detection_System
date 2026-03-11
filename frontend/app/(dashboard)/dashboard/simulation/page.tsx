"use client"

import { useState } from "react"
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
import { PlayCircle, Pause, RotateCcw, CheckCircle, XCircle, Eye, Download, User, CreditCard, AlertTriangle, Shield, MapPin, Clock, Hash, Phone, Mail } from "lucide-react"

interface SimulatedTransaction {
  transaction: Transaction
  detection: DetectionResult
}

export default function SimulationPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [transactionCount, setTransactionCount] = useState("100")
  const [fraudPercentage, setFraudPercentage] = useState("15")
  const [transactions, setTransactions] = useState<SimulatedTransaction[]>([])
  const [selectedTransaction, setSelectedTransaction] = useState<SimulatedTransaction | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const handleStart = () => {
    setIsRunning(true)
    const count = parseInt(transactionCount) || 100
    const fraudPct = parseInt(fraudPercentage) || 15
    const newTransactions = generateTransactions(Math.min(count, 50), fraudPct)
    
    const simulated: SimulatedTransaction[] = newTransactions.map(tx => ({
      transaction: tx,
      detection: generateDetectionResult(tx)
    }))
    
    setTransactions(simulated)
  }

  const handleStop = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTransactions([])
  }

  const viewTransaction = (item: SimulatedTransaction) => {
    setSelectedTransaction(item)
    setIsDetailOpen(true)
  }

  const exportTransactionData = (item: SimulatedTransaction) => {
    const exportData = {
      transaction: item.transaction,
      detection: item.detection
    }
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `simulation-${item.transaction.id}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const exportAllData = () => {
    const exportData = transactions.map(item => ({
      transaction: item.transaction,
      detection: item.detection
    }))
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `simulation-all-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const fraudCount = transactions.filter(t => t.transaction.isFraud).length
  const normalCount = transactions.length - fraudCount

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Transaction Simulation</h1>
        <p className="text-muted-foreground mt-1">
          Generate and simulate transactions to test fraud detection rules (Threshold: {formatINR(FRAUD_THRESHOLD)})
        </p>
      </div>

      {/* Controls */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Simulation Controls</CardTitle>
          <CardDescription className="text-muted-foreground">
            Configure simulation parameters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-card-foreground">
                Number of Transactions
              </label>
              <Input
                type="number"
                value={transactionCount}
                onChange={(e) => setTransactionCount(e.target.value)}
                className="bg-input border-border text-card-foreground"
                min="1"
                max="1000"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-card-foreground">
                Fraud Percentage (%)
              </label>
              <Input
                type="number"
                value={fraudPercentage}
                onChange={(e) => setFraudPercentage(e.target.value)}
                className="bg-input border-border text-card-foreground"
                min="0"
                max="100"
              />
            </div>
            <div className="flex items-end gap-2 col-span-2">
              <Button
                onClick={handleStart}
                disabled={isRunning}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <PlayCircle className="h-4 w-4 mr-2" />
                Generate
              </Button>
              <Button
                onClick={handleStop}
                disabled={!isRunning}
                variant="outline"
                className="border-border text-foreground hover:bg-secondary"
              >
                <Pause className="h-4 w-4 mr-2" />
                Stop
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="border-border text-foreground hover:bg-secondary"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              {transactions.length > 0 && (
                <Button
                  onClick={exportAllData}
                  variant="outline"
                  className="border-border text-foreground hover:bg-secondary"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export All
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      {transactions.length > 0 && (
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-card-foreground">{transactions.length}</div>
              <p className="text-sm text-muted-foreground">Total Transactions</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">{normalCount}</div>
              <p className="text-sm text-muted-foreground">Normal Transactions</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-destructive">{fraudCount}</div>
              <p className="text-sm text-muted-foreground">Fraudulent Detected</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Results */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Simulation Results</CardTitle>
          <CardDescription className="text-muted-foreground">
            {transactions.length > 0
              ? `Showing ${transactions.length} simulated transactions`
              : "Run a simulation to see results"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No transactions simulated yet. Click Generate to begin.
            </div>
          ) : (
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {transactions.map((item) => (
                <div
                  key={item.transaction.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border"
                >
                  <div className="flex items-center gap-4">
                    {item.transaction.isFraud ? (
                      <XCircle className="h-5 w-5 text-destructive" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-primary" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-card-foreground">
                        {item.transaction.type} - {formatINR(item.transaction.amount)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.transaction.id} | {item.transaction.location} | {item.transaction.customerName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.transaction.isFraud
                          ? "bg-destructive/20 text-destructive"
                          : "bg-primary/20 text-primary"
                      }`}
                    >
                      {item.transaction.isFraud ? "Fraudulent" : "Normal"}
                    </span>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-border hover:bg-secondary"
                      onClick={() => viewTransaction(item)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Transaction Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-2xl bg-card border-border max-h-[90vh] overflow-y-auto">
          {selectedTransaction && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  {selectedTransaction.transaction.isFraud ? (
                    <XCircle className="h-5 w-5 text-destructive" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-primary" />
                  )}
                  <DialogTitle className="text-card-foreground">
                    Simulated Transaction Details
                  </DialogTitle>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium uppercase ${
                    selectedTransaction.transaction.isFraud
                      ? "bg-destructive/20 text-destructive"
                      : "bg-primary/20 text-primary"
                  }`}>
                    {selectedTransaction.transaction.isFraud ? "Fraudulent" : "Normal"}
                  </span>
                </div>
                <DialogDescription className="text-muted-foreground">
                  Transaction {selectedTransaction.transaction.id}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Fraud Reason if applicable */}
                {selectedTransaction.transaction.isFraud && (
                  <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                    <h4 className="text-sm font-semibold text-destructive flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4" />
                      Fraud Detection Reason
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
                )}

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
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> Location
                      </p>
                      <p className="text-sm text-card-foreground">{selectedTransaction.transaction.location}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Merchant</p>
                      <p className="text-sm text-card-foreground">{selectedTransaction.transaction.merchantName}</p>
                    </div>
                  </div>
                </div>

                {/* Detection Info */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-card-foreground flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    Detection Analysis
                  </h4>
                  <div className="p-4 rounded-lg bg-secondary/50 border border-border space-y-4">
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
                              : "bg-primary"
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
