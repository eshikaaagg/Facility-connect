"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle2,
  AlertTriangle,
  Clock,
  Users,
  Zap,
  Star,
  Award,
  UserCheck,
  UserX,
  Shield,
  TrendingUp,
  Leaf,
  Droplets,
  Recycle,
  TreePine,
} from "lucide-react"

interface CheckInOut {
  id: string
  userId: string
  userName: string
  roomId: string
  roomName: string
  checkInTime: string
  checkOutTime?: string
  status: "checked-in" | "checked-out"
  pointsAwarded?: number
  checklist?: {
    energyEfficient: boolean
    roomClean: boolean
    wasteManaged: boolean
    equipmentOff: boolean
    furnitureArranged: boolean
    noFoodWaste: boolean
    usedNaturalLight: boolean
    properVentilation: boolean
  }
}

interface ManagementDashboardProps {
  user: {
    id: string
    name: string
    role: string
    points: number
  }
  onPointsUpdate: (points: number, reason: string) => void
}

export function ManagementDashboard({ user, onPointsUpdate }: ManagementDashboardProps) {
  const [checkInOuts, setCheckInOuts] = useState<CheckInOut[]>([
    {
      id: "1",
      userId: "1",
      userName: "Arjun Sharma",
      roomId: "conf-a",
      roomName: "Conference Room A",
      checkInTime: "2024-01-16T09:00:00",
      status: "checked-in",
    },
    {
      id: "2",
      userId: "3",
      userName: "Priya Patel",
      roomId: "study-b",
      roomName: "Study Room B",
      checkInTime: "2024-01-16T10:30:00",
      status: "checked-in",
    },
    {
      id: "3",
      userId: "4",
      userName: "Raj Kumar",
      roomId: "meeting-c",
      roomName: "Meeting Room C",
      checkInTime: "2024-01-16T08:15:00",
      checkOutTime: "2024-01-16T11:45:00",
      status: "checked-out",
      pointsAwarded: 85,
      checklist: {
        energyEfficient: true,
        roomClean: true,
        wasteManaged: true,
        equipmentOff: true,
        furnitureArranged: true,
        noFoodWaste: true,
        usedNaturalLight: true,
        properVentilation: true,
      },
    },
  ])

  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [checklist, setChecklist] = useState({
    energyEfficient: false,
    roomClean: false,
    wasteManaged: false,
    equipmentOff: false,
    furnitureArranged: false,
    noFoodWaste: false,
    usedNaturalLight: false,
    properVentilation: false,
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const showSuccess = (message: string) => {
    setSuccess(message)
    setTimeout(() => setSuccess(""), 4000)
  }

  const checklistItems = [
    {
      key: "energyEfficient",
      label: "Used energy efficiently (AC/lights optimized)",
      points: 15,
      icon: <Zap className="h-4 w-4" />,
    },
    { key: "roomClean", label: "Left room clean and spotless", points: 20, icon: <Star className="h-4 w-4" /> },
    {
      key: "wasteManaged",
      label: "Properly sorted and disposed waste",
      points: 10,
      icon: <Recycle className="h-4 w-4" />,
    },
    {
      key: "equipmentOff",
      label: "Turned off all equipment before leaving",
      points: 10,
      icon: <Zap className="h-4 w-4" />,
    },
    { key: "furnitureArranged", label: "Arranged furniture properly", points: 5, icon: <Shield className="h-4 w-4" /> },
    { key: "noFoodWaste", label: "No food waste left behind", points: 15, icon: <Leaf className="h-4 w-4" /> },
    {
      key: "usedNaturalLight",
      label: "Maximized natural lighting usage",
      points: 10,
      icon: <TreePine className="h-4 w-4" />,
    },
    {
      key: "properVentilation",
      label: "Maintained proper ventilation",
      points: 5,
      icon: <Droplets className="h-4 w-4" />,
    },
  ]

  const handleChecklistChange = (key: string, checked: boolean) => {
    setChecklist((prev) => ({ ...prev, [key]: checked }))
  }

  const calculatePoints = () => {
    return checklistItems.reduce((total, item) => {
      return total + (checklist[item.key as keyof typeof checklist] ? item.points : 0)
    }, 0)
  }

  const handleCheckOut = () => {
    if (!selectedUser) {
      setError("Please select a user to check out")
      return
    }

    const checkIn = checkInOuts.find((c) => c.id === selectedUser && c.status === "checked-in")
    if (!checkIn) {
      setError("User not found or already checked out")
      return
    }

    const pointsToAward = calculatePoints()

    // Update check-in record
    setCheckInOuts((prev) =>
      prev.map((c) =>
        c.id === selectedUser
          ? {
              ...c,
              status: "checked-out" as const,
              checkOutTime: new Date().toISOString(),
              pointsAwarded: pointsToAward,
              checklist: { ...checklist },
            }
          : c,
      ),
    )

    showSuccess(`✅ ${checkIn.userName} checked out successfully! Awarded ${pointsToAward} sustainability points`)

    // Award management points for completing the evaluation
    onPointsUpdate(20, "Sustainability evaluation completed")

    // Reset form
    setSelectedUser(null)
    setChecklist({
      energyEfficient: false,
      roomClean: false,
      wasteManaged: false,
      equipmentOff: false,
      furnitureArranged: false,
      noFoodWaste: false,
      usedNaturalLight: false,
      properVentilation: false,
    })
    setError("")
  }

  const activeCheckIns = checkInOuts.filter((c) => c.status === "checked-in")
  const recentCheckOuts = checkInOuts.filter((c) => c.status === "checked-out").slice(0, 5)
  const totalPointsAwarded = checkInOuts.reduce((sum, c) => sum + (c.pointsAwarded || 0), 0)

  return (
    <div className="space-y-8">
      {/* Success/Error Messages */}
      {success && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Management Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-lg border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Check-ins</p>
                <p className="text-3xl font-bold text-green-600">{activeCheckIns.length}</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Check-outs</p>
                <p className="text-3xl font-bold text-blue-600">{recentCheckOuts.length}</p>
              </div>
              <UserX className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Points Awarded</p>
                <p className="text-3xl font-bold text-purple-600">{totalPointsAwarded}</p>
              </div>
              <Award className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-l-4 border-l-emerald-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Sustainability Score</p>
                <p className="text-3xl font-bold text-emerald-600">87%</p>
              </div>
              <Leaf className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Check-ins */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-green-600" />
            <span>Active Check-ins</span>
            <Badge className="bg-green-100 text-green-800">{activeCheckIns.length} users</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeCheckIns.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <UserCheck className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No active check-ins</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeCheckIns.map((checkIn) => (
                <Card
                  key={checkIn.id}
                  className={`cursor-pointer transition-all ${
                    selectedUser === checkIn.id
                      ? "ring-2 ring-green-500 bg-green-50"
                      : "hover:shadow-md border-gray-200"
                  }`}
                  onClick={() => setSelectedUser(checkIn.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{checkIn.userName}</h4>
                      <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{checkIn.roomName}</p>
                    <p className="text-xs text-gray-500">
                      Checked in: {new Date(checkIn.checkInTime).toLocaleTimeString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      Duration: {Math.round((Date.now() - new Date(checkIn.checkInTime).getTime()) / 60000)} minutes
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sustainability Checklist */}
      {selectedUser && (
        <Card className="shadow-lg border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Leaf className="h-5 w-5 text-green-600" />
              <span>Sustainability Evaluation & Point Award</span>
              <Badge className="bg-green-600 text-white">
                {checkInOuts.find((c) => c.id === selectedUser)?.userName}
              </Badge>
            </CardTitle>
            <p className="text-green-700">Evaluate environmental responsibility and award points to users and staff</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {checklistItems.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-green-200"
                >
                  <Checkbox
                    id={item.key}
                    checked={checklist[item.key as keyof typeof checklist]}
                    onCheckedChange={(checked) => handleChecklistChange(item.key, checked as boolean)}
                  />
                  <div className="flex items-center space-x-2 flex-1">
                    {item.icon}
                    <label htmlFor={item.key} className="text-sm font-medium cursor-pointer flex-1">
                      {item.label}
                    </label>
                    <Badge className="bg-green-100 text-green-800">+{item.points}</Badge>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-lg border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-green-800">Total Points to Award</h4>
                <div className="text-2xl font-bold text-green-800">{calculatePoints()}</div>
              </div>
              <Progress value={(calculatePoints() / 90) * 100} className="h-3" />
              <p className="text-sm text-green-700 mt-2">
                Maximum possible: 90 points • Current: {calculatePoints()} points (
                {Math.round((calculatePoints() / 90) * 100)}%)
              </p>
            </div>

            <Button
              onClick={handleCheckOut}
              className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Complete Check-out & Award {calculatePoints()} Points
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Recent Check-outs */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-blue-600" />
            <span>Recent Check-outs</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentCheckOuts.map((checkOut) => (
              <div key={checkOut.id} className="border rounded-lg p-4 bg-blue-50 border-blue-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-blue-800">{checkOut.userName}</h4>
                    <p className="text-sm text-blue-600">
                      {checkOut.roomName} • {new Date(checkOut.checkInTime).toLocaleDateString()}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge className="bg-blue-100 text-blue-800">
                        Duration:{" "}
                        {Math.round(
                          (new Date(checkOut.checkOutTime!).getTime() - new Date(checkOut.checkInTime).getTime()) /
                            60000,
                        )}{" "}
                        min
                      </Badge>
                      <Badge className="bg-green-100 text-green-800">
                        Score: {checkOut.checklist ? Object.values(checkOut.checklist).filter(Boolean).length : 0}/8
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-600 text-white text-lg px-3 py-1">+{checkOut.pointsAwarded} pts</Badge>
                    <p className="text-xs text-blue-600 mt-1">
                      {new Date(checkOut.checkOutTime!).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sustainability Analytics */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-indigo-600" />
            <span>Sustainability Analytics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">Most Followed Practices</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Room Cleanliness</span>
                  <span className="font-medium text-green-600">95%</span>
                </div>
                <Progress value={95} className="h-2" />
                <div className="flex justify-between items-center">
                  <span className="text-sm">Energy Efficiency</span>
                  <span className="font-medium text-blue-600">87%</span>
                </div>
                <Progress value={87} className="h-2" />
                <div className="flex justify-between items-center">
                  <span className="text-sm">Waste Management</span>
                  <span className="font-medium text-purple-600">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">Weekly Trends</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">This Week</span>
                  <span className="font-medium text-green-600">89%</span>
                </div>
                <Progress value={89} className="h-2" />
                <div className="flex justify-between items-center">
                  <span className="text-sm">Last Week</span>
                  <span className="font-medium text-blue-600">84%</span>
                </div>
                <Progress value={84} className="h-2" />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">Environmental Impact</h4>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-green-600">2.3kg</div>
                <div className="text-sm text-gray-600">CO₂ Saved Today</div>
                <div className="text-2xl font-bold text-blue-600">45L</div>
                <div className="text-sm text-gray-600">Water Conserved</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
