// Fraud detection threshold in INR
export const FRAUD_THRESHOLD = 50000

// Indian locations
const indianLocations = [
  "Mumbai, Maharashtra",
  "Delhi, NCR",
  "Bangalore, Karnataka",
  "Chennai, Tamil Nadu",
  "Hyderabad, Telangana",
  "Kolkata, West Bengal",
  "Pune, Maharashtra",
  "Ahmedabad, Gujarat",
  "Jaipur, Rajasthan",
  "Lucknow, Uttar Pradesh",
]

// Suspicious locations (for fraud detection)
const suspiciousLocations = [
  "Lagos, Nigeria",
  "Moscow, Russia",
  "Pyongyang, North Korea",
  "Unknown Location",
]

const merchantNames = [
  "Flipkart Online",
  "Amazon India",
  "Myntra Fashion",
  "Swiggy Food Delivery",
  "Zomato",
  "Paytm Mall",
  "Big Bazaar",
  "Reliance Digital",
  "DMart",
  "HDFC Bank ATM",
  "SBI Bank ATM",
  "ICICI Bank Transfer",
  "Airtel Payments",
  "PhonePe Merchant",
]

const transactionTypes = ["UPI Transfer", "NEFT", "RTGS", "Card Payment", "ATM Withdrawal", "Net Banking", "IMPS"]

const firstNames = ["Rahul", "Priya", "Amit", "Neha", "Vikram", "Anjali", "Suresh", "Pooja", "Rajesh", "Sneha"]
const lastNames = ["Sharma", "Patel", "Singh", "Kumar", "Verma", "Gupta", "Reddy", "Nair", "Joshi", "Mehta"]

export interface Transaction {
  id: string
  amount: number
  currency: string
  type: string
  accountFrom: string
  accountTo: string
  timestamp: string
  location: string
  ipAddress: string
  deviceId: string
  merchantName: string
  status: "completed" | "flagged" | "pending" | "blocked"
  riskScore: number
  isFraud: boolean
  customerName: string
  customerId: string
  phoneNumber: string
  email: string
}

export interface DetectionResult {
  ruleId: string
  ruleName: string
  riskScore: number
  confidence: number
  flags: string[]
  modelVersion: string
  processingTime: string
  reason: string
}

// Generate random account number (masked)
const generateAccountNumber = () => `****${Math.floor(1000 + Math.random() * 9000)}`

// Generate random IP address
const generateIP = () => `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`

// Generate random phone number (Indian format)
const generatePhone = () => `+91 ${Math.floor(70000 + Math.random() * 29999)}${Math.floor(10000 + Math.random() * 89999)}`

// Generate random email
const generateEmail = (name: string) => {
  const domains = ["gmail.com", "yahoo.co.in", "outlook.com", "rediffmail.com"]
  return `${name.toLowerCase().replace(" ", ".")}${Math.floor(Math.random() * 99)}@${domains[Math.floor(Math.random() * domains.length)]}`
}

// Generate a single transaction
export function generateTransaction(forceHighAmount = false): Transaction {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
  const customerName = `${firstName} ${lastName}`
  
  // Determine if this transaction should be high value (potential fraud)
  const isHighValue = forceHighAmount || Math.random() < 0.15 // 15% chance of high value
  
  // Generate amount - if high value, generate above threshold
  const amount = isHighValue 
    ? Math.floor(FRAUD_THRESHOLD + Math.random() * 150000) // 50,000 to 200,000
    : Math.floor(100 + Math.random() * 45000) // 100 to 45,000
  
  // Determine fraud indicators
  const isSuspiciousLocation = Math.random() < 0.1
  const location = isSuspiciousLocation 
    ? suspiciousLocations[Math.floor(Math.random() * suspiciousLocations.length)]
    : indianLocations[Math.floor(Math.random() * indianLocations.length)]
  
  // Calculate if it's fraud based on rules
  const isFraud = amount > FRAUD_THRESHOLD || isSuspiciousLocation
  
  // Calculate risk score
  let riskScore = 10
  if (amount > FRAUD_THRESHOLD) riskScore += 50
  if (amount > 100000) riskScore += 20
  if (isSuspiciousLocation) riskScore += 30
  riskScore = Math.min(riskScore + Math.floor(Math.random() * 15), 100)
  
  // Determine status
  let status: Transaction["status"] = "completed"
  if (isFraud) {
    status = riskScore > 80 ? "blocked" : "flagged"
  } else if (Math.random() < 0.1) {
    status = "pending"
  }
  
  const now = new Date()
  const timestamp = new Date(now.getTime() - Math.floor(Math.random() * 86400000)) // Random time within last 24 hours
  
  return {
    id: `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    amount,
    currency: "INR",
    type: transactionTypes[Math.floor(Math.random() * transactionTypes.length)],
    accountFrom: generateAccountNumber(),
    accountTo: generateAccountNumber(),
    timestamp: timestamp.toISOString().replace("T", " ").slice(0, 19),
    location,
    ipAddress: generateIP(),
    deviceId: `DEV-${Math.floor(Math.random() * 10000)}-${["MH", "DL", "KA", "TN", "AP"][Math.floor(Math.random() * 5)]}`,
    merchantName: merchantNames[Math.floor(Math.random() * merchantNames.length)],
    status,
    riskScore,
    isFraud,
    customerName,
    customerId: `CUST-${Math.floor(10000 + Math.random() * 90000)}`,
    phoneNumber: generatePhone(),
    email: generateEmail(customerName),
  }
}

// Generate detection result for a transaction
export function generateDetectionResult(transaction: Transaction): DetectionResult {
  const flags: string[] = []
  let reason = ""
  let ruleName = "Standard Check"
  let ruleId = "RULE-STD-001"
  
  if (transaction.amount > FRAUD_THRESHOLD) {
    flags.push("High Amount (>₹50,000)")
    reason = `Transaction amount ₹${transaction.amount.toLocaleString("en-IN")} exceeds the fraud detection threshold of ₹50,000`
    ruleName = "High Value Transaction Alert"
    ruleId = "RULE-FRD-001"
  }
  
  if (transaction.amount > 100000) {
    flags.push("Very High Amount (>₹1,00,000)")
  }
  
  if (suspiciousLocations.includes(transaction.location)) {
    flags.push("Suspicious Location")
    if (!reason) {
      reason = `Transaction originated from suspicious location: ${transaction.location}`
      ruleName = "Geo-Location Alert"
      ruleId = "RULE-FRD-002"
    } else {
      reason += ` and originated from suspicious location: ${transaction.location}`
    }
  }
  
  if (transaction.deviceId.includes("UNKNOWN")) {
    flags.push("Unknown Device")
  }
  
  if (flags.length === 0) {
    flags.push("No Anomalies Detected")
    reason = "Transaction passed all security checks"
  }
  
  return {
    ruleId,
    ruleName,
    riskScore: transaction.riskScore,
    confidence: Math.floor(75 + Math.random() * 20),
    flags,
    modelVersion: "v4.1.2",
    processingTime: `${Math.floor(50 + Math.random() * 150)}ms`,
    reason,
  }
}

// Generate multiple transactions
export function generateTransactions(count: number, fraudPercentage = 15): Transaction[] {
  const transactions: Transaction[] = []
  const fraudCount = Math.floor(count * (fraudPercentage / 100))
  
  for (let i = 0; i < count; i++) {
    const forceHighAmount = i < fraudCount
    transactions.push(generateTransaction(forceHighAmount))
  }
  
  // Shuffle the array
  return transactions.sort(() => Math.random() - 0.5)
}

// Format currency in Indian format
export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`
}

// Get fraud status color
export function getFraudStatusColor(isFraud: boolean, riskScore: number): string {
  if (isFraud && riskScore >= 80) return "text-destructive"
  if (isFraud) return "text-chart-3"
  return "text-primary"
}

// Get status badge color
export function getStatusBadgeColor(status: Transaction["status"]): string {
  switch (status) {
    case "blocked":
      return "bg-destructive/20 text-destructive"
    case "flagged":
      return "bg-chart-3/20 text-chart-3"
    case "pending":
      return "bg-chart-2/20 text-chart-2"
    default:
      return "bg-primary/20 text-primary"
  }
}
