"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Eye, EyeOff, Phone, Mail, ArrowLeft, CheckCircle } from "lucide-react"

type VerificationMethod = "email" | "phone"
type LoginStep = "credentials" | "method" | "otp" | "success"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<LoginStep>("credentials")
  const [verificationMethod, setVerificationMethod] = useState<VerificationMethod>("email")
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [phoneNumber, setPhoneNumber] = useState("+91 98765 43210") // Simulated phone
  const [resendTimer, setResendTimer] = useState(30)
  const [canResend, setCanResend] = useState(false)
  
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])
  const router = useRouter()
  const { login } = useAuth()

  // Countdown timer for resend OTP
  useEffect(() => {
    if (step === "otp" && resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timer)
    } else if (resendTimer === 0) {
      setCanResend(true)
    }
  }, [step, resendTimer])

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate credential validation
    await new Promise(resolve => setTimeout(resolve, 500))
    
    if (!email || !password) {
      setError("Please enter email and password")
      setIsLoading(false)
      return
    }

    // Move to verification method selection
    setIsLoading(false)
    setStep("method")
  }

  const handleMethodSelect = (method: VerificationMethod) => {
    setVerificationMethod(method)
    setResendTimer(30)
    setCanResend(false)
    setOtp(["", "", "", "", "", ""])
    setStep("otp")
    
    // Focus first OTP input after a short delay
    setTimeout(() => otpRefs.current[0]?.focus(), 100)
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1)
    }
    
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").slice(0, 6)
    if (!/^\d+$/.test(pastedData)) return
    
    const newOtp = [...otp]
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i]
    }
    setOtp(newOtp)
    
    // Focus the next empty input or the last one
    const nextEmptyIndex = newOtp.findIndex(v => !v)
    if (nextEmptyIndex !== -1) {
      otpRefs.current[nextEmptyIndex]?.focus()
    } else {
      otpRefs.current[5]?.focus()
    }
  }

  const handleVerifyOtp = async () => {
    setError("")
    const otpValue = otp.join("")
    
    if (otpValue.length !== 6) {
      setError("Please enter the complete 6-digit OTP")
      return
    }

    setIsLoading(true)
    
    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // For demo, any 6-digit code works
    const success = await login(email, password)
    
    if (success) {
      setStep("success")
      setTimeout(() => {
        router.push("/dashboard")
      }, 1500)
    } else {
      setError("Invalid OTP. Please try again.")
    }
    
    setIsLoading(false)
  }

  const handleResendOtp = () => {
    setResendTimer(30)
    setCanResend(false)
    setOtp(["", "", "", "", "", ""])
    otpRefs.current[0]?.focus()
    // In production, call API to resend OTP
  }

  const handleBack = () => {
    if (step === "otp") {
      setStep("method")
    } else if (step === "method") {
      setStep("credentials")
    }
  }

  const getMaskedEmail = () => {
    const [localPart, domain] = email.split("@")
    if (localPart.length <= 2) return email
    return `${localPart.slice(0, 2)}${"*".repeat(localPart.length - 2)}@${domain}`
  }

  const getMaskedPhone = () => {
    return phoneNumber.slice(0, -4) + "****"
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-border bg-card">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-card-foreground">
              {step === "credentials" && "Welcome Back"}
              {step === "method" && "Verify Your Identity"}
              {step === "otp" && "Enter OTP"}
              {step === "success" && "Verified!"}
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              {step === "credentials" && "Sign in to access FraudShield Dashboard"}
              {step === "method" && "Choose how you want to receive your verification code"}
              {step === "otp" && verificationMethod === "email" && `Enter the 6-digit code sent to ${getMaskedEmail()}`}
              {step === "otp" && verificationMethod === "phone" && `Enter the 6-digit code sent to ${getMaskedPhone()}`}
              {step === "success" && "Redirecting to dashboard..."}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {/* Step 1: Credentials */}
          {step === "credentials" && (
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-card-foreground">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-input border-border text-card-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-card-foreground">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-input border-border text-card-foreground placeholder:text-muted-foreground pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-card-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Continue"}
              </Button>
            </form>
          )}

          {/* Step 2: Verification Method */}
          {step === "method" && (
            <div className="space-y-4">
              <button
                onClick={() => handleMethodSelect("email")}
                className="w-full p-4 rounded-lg bg-secondary/50 border border-border hover:bg-secondary transition-colors flex items-center gap-4"
              >
                <div className="p-3 rounded-lg bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-card-foreground">Email</p>
                  <p className="text-xs text-muted-foreground">Send OTP to {getMaskedEmail()}</p>
                </div>
              </button>

              <button
                onClick={() => handleMethodSelect("phone")}
                className="w-full p-4 rounded-lg bg-secondary/50 border border-border hover:bg-secondary transition-colors flex items-center gap-4"
              >
                <div className="p-3 rounded-lg bg-chart-2/10">
                  <Phone className="h-5 w-5 text-chart-2" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-card-foreground">Phone</p>
                  <p className="text-xs text-muted-foreground">Send OTP to {getMaskedPhone()}</p>
                </div>
              </button>

              <Button
                variant="ghost"
                className="w-full text-muted-foreground hover:text-card-foreground"
                onClick={handleBack}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to login
              </Button>
            </div>
          )}

          {/* Step 3: OTP Entry */}
          {step === "otp" && (
            <div className="space-y-6">
              <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    ref={(el) => { otpRefs.current[index] = el }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    onPaste={index === 0 ? handleOtpPaste : undefined}
                    className="w-12 h-12 text-center text-lg font-semibold bg-input border-border text-card-foreground"
                  />
                ))}
              </div>

              {error && (
                <p className="text-sm text-destructive text-center">{error}</p>
              )}

              <Button
                onClick={handleVerifyOtp}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={isLoading || otp.join("").length !== 6}
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </Button>

              <div className="text-center">
                {canResend ? (
                  <button
                    onClick={handleResendOtp}
                    className="text-sm text-primary hover:underline"
                  >
                    Resend OTP
                  </button>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Resend OTP in <span className="text-card-foreground font-medium">{resendTimer}s</span>
                  </p>
                )}
              </div>

              <Button
                variant="ghost"
                className="w-full text-muted-foreground hover:text-card-foreground"
                onClick={handleBack}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Choose different method
              </Button>
            </div>
          )}

          {/* Step 4: Success */}
          {step === "success" && (
            <div className="py-8 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <p className="text-card-foreground font-medium">Login Successful!</p>
              <p className="text-sm text-muted-foreground mt-1">Redirecting to dashboard...</p>
            </div>
          )}

          {step === "credentials" && (
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {"Don't have an account?"}{" "}
                <Link href="/signup" className="text-primary hover:underline font-medium">
                  Create one
                </Link>
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
