"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useAuth } from "@/lib/auth-context"
import { 
  generateTransactions, 
  generateDetectionResult, 
  formatINR, 
  FRAUD_THRESHOLD,
  type Transaction,
  type DetectionResult
} from "@/lib/transaction-utils"
import { Shield, AlertTriangle, CheckCircle, Activity, X, Bell, Download, Eye, MapPin, CreditCard, Clock, User, Hash, Phone, Mail, RefreshCw } from "lucide-react"

interface AlertData {
  id: number
  severity: "critical" | "high" | "medium"
  message: string
  time: string
  transaction: Transaction
  detection: DetectionResult
}

// Generate alerts from fraudulent transactions
function generateAlerts(transactions: Transaction[]): AlertData[] {
  return transactions
    .filter(tx => tx.isFraud)
    .slice(0, 5)
    .map((tx, index) => {
      const detection = generateDetectionResult(tx)
      const severity: AlertData["severity"] = 
        tx.riskScore >= 80 ? "critical" : 
        tx.riskScore >= 60 ? "high" : "medium"
      
      const timeAgo = index === 0 ? "Just now" : 
        index === 1 ? "5 min ago" : 
        index === 2 ? "12 min ago" : 
        index === 3 ? "25 min ago" : "1 hour ago"
      
      return {
        id: index + 1,
        severity,
        message: tx.amount > FRAUD_THRESHOLD 
          ? `Suspicious transaction of ${formatINR(tx.amount)} detected from account ${tx.accountFrom}`
          : `Unusual activity from ${tx.location} for ${formatINR(tx.amount)}`,
        time: timeAgo,
        transaction: tx,
        detection,
      }
    })
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [alerts, setAlerts] = useState<AlertData[]>([])
  const [dismissedAlerts, setDismissedAlerts] = useState<number[]>([])
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [selectedAlert, setSelectedAlert] = useState<AlertData | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const alertRef = useRef<HTMLDivElement>(null)

  // Generate initial transactions
  useEffect(() => {
    refreshData()
  }, [])

  const refreshData = () => {
    setIsRefreshing(true)
    const newTransactions = generateTransactions(50, 20)
    setTransactions(newTransactions)
    setAlerts(generateAlerts(newTransactions))
    setDismissedAlerts([])
    setTimeout(() => setIsRefreshing(false), 500)
  }

  const visibleAlerts = alerts.filter(alert => !dismissedAlerts.includes(alert.id))
  const alertCount = visibleAlerts.length

  const stats = [
    {
      title: "Total Transactions",
      value: transactions.length.toLocaleString(),
      change: "+12.5%",
      icon: Activity,
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
    {
      title: "Fraud Detected",
      value: transactions.filter(tx => tx.isFraud).length.toString(),
      change: "-8.3%",
      icon: AlertTriangle,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
    {
      title: "Blocked Transactions",
      value: transactions.filter(tx => tx.status === "blocked").length.toString(),
      change: "+3.2%",
      icon: Shield,
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
    },
    {
      title: "Success Rate",
      value: `${((transactions.filter(tx => tx.status === "completed").length / Math.max(transactions.length, 1)) * 100).toFixed(1)}%`,
      change: "+0.1%",
      icon: CheckCircle,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ]

  const dismissAlert = (id: number) => {
    setDismissedAlerts(prev => [...prev, id])
  }

  const viewAlert = (alert: AlertData) => {
    setSelectedAlert(alert)
    setIsDetailOpen(true)
    setIsAlertOpen(false)
  }

  const exportAlertData = (alert: AlertData) => {
    const exportData = {
      alert: {
        id: alert.id,
        severity: alert.severity,
        message: alert.message,
        time: alert.time
      },
      transaction: alert.transaction,
      detection: alert.detection
    }
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `fraud-alert-${alert.transaction.id}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (alertRef.current && !alertRef.current.contains(event.target as Node)) {
        setIsAlertOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="space-y-8">
      {/* Header with Alert Icon */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {user?.firstName}
          </h1>
          <p className="text-muted-foreground mt-1">
            {"Here's what's happening with your fraud detection system today."}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Refresh Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={refreshData}
            disabled={isRefreshing}
            className="border-border hover:bg-secondary"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>

          {/* Alert Bell Icon */}
          <div className="relative" ref={alertRef}>
            <button
              onClick={() => setIsAlertOpen(!isAlertOpen)}
              className="relative p-2 rounded-lg bg-secondary hover:bg-secondary/80 border border-border transition-colors"
            >
              <Bell className="h-5 w-5 text-foreground" />
              {alertCount > 0 && (
                <>
                  <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-destructive animate-ping opacity-75" />
                  <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-destructive" />
                </>
              )}
            </button>

            {alertCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive flex items-center justify-center text-xs text-destructive-foreground font-medium">
                {alertCount}
              </span>
            )}

            {/* Alert Dropdown */}
            {isAlertOpen && (
              <div className="absolute right-0 top-full mt-2 w-96 rounded-lg border border-border bg-card shadow-lg z-50">
                <div className="p-3 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-card-foreground">Fraud Alerts</h3>
                    {alertCount > 0 && (
                      <span className="text-xs text-destructive font-medium">{alertCount} active</span>
                    )}
                  </div>
                </div>

                <div className="max-h-80 overflow-y-auto">
                  {visibleAlerts.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground text-sm">
                      No active alerts
                    </div>
                  ) : (
                    <div className="divide-y divide-border">
                      {visibleAlerts.map((alert) => (
                        <div key={alert.id} className="p-3 hover:bg-secondary/50 transition-colors">
                          <div className="flex items-start gap-3">
                            <span className={`mt-1.5 flex-shrink-0 h-2 w-2 rounded-full ${
                              alert.severity === "critical" 
                                ? "bg-destructive animate-pulse" 
                                : alert.severity === "high"
                                ? "bg-chart-3"
                                : "bg-chart-2"
                            }`} />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-card-foreground leading-tight">{alert.message}</p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-muted-foreground">{alert.time}</span>
                                <div className="flex items-center gap-2">
                                  <Button 
                                    size="sm" 
                                    variant="default" 
                                    className="h-7 px-3 text-xs bg-primary text-primary-foreground hover:bg-primary/90"
                                    onClick={() => viewAlert(alert)}
                                  >
                                    <Eye className="h-3 w-3 mr-1" />
                                    View Details
                                  </Button>
                                  <button 
                                    onClick={() => dismissAlert(alert.id)}
                                    className="p-1 rounded hover:bg-muted transition-colors"
                                  >
                                    <X className="h-3 w-3 text-muted-foreground" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Alert Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-2xl bg-card border-border max-h-[90vh] overflow-y-auto">
          {selectedAlert && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <span className={`h-3 w-3 rounded-full ${
                    selectedAlert.severity === "critical" 
                      ? "bg-destructive animate-pulse" 
                      : selectedAlert.severity === "high"
                      ? "bg-chart-3"
                      : "bg-chart-2"
                  }`} />
                  <DialogTitle className="text-card-foreground">
                    Fraud Alert Details
                  </DialogTitle>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium uppercase ${
                    selectedAlert.severity === "critical" 
                      ? "bg-destructive/20 text-destructive" 
                      : selectedAlert.severity === "high"
                      ? "bg-chart-3/20 text-chart-3"
                      : "bg-chart-2/20 text-chart-2"
                  }`}>
                    {selectedAlert.severity}
                  </span>
                </div>
                <DialogDescription className="text-muted-foreground">
                  {selectedAlert.message}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Customer Details */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-card-foreground flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    Customer Details
                  </h4>
                  <div className="grid grid-cols-2 gap-3 p-4 rounded-lg bg-secondary/50 border border-border">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Customer Name</p>
                      <p className="text-sm font-medium text-card-foreground">{selectedAlert.transaction.customerName}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Customer ID</p>
                      <p className="text-sm font-mono text-card-foreground">{selectedAlert.transaction.customerId}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Phone className="h-3 w-3" /> Phone
                      </p>
                      <p className="text-sm text-card-foreground">{selectedAlert.transaction.phoneNumber}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" /> Email
                      </p>
                      <p className="text-sm text-card-foreground">{selectedAlert.transaction.email}</p>
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
                      <p className="text-sm font-mono text-card-foreground">{selectedAlert.transaction.id}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Amount</p>
                      <p className={`text-sm font-semibold ${selectedAlert.transaction.amount > FRAUD_THRESHOLD ? "text-destructive" : "text-card-foreground"}`}>
                        {formatINR(selectedAlert.transaction.amount)}
                        {selectedAlert.transaction.amount > FRAUD_THRESHOLD && (
                          <span className="ml-2 text-xs font-normal">(Exceeds threshold)</span>
                        )}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Type</p>
                      <p className="text-sm text-card-foreground">{selectedAlert.transaction.type}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" /> Timestamp
                      </p>
                      <p className="text-sm text-card-foreground">{selectedAlert.transaction.timestamp}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">From Account</p>
                      <p className="text-sm font-mono text-card-foreground">{selectedAlert.transaction.accountFrom}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">To Account</p>
                      <p className="text-sm font-mono text-card-foreground">{selectedAlert.transaction.accountTo}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> Location
                      </p>
                      <p className="text-sm text-card-foreground">{selectedAlert.transaction.location}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">IP Address</p>
                      <p className="text-sm font-mono text-card-foreground">{selectedAlert.transaction.ipAddress}</p>
                    </div>
                    <div className="space-y-1 col-span-2">
                      <p className="text-xs text-muted-foreground">Merchant</p>
                      <p className="text-sm text-card-foreground">{selectedAlert.transaction.merchantName}</p>
                    </div>
                  </div>
                </div>

                {/* Detection Details */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-card-foreground flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    Detection Details
                  </h4>
                  <div className="p-4 rounded-lg bg-secondary/50 border border-border space-y-4">
                    {/* Fraud Reason */}
                    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                      <p className="text-xs text-destructive font-medium mb-1">Fraud Detection Reason</p>
                      <p className="text-sm text-card-foreground">{selectedAlert.detection.reason}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Rule ID</p>
                        <p className="text-sm font-mono text-card-foreground">{selectedAlert.detection.ruleId}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Rule Name</p>
                        <p className="text-sm text-card-foreground">{selectedAlert.detection.ruleName}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Model Version</p>
                        <p className="text-sm font-mono text-card-foreground">{selectedAlert.detection.modelVersion}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Processing Time</p>
                        <p className="text-sm text-card-foreground">{selectedAlert.detection.processingTime}</p>
                      </div>
                    </div>

                    {/* Risk Score Bar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">Risk Score</p>
                        <p className="text-sm font-semibold text-card-foreground">{selectedAlert.detection.riskScore}%</p>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all ${
                            selectedAlert.detection.riskScore >= 80 
                              ? "bg-destructive" 
                              : selectedAlert.detection.riskScore >= 60
                              ? "bg-chart-3"
                              : "bg-chart-2"
                          }`}
                          style={{ width: `${selectedAlert.detection.riskScore}%` }}
                        />
                      </div>
                    </div>

                    {/* Flags */}
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">Detection Flags</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedAlert.detection.flags.map((flag, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 rounded text-xs bg-destructive/10 text-destructive border border-destructive/20"
                          >
                            {flag}
                          </span>
                        ))}
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
                  onClick={() => exportAlertData(selectedAlert)}
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

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className={stat.change.startsWith("+") ? "text-primary" : "text-destructive"}>
                  {stat.change}
                </span>
                {" from last period"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Alerts */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Recent Activity</CardTitle>
          <CardDescription className="text-muted-foreground">
            Latest fraud detection alerts and system activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.slice(0, 4).map((alert) => (
              <div
                key={alert.id}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border"
              >
                <div className="flex items-center gap-3">
                  <span className={`h-2 w-2 rounded-full ${
                    alert.severity === "critical" 
                      ? "bg-destructive" 
                      : alert.severity === "high"
                      ? "bg-chart-3"
                      : "bg-chart-2"
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-card-foreground">
                      {alert.severity === "critical" ? "Critical" : alert.severity === "high" ? "High Risk" : "Medium Risk"}
                    </p>
                    <p className="text-xs text-muted-foreground">{alert.message}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{alert.time}</span>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-border hover:bg-secondary h-7"
                    onClick={() => viewAlert(alert)}
                  >
                    <Eye className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
