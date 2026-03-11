"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  generateTransactions, 
  formatINR, 
  FRAUD_THRESHOLD 
} from "@/lib/transaction-utils"
import { TrendingUp, TrendingDown, AlertTriangle, Shield, Activity, RefreshCw } from "lucide-react"

export default function AnalyticsPage() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [analyticsData, setAnalyticsData] = useState({
    totalVolume: 0,
    fraudAttempts: 0,
    preventionRate: 0,
    avgRiskScore: 0,
    fraudByType: [] as { type: string; percentage: number; count: number }[],
    monthlyData: [] as { month: string; transactions: number; fraud: number }[],
    riskDistribution: { low: 0, medium: 0, high: 0 }
  })

  useEffect(() => {
    refreshData()
  }, [])

  const refreshData = () => {
    setIsRefreshing(true)
    
    // Generate transactions for analytics
    const transactions = generateTransactions(200, 18)
    
    const totalVolume = transactions.reduce((sum, tx) => sum + tx.amount, 0)
    const fraudAttempts = transactions.filter(tx => tx.isFraud).length
    const blockedCount = transactions.filter(tx => tx.status === "blocked").length
    const preventionRate = fraudAttempts > 0 ? ((blockedCount / fraudAttempts) * 100) : 100
    const avgRiskScore = Math.round(transactions.reduce((sum, tx) => sum + tx.riskScore, 0) / transactions.length)
    
    // Fraud by type
    const typeCount: Record<string, number> = {}
    transactions.filter(tx => tx.isFraud).forEach(tx => {
      typeCount[tx.type] = (typeCount[tx.type] || 0) + 1
    })
    const totalFraud = Object.values(typeCount).reduce((a, b) => a + b, 0)
    const fraudByType = Object.entries(typeCount)
      .map(([type, count]) => ({
        type,
        count,
        percentage: Math.round((count / totalFraud) * 100)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 4)
    
    // Monthly data (simulated)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
    const monthlyData = months.map((month, i) => ({
      month,
      transactions: Math.floor(8000 + Math.random() * 5000 + i * 500),
      fraud: Math.floor(10 + Math.random() * 15)
    }))
    
    // Risk distribution
    const riskDistribution = {
      low: transactions.filter(tx => tx.riskScore < 30).length,
      medium: transactions.filter(tx => tx.riskScore >= 30 && tx.riskScore < 70).length,
      high: transactions.filter(tx => tx.riskScore >= 70).length
    }
    
    setAnalyticsData({
      totalVolume,
      fraudAttempts,
      preventionRate,
      avgRiskScore,
      fraudByType,
      monthlyData,
      riskDistribution
    })
    
    setTimeout(() => setIsRefreshing(false), 500)
  }

  const metrics = [
    {
      title: "Total Volume",
      value: formatINR(analyticsData.totalVolume),
      change: "+18.2%",
      trend: "up",
      icon: Activity,
    },
    {
      title: "Fraud Attempts",
      value: analyticsData.fraudAttempts.toString(),
      change: "-12.5%",
      trend: "down",
      icon: AlertTriangle,
    },
    {
      title: "Prevention Rate",
      value: `${analyticsData.preventionRate.toFixed(1)}%`,
      change: "+2.1%",
      trend: "up",
      icon: Shield,
    },
    {
      title: "Avg Risk Score",
      value: `${analyticsData.avgRiskScore}%`,
      change: "-5%",
      trend: "down",
      icon: TrendingDown,
    },
  ]

  const maxTransactions = Math.max(...analyticsData.monthlyData.map((d) => d.transactions), 1)
  const totalRisk = analyticsData.riskDistribution.low + analyticsData.riskDistribution.medium + analyticsData.riskDistribution.high

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive fraud detection analytics (Threshold: {formatINR(FRAUD_THRESHOLD)})
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

      {/* Metrics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title} className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{metric.value}</div>
              <div className="flex items-center gap-1 mt-1">
                {metric.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-primary" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-primary" />
                )}
                <span className="text-xs text-primary">{metric.change}</span>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Transaction Trends */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Transaction Trends</CardTitle>
            <CardDescription className="text-muted-foreground">
              Monthly transaction volume and fraud incidents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.monthlyData.map((data) => (
                <div key={data.month} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-card-foreground font-medium">{data.month}</span>
                    <span className="text-muted-foreground">
                      {data.transactions.toLocaleString()} txns / {data.fraud} fraud
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${(data.transactions / maxTransactions) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Fraud by Type */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Fraud by Transaction Type</CardTitle>
            <CardDescription className="text-muted-foreground">
              Distribution of fraud attempts by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.fraudByType.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No fraud data available
                </div>
              ) : (
                analyticsData.fraudByType.map((item) => (
                  <div key={item.type} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-card-foreground font-medium">{item.type}</span>
                      <span className="text-muted-foreground">
                        {item.count} ({item.percentage}%)
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-destructive rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Score Distribution */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Risk Score Distribution</CardTitle>
          <CardDescription className="text-muted-foreground">
            Overview of transaction risk levels (amounts above {formatINR(FRAUD_THRESHOLD)} are flagged)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 text-center">
              <p className="text-3xl font-bold text-primary">
                {totalRisk > 0 ? Math.round((analyticsData.riskDistribution.low / totalRisk) * 100) : 0}%
              </p>
              <p className="text-sm text-muted-foreground mt-1">Low Risk (0-30)</p>
              <p className="text-xs text-muted-foreground">{analyticsData.riskDistribution.low} transactions</p>
            </div>
            <div className="p-4 rounded-lg bg-chart-3/10 border border-chart-3/20 text-center">
              <p className="text-3xl font-bold text-chart-3">
                {totalRisk > 0 ? Math.round((analyticsData.riskDistribution.medium / totalRisk) * 100) : 0}%
              </p>
              <p className="text-sm text-muted-foreground mt-1">Medium Risk (31-70)</p>
              <p className="text-xs text-muted-foreground">{analyticsData.riskDistribution.medium} transactions</p>
            </div>
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-center">
              <p className="text-3xl font-bold text-destructive">
                {totalRisk > 0 ? Math.round((analyticsData.riskDistribution.high / totalRisk) * 100) : 0}%
              </p>
              <p className="text-sm text-muted-foreground mt-1">High Risk (71-100)</p>
              <p className="text-xs text-muted-foreground">{analyticsData.riskDistribution.high} transactions</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
