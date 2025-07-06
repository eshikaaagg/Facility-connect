export interface User {
  _id: string
  username: string
  email: string
  password?: string
  role: "user" | "staff" | "admin"
  profile: {
    firstName: string
    lastName: string
    department: string
    phone: string
    avatar?: string
  }
  gamification: {
    points: number
    badges: string[]
    level: number
  }
  preferences: {
    notifications: boolean
    language: string
  }
  createdAt: Date
  updatedAt: Date
}

export interface ServiceRequest {
  _id: string
  userId: string
  title: string
  description: string
  category: "maintenance" | "cleaning" | "IT" | "food" | "other"
  priority: "low" | "medium" | "high" | "urgent"
  status: "pending" | "in-progress" | "completed" | "cancelled"
  location: string
  attachments: string[]
  assignedTo?: string
  feedback?: {
    rating: number
    comment: string
  }
  timeline: Array<{
    status: string
    timestamp: Date
    updatedBy: string
    comment: string
  }>
  createdAt: Date
  updatedAt: Date
}

export interface FoodItem {
  _id: string
  name: string
  description: string
  category: string
  price: number
  availability: boolean
  nutritionalInfo: {
    calories: number
    allergens: string[]
  }
  ratings: Array<{
    userId: string
    rating: number
    comment: string
    date: Date
  }>
  createdAt: Date
}

export interface FacilityBooking {
  _id: string
  userId: string
  facilityId: string
  facilityName: string
  startTime: Date
  endTime: Date
  purpose: string
  attendees: number
  status: "confirmed" | "pending" | "cancelled"
  equipmentNeeded: string[]
  createdAt: Date
  // Add sustainability fields
  sustainabilityOptions?: {
    naturalLighting: boolean
    reducedAC: boolean
    noFood: boolean
    bringOwnWater: boolean
    paperlessMode: boolean
    carpoolCommitment: boolean
  }
  sustainabilityPoints?: number
}

export interface Analytics {
  totalRequests: number
  completedRequests: number
  avgResponseTime: number
  userSatisfaction: number
  topCategories: Array<{ category: string; count: number }>
  monthlyTrends: Array<{ month: string; requests: number; satisfaction: number }>
}
