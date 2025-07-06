import { NextResponse } from "next/server"

export async function POST() {
  console.log("=== LOGOUT API CALLED ===")

  try {
    const response = NextResponse.json({ success: true })

    // Clear the auth cookie
    response.cookies.set("auth-token", "", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    })

    console.log("✅ Logout successful")
    return response
  } catch (error) {
    console.error("❌ Logout error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
