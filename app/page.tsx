"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Bell,
  Coffee,
  Calendar,
  Wrench,
  Trophy,
  Star,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Award,
  Target,
  BarChart3,
  Activity,
  Crown,
  Flame,
  LogOut,
  Plus,
  MessageCircle,
  Settings,
  Leaf,
  Coins,
  MessageSquare,
  ThumbsUp,
  Send,
} from "lucide-react"
import SocketManager from "@/lib/socket"
import { ManagementDashboard } from "@/components/management-dashboard"
import { EnvironmentalImpact } from "@/components/environmental-impact"
import { PointsBenefits } from "@/components/points-benefits"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"

interface User {
  id: string
  name: string
  email: string
  role: "user" | "staff" | "management" | "admin"
  points: number
  level: number
  badges: string[]
  streak: number
  rank: number
}

interface ServiceRequest {
  id: string
  userId: string
  userName: string
  type: string
  title: string
  status: "pending" | "in-progress" | "completed"
  priority: "low" | "medium" | "high" | "urgent"
  points: number
  date: string
  assignedTo?: string
}

interface FoodOrder {
  id: string
  userId: string
  userName: string
  item: string
  price: number
  status: "ordered" | "preparing" | "ready" | "delivered"
  points: number
}

interface RoomBooking {
  id: string
  userId: string
  userName: string
  room: string
  date: string
  time: string
  duration: string
  status: "confirmed" | "pending"
  points: number
  sustainabilityOptions?: any
  sustainabilityPoints?: number
}

interface Feedback {
  id: string
  userId: string
  userName: string
  targetType: "staff" | "management" | "general"
  targetName?: string
  rating: number
  category: string
  comment: string
  date: string
  status: "pending" | "reviewed"
}

export default function FacilityConnect() {
  const [email, setEmail] = useState("arjun@example.com")
  const [password, setPassword] = useState("password123")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User>({
    id: "1",
    name: "Arjun Sharma",
    email: "arjun@example.com",
    role: "user",
    points: 1250,
    level: 5,
    badges: ["Problem Solver", "Team Player", "Eco Warrior"],
    streak: 7,
    rank: 3,
  })
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showNotification, setShowNotification] = useState("")
  const [showChat, setShowChat] = useState(false)
  const [showEnvironmentalImpact, setShowEnvironmentalImpact] = useState(false)
  const [showPointsBenefits, setShowPointsBenefits] = useState(false)
  const [showNotificationPanel, setShowNotificationPanel] = useState(false)

  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([
    {
      id: "1",
      userId: "1",
      userName: "Arjun Sharma",
      type: "maintenance",
      title: "AC not working in Conference Room B",
      status: "in-progress",
      priority: "high",
      points: 50,
      date: "2024-01-15",
      assignedTo: "2",
    },
    {
      id: "2",
      userId: "1",
      userName: "Arjun Sharma",
      type: "cleaning",
      title: "Spill cleanup needed in cafeteria",
      status: "completed",
      priority: "medium",
      points: 25,
      date: "2024-01-14",
    },
  ])

  const [foodOrders, setFoodOrders] = useState<FoodOrder[]>([
    {
      id: "1",
      userId: "1",
      userName: "Arjun Sharma",
      item: "Grilled Chicken Salad",
      price: 899,
      status: "delivered",
      points: 10,
    },
  ])

  const [roomBookings, setRoomBookings] = useState<RoomBooking[]>([
    {
      id: "1",
      userId: "1",
      userName: "Arjun Sharma",
      room: "Conference Room A",
      date: "2024-01-16",
      time: "14:00",
      duration: "1 hour",
      status: "confirmed",
      points: 15,
    },
  ])

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: "1",
      userId: "1",
      userName: "Arjun Sharma",
      targetType: "staff",
      targetName: "Priya Patel",
      rating: 5,
      category: "maintenance",
      comment: "Excellent service! Fixed the AC issue very quickly and professionally.",
      date: "2024-01-15",
      status: "reviewed",
    },
    {
      id: "2",
      userId: "3",
      userName: "Sneha Reddy",
      targetType: "staff",
      targetName: "Priya Patel",
      rating: 4,
      category: "cleaning",
      comment: "Very responsive and helpful. Room was cleaned thoroughly.",
      date: "2024-01-14",
      status: "pending",
    },
    {
      id: "3",
      userId: "4",
      userName: "Raj Kumar",
      targetType: "management",
      targetName: "Rajesh Gupta",
      rating: 5,
      category: "facilities",
      comment: "Great leadership in facility management. Always available for support.",
      date: "2024-01-13",
      status: "pending",
    },
    {
      id: "4",
      userId: "1",
      userName: "Arjun Sharma",
      targetType: "management",
      targetName: "Rajesh Gupta",
      rating: 4,
      category: "communication",
      comment: "Good communication about facility updates and policies.",
      date: "2024-01-12",
      status: "reviewed",
    },
  ])

  // Form states
  const [maintenanceForm, setMaintenanceForm] = useState({
    issue: "",
    location: "",
    priority: "medium",
    description: "",
  })

  const [selectedFood, setSelectedFood] = useState<string[]>([])
  const [cart, setCart] = useState<{ item: string; price: number }[]>([])

  const [bookingForm, setBookingForm] = useState({
    room: "",
    date: "",
    startTime: "",
    endTime: "",
    purpose: "",
  })

  const [feedbackForm, setFeedbackForm] = useState({
    targetType: "staff",
    targetName: "",
    rating: "",
    category: "general",
    comment: "",
  })

  const [staffPointForm, setStaffPointForm] = useState({
    userId: "",
    points: "",
    reason: "",
    category: "sustainability",
  })

  const [staffRatingForm, setStaffRatingForm] = useState({
    staffId: "",
    rating: "",
    points: "",
    feedback: "",
    category: "service",
  })

  const [managementStaffForm, setManagementStaffForm] = useState({
    staffId: "",
    points: "",
    reason: "",
    taskCategory: "maintenance",
  })

  // Socket.IO setup
  useEffect(() => {
    if (isLoggedIn) {
      const socketManager = SocketManager.getInstance()
      const socket = socketManager.connect(user.id, user.role)

      socket.on("request_update", (data: { requestId: string; update: any }) => {
        setServiceRequests((prev) => prev.map((req) => (req.id === data.requestId ? { ...req, ...data.update } : req)))
        showSuccessNotification(`Request ${data.requestId} updated!`)
      })

      socket.on("new_notification", (notification: { message: string; type: string }) => {
        showSuccessNotification(notification.message)
      })

      return () => {
        socket.off("request_update")
        socket.off("new_notification")
      }
    }
  }, [isLoggedIn, user.id, user.role])

  const handleLogin = async () => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Set user data based on email
        let userData = data.user
        if (email === "priya@example.com") {
          userData = { ...userData, name: "Priya Patel", role: "staff" }
        } else if (email === "rajesh@example.com") {
          userData = { ...userData, name: "Rajesh Gupta", role: "management" }
        } else {
          userData = { ...userData, name: "Arjun Sharma", role: "user" }
        }

        setIsLoggedIn(true)
        setUser(userData)
        setActiveTab(userData.role === "management" ? "management" : "dashboard")
        showSuccessNotification("Welcome back! +10 points for daily login!")
        setUser((prev) => ({ ...prev, points: prev.points + 10 }))
      } else {
        setError(data.error || "Login failed")
      }
    } catch (error) {
      setError("Network error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setActiveTab("dashboard")
    setShowChat(false)
    SocketManager.getInstance().disconnect()
  }

  const showSuccessNotification = (message: string) => {
    setShowNotification(message)
    setTimeout(() => setShowNotification(""), 4000)
  }

  const addPoints = (points: number, reason: string) => {
    setUser((prev) => ({ ...prev, points: prev.points + points }))
    showSuccessNotification(`+${points} points! ${reason}`)
  }

  const handleRedemption = (benefit: any, pointsUsed: number) => {
    setUser((prev) => ({ ...prev, points: prev.points - pointsUsed }))
    showSuccessNotification(`🎉 Successfully redeemed ${benefit.title}! -${pointsUsed} points`)
    setShowPointsBenefits(false)
  }

  const handleMaintenanceSubmit = () => {
    if (!maintenanceForm.issue || !maintenanceForm.location) {
      setError("Please fill in all required fields")
      return
    }

    const newRequest: ServiceRequest = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      type: "maintenance",
      title: maintenanceForm.issue,
      status: "pending",
      priority: maintenanceForm.priority as "low" | "medium" | "high" | "urgent",
      points: maintenanceForm.priority === "urgent" ? 75 : maintenanceForm.priority === "high" ? 50 : 25,
      date: new Date().toISOString().split("T")[0],
    }

    setServiceRequests((prev) => [newRequest, ...prev])
    addPoints(newRequest.points, "Maintenance request submitted!")
    setMaintenanceForm({ issue: "", location: "", priority: "medium", description: "" })
    setError("")

    // Notify via Socket.IO
    SocketManager.getInstance().sendNotification({
      message: `New maintenance request: ${newRequest.title}`,
      type: "request",
      targetRole: "staff",
    })
  }

  const addToCart = (item: string, price: number) => {
    setCart((prev) => [...prev, { item, price }])
    setSelectedFood((prev) => [...prev, item])
    showSuccessNotification(`${item} added to cart!`)
  }

  const placeOrder = () => {
    if (cart.length === 0) return

    cart.forEach((item) => {
      const newOrder: FoodOrder = {
        id: Date.now().toString() + Math.random(),
        userId: user.id,
        userName: user.name,
        item: item.item,
        price: item.price,
        status: "ordered",
        points: 10,
      }
      setFoodOrders((prev) => [newOrder, ...prev])
    })

    addPoints(cart.length * 10, `Food order placed! ${cart.length} items`)
    setCart([])
    setSelectedFood([])
  }

  const handleRoomBooking = () => {
    if (!bookingForm.room || !bookingForm.date || !bookingForm.startTime) {
      setError("Please fill in all required fields")
      return
    }

    const basePoints = 15

    const newBooking: RoomBooking = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      room: bookingForm.room,
      date: bookingForm.date,
      time: bookingForm.startTime,
      duration: "1 hour",
      status: "confirmed",
      points: basePoints,
    }

    setRoomBookings((prev) => [newBooking, ...prev])
    addPoints(basePoints, "Room booked successfully!")
    setBookingForm({ room: "", date: "", startTime: "", endTime: "", purpose: "" })
    setError("")
  }

  const handleFeedbackSubmit = () => {
    if (!feedbackForm.rating || !feedbackForm.comment) {
      setError("Please provide a rating and comment")
      return
    }

    const newFeedback: Feedback = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      targetType: feedbackForm.targetType as "staff" | "management" | "general",
      targetName: feedbackForm.targetName || undefined,
      rating: Number.parseInt(feedbackForm.rating),
      category: feedbackForm.category,
      comment: feedbackForm.comment,
      date: new Date().toISOString().split("T")[0],
      status: "pending",
    }

    setFeedbacks((prev) => [newFeedback, ...prev])
    addPoints(15, "Feedback submitted! Thank you for helping us improve.")
    setFeedbackForm({
      targetType: "staff",
      targetName: "",
      rating: "",
      category: "general",
      comment: "",
    })
    setError("")
    showSuccessNotification("✅ Feedback submitted successfully! +15 points earned.")
  }

  const handleStaffRating = () => {
    if (!staffRatingForm.staffId || !staffRatingForm.rating || !staffRatingForm.points) {
      setError("Please fill in all required fields")
      return
    }

    const pointsToAward = Number.parseInt(staffRatingForm.points)

    if (pointsToAward > user.points) {
      setError("You don't have enough points to award")
      return
    }

    // In a real app, this would update the staff member's points in the database
    showSuccessNotification(`✅ Awarded ${pointsToAward} points to staff member for excellent service!`)

    // Deduct points from user for giving the rating
    setUser((prev) => ({ ...prev, points: prev.points - pointsToAward }))

    setStaffRatingForm({ staffId: "", rating: "", points: "", feedback: "", category: "service" })
    setError("")
  }

  // Staff functions
  const updateRequestStatus = (requestId: string, status: string) => {
    setServiceRequests((prev) => prev.map((req) => (req.id === requestId ? { ...req, status: status as any } : req)))

    // Notify via Socket.IO
    SocketManager.getInstance().sendRequestUpdate(requestId, { status })
    showSuccessNotification(`Request ${requestId} updated to ${status}`)
  }

  const menuItems = [
    {
      name: "Paneer Butter Masala",
      price: 59900,
      category: "Vegetarian",
      calories: 350,
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=200&fit=crop",
    },
    {
      name: "Chicken Biryani",
      price: 69900,
      category: "Non-Veg",
      calories: 520,
      image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=300&h=200&fit=crop&auto=format",
    },
    {
      name: "Dal Tadka with Rice",
      price: 54900,
      category: "Vegetarian",
      calories: 420,
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop",
    },
    {
      name: "Masala Dosa",
      price: 52900,
      category: "South Indian",
      calories: 380,
      image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=300&h=200&fit=crop",
    },
    {
      name: "Chole Bhature",
      price: 57900,
      category: "North Indian",
      calories: 480,
      image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300&h=200&fit=crop",
    },
    {
      name: "Rajma Chawal",
      price: 51900,
      category: "Healthy",
      calories: 290,
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&h=200&fit=crop",
    },
  ]

  const leaderboard = [
    { rank: 1, name: "Priya Patel", points: 2150, badge: "🏆 Facility Hero" },
    { rank: 2, name: "Rahul Gupta", points: 1890, badge: "⚡ Quick Responder" },
    { rank: 3, name: user.name, points: user.points, badge: "🌟 Team Player" },
    { rank: 4, name: "Sneha Reddy", points: 1100, badge: "🌱 Eco Warrior" },
    { rank: 5, name: "Vikram Singh", points: 950, badge: "🔧 Problem Solver" },
  ]

  const sustainabilityOptions = [
    {
      category: "food",
      activities: [
        { name: "Zero food waste", points: 25, description: "Finished entire meal without waste" },
        { name: "Brought reusable container", points: 15, description: "Used own container for takeaway" },
        { name: "Chose vegetarian option", points: 10, description: "Selected eco-friendly meal" },
        { name: "Used reusable water bottle", points: 5, description: "Avoided single-use plastic" },
      ],
    },
    {
      category: "cleanliness",
      activities: [
        { name: "Left room spotless", points: 20, description: "Cleaned up completely after use" },
        { name: "Proper waste sorting", points: 15, description: "Sorted waste into correct bins" },
        { name: "Turned off all electronics", points: 10, description: "Saved energy by switching off devices" },
        { name: "Organized furniture", points: 10, description: "Arranged chairs and tables properly" },
      ],
    },
    {
      category: "energy",
      activities: [
        { name: "Used natural lighting", points: 15, description: "Avoided artificial lights during day" },
        { name: "Optimal AC usage", points: 20, description: "Set temperature to 24°C or higher" },
        { name: "Unplugged devices", points: 10, description: "Disconnected unused electronics" },
        { name: "Used stairs instead of elevator", points: 5, description: "Chose eco-friendly transport" },
      ],
    },
    {
      category: "transport",
      activities: [
        { name: "Carpooled to office", points: 30, description: "Shared ride with colleagues" },
        { name: "Used public transport", points: 25, description: "Took bus/metro to work" },
        { name: "Walked/cycled to office", points: 35, description: "Zero emission commute" },
        { name: "Worked from home", points: 40, description: "Reduced travel emissions" },
      ],
    },
    {
      category: "resources",
      activities: [
        { name: "Paperless meeting", points: 15, description: "Used digital documents only" },
        { name: "Double-sided printing", points: 10, description: "Saved paper by printing both sides" },
        { name: "Refilled water bottle", points: 5, description: "Used water dispenser instead of buying bottles" },
        { name: "Shared resources", points: 10, description: "Shared books, tools, or equipment" },
      ],
    },
  ]

  // Calculate unread notifications count
  const unreadNotificationsCount = 3 // This would come from your notification state

  const [recentActivities] = useState([
    {
      id: "1",
      type: "maintenance",
      description: "AC repair completed in Conference Room B",
      time: "2 hours ago",
      points: 50,
    },
    {
      id: "2",
      type: "sustainability",
      description: "Excellent room condition evaluation",
      time: "3 hours ago",
      points: 85,
    },
    { id: "3", type: "food", description: "Lunch order placed - Chicken Biryani", time: "4 hours ago", points: 10 },
    { id: "4", type: "booking", description: "Meeting room booked for team standup", time: "5 hours ago", points: 15 },
    { id: "5", type: "rating", description: "Rated housekeeping service", time: "6 hours ago", points: 20 },
  ])

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-6">
              <Zap className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              FacilityConnect
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your smart facility management platform with sustainability rewards and gamification
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Login Section */}
            <Card className="shadow-2xl border-0">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl font-bold text-gray-800 mb-4">Sign In to Your Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button onClick={handleLogin} disabled={loading} className="w-full h-12 text-lg font-semibold">
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Signing In...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-5 w-5" />
                      Sign In
                    </>
                  )}
                </Button>

                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border">
                    <p className="text-sm font-medium text-gray-700 mb-2">👤 User Account:</p>
                    <p className="text-sm text-gray-600">📧 arjun@example.com</p>
                    <p className="text-sm text-gray-600">🔑 password123</p>
                    <p className="text-xs text-gray-500 mt-1">Submit requests, order food, book rooms, earn points</p>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border">
                    <p className="text-sm font-medium text-gray-700 mb-2">👨‍💼 Staff Account:</p>
                    <p className="text-sm text-gray-600">📧 priya@example.com</p>
                    <p className="text-sm text-gray-600">🔑 password123</p>
                    <p className="text-xs text-gray-500 mt-1">Manage requests, award points, help users</p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg border">
                    <p className="text-sm font-medium text-gray-700 mb-2">🏢 Management Account:</p>
                    <p className="text-sm text-gray-600">📧 rajesh@example.com</p>
                    <p className="text-sm text-gray-600">🔑 password123</p>
                    <p className="text-xs text-gray-500 mt-1">Sustainability evaluation, check-in/out management</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Guide Section */}
            <Card className="shadow-2xl border-0">
              <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl font-bold flex items-center">
                  <Award className="h-6 w-6 mr-2" />
                  How FacilityConnect Works
                </CardTitle>
                <p className="text-green-100">Your complete guide to earning and redeeming points</p>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Step 1 */}
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">🎯 Use Facility Services</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Submit maintenance requests (+25-75 pts)</li>
                      <li>• Order food from cafeteria (+10 pts per item)</li>
                      <li>• Book meeting rooms (+15 pts)</li>
                      <li>• Practice sustainable behaviors</li>
                      <li>• Help other users and staff</li>
                    </ul>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">🌱 Sustainability Evaluation</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Management evaluates your environmental responsibility during check-out:
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Energy efficient usage (+15 pts)</li>
                      <li>• Room cleanliness (+20 pts)</li>
                      <li>• Proper waste management (+10 pts)</li>
                      <li>• Equipment turned off (+10 pts)</li>
                      <li>• No food waste (+15 pts)</li>
                    </ul>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">🎁 Redeem Amazing Rewards</h3>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-amber-50 p-2 rounded border">
                        <div className="font-medium">☕ Coffee Voucher</div>
                        <div className="text-amber-700">100 points</div>
                      </div>
                      <div className="bg-blue-50 p-2 rounded border">
                        <div className="font-medium">📅 Priority Booking</div>
                        <div className="text-blue-700">250 points</div>
                      </div>
                      <div className="bg-green-50 p-2 rounded border">
                        <div className="font-medium">🍽️ Free Lunch</div>
                        <div className="text-green-700">500 points</div>
                      </div>
                      <div className="bg-purple-50 p-2 rounded border">
                        <div className="font-medium">🏠 WFH Day</div>
                        <div className="text-purple-700">2000 points</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Why Use FacilityConnect?
                  </h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>✅ Earn rewards for using facility services</li>
                    <li>✅ Rate staff and improve service quality</li>
                    <li>✅ Compete with colleagues on leaderboard</li>
                    <li>✅ Get priority access to facilities</li>
                    <li>✅ Contribute to a thriving workplace</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Features Overview */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Platform Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Wrench className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Service Requests</h3>
                  <p className="text-sm text-gray-600">Submit and track maintenance requests with point rewards</p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Coffee className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Food Ordering</h3>
                  <p className="text-sm text-gray-600">Order meals and earn points for sustainable choices</p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Room Booking</h3>
                  <p className="text-sm text-gray-600">Book rooms easily and earn points</p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Gamification</h3>
                  <p className="text-sm text-gray-600">Earn points, badges, and compete on leaderboards</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const handleStaffPointAllocation = () => {
    if (!staffPointForm.userId || !staffPointForm.points || !staffPointForm.reason) {
      setError("Please fill in all fields")
      return
    }

    const pointsToAdd = Number.parseInt(staffPointForm.points)

    // In a real app, this would update the user's points in the database
    // For demo, we'll show a success message
    showSuccessNotification(`✅ Awarded ${pointsToAdd} points to user for: ${staffPointForm.reason}`)

    // Award points to staff for completing the task
    addPoints(10, "Points awarded for helping a user!")

    setStaffPointForm({ userId: "", points: "", reason: "", category: "sustainability" })
    setError("")
  }

  const handleManagementStaffPoints = () => {
    if (!managementStaffForm.staffId || !managementStaffForm.points || !managementStaffForm.reason) {
      setError("Please fill in all required fields")
      return
    }

    const pointsToAward = Number.parseInt(managementStaffForm.points)

    // In a real app, this would update the staff member's points in the database
    showSuccessNotification(`✅ Awarded ${pointsToAward} points to staff member for: ${managementStaffForm.reason}`)

    // Award points to management for completing the evaluation
    addPoints(15, "Staff evaluation completed")

    setManagementStaffForm({ staffId: "", points: "", reason: "", taskCategory: "maintenance" })
    setError("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right">
          <Alert className="bg-green-50 border-green-200 shadow-lg">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 font-medium">{showNotification}</AlertDescription>
          </Alert>
        </div>
      )}

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    user.role === "staff" || user.role === "management"
                      ? "bg-gradient-to-r from-green-600 to-blue-600"
                      : "bg-gradient-to-r from-blue-600 to-purple-600"
                  }`}
                >
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1
                    className={`text-xl font-bold bg-clip-text text-transparent ${
                      user.role === "staff" || user.role === "management"
                        ? "bg-gradient-to-r from-green-600 to-blue-600"
                        : "bg-gradient-to-r from-blue-600 to-purple-600"
                    }`}
                  >
                    FacilityConnect
                  </h1>
                  <p className="text-xs text-gray-500">
                    {user.role === "staff"
                      ? "Staff Dashboard"
                      : user.role === "management"
                        ? "Management Portal"
                        : "User Portal"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Environmental Impact Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowEnvironmentalImpact(true)}
                className="relative hover:bg-green-100"
                title="View Environmental Impact"
              >
                <Leaf className="h-5 w-5 text-green-600" />
              </Button>

              {/* Points Benefits Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowPointsBenefits(true)}
                className="relative hover:bg-yellow-100"
                title="View Points Benefits"
              >
                <Coins className="h-5 w-5 text-yellow-600" />
              </Button>

              {/* Live Chat Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowChat(!showChat)}
                className={`relative ${user.role === "staff" ? "hover:bg-green-100" : "hover:bg-blue-100"}`}
              >
                <MessageCircle className="h-5 w-5" />
                <Badge
                  className={`absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs ${
                    user.role === "staff" ? "bg-green-500" : "bg-blue-500"
                  }`}
                >
                  ●
                </Badge>
              </Button>

              {/* Points Display */}
              <div
                className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                  user.role === "staff"
                    ? "bg-gradient-to-r from-green-100 to-blue-100"
                    : "bg-gradient-to-r from-yellow-100 to-orange-100"
                }`}
              >
                <Star className={`h-4 w-4 ${user.role === "staff" ? "text-green-600" : "text-yellow-600"}`} />
                <span className={`font-bold ${user.role === "staff" ? "text-green-800" : "text-yellow-800"}`}>
                  {user.points}
                </span>
              </div>

              {/* Level Badge */}
              <Badge
                className={`${
                  user.role === "staff"
                    ? "bg-gradient-to-r from-green-500 to-blue-500"
                    : "bg-gradient-to-r from-purple-500 to-pink-500"
                } text-white`}
              >
                <Crown className="h-3 w-3 mr-1" />
                Level {user.level}
              </Badge>

              {/* Role Badge */}
              <Badge variant={user.role === "staff" || user.role === "management" ? "default" : "secondary"}>
                {user.role === "staff" ? "🛡️ Staff" : user.role === "management" ? "👨‍💼 Management" : "👤 User"}
              </Badge>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative" onClick={() => setShowNotificationPanel(true)}>
                <Bell className="h-5 w-5" />
                {unreadNotificationsCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500">
                    {unreadNotificationsCount}
                  </Badge>
                )}
              </Button>

              {/* User Avatar */}
              <div className="flex items-center space-x-3">
                <Avatar className={`border-2 ${user.role === "staff" ? "border-green-400" : "border-blue-400"}`}>
                  <AvatarFallback
                    className={`font-bold text-white ${
                      user.role === "staff"
                        ? "bg-gradient-to-r from-green-500 to-blue-500"
                        : "bg-gradient-to-r from-blue-500 to-purple-500"
                    }`}
                  >
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">
                    {user.role === "staff"
                      ? "Staff Member"
                      : user.role === "admin"
                        ? "Administrator"
                        : `Rank #${user.rank}`}
                  </p>
                </div>
              </div>

              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList
            className={`grid w-full ${
              user.role === "management" ? "grid-cols-3" : user.role === "staff" ? "grid-cols-3" : "grid-cols-6"
            } bg-white/50 backdrop-blur-sm`}
          >
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-white">
              <Activity className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            {user.role === "user" && (
              <>
                <TabsTrigger value="services" className="data-[state=active]:bg-white">
                  <Wrench className="h-4 w-4 mr-2" />
                  Services
                </TabsTrigger>
                <TabsTrigger value="food" className="data-[state=active]:bg-white">
                  <Coffee className="h-4 w-4 mr-2" />
                  Food
                </TabsTrigger>
                <TabsTrigger value="booking" className="data-[state=active]:bg-white">
                  <Calendar className="h-4 w-4 mr-2" />
                  Booking
                </TabsTrigger>
                <TabsTrigger value="feedback" className="data-[state=active]:bg-white">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Feedback
                </TabsTrigger>
              </>
            )}
            <TabsTrigger value="analytics" className="data-[state=active]:bg-white">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
            {user.role === "management" && (
              <TabsTrigger value="management" className="data-[state=active]:bg-white">
                <Settings className="h-4 w-4 mr-2" />
                Management
              </TabsTrigger>
            )}
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-8">
            {/* Welcome Section */}
            <Card
              className={`text-white border-0 shadow-2xl ${
                user.role === "staff"
                  ? "bg-gradient-to-r from-green-600 via-blue-600 to-teal-600"
                  : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
              }`}
            >
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">
                      Welcome back, {user.name}! {user.role === "staff" ? "🛡️" : "👋"}
                    </h2>
                    <p className="text-blue-100 text-lg">
                      {user.role === "staff"
                        ? "Ready to help our facility community today"
                        : "You're making a real impact in our facility community"}
                    </p>
                    <div className="flex items-center space-x-4 mt-4">
                      <div className="flex items-center space-x-2">
                        <Flame className="h-5 w-5 text-orange-300" />
                        <span className="font-semibold">{user.streak} day streak!</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Trophy className="h-5 w-5 text-yellow-300" />
                        <span className="font-semibold">
                          {user.role === "staff" ? "Staff Member" : `Rank #${user.rank}`}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold">{user.points}</div>
                    <div className="text-blue-200">Total Points</div>
                    <div className="mt-2">
                      <Progress value={(user.points % 500) / 5} className="w-32 h-2" />
                      <p className="text-xs text-blue-200 mt-1">{500 - (user.points % 500)} to next level</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card
                className={`shadow-lg border-2 ${
                  user.role === "staff"
                    ? "bg-gradient-to-br from-green-50 to-blue-100 border-green-200"
                    : "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className={`text-sm font-medium ${user.role === "staff" ? "text-green-700" : "text-blue-700"}`}
                      >
                        {user.role === "staff" ? "All Requests" : "Active Requests"}
                      </p>
                      <p className={`text-3xl font-bold ${user.role === "staff" ? "text-green-900" : "text-blue-900"}`}>
                        {user.role === "staff"
                          ? serviceRequests.length
                          : serviceRequests.filter((r) => r.status !== "completed" && r.userId === user.id).length}
                      </p>
                    </div>
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        user.role === "staff" ? "bg-green-500" : "bg-blue-500"
                      }`}
                    >
                      <Wrench className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-700">Food Orders</p>
                      <p className="text-3xl font-bold text-green-900">
                        {user.role === "staff"
                          ? foodOrders.length
                          : foodOrders.filter((o) => o.userId === user.id).length}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <Coffee className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-700">Room Bookings</p>
                      <p className="text-3xl font-bold text-purple-900">
                        {user.role === "staff"
                          ? roomBookings.length
                          : roomBookings.filter((b) => b.userId === user.id).length}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-emerald-700">Total Points</p>
                      <p className="text-3xl font-bold text-emerald-900">{user.points}</p>
                    </div>
                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                      <Star className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity & Leaderboard */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Requests */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span>{user.role === "staff" ? "All Recent Requests" : "Recent Activity"}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(user.role === "staff" ? serviceRequests : serviceRequests.filter((r) => r.userId === user.id))
                    .slice(0, 3)
                    .map((request) => (
                      <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              request.status === "completed"
                                ? "bg-green-500"
                                : request.status === "in-progress"
                                  ? "bg-yellow-500"
                                  : "bg-gray-400"
                            }`}
                          />
                          <div>
                            <p className="font-medium">{request.title}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge
                                variant={
                                  request.priority === "urgent"
                                    ? "destructive"
                                    : request.priority === "high"
                                      ? "destructive"
                                      : "secondary"
                                }
                              >
                                {request.priority}
                              </Badge>
                              <span className="text-sm text-gray-500">{request.date}</span>
                              {user.role === "staff" && (
                                <span className="text-sm text-gray-500">by {request.userName}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-green-100 text-green-800">+{request.points} pts</Badge>
                          {user.role === "staff" && (
                            <Select
                              value={request.status}
                              onValueChange={(value) => updateRequestStatus(request.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="in-progress">In Progress</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>

              {/* Leaderboard */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="h-5 w-5 text-yellow-600" />
                    <span>Community Leaderboard</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {leaderboard.map((entry) => (
                      <div
                        key={entry.rank}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          entry.name === user.name ? "bg-blue-50 border border-blue-200" : "bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              entry.rank === 1
                                ? "bg-yellow-500 text-white"
                                : entry.rank === 2
                                  ? "bg-gray-400 text-white"
                                  : entry.rank === 3
                                    ? "bg-orange-500 text-white"
                                    : "bg-gray-200"
                            }`}
                          >
                            {entry.rank}
                          </div>
                          <div>
                            <p className="font-medium">{entry.name}</p>
                            <p className="text-xs text-gray-500">{entry.badge}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{entry.points}</p>
                          <p className="text-xs text-gray-500">points</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Badges Section */}
            {user.role !== "staff" && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-purple-600" />
                    <span>Your Achievements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {user.badges.map((badge, index) => (
                      <div
                        key={index}
                        className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg"
                      >
                        <Award className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                        <p className="text-sm font-medium">{badge}</p>
                        <p className="text-xs text-gray-500">Earned</p>
                      </div>
                    ))}
                    <div className="text-center p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                      <Target className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Next Badge</p>
                      <p className="text-xs text-gray-400">Keep going!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Wrench className="h-5 w-5 text-blue-600" />
                  <span>Maintenance Request</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="issue" className="text-sm font-medium">
                      Issue Description *
                    </Label>
                    <Input
                      id="issue"
                      value={maintenanceForm.issue}
                      onChange={(e) => setMaintenanceForm({ ...maintenanceForm, issue: e.target.value })}
                      placeholder="Describe the issue..."
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location" className="text-sm font-medium">
                      Location *
                    </Label>
                    <Input
                      id="location"
                      value={maintenanceForm.location}
                      onChange={(e) => setMaintenanceForm({ ...maintenanceForm, location: e.target.value })}
                      placeholder="Room number, floor, building..."
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="priority" className="text-sm font-medium">
                      Priority Level
                    </Label>
                    <select
                      id="priority"
                      value={maintenanceForm.priority}
                      onChange={(e) => setMaintenanceForm({ ...maintenanceForm, priority: e.target.value })}
                      className="w-full p-2 border rounded-md mt-1"
                    >
                      <option value="low">Low (+25 pts)</option>
                      <option value="medium">Medium (+35 pts)</option>
                      <option value="high">High (+50 pts)</option>
                      <option value="urgent">Urgent (+75 pts)</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="description" className="text-sm font-medium">
                      Additional Details
                    </Label>
                    <Input
                      id="description"
                      value={maintenanceForm.description}
                      onChange={(e) => setMaintenanceForm({ ...maintenanceForm, description: e.target.value })}
                      placeholder="Any additional information..."
                      className="mt-1"
                    />
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button onClick={handleMaintenanceSubmit} className="w-full h-12 text-lg font-semibold">
                  <Plus className="mr-2 h-5 w-5" />
                  Submit Maintenance Request
                </Button>
              </CardContent>
            </Card>

            {/* Service Requests List */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>{user.role === "staff" ? "All Service Requests" : "Your Service Requests"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(user.role === "staff" ? serviceRequests : serviceRequests.filter((r) => r.userId === user.id)).map(
                    (request) => (
                      <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-4 h-4 rounded-full ${
                              request.status === "completed"
                                ? "bg-green-500"
                                : request.status === "in-progress"
                                  ? "bg-yellow-500"
                                  : "bg-gray-400"
                            }`}
                          />
                          <div>
                            <p className="font-medium">{request.title}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge
                                variant={
                                  request.priority === "urgent" || request.priority === "high"
                                    ? "destructive"
                                    : "secondary"
                                }
                              >
                                {request.priority}
                              </Badge>
                              <span className="text-sm text-gray-500">{request.date}</span>
                              {user.role === "staff" && (
                                <span className="text-sm text-gray-500">by {request.userName}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-green-100 text-green-800">+{request.points} pts</Badge>
                          {user.role === "staff" ? (
                            <Select
                              value={request.status}
                              onValueChange={(value) => updateRequestStatus(request.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="in-progress">In Progress</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <Badge variant={request.status === "completed" ? "default" : "secondary"}>
                              {request.status}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Food Tab */}
          <TabsContent value="food" className="space-y-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Coffee className="h-5 w-5 text-green-600" />
                  <span>Order Food</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuItems.map((item) => (
                    <div
                      key={item.name}
                      className={`p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow ${
                        selectedFood.includes(item.name) ? "bg-green-50 border-green-200" : "bg-white"
                      }`}
                    >
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-32 object-cover rounded-md mb-3"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg?height=200&width=300"
                        }}
                      />
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.category}</p>
                      <p className="text-sm text-gray-500">{item.calories} calories</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="font-bold">₹{item.price / 100}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addToCart(item.name, item.price)}
                          disabled={selectedFood.includes(item.name)}
                        >
                          {selectedFood.includes(item.name) ? "Added to Cart" : "Add to Cart"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {cart.length > 0 && (
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">Your Cart</h4>
                    <ul className="space-y-2">
                      {cart.map((item, index) => (
                        <li key={index} className="flex items-center justify-between">
                          <span>{item.item}</span>
                          <span className="font-bold">₹{item.price / 100}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between mt-4">
                      <span className="font-bold text-green-800">
                        Total: ₹{cart.reduce((acc, item) => acc + item.price, 0) / 100}
                      </span>
                      <Button onClick={placeOrder} className="bg-green-600 text-white hover:bg-green-700">
                        Place Order (+{cart.length * 10} points)
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Food Order History */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>{user.role === "staff" ? "All Food Orders" : "Your Food Orders"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(user.role === "staff" ? foodOrders : foodOrders.filter((o) => o.userId === user.id)).map(
                    (order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{order.item}</p>
                          <p className="text-sm text-gray-500">
                            Ordered by {order.userName} • Status: {order.status}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-green-100 text-green-800">+{order.points} pts</Badge>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Booking Tab */}
          <TabsContent value="booking" className="space-y-8">
            {/* Simple Room Booking Form */}
            {user.role !== "staff" && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    <span>Book a Room</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="room" className="text-sm font-medium">
                        Select Room *
                      </Label>
                      <select
                        id="room"
                        value={bookingForm.room}
                        onChange={(e) => setBookingForm({ ...bookingForm, room: e.target.value })}
                        className="w-full p-2 border rounded-md mt-1"
                      >
                        <option value="">Choose a room...</option>
                        <option value="Conference Room A">Conference Room A (12 people)</option>
                        <option value="Conference Room B">Conference Room B (8 people)</option>
                        <option value="Study Room C">Study Room C (6 people)</option>
                        <option value="Meeting Pod D">Meeting Pod D (4 people)</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="date" className="text-sm font-medium">
                        Date *
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={bookingForm.date}
                        onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="startTime" className="text-sm font-medium">
                        Start Time *
                      </Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={bookingForm.startTime}
                        onChange={(e) => setBookingForm({ ...bookingForm, startTime: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="endTime" className="text-sm font-medium">
                        End Time
                      </Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={bookingForm.endTime}
                        onChange={(e) => setBookingForm({ ...bookingForm, endTime: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="purpose" className="text-sm font-medium">
                        Meeting Purpose
                      </Label>
                      <Input
                        id="purpose"
                        value={bookingForm.purpose}
                        onChange={(e) => setBookingForm({ ...bookingForm, purpose: e.target.value })}
                        placeholder="Brief description of the meeting..."
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button onClick={handleRoomBooking} className="w-full h-12 text-lg font-semibold">
                    <Calendar className="mr-2 h-5 w-5" />
                    Book Room (+15 points)
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Booking History */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>{user.role === "staff" ? "All Room Bookings (View Only)" : "Your Bookings"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(user.role === "staff" ? roomBookings : roomBookings.filter((b) => b.userId === user.id)).map(
                    (booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{booking.room}</p>
                          <p className="text-sm text-gray-500">
                            {booking.date} at {booking.time} ({booking.duration})
                            {user.role === "staff" && ` • by ${booking.userName}`}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                            {booking.status}
                          </Badge>
                          <Badge className="bg-green-100 text-green-800">+{booking.points} pts</Badge>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback" className="space-y-8">
            <Card className="shadow-lg border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-orange-600" />
                  <span>Submit Feedback</span>
                  <Badge className="bg-orange-600 text-white">Earn +15 Points!</Badge>
                </CardTitle>
                <p className="text-orange-700">
                  Help us improve by rating staff, management, or sharing general feedback
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="targetType" className="text-sm font-medium">
                      Feedback Type *
                    </Label>
                    <select
                      id="targetType"
                      value={feedbackForm.targetType}
                      onChange={(e) => setFeedbackForm({ ...feedbackForm, targetType: e.target.value })}
                      className="w-full p-2 border rounded-md mt-1"
                    >
                      <option value="staff">👨‍🔧 Rate Staff Member</option>
                      <option value="management">👨‍💼 Rate Management</option>
                      <option value="general">💬 General Feedback</option>
                    </select>
                  </div>

                  {feedbackForm.targetType !== "general" && (
                    <div>
                      <Label htmlFor="targetName" className="text-sm font-medium">
                        {feedbackForm.targetType === "staff" ? "Staff Member" : "Manager"} Name
                      </Label>
                      <select
                        id="targetName"
                        value={feedbackForm.targetName}
                        onChange={(e) => setFeedbackForm({ ...feedbackForm, targetName: e.target.value })}
                        className="w-full p-2 border rounded-md mt-1"
                      >
                        <option value="">Select {feedbackForm.targetType}...</option>
                        {feedbackForm.targetType === "staff" ? (
                          <>
                            <option value="Priya Patel">Priya Patel (Facilities Manager)</option>
                            <option value="Raj Kumar">Raj Kumar (Maintenance)</option>
                            <option value="Sneha Singh">Sneha Singh (Housekeeping)</option>
                            <option value="Amit Sharma">Amit Sharma (Security)</option>
                            <option value="Kavya Reddy">Kavya Reddy (Cafeteria)</option>
                          </>
                        ) : (
                          <>
                            <option value="Rajesh Gupta">Rajesh Gupta (Facility Manager)</option>
                            <option value="Anita Sharma">Anita Sharma (Operations Head)</option>
                            <option value="Vikram Singh">Vikram Singh (Admin Manager)</option>
                          </>
                        )}
                      </select>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="rating" className="text-sm font-medium">
                      Rating *
                    </Label>
                    <select
                      id="rating"
                      value={feedbackForm.rating}
                      onChange={(e) => setFeedbackForm({ ...feedbackForm, rating: e.target.value })}
                      className="w-full p-2 border rounded-md mt-1"
                    >
                      <option value="">Rate your experience...</option>
                      <option value="5">⭐⭐⭐⭐⭐ Excellent (5/5)</option>
                      <option value="4">⭐⭐⭐⭐ Very Good (4/5)</option>
                      <option value="3">⭐⭐⭐ Good (3/5)</option>
                      <option value="2">⭐⭐ Fair (2/5)</option>
                      <option value="1">⭐ Poor (1/5)</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="category" className="text-sm font-medium">
                      Category
                    </Label>
                    <select
                      id="category"
                      value={feedbackForm.category}
                      onChange={(e) => setFeedbackForm({ ...feedbackForm, category: e.target.value })}
                      className="w-full p-2 border rounded-md mt-1"
                    >
                      <option value="general">🔧 General Service</option>
                      <option value="maintenance">🛠️ Maintenance</option>
                      <option value="cleaning">🧹 Cleaning</option>
                      <option value="food">🍽️ Food Service</option>
                      <option value="security">🛡️ Security</option>
                      <option value="facilities">🏢 Facilities</option>
                      <option value="communication">💬 Communication</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="comment" className="text-sm font-medium">
                    Your Feedback *
                  </Label>
                  <Textarea
                    id="comment"
                    value={feedbackForm.comment}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, comment: e.target.value })}
                    placeholder="Share your experience, suggestions, or any comments..."
                    className="mt-1 min-h-[100px]"
                  />
                </div>

                <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-4 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-2 flex items-center">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Why Your Feedback Matters
                  </h4>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>✅ Helps improve service quality</li>
                    <li>✅ Recognizes excellent staff performance</li>
                    <li>✅ Identifies areas for improvement</li>
                    <li>✅ Earns you 15 points for each submission</li>
                  </ul>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  onClick={handleFeedbackSubmit}
                  className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Submit Feedback (+15 points)
                </Button>
              </CardContent>
            </Card>

            {/* Feedback History */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span>Your Feedback History</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feedbacks
                    .filter((f) => f.userId === user.id)
                    .map((feedback) => (
                      <div key={feedback.id} className="border rounded-lg p-4 bg-gray-50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="capitalize">
                              {feedback.targetType}
                            </Badge>
                            {feedback.targetName && <Badge variant="secondary">{feedback.targetName}</Badge>}
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < feedback.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-green-100 text-green-800">+15 pts</Badge>
                            <Badge variant={feedback.status === "reviewed" ? "default" : "secondary"}>
                              {feedback.status}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{feedback.comment}</p>
                        <p className="text-xs text-gray-500">
                          {feedback.category} • {feedback.date}
                        </p>
                      </div>
                    ))}

                  {feedbacks.filter((f) => f.userId === user.id).length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No feedback submitted yet.</p>
                      <p className="text-sm">Share your experience to help us improve!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-8">
            <AnalyticsDashboard userRole={user.role} />

            {/* Feedback Section for Staff and Management */}
            {(user.role === "staff" || user.role === "management") && (
              <Card className="shadow-lg border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                    <span>Feedback Received</span>
                    <Badge className="bg-blue-600 text-white">
                      {
                        feedbacks.filter(
                          (f) =>
                            (user.role === "staff" && f.targetType === "staff" && f.targetName === user.name) ||
                            (user.role === "management" && f.targetType === "management" && f.targetName === user.name),
                        ).length
                      }{" "}
                      reviews
                    </Badge>
                  </CardTitle>
                  <p className="text-blue-700">
                    {user.role === "staff"
                      ? "See what users think about your service"
                      : "Review feedback about management performance"}
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Feedback Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {(() => {
                      const myFeedbacks = feedbacks.filter(
                        (f) =>
                          (user.role === "staff" && f.targetType === "staff" && f.targetName === user.name) ||
                          (user.role === "management" && f.targetType === "management" && f.targetName === user.name),
                      )
                      const avgRating =
                        myFeedbacks.length > 0
                          ? (myFeedbacks.reduce((sum, f) => sum + f.rating, 0) / myFeedbacks.length).toFixed(1)
                          : "0.0"
                      const excellentCount = myFeedbacks.filter((f) => f.rating === 5).length
                      const recentCount = myFeedbacks.filter((f) => {
                        const feedbackDate = new Date(f.date)
                        const weekAgo = new Date()
                        weekAgo.setDate(weekAgo.getDate() - 7)
                        return feedbackDate >= weekAgo
                      }).length

                      return (
                        <>
                          <div className="text-center p-4 bg-white rounded-lg border border-blue-200">
                            <div className="text-2xl font-bold text-blue-800">{avgRating}</div>
                            <div className="text-sm text-blue-600">Average Rating</div>
                            <div className="flex justify-center mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.round(Number.parseFloat(avgRating))
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="text-center p-4 bg-white rounded-lg border border-blue-200">
                            <div className="text-2xl font-bold text-blue-800">{excellentCount}</div>
                            <div className="text-sm text-blue-600">5-Star Reviews</div>
                            <div className="text-xs text-blue-500 mt-1">Excellent service!</div>
                          </div>
                          <div className="text-center p-4 bg-white rounded-lg border border-blue-200">
                            <div className="text-2xl font-bold text-blue-800">{recentCount}</div>
                            <div className="text-sm text-blue-600">This Week</div>
                            <div className="text-xs text-blue-500 mt-1">Recent feedback</div>
                          </div>
                        </>
                      )
                    })()}
                  </div>

                  {/* Individual Feedback Items */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-blue-800 flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Recent Feedback
                    </h4>
                    {(() => {
                      const myFeedbacks = feedbacks
                        .filter(
                          (f) =>
                            (user.role === "staff" && f.targetType === "staff" && f.targetName === user.name) ||
                            (user.role === "management" && f.targetType === "management" && f.targetName === user.name),
                        )
                        .slice(0, 5)

                      if (myFeedbacks.length === 0) {
                        return (
                          <div className="text-center py-8 text-blue-500">
                            <MessageSquare className="h-12 w-12 mx-auto mb-4 text-blue-300" />
                            <p>No feedback received yet.</p>
                            <p className="text-sm">Keep providing excellent service to receive reviews!</p>
                          </div>
                        )
                      }

                      return myFeedbacks.map((feedback) => (
                        <div key={feedback.id} className="border rounded-lg p-4 bg-white border-blue-200">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="capitalize">
                                {feedback.category}
                              </Badge>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < feedback.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm font-medium text-blue-700">({feedback.rating}/5)</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="secondary">{feedback.userName}</Badge>
                              <Badge variant={feedback.status === "reviewed" ? "default" : "secondary"}>
                                {feedback.status}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 mb-2 italic">"{feedback.comment}"</p>
                          <p className="text-xs text-gray-500">{feedback.date}</p>
                        </div>
                      ))
                    })()}
                  </div>

                  {/* Action Buttons for Management */}
                  {user.role === "management" && (
                    <div className="bg-gradient-to-r from-indigo-100 to-blue-100 p-4 rounded-lg border border-indigo-200">
                      <h4 className="font-semibold text-indigo-800 mb-2 flex items-center">
                        <Award className="h-4 w-4 mr-2" />
                        Management Actions
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Button
                          variant="outline"
                          className="text-indigo-700 border-indigo-300 hover:bg-indigo-50"
                          onClick={() => {
                            // Mark all feedback as reviewed
                            setFeedbacks((prev) =>
                              prev.map((f) =>
                                f.targetType === "management" && f.targetName === user.name
                                  ? { ...f, status: "reviewed" as const }
                                  : f,
                              ),
                            )
                            showSuccessNotification("All feedback marked as reviewed!")
                          }}
                        >
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Mark All as Reviewed
                        </Button>
                        <Button
                          variant="outline"
                          className="text-green-700 border-green-300 hover:bg-green-50"
                          onClick={() => {
                            addPoints(25, "Reviewed user feedback - improving service quality!")
                          }}
                        >
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          Acknowledge Feedback (+25 pts)
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons for Staff */}
                  {user.role === "staff" && (
                    <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                        <Award className="h-4 w-4 mr-2" />
                        Staff Actions
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Button
                          variant="outline"
                          className="text-green-700 border-green-300 hover:bg-green-50"
                          onClick={() => {
                            // Mark all feedback as reviewed
                            setFeedbacks((prev) =>
                              prev.map((f) =>
                                f.targetType === "staff" && f.targetName === user.name
                                  ? { ...f, status: "reviewed" as const }
                                  : f,
                              ),
                            )
                            showSuccessNotification("All feedback marked as reviewed!")
                          }}
                        >
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Mark All as Reviewed
                        </Button>
                        <Button
                          variant="outline"
                          className="text-blue-700 border-blue-300 hover:bg-blue-50"
                          onClick={() => {
                            addPoints(20, "Reviewed user feedback - committed to service excellence!")
                          }}
                        >
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          Acknowledge Feedback (+20 pts)
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Management Panel */}
          {user.role === "management" && (
            <TabsContent value="management" className="space-y-8">
              <ManagementDashboard user={user} onPointsUpdate={addPoints} />

              {/* Staff Point Allocation Form */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-green-600" />
                    <span>Award Points to Staff</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="staffId" className="text-sm font-medium">
                        Staff User ID *
                      </Label>
                      <Input
                        id="staffId"
                        value={managementStaffForm.staffId}
                        onChange={(e) => setManagementStaffForm({ ...managementStaffForm, staffId: e.target.value })}
                        placeholder="Enter staff user ID..."
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="points" className="text-sm font-medium">
                        Points to Award *
                      </Label>
                      <Input
                        id="points"
                        type="number"
                        value={managementStaffForm.points}
                        onChange={(e) => setManagementStaffForm({ ...managementStaffForm, points: e.target.value })}
                        placeholder="Enter points..."
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="reason" className="text-sm font-medium">
                        Reason for Awarding *
                      </Label>
                      <Input
                        id="reason"
                        value={managementStaffForm.reason}
                        onChange={(e) => setManagementStaffForm({ ...managementStaffForm, reason: e.target.value })}
                        placeholder="Describe the reason..."
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="taskCategory" className="text-sm font-medium">
                        Task Category
                      </Label>
                      <select
                        id="taskCategory"
                        value={managementStaffForm.taskCategory}
                        onChange={(e) =>
                          setManagementStaffForm({ ...managementStaffForm, taskCategory: e.target.value })
                        }
                        className="w-full p-2 border rounded-md mt-1"
                      >
                        <option value="maintenance">Maintenance</option>
                        <option value="sustainability">Sustainability</option>
                        <option value="service">Service</option>
                      </select>
                    </div>
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button onClick={handleManagementStaffPoints} className="w-full h-12 text-lg font-semibold">
                    <Plus className="mr-2 h-5 w-5" />
                    Award Points to Staff
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>

      {/* Environmental Impact Modal */}
      {showEnvironmentalImpact && (
        <EnvironmentalImpact userPoints={user.points} onClose={() => setShowEnvironmentalImpact(false)} />
      )}

      {/* Points Benefits Modal */}
      {showPointsBenefits && (
        <PointsBenefits
          userPoints={user.points}
          userLevel={user.level}
          onClose={() => setShowPointsBenefits(false)}
          onRedemption={handleRedemption}
        />
      )}

      {/* Notification Panel */}
      {showNotificationPanel && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-in fade-in">
          <Card className="max-w-md w-full p-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Here are your recent notifications:</p>
              {/* Add notification list here */}
            </CardContent>
            <div className="flex justify-end mt-4">
              <Button onClick={() => setShowNotificationPanel(false)}>Close</Button>
            </div>
          </Card>
        </div>
      )}

      {/* Live Chat */}
      {showChat && (
        <div className="fixed bottom-0 right-0 z-50 w-96 bg-white border rounded-t-lg shadow-lg animate-in slide-in-from-bottom">
          <CardHeader className="p-4">
            <CardTitle className="text-lg font-semibold">Live Chat</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {/* Add chat messages here */}
            <p className="text-sm text-gray-500">Start chatting with our support team or other users.</p>
          </CardContent>
          <div className="p-4 border-t">
            <Input type="text" placeholder="Type your message..." />
            <Button className="mt-2 w-full">Send</Button>
          </div>
        </div>
      )}
    </div>
  )
}
