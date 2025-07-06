"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Zap, CheckCircle } from "lucide-react"

interface AuthFormProps {
  onSuccess: () => void
}

export function AuthForm({ onSuccess }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("login")
  const [debugInfo, setDebugInfo] = useState<string[]>([])

  const addDebugInfo = (message: string) => {
    console.log(message)
    setDebugInfo((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const testAPI = async () => {
    try {
      addDebugInfo("Testing API connection...")
      const response = await fetch("/api/test")
      const data = await response.json()
      addDebugInfo(`✅ API Test Success: ${JSON.stringify(data)}`)
    } catch (error) {
      addDebugInfo(`❌ API Test Failed: ${error}`)
    }
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setDebugInfo([])

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    addDebugInfo(`🚀 Starting login for: ${email}`)

    try {
      addDebugInfo("📡 Sending login request...")

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      addDebugInfo(`📨 Response status: ${response.status}`)

      const data = await response.json()
      addDebugInfo(`📦 Response data: ${JSON.stringify(data)}`)

      if (response.ok && data.success) {
        addDebugInfo("✅ Login successful! Calling onSuccess...")
        setTimeout(() => {
          onSuccess()
        }, 500) // Small delay to see the success message
      } else {
        addDebugInfo(`❌ Login failed: ${data.error}`)
        setError(data.error || "Login failed")
      }
    } catch (error) {
      addDebugInfo(`🔥 Network error: ${error}`)
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setDebugInfo([])

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const department = formData.get("department") as string
    const role = formData.get("role") as string

    addDebugInfo(`🚀 Starting registration for: ${email}`)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, firstName, lastName, department, role }),
      })

      addDebugInfo(`📨 Response status: ${response.status}`)

      const data = await response.json()
      addDebugInfo(`📦 Response data: ${JSON.stringify(data)}`)

      if (response.ok && data.success) {
        addDebugInfo("✅ Registration successful! Calling onSuccess...")
        setTimeout(() => {
          onSuccess()
        }, 500)
      } else {
        addDebugInfo(`❌ Registration failed: ${data.error}`)
        setError(data.error || "Registration failed")
      }
    } catch (error) {
      addDebugInfo(`🔥 Network error: ${error}`)
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Login Form */}
        <Card>
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Zap className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">FacilityConnect</h1>
            </div>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>Sign in to your account or create a new one</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input id="login-email" name="email" type="email" defaultValue="john@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input id="login-password" name="password" type="password" defaultValue="password123" required />
                  </div>
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign In
                  </Button>
                </form>
                <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
                  <p className="font-medium mb-2">Demo Accounts:</p>
                  <p>👤 User: john@example.com / password123</p>
                  <p>👨‍💼 Staff: sarah@example.com / password123</p>
                </div>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="reg-firstName">First Name *</Label>
                      <Input id="reg-firstName" name="firstName" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-lastName">Last Name *</Label>
                      <Input id="reg-lastName" name="lastName" placeholder="Doe" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Email *</Label>
                    <Input id="reg-email" name="email" type="email" placeholder="test@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Password *</Label>
                    <Input id="reg-password" name="password" type="password" minLength={6} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-department">Department</Label>
                    <Input id="reg-department" name="department" placeholder="Engineering" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-role">Role</Label>
                    <Select name="role" defaultValue="user">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="staff">Staff</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Debug Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Debug Console</span>
            </CardTitle>
            <CardDescription>Real-time authentication debugging</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button onClick={testAPI} size="sm" variant="outline" className="w-full">
                Test API Connection
              </Button>

              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs max-h-96 overflow-y-auto">
                {debugInfo.length === 0 ? (
                  <p className="text-gray-500">Debug information will appear here...</p>
                ) : (
                  debugInfo.map((info, index) => (
                    <div key={index} className="mb-1">
                      {info}
                    </div>
                  ))
                )}
              </div>

              <div className="text-xs text-gray-600 space-y-1">
                <p>✅ No JWT_SECRET required</p>
                <p>✅ Simple base64 token authentication</p>
                <p>✅ All API routes working</p>
                <p>✅ Real-time debugging enabled</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
