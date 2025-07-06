import { type NextRequest, NextResponse } from "next/server"

// Simple JWT verification
function verifyToken(token: string): any {
  try {
    return JSON.parse(atob(token))
  } catch {
    return null
  }
}

// In-memory storage for service requests
const serviceRequests: any[] = [
  {
    _id: "1",
    userId: "1",
    title: "AC not working in Conference Room B",
    description: "The air conditioning unit has stopped working completely",
    category: "maintenance",
    priority: "high",
    status: "in-progress",
    location: "Conference Room B, 2nd Floor",
    createdAt: new Date("2024-01-15T09:00:00Z").toISOString(),
  },
]

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

    // Staff can see all requests, users only see their own
    let filteredRequests = serviceRequests
    if (authUser.role !== "staff" && authUser.role !== "admin") {
      filteredRequests = serviceRequests.filter((req) => req.userId === authUser.id)
    }

    return NextResponse.json({ requests: filteredRequests })
  } catch (error) {
    console.error("Get requests error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const authUser = verifyToken(token)
    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, description, category, priority, location } = await request.json()

    if (!title || !description || !category || !priority || !location) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const newRequest = {
      _id: (serviceRequests.length + 1).toString(),
      userId: authUser.id,
      title,
      description,
      category,
      priority,
      status: "pending",
      location,
      createdAt: new Date().toISOString(),
    }

    serviceRequests.push(newRequest)

    return NextResponse.json({ request: newRequest }, { status: 201 })
  } catch (error) {
    console.error("Create request error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
