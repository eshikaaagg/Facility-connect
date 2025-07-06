"use client"

// Mock Socket.IO implementation for v0 environment
interface MockSocket {
  connected: boolean
  on: (event: string, callback: Function) => void
  off: (event: string) => void
  emit: (event: string, data?: any) => void
  disconnect: () => void
}

class MockSocketManager {
  private socket: MockSocket | null = null
  private static instance: MockSocketManager
  private eventHandlers: Map<string, Function[]> = new Map()
  private isConnected = false
  private userId = ""
  private userRole = ""
  private mockUsers: Array<{ id: string; name: string; role: string; socketId: string }> = []

  static getInstance(): MockSocketManager {
    if (!MockSocketManager.instance) {
      MockSocketManager.instance = new MockSocketManager()
    }
    return MockSocketManager.instance
  }

  connect(userId: string, userRole: string): MockSocket {
    console.log(`🔌 Mock Socket connecting ${userId} (${userRole})`)

    this.userId = userId
    this.userRole = userRole
    this.isConnected = true

    // Add user to mock users list
    const userData = {
      id: userId,
      name: userId === "1" ? "John Doe" : userId === "2" ? "Sarah Chen" : `User ${userId}`,
      role: userRole,
      socketId: `mock_${userId}_${Date.now()}`,
    }

    this.mockUsers.push(userData)

    this.socket = {
      connected: true,
      on: (event: string, callback: Function) => {
        if (!this.eventHandlers.has(event)) {
          this.eventHandlers.set(event, [])
        }
        this.eventHandlers.get(event)!.push(callback)
      },
      off: (event: string) => {
        this.eventHandlers.delete(event)
      },
      emit: (event: string, data?: any) => {
        console.log(`📤 Mock emit: ${event}`, data)
        this.handleEmit(event, data)
      },
      disconnect: () => {
        this.isConnected = false
        this.mockUsers = this.mockUsers.filter((u) => u.id !== userId)
        this.triggerEvent("disconnect", "client disconnect")
      },
    }

    // Simulate connection events
    setTimeout(() => {
      this.triggerEvent("connect")

      // Send welcome message
      this.triggerEvent("new_message", {
        id: Date.now().toString(),
        text: `Welcome ${userData.name}! Mock chat is working. ${this.mockUsers.length} users online.`,
        sender: { id: "system", name: "System", role: "system" },
        timestamp: new Date(),
        type: "system",
      })

      // Send online users
      this.triggerEvent("online_users", {
        count: this.mockUsers.length,
        users: this.mockUsers,
      })
    }, 100)

    return this.socket
  }

  private triggerEvent(event: string, data?: any) {
    const handlers = this.eventHandlers.get(event)
    if (handlers) {
      handlers.forEach((handler) => {
        try {
          handler(data)
        } catch (error) {
          console.error(`Error in ${event} handler:`, error)
        }
      })
    }
  }

  private handleEmit(event: string, data: any) {
    switch (event) {
      case "send_message":
        // Simulate message being sent and received
        setTimeout(() => {
          const message = {
            id: Date.now().toString(),
            text: data.text,
            sender: {
              id: this.userId,
              name: this.userId === "1" ? "John Doe" : "Sarah Chen",
              role: this.userRole,
            },
            timestamp: new Date(),
            type: data.type || "general",
          }

          this.triggerEvent("new_message", message)

          // Simulate response from other role
          if (Math.random() > 0.7) {
            // 30% chance of auto-response
            setTimeout(
              () => {
                const responseRole = this.userRole === "staff" ? "user" : "staff"
                const responseName = responseRole === "staff" ? "Sarah Chen" : "John Doe"

                const responses = [
                  "Thanks for the message!",
                  "I'll look into that right away.",
                  "Got it, working on it now.",
                  "Thanks for letting me know.",
                  "I'll get back to you soon.",
                ]

                this.triggerEvent("new_message", {
                  id: (Date.now() + 1).toString(),
                  text: responses[Math.floor(Math.random() * responses.length)],
                  sender: {
                    id: responseRole === "staff" ? "2" : "1",
                    name: responseName,
                    role: responseRole,
                  },
                  timestamp: new Date(),
                  type: "general",
                })
              },
              1000 + Math.random() * 2000,
            )
          }
        }, 100)
        break

      case "request_update":
        // Simulate request update notification
        setTimeout(() => {
          this.triggerEvent("request_update", data)
          this.triggerEvent("new_notification", {
            message: `Request ${data.requestId} has been updated`,
            type: "request_update",
            from: this.userRole === "staff" ? "Sarah Chen" : "John Doe",
          })
        }, 200)
        break

      case "send_notification":
        // Simulate notification
        setTimeout(() => {
          this.triggerEvent("new_notification", {
            ...data,
            from: this.userRole === "staff" ? "Sarah Chen" : "John Doe",
            timestamp: new Date(),
          })
        }, 100)
        break
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }

  getSocket(): MockSocket | null {
    return this.socket
  }

  // Message events
  sendMessage(message: { text: string; to?: string; type: "general" | "support" | "request"; targetRole?: string }) {
    if (this.socket && this.isConnected) {
      console.log("📤 Sending mock message:", message)
      this.socket.emit("send_message", message)
    } else {
      console.error("❌ Mock socket not connected")
    }
  }

  // Request events
  sendRequestUpdate(requestId: string, update: any) {
    if (this.socket) {
      this.socket.emit("request_update", { requestId, update })
    }
  }

  // Notification events
  sendNotification(notification: { message: string; type: string; userId?: string; targetRole?: string }) {
    if (this.socket) {
      this.socket.emit("send_notification", notification)
    }
  }
}

export default MockSocketManager
