"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestPage() {
  const [results, setResults] = useState<string[]>([])

  const addResult = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    const result = `[${timestamp}] ${message}`
    console.log(result)
    setResults((prev) => [...prev, result])
  }

  const testAPI = async () => {
    setResults([])
    addResult("🧪 Starting API tests...")

    // Test 1: Basic API route
    try {
      addResult("📡 Testing /api/test...")
      const response = await fetch("/api/test")
      addResult(`📨 Status: ${response.status}`)

      if (response.ok) {
        const data = await response.json()
        addResult(`✅ Test API works: ${JSON.stringify(data)}`)
      } else {
        addResult(`❌ Test API failed: ${response.statusText}`)
      }
    } catch (error) {
      addResult(`💥 Test API error: ${error}`)
    }

    // Test 2: Login API route
    try {
      addResult("📡 Testing /api/auth/login...")
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "john@example.com", password: "password123" }),
      })
      addResult(`📨 Login Status: ${response.status}`)

      if (response.ok) {
        const data = await response.json()
        addResult(`✅ Login API works: ${JSON.stringify(data)}`)
      } else {
        addResult(`❌ Login API failed: ${response.statusText}`)
      }
    } catch (error) {
      addResult(`💥 Login API error: ${error}`)
    }

    // Test 3: Check cookies
    addResult(`🍪 Current cookies: ${document.cookie}`)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>🔧 API Test Page</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={testAPI} className="w-full">
            🧪 Run All Tests
          </Button>

          <div className="bg-black text-green-400 p-4 rounded font-mono text-sm h-96 overflow-y-auto">
            {results.length === 0 ? (
              <div className="text-gray-500">Click "Run All Tests" to start...</div>
            ) : (
              results.map((result, index) => (
                <div key={index} className="mb-1">
                  {result}
                </div>
              ))
            )}
          </div>

          <div className="text-sm text-gray-600">
            <p>
              <strong>Expected Results:</strong>
            </p>
            <p>✅ Test API should return status 200</p>
            <p>✅ Login API should return status 200 with success: true</p>
            <p>✅ Cookies should show "user=john"</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
