import type { NextRequest } from "next/server"

export interface AuthUser {
  id: string
  email: string
  role: string
}

// Simple password hashing function (for demo only)
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + "salt")
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  const hashedInput = await hashPassword(password)
  return hashedInput === hashedPassword
}

// Simple token functions (no JWT library needed)
export function generateToken(user: AuthUser): string {
  return btoa(JSON.stringify(user))
}

export function verifyToken(token: string): AuthUser | null {
  try {
    return JSON.parse(atob(token))
  } catch {
    return null
  }
}

export function getAuthUser(request: NextRequest): AuthUser | null {
  const token = request.cookies.get("auth-token")?.value
  if (!token) return null
  return verifyToken(token)
}
