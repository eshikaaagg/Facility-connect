import { type NextRequest, NextResponse } from "next/server"

// Simple in-memory user storage
const users: any[] = []

export async function POST(request: NextRequest) {
  console.log("=== REGISTER API CALLED ===")

  try {
    const { email, password, firstName, lastName, department, role = "user" } = await request.json()
    console.log("Registration attempt for:", email)

    // Check if user exists
    if (users.find((u) => u.email === email)) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }

    // Create new user
    const newUser = {
      id: (users.length + 3).toString(), // Start from 3 to avoid conflicts with demo users
      email,
      password,
      role,
      profile: {
        firstName,
        lastName,
        department: department || "General",
      },
      gamification: {
        points: 0,
        badges: [],
        level: 1,
      },
    }

    users.push(newUser)
    console.log("✅ User created with ID:", newUser.id)

    // Create token
    const token = btoa(JSON.stringify({ id: newUser.id, email: newUser.email, role: newUser.role }))

    const response = NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        profile: newUser.profile,
        gamification: newUser.gamification,
      },
    })

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    })

    console.log("✅ Registration successful")
    return response
  } catch (error) {
    console.error("❌ Registration error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
