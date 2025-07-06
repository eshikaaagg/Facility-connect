import { type NextRequest, NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import { db } from "@/lib/database"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authUser = getAuthUser(request)
    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { status, assignedTo, feedback } = await request.json()
    const requestId = params.id

    const existingRequest = await db.getServiceRequests()
    const targetRequest = existingRequest.find((req) => req._id === requestId)

    if (!targetRequest) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 })
    }

    // Only staff can update status and assignment
    if ((status || assignedTo) && authUser.role !== "staff" && authUser.role !== "admin") {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    const updates: any = {}

    if (status) {
      updates.status = status
      updates.timeline = [
        ...targetRequest.timeline,
        {
          status,
          timestamp: new Date(),
          updatedBy: authUser.id,
          comment: `Status updated to ${status}`,
        },
      ]
    }

    if (assignedTo) {
      updates.assignedTo = assignedTo
    }

    if (feedback) {
      updates.feedback = feedback
    }

    const updatedRequest = await db.updateServiceRequest(requestId, updates)
    return NextResponse.json({ request: updatedRequest })
  } catch (error) {
    console.error("Update request error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
