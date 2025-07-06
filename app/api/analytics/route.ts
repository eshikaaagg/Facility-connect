import { type NextRequest, NextResponse } from "next/server"

// Simple JWT verification
function verifyToken(token: string): any {
  try {
    return JSON.parse(atob(token))
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const authUser = verifyToken(token)
    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Mock analytics data
    const analytics = {
      totalRequests: 45,
      completedRequests: 38,
      avgResponseTime: 2.5,
      userSatisfaction: 4.2,
      topCategories: [
        { category: "maintenance", count: 15 },
        { category: "cleaning", count: 12 },
        { category: "IT", count: 10 },
        { category: "food", count: 5 },
        { category: "other", count: 3 },
      ],
      monthlyTrends: [
        { month: "Jan", requests: 45, satisfaction: 4.1 },
        { month: "Feb", requests: 52, satisfaction: 4.3 },
        { month: "Mar", requests: 38, satisfaction: 4.5 },
        { month: "Apr", requests: 61, satisfaction: 4.2 },
        { month: "May", requests: 47, satisfaction: 4.4 },
      ],
      // User-specific stats
      points: authUser.role === "user" ? 1250 : undefined,
      level: authUser.role === "user" ? 3 : undefined,
      badges: authUser.role === "user" ? ["Problem Solver", "Team Player"] : undefined,
    }

    return NextResponse.json({ analytics })
  } catch (error) {
    console.error("Analytics error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
