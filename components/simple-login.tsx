"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface SimpleLoginProps {
  onSuccess: () => void
}

export function SimpleLogin({ onSuccess }: SimpleLoginProps) {
  const [email, setEmail] = useState("john@example.com")
  const [password, setPassword] = useState("password123")
  const [loading, setLoading] = useState(false)
  const [logs, setLogs] = useState<string[]>([])
  const [error, setError] = useState("")

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    const logMessage = `[${timestamp}] ${message}`
    console.log(logMessage)
    setLogs((prev) => [...prev, logMessage])
  }

  const testAPI = async () => {
    addLog("🧪 Testing API...")
    try {
      const response = await fetch("/api/test")
      const data = await response.json()
      addLog(`✅ API Test Success: ${JSON.stringify(data)}`)
    } catch (error) {
      addLog(`❌ API Test Failed: ${error}`)
    }
  }

  const handleLogin = async () => {
    setLoading(true)
    setError("")
    setLogs([])

    addLog("🚀 Starting login process...")
    addLog(`📧 Email: ${email}`)
    addLog(`🔑 Password: ${password}`)

    try {
      addLog("📡 Sending request to /api/auth/login...")

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      addLog(`📨 Response status: ${response.status}`)
      addLog(`📨 Response ok: ${response.ok}`)

      const data = await response.json()
      addLog(`📦 Response data: ${JSON.stringify(data)}`)

      if (response.ok && data.success) {
        addLog("✅ LOGIN SUCCESS!")
        addLog("🎉 Calling onSuccess...")

        // Check if cookie was set
        const cookies = document.cookie
        addLog(`🍪 Cookies: ${cookies}`)

        setTimeout(() => {
          onSuccess()
        }, 1000)
      } else {
        addLog(`❌ Login failed: ${data.error}`)
        setError(data.error || "Login failed")
      }
    } catch (error) {
      addLog(`💥 Network error: ${error}`)
      setError("Network error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-6xl">
        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle>🔐 Simple Login Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

            <div className="space-y-2">
              <Button onClick={testAPI} variant="outline" className="w-full">
                🧪 Test API Connection
              </Button>

              <Button onClick={handleLogin} disabled={loading} className="w-full">
                {loading ? "🔄 Logging in..." : "🚀 Login"}
              </Button>
            </div>

            <div className="text-sm text-gray-600">
              <p>✅ Use: john@example.com / password123</p>
              <p>✅ No environment variables needed</p>
              <p>✅ Check the debug panel →</p>
            </div>
          </CardContent>
        </Card>

        {/* Debug Panel */}
        <Card>
          <CardHeader>
            <CardTitle>🐛 Debug Console</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-black text-green-400 p-4 rounded font-mono text-sm h-96 overflow-y-auto">
              {logs.length === 0 ? (
                <div className="text-gray-500">
                  Debug logs will appear here...
                  <br />
                  <br />
                  1. Click "Test API" first
                  <br />
                  2. Then click "Login"
                  <br />
                  3. Watch the logs here
                </div>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className="mb-1">
                    {log}
                  </div>
                ))
              )}
            </div>

            <div className="mt-4 text-xs text-gray-600">
              <p>🔍 This shows exactly what's happening</p>
              <p>📡 API calls, responses, errors</p>
              <p>🍪 Cookie setting</p>
              <p>✅ Success/failure status</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
