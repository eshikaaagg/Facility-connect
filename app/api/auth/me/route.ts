import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  console.log("=== AUTH/ME API CALLED ===")

  try {
    const token = request.cookies.get("auth-token")?.value
    console.log("Token from cookie:", token ? "Found" : "Not found")

    if (!token) {
      console.log("No token found")
      return NextResponse.json({ error: "No token" }, { status: 401 })
    }

    // Decode simple token
    let authUser
    try {
      authUser = JSON.parse(atob(token))
      console.log("Decoded token for user ID:", authUser.id)
    } catch (e) {
      console.log("Failed to decode token")
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    // Return user data based on token
    if (authUser.id === "1") {
      const userData = {
        id: "1",
        email: authUser.email || "arjun@example.com",
        role: "user",
        profile: {
          firstName: "Arjun",
          lastName: "Sharma",
          department: "Engineering",
        },
        gamification: {
          points: 1250,
          badges: ["Problem Solver", "Team Player", "Eco Warrior"],
          level: 5,
        },
        preferences: {
          notifications: true,
          language: "en",
        },
      }

      console.log("✅ Returning user data for Arjun")
      return NextResponse.json({ user: userData })
    } else if (authUser.id === "2") {
      const userData = {
        id: "2",
        email: authUser.email || "priya@example.com",
        role: "staff",
        profile: {
          firstName: "Priya",
          lastName: "Patel",
          department: "Facilities",
        },
        gamification: {
          points: 2150,
          badges: ["Facility Hero", "Quick Responder", "Problem Solver"],
          level: 8,
        },
        preferences: {
          notifications: true,
          language: "en",
        },
      }

      console.log("✅ Returning user data for Priya")
      return NextResponse.json({ user: userData })
    } else if (authUser.id === "3") {
      const userData = {
        id: "3",
        email: authUser.email || "rajesh@example.com",
        role: "management",
        profile: {
          firstName: "Rajesh",
          lastName: "Kumar",
          department: "Facility Management",
        },
        gamification: {
          points: 3200,
          badges: ["Facility Manager", "Point Master", "Quality Inspector", "Energy Saver"],
          level: 10,
        },
        preferences: {
          notifications: true,
          language: "en",
        },
      }

      console.log("✅ Returning user data for Rajesh")
      return NextResponse.json({ user: userData })
    } else {
      console.log("❌ User not found for ID:", authUser.id)
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("❌ Auth/me error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
