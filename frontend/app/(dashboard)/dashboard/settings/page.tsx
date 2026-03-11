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
import { useAuth } from "@/lib/auth-context"
import { User, Bell, Shield, Key, Save, Eye, EyeOff, CheckCircle } from "lucide-react"

export default function SettingsPage() {
  const { user } = useAuth()
  const [firstName, setFirstName] = useState(user?.firstName || "")
  const [lastName, setLastName] = useState(user?.lastName || "")
  const [email, setEmail] = useState(user?.email || "")
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    weekly: true,
  })
  const [security, setSecurity] = useState({
    twoFactor: false,
    loginAlerts: true,
    sessionTimeout: "30",
  })
  
  // Change Password State
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState(false)

  const handleSaveProfile = () => {
    alert("Profile saved successfully!")
  }

  const handleSaveNotifications = () => {
    alert("Notification preferences saved!")
  }

  const handleSaveSecurity = () => {
    alert("Security settings saved!")
  }

  const handleChangePassword = () => {
    setPasswordError("")
    setPasswordSuccess(false)

    // Validation
    if (!currentPassword) {
      setPasswordError("Please enter your current password")
      return
    }
    if (!newPassword) {
      setPasswordError("Please enter a new password")
      return
    }
    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters")
      return
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordError("New passwords do not match")
      return
    }
    if (currentPassword === newPassword) {
      setPasswordError("New password must be different from current password")
      return
    }

    // Simulate password change (in production, call API)
    setPasswordSuccess(true)
    setTimeout(() => {
      setIsPasswordDialogOpen(false)
      setCurrentPassword("")
      setNewPassword("")
      setConfirmNewPassword("")
      setPasswordSuccess(false)
    }, 2000)
  }

  const openPasswordDialog = () => {
    setCurrentPassword("")
    setNewPassword("")
    setConfirmNewPassword("")
    setPasswordError("")
    setPasswordSuccess(false)
    setIsPasswordDialogOpen(true)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Profile Settings */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-card-foreground">Profile Information</CardTitle>
              <CardDescription className="text-muted-foreground">
                Update your personal details
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 max-w-2xl">
            <div className="space-y-2">
              <label className="text-sm font-medium text-card-foreground">First Name</label>
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-input border-border text-card-foreground"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-card-foreground">Last Name</label>
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-input border-border text-card-foreground"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-card-foreground">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-input border-border text-card-foreground"
              />
            </div>
          </div>
          <Button onClick={handleSaveProfile} className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90">
            <Save className="h-4 w-4 mr-2" />
            Save Profile
          </Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-chart-2/10">
              <Bell className="h-5 w-5 text-chart-2" />
            </div>
            <div>
              <CardTitle className="text-card-foreground">Notification Preferences</CardTitle>
              <CardDescription className="text-muted-foreground">
                Configure how you receive alerts
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-w-2xl">
            {[
              { key: "email", label: "Email Notifications", desc: "Receive alerts via email" },
              { key: "push", label: "Push Notifications", desc: "Browser push notifications" },
              { key: "sms", label: "SMS Alerts", desc: "Critical alerts via SMS" },
              { key: "weekly", label: "Weekly Digest", desc: "Weekly summary reports" },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border"
              >
                <div>
                  <p className="text-sm font-medium text-card-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <button
                  onClick={() =>
                    setNotifications((prev) => ({
                      ...prev,
                      [item.key]: !prev[item.key as keyof typeof prev],
                    }))
                  }
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    notifications[item.key as keyof typeof notifications]
                      ? "bg-primary"
                      : "bg-muted"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-card-foreground transition-transform ${
                      notifications[item.key as keyof typeof notifications]
                        ? "translate-x-5"
                        : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
          <Button onClick={handleSaveNotifications} className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90">
            <Save className="h-4 w-4 mr-2" />
            Save Notifications
          </Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-chart-3/10">
              <Shield className="h-5 w-5 text-chart-3" />
            </div>
            <div>
              <CardTitle className="text-card-foreground">Security Settings</CardTitle>
              <CardDescription className="text-muted-foreground">
                Manage your account security
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border">
              <div>
                <p className="text-sm font-medium text-card-foreground">Two-Factor Authentication</p>
                <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
              </div>
              <button
                onClick={() =>
                  setSecurity((prev) => ({ ...prev, twoFactor: !prev.twoFactor }))
                }
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  security.twoFactor ? "bg-primary" : "bg-muted"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-card-foreground transition-transform ${
                    security.twoFactor ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border">
              <div>
                <p className="text-sm font-medium text-card-foreground">Login Alerts</p>
                <p className="text-xs text-muted-foreground">Get notified of new logins</p>
              </div>
              <button
                onClick={() =>
                  setSecurity((prev) => ({ ...prev, loginAlerts: !prev.loginAlerts }))
                }
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  security.loginAlerts ? "bg-primary" : "bg-muted"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-card-foreground transition-transform ${
                    security.loginAlerts ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
            <div className="p-4 rounded-lg bg-secondary/50 border border-border">
              <label className="text-sm font-medium text-card-foreground block mb-2">
                Session Timeout (minutes)
              </label>
              <Input
                type="number"
                value={security.sessionTimeout}
                onChange={(e) =>
                  setSecurity((prev) => ({ ...prev, sessionTimeout: e.target.value }))
                }
                className="bg-input border-border text-card-foreground max-w-32"
                min="5"
                max="120"
              />
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <Button onClick={handleSaveSecurity} className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Save className="h-4 w-4 mr-2" />
              Save Security
            </Button>
            <Button 
              variant="outline" 
              className="border-border hover:bg-secondary"
              onClick={openPasswordDialog}
            >
              <Key className="h-4 w-4 mr-2" />
              Change Password
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Change Password Dialog */}
      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-card-foreground flex items-center gap-2">
              <Key className="h-5 w-5 text-primary" />
              Change Password
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Enter your current password and choose a new one
            </DialogDescription>
          </DialogHeader>

          {passwordSuccess ? (
            <div className="py-8 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <p className="text-card-foreground font-medium">Password changed successfully!</p>
              <p className="text-sm text-muted-foreground mt-1">Your new password is now active</p>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-card-foreground">Current Password</label>
                <div className="relative">
                  <Input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="bg-input border-border text-card-foreground pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-card-foreground"
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-card-foreground">New Password</label>
                <div className="relative">
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password (min 8 characters)"
                    className="bg-input border-border text-card-foreground pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-card-foreground"
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-card-foreground">Confirm New Password</label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="bg-input border-border text-card-foreground pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-card-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {passwordError && (
                <p className="text-sm text-destructive">{passwordError}</p>
              )}
            </div>
          )}

          {!passwordSuccess && (
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsPasswordDialogOpen(false)}
                className="border-border text-card-foreground"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleChangePassword}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Change Password
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
