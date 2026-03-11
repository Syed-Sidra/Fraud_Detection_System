"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (userData: SignupData) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

interface SignupData {
  firstName: string
  lastName: string
  email: string
  password: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const storedUser = sessionStorage.getItem("fraud-detect-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const signup = async (userData: SignupData): Promise<boolean> => {
    // Simulate API call - in production, this would call your backend
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    const newUser: User = {
      id: crypto.randomUUID(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
    }
    
    // Store user data (in production, this would be handled by your backend)
    const users = JSON.parse(sessionStorage.getItem("fraud-detect-users") || "[]")
    users.push({ ...newUser, password: userData.password })
    sessionStorage.setItem("fraud-detect-users", JSON.stringify(users))
    
    setUser(newUser)
    sessionStorage.setItem("fraud-detect-user", JSON.stringify(newUser))
    return true
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    const users = JSON.parse(sessionStorage.getItem("fraud-detect-users") || "[]")
    const foundUser = users.find(
      (u: { email: string; password: string }) => u.email === email && u.password === password
    )
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      sessionStorage.setItem("fraud-detect-user", JSON.stringify(userWithoutPassword))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    sessionStorage.removeItem("fraud-detect-user")
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
