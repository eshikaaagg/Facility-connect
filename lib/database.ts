import type { User, ServiceRequest, FoodItem, FacilityBooking, Analytics } from "./types"

// Mock database - In production, this would be MongoDB
class MockDatabase {
  private users: User[] = [
    {
      _id: "1",
      username: "john_doe",
      email: "john@example.com",
      password: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8", // password123
      role: "user",
      profile: {
        firstName: "John",
        lastName: "Doe",
        department: "Engineering",
        phone: "+1234567890",
      },
      gamification: {
        points: 1250,
        badges: ["Problem Solver", "Team Player"],
        level: 3,
      },
      preferences: {
        notifications: true,
        language: "en",
      },
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date(),
    },
    {
      _id: "2",
      username: "staff_sarah",
      email: "sarah@example.com",
      password: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8", // password123
      role: "staff",
      profile: {
        firstName: "Sarah",
        lastName: "Chen",
        department: "Facilities",
        phone: "+1234567891",
      },
      gamification: {
        points: 2150,
        badges: ["Facility Hero", "Quick Responder"],
        level: 5,
      },
      preferences: {
        notifications: true,
        language: "en",
      },
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date(),
    },
  ]

  private serviceRequests: ServiceRequest[] = [
    {
      _id: "1",
      userId: "1",
      title: "AC not working in Conference Room B",
      description: "The air conditioning unit has stopped working completely",
      category: "maintenance",
      priority: "high",
      status: "in-progress",
      location: "Conference Room B, 2nd Floor",
      attachments: [],
      assignedTo: "2",
      timeline: [
        {
          status: "pending",
          timestamp: new Date("2024-01-15T09:00:00Z"),
          updatedBy: "1",
          comment: "Request submitted",
        },
        {
          status: "in-progress",
          timestamp: new Date("2024-01-15T10:30:00Z"),
          updatedBy: "2",
          comment: "Technician assigned and on the way",
        },
      ],
      createdAt: new Date("2024-01-15T09:00:00Z"),
      updatedAt: new Date("2024-01-15T10:30:00Z"),
    },
  ]

  private foodItems: FoodItem[] = [
    {
      _id: "1",
      name: "Grilled Chicken Salad",
      description: "Fresh mixed greens with grilled chicken breast",
      category: "Salads",
      price: 12.99,
      availability: true,
      nutritionalInfo: {
        calories: 350,
        allergens: ["dairy"],
      },
      ratings: [
        {
          userId: "1",
          rating: 5,
          comment: "Delicious and healthy!",
          date: new Date("2024-01-10"),
        },
      ],
      createdAt: new Date("2024-01-01"),
    },
  ]

  private bookings: FacilityBooking[] = [
    {
      _id: "1",
      userId: "1",
      facilityId: "conf-room-a",
      facilityName: "Conference Room A",
      startTime: new Date("2024-01-16T14:00:00Z"),
      endTime: new Date("2024-01-16T15:00:00Z"),
      purpose: "Team Meeting",
      attendees: 8,
      status: "confirmed",
      equipmentNeeded: ["Projector", "Whiteboard"],
      createdAt: new Date("2024-01-15"),
    },
  ]

  // User methods
  async findUserByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null
  }

  async findUserById(id: string): Promise<User | null> {
    return this.users.find((user) => user._id === id) || null
  }

  async createUser(userData: Omit<User, "_id" | "createdAt" | "updatedAt">): Promise<User> {
    console.log("Creating user in database:", { ...userData, password: "[REDACTED]" })

    const newUser: User = {
      ...userData,
      _id: (this.users.length + 1).toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.users.push(newUser)
    console.log("User created with ID:", newUser._id)
    console.log("Total users in database:", this.users.length)

    return newUser
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const userIndex = this.users.findIndex((user) => user._id === id)
    if (userIndex === -1) return null

    this.users[userIndex] = { ...this.users[userIndex], ...updates, updatedAt: new Date() }
    return this.users[userIndex]
  }

  // Service Request methods
  async getServiceRequests(filters?: { userId?: string; status?: string }): Promise<ServiceRequest[]> {
    let requests = [...this.serviceRequests]

    if (filters?.userId) {
      requests = requests.filter((req) => req.userId === filters.userId)
    }
    if (filters?.status) {
      requests = requests.filter((req) => req.status === filters.status)
    }

    return requests.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  async createServiceRequest(
    requestData: Omit<ServiceRequest, "_id" | "createdAt" | "updatedAt">,
  ): Promise<ServiceRequest> {
    const newRequest: ServiceRequest = {
      ...requestData,
      _id: (this.serviceRequests.length + 1).toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.serviceRequests.push(newRequest)
    return newRequest
  }

  async updateServiceRequest(id: string, updates: Partial<ServiceRequest>): Promise<ServiceRequest | null> {
    const requestIndex = this.serviceRequests.findIndex((req) => req._id === id)
    if (requestIndex === -1) return null

    this.serviceRequests[requestIndex] = {
      ...this.serviceRequests[requestIndex],
      ...updates,
      updatedAt: new Date(),
    }
    return this.serviceRequests[requestIndex]
  }

  // Food methods
  async getFoodItems(): Promise<FoodItem[]> {
    return [...this.foodItems]
  }

  // Booking methods
  async getBookings(userId?: string): Promise<FacilityBooking[]> {
    let bookings = [...this.bookings]
    if (userId) {
      bookings = bookings.filter((booking) => booking.userId === userId)
    }
    return bookings.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
  }

  async createBooking(bookingData: Omit<FacilityBooking, "_id" | "createdAt">): Promise<FacilityBooking> {
    const newBooking: FacilityBooking = {
      ...bookingData,
      _id: (this.bookings.length + 1).toString(),
      createdAt: new Date(),
    }
    this.bookings.push(newBooking)
    return newBooking
  }

  // Analytics methods
  async getAnalytics(): Promise<Analytics> {
    const totalRequests = this.serviceRequests.length
    const completedRequests = this.serviceRequests.filter((req) => req.status === "completed").length
    const avgResponseTime = 2.5 // hours (mock data)
    const userSatisfaction = 4.2 // out of 5 (mock data)

    const categoryCount: { [key: string]: number } = {}
    this.serviceRequests.forEach((req) => {
      categoryCount[req.category] = (categoryCount[req.category] || 0) + 1
    })

    const topCategories = Object.entries(categoryCount)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    const monthlyTrends = [
      { month: "Jan", requests: 45, satisfaction: 4.1 },
      { month: "Feb", requests: 52, satisfaction: 4.3 },
      { month: "Mar", requests: 38, satisfaction: 4.5 },
      { month: "Apr", requests: 61, satisfaction: 4.2 },
      { month: "May", requests: 47, satisfaction: 4.4 },
    ]

    return {
      totalRequests,
      completedRequests,
      avgResponseTime,
      userSatisfaction,
      topCategories,
      monthlyTrends,
    }
  }

  async getUserStats(userId: string) {
    const userRequests = this.serviceRequests.filter((req) => req.userId === userId)
    const userBookings = this.bookings.filter((booking) => booking.userId === userId)
    const user = await this.findUserById(userId)

    return {
      totalRequests: userRequests.length,
      completedRequests: userRequests.filter((req) => req.status === "completed").length,
      totalBookings: userBookings.length,
      points: user?.gamification.points || 0,
      level: user?.gamification.level || 1,
      badges: user?.gamification.badges || [],
    }
  }
}

export const db = new MockDatabase()
