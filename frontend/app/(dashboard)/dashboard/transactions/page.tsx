"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { generateBulkTransactions, checkFraud } from "@/lib/api"
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
  getStatusBadgeColor,
  type Transaction,
  type DetectionResult
} from "@/lib/transaction-utils"
import { Search, Download, CheckCircle, XCircle, Clock, RefreshCw, Eye, User, CreditCard, MapPin, Hash, Phone, Mail, Shield, AlertTriangle } from "lucide-react"

interface TransactionWithDetection {
  transaction: Transaction
  detection: DetectionResult
}

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [transactions, setTransactions] = useState<TransactionWithDetection[]>([])
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionWithDetection | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    refreshData()
  }, [])

//   const refreshData = () => {
//     setIsRefreshing(true)
//     const newTransactions = generateTransactions(30, 20)
//     const withDetection: TransactionWithDetection[] = newTransactions.map(tx => ({
//       transaction: tx,
//       detection: generateDetectionResult(tx)
//     }))
//     setTransactions(withDetection)
//     setTimeout(() => setIsRefreshing(false), 500)
//   }


const refreshData = async () => {

  setIsRefreshing(true)

  try {

    const data = await generateBulkTransactions(30)

    const withDetection = []

    for (const tx of data) {

      const detection = await checkFraud(tx)

      withDetection.push({
        transaction: detection
      })

    }

    setTransactions(withDetection)

  } catch (error) {
    console.error("Error loading transactions", error)
  }

  setIsRefreshing(false)

}

  const filteredTransactions = transactions.filter((item) => {
    const tx = item.transaction
    const matchesSearch =
      tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.merchantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || tx.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-primary" />
      case "flagged":
        return <AlertTriangle className="h-4 w-4 text-chart-3" />
      case "blocked":
        return <XCircle className="h-4 w-4 text-destructive" />
      case "pending":
        return <Clock className="h-4 w-4 text-chart-2" />
      default:
        return null
    }
  }

  const viewTransaction = (item: TransactionWithDetection) => {
    setSelectedTransaction(item)
    setIsDetailOpen(true)
  }

  const exportTransactionData = (item: TransactionWithDetection) => {
    const exportData = {
      transaction: item.transaction,
      detection: item.detection
    }
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `transaction-${item.transaction.id}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const exportAllData = () => {
    const exportData = filteredTransactions.map(item => ({
      transaction: item.transaction,
      detection: item.detection
    }))
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `transactions-export-${Date.now()}.json`
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
          <h1 className="text-3xl font-bold text-foreground">Transactions</h1>
          <p className="text-muted-foreground mt-1">
            View and manage all transaction records (Fraud Threshold: {formatINR(FRAUD_THRESHOLD)})
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

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by ID, merchant, location, or customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-input border-border text-card-foreground"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                onClick={() => setStatusFilter("all")}
                size="sm"
                className={statusFilter === "all" ? "bg-primary text-primary-foreground" : "border-border hover:bg-secondary"}
              >
                All
              </Button>
              <Button
                variant={statusFilter === "completed" ? "default" : "outline"}
                onClick={() => setStatusFilter("completed")}
                size="sm"
                className={statusFilter === "completed" ? "bg-primary text-primary-foreground" : "border-border hover:bg-secondary"}
              >
                Completed
              </Button>
              <Button
                variant={statusFilter === "flagged" ? "default" : "outline"}
                onClick={() => setStatusFilter("flagged")}
                size="sm"
                className={statusFilter === "flagged" ? "bg-primary text-primary-foreground" : "border-border hover:bg-secondary"}
              >
                Flagged
              </Button>
              <Button
                variant={statusFilter === "blocked" ? "default" : "outline"}
                onClick={() => setStatusFilter("blocked")}
                size="sm"
                className={statusFilter === "blocked" ? "bg-primary text-primary-foreground" : "border-border hover:bg-secondary"}
              >
                Blocked
              </Button>
              <Button
                variant={statusFilter === "pending" ? "default" : "outline"}
                onClick={() => setStatusFilter("pending")}
                size="sm"
                className={statusFilter === "pending" ? "bg-primary text-primary-foreground" : "border-border hover:bg-secondary"}
              >
                Pending
              </Button>
            </div>
            <Button variant="outline" className="border-border hover:bg-secondary" onClick={exportAllData}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Transaction History</CardTitle>
          <CardDescription className="text-muted-foreground">
            {filteredTransactions.length} transactions found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Merchant</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Risk</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((item) => (
                  <tr key={item.transaction.id} className="border-b border-border hover:bg-secondary/30">
                    <td className="py-3 px-4 text-sm text-card-foreground font-mono">{item.transaction.id.slice(-10)}</td>
                    <td className="py-3 px-4 text-sm text-card-foreground">{item.transaction.customerName}</td>
                    <td className={`py-3 px-4 text-sm font-medium ${item.transaction.amount > FRAUD_THRESHOLD ? "text-destructive" : "text-card-foreground"}`}>
                      {formatINR(item.transaction.amount)}
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{item.transaction.type}</td>
                    <td className="py-3 px-4 text-sm text-card-foreground">{item.transaction.merchantName}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-sm font-medium ${
                          item.transaction.riskScore >= 70
                            ? "text-destructive"
                            : item.transaction.riskScore >= 40
                            ? "text-chart-3"
                            : "text-primary"
                        }`}
                      >
                        {item.transaction.riskScore}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(item.transaction.status)}`}
                      >
                        {getStatusIcon(item.transaction.status)}
                        {item.transaction.status.charAt(0).toUpperCase() + item.transaction.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-border hover:bg-secondary h-8"
                        onClick={() => viewTransaction(item)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                  {getStatusIcon(selectedTransaction.transaction.status)}
                  <DialogTitle className="text-card-foreground">
                    Transaction Details
                  </DialogTitle>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium uppercase ${getStatusBadgeColor(selectedTransaction.transaction.status)}`}>
                    {selectedTransaction.transaction.status}
                  </span>
                </div>
                <DialogDescription className="text-muted-foreground">
                  Transaction {selectedTransaction.transaction.id}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Fraud Alert if applicable */}
                {selectedTransaction.transaction.isFraud && (
                  <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                    <h4 className="text-sm font-semibold text-destructive flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4" />
                      Fraud Detection Alert
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
                      <p className="text-xs text-muted-foreground">Timestamp</p>
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

                {/* Risk Analysis */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-card-foreground flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    Risk Analysis
                  </h4>
                  <div className="p-4 rounded-lg bg-secondary/50 border border-border space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">Risk Score</p>
                        <p className="text-sm font-semibold text-card-foreground">{selectedTransaction.transaction.riskScore}%</p>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all ${
                            selectedTransaction.transaction.riskScore >= 70 
                              ? "bg-destructive" 
                              : selectedTransaction.transaction.riskScore >= 40
                              ? "bg-chart-3"
                              : "bg-primary"
                          }`}
                          style={{ width: `${selectedTransaction.transaction.riskScore}%` }}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Detection Rule</p>
                        <p className="text-sm text-card-foreground">{selectedTransaction.detection.ruleName}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Processing Time</p>
                        <p className="text-sm text-card-foreground">{selectedTransaction.detection.processingTime}</p>
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
