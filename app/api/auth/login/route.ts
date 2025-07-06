import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  console.log("🚀 LOGIN API CALLED!")

  try {
    const body = await request.json()
    console.log("📦 Body:", body)

    const { email, password } = body

    // User login - Updated with Indian name
    if (email === "arjun@example.com" && password === "password123") {
      console.log("✅ VALID USER CREDENTIALS")

      const userData = {
        id: "1",
        email: "arjun@example.com",
        name: "Arjun Sharma",
        role: "user",
        points: 1250,
        level: 5,
        badges: ["Problem Solver", "Team Player", "Eco Warrior"],
        streak: 7,
        rank: 3,
      }

      const response = NextResponse.json({
        success: true,
        user: userData,
      })

      response.cookies.set("auth-token", btoa(JSON.stringify(userData)), {
        maxAge: 60 * 60 * 24,
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
      })

      console.log("✅ USER LOGIN SUCCESSFUL")
      return response
    }

    // Staff login - Updated with Indian name
    if (email === "priya@example.com" && password === "password123") {
      console.log("✅ VALID STAFF CREDENTIALS")

      const userData = {
        id: "2",
        email: "priya@example.com",
        name: "Priya Patel",
        role: "staff",
        points: 2150,
        level: 8,
        badges: ["Facility Hero", "Quick Responder", "Problem Solver"],
        streak: 12,
        rank: 1,
      }

      const response = NextResponse.json({
        success: true,
        user: userData,
      })

      response.cookies.set("auth-token", btoa(JSON.stringify(userData)), {
        maxAge: 60 * 60 * 24,
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
      })

      console.log("✅ STAFF LOGIN SUCCESSFUL")
      return response
    }

    // Management staff login - New profile
    if (email === "rajesh@example.com" && password === "password123") {
      console.log("✅ VALID MANAGEMENT CREDENTIALS")

      const userData = {
        id: "3",
        email: "rajesh@example.com",
        name: "Rajesh Kumar",
        role: "management",
        points: 3200,
        level: 10,
        badges: ["Facility Manager", "Point Master", "Quality Inspector", "Energy Saver"],
        streak: 15,
        rank: 1,
      }

      const response = NextResponse.json({
        success: true,
        user: userData,
      })

      response.cookies.set("auth-token", btoa(JSON.stringify(userData)), {
        maxAge: 60 * 60 * 24,
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
      })

      console.log("✅ MANAGEMENT LOGIN SUCCESSFUL")
      return response
    }

    // Keep old credentials for backward compatibility
    if (email === "john@example.com" && password === "password123") {
      console.log("✅ VALID USER CREDENTIALS (OLD)")

      const userData = {
        id: "1",
        email: "john@example.com",
        name: "Arjun Sharma",
        role: "user",
        points: 1250,
        level: 5,
        badges: ["Problem Solver", "Team Player", "Eco Warrior"],
        streak: 7,
        rank: 3,
      }

      const response = NextResponse.json({
        success: true,
        user: userData,
      })

      response.cookies.set("auth-token", btoa(JSON.stringify(userData)), {
        maxAge: 60 * 60 * 24,
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
      })

      console.log("✅ USER LOGIN SUCCESSFUL")
      return response
    }

    if (email === "sarah@example.com" && password === "password123") {
      console.log("✅ VALID STAFF CREDENTIALS (OLD)")

      const userData = {
        id: "2",
        email: "sarah@example.com",
        name: "Priya Patel",
        role: "staff",
        points: 2150,
        level: 8,
        badges: ["Facility Hero", "Quick Responder", "Problem Solver"],
        streak: 12,
        rank: 1,
      }

      const response = NextResponse.json({
        success: true,
        user: userData,
      })

      response.cookies.set("auth-token", btoa(JSON.stringify(userData)), {
        maxAge: 60 * 60 * 24,
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
      })

      console.log("✅ STAFF LOGIN SUCCESSFUL")
      return response
    }

    console.log("❌ INVALID CREDENTIALS")
    return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    console.error("💥 ERROR:", error)
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 })
  }
}
