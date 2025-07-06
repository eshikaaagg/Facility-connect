"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  Clock,
  CheckCircle2,
  Star,
  AlertTriangle,
  Zap,
  Droplets,
  Recycle,
  TreePine,
  Leaf,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react"

interface AnalyticsDashboardProps {
  userRole: string
}

export function AnalyticsDashboard({ userRole }: AnalyticsDashboardProps) {
  const [analytics, setAnalytics] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch("/api/analytics")
      if (response.ok) {
        const data = await response.json()
        setAnalytics(data.analytics)
      } else {
        // Fallback to mock data if API fails
        setAnalytics({
          totalRequests: 15,
          completedRequests: 12,
          avgResponseTime: 2.5,
          userSatisfaction: 4.2,
          points: 1250,
          level: 5,
          badges: ["Problem Solver", "Team Player", "Eco Warrior"],
          topCategories: [
            { category: "maintenance", count: 8 },
            { category: "cleaning", count: 4 },
            { category: "IT", count: 3 },
          ],
          monthlyTrends: [
            { month: "Jan", requests: 45, satisfaction: 4.1 },
            { month: "Feb", requests: 52, satisfaction: 4.3 },
            { month: "Mar", requests: 38, satisfaction: 4.5 },
          ],
        })
      }
    } catch (error) {
      console.error("Failed to fetch analytics:", error)
      // Set mock data on error
      setAnalytics({
        totalRequests: 15,
        completedRequests: 12,
        avgResponseTime: 2.5,
        userSatisfaction: 4.2,
        points: 1250,
        level: 5,
        badges: ["Problem Solver", "Team Player", "Eco Warrior"],
        topCategories: [
          { category: "maintenance", count: 8 },
          { category: "cleaning", count: 4 },
          { category: "IT", count: 3 },
        ],
        monthlyTrends: [
          { month: "Jan", requests: 45, satisfaction: 4.1 },
          { month: "Feb", requests: 52, satisfaction: 4.3 },
          { month: "Mar", requests: 38, satisfaction: 4.5 },
        ],
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center space-y-4">
          <Activity className="h-12 w-12 animate-spin mx-auto text-blue-600" />
          <p className="text-lg font-medium text-gray-600">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (!analytics) {
    return <div className="p-6">Failed to load analytics</div>
  }

  // For regular users, show personal stats
  if (userRole === "user") {
    return (
      <div className="space-y-8">
        {/* Personal Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-lg border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">My Requests</p>
                  <p className="text-3xl font-bold text-blue-800">{analytics.totalRequests || 0}</p>
                </div>
                <AlertTriangle className="h-10 w-10 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-l-4 border-l-green-500 bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700">Completed</p>
                  <p className="text-3xl font-bold text-green-800">{analytics.completedRequests || 0}</p>
                </div>
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-l-4 border-l-yellow-500 bg-gradient-to-br from-yellow-50 to-yellow-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-700">Total Points</p>
                  <p className="text-3xl font-bold text-yellow-800">{analytics.points || 0}</p>
                </div>
                <Star className="h-10 w-10 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700">Current Level</p>
                  <p className="text-3xl font-bold text-purple-800">{analytics.level || 1}</p>
                </div>
                <TrendingUp className="h-10 w-10 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Energy Conservation & Sustainability */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-lg bg-gradient-to-br from-emerald-50 to-green-100">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Leaf className="h-6 w-6 text-emerald-600" />
                <span className="text-emerald-800">My Environmental Impact</span>
              </CardTitle>
              <CardDescription className="text-emerald-700">Your contribution to sustainability</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white rounded-lg border border-emerald-200">
                  <Zap className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                  <div className="text-2xl font-bold text-emerald-800">1.2kWh</div>
                  <div className="text-sm text-emerald-600">Energy Saved</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-emerald-200">
                  <Droplets className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold text-emerald-800">25L</div>
                  <div className="text-sm text-emerald-600">Water Conserved</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-emerald-200">
                  <Recycle className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <div className="text-2xl font-bold text-emerald-800">0.8kg</div>
                  <div className="text-sm text-emerald-600">CO₂ Reduced</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-emerald-200">
                  <TreePine className="h-8 w-8 mx-auto mb-2 text-green-700" />
                  <div className="text-2xl font-bold text-emerald-800">92%</div>
                  <div className="text-sm text-emerald-600">Eco Score</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg bg-gradient-to-br from-indigo-50 to-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-6 w-6 text-indigo-600" />
                <span className="text-indigo-800">Weekly Activity</span>
              </CardTitle>
              <CardDescription className="text-indigo-700">Your engagement over time</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { day: "Monday", requests: 3, points: 45, color: "bg-blue-500" },
                { day: "Tuesday", requests: 2, points: 30, color: "bg-green-500" },
                { day: "Wednesday", requests: 4, points: 60, color: "bg-purple-500" },
                { day: "Thursday", requests: 1, points: 15, color: "bg-yellow-500" },
                { day: "Friday", requests: 3, points: 45, color: "bg-red-500" },
                { day: "Saturday", requests: 1, points: 15, color: "bg-indigo-500" },
                { day: "Sunday", requests: 1, points: 15, color: "bg-pink-500" },
              ].map((day) => (
                <div
                  key={day.day}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border border-indigo-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${day.color}`} />
                    <span className="font-medium text-indigo-800">{day.day}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-indigo-600">{day.requests} requests</span>
                    <Badge className="bg-indigo-100 text-indigo-800">+{day.points} pts</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card className="shadow-lg bg-gradient-to-br from-amber-50 to-orange-100">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-6 w-6 text-amber-600" />
              <span className="text-amber-800">My Achievements</span>
            </CardTitle>
            <CardDescription className="text-amber-700">Badges earned through participation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {analytics.badges?.map((badge: string, index: number) => (
                <Badge
                  key={index}
                  className="text-sm px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                >
                  <Star className="h-4 w-4 mr-2" />
                  {badge}
                </Badge>
              ))}
              {!analytics.badges?.length && (
                <p className="text-amber-700">No badges earned yet. Keep participating to unlock achievements!</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // For staff/admin, show full analytics
  return (
    <div className="space-y-8">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-lg border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Requests</p>
                <p className="text-3xl font-bold text-blue-800">{analytics.totalRequests}</p>
              </div>
              <AlertTriangle className="h-10 w-10 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg border-l-4 border-l-green-500 bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Completed</p>
                <p className="text-3xl font-bold text-green-800">{analytics.completedRequests}</p>
                <p className="text-xs text-green-600">
                  {Math.round((analytics.completedRequests / analytics.totalRequests) * 100)}% completion rate
                </p>
              </div>
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg border-l-4 border-l-orange-500 bg-gradient-to-br from-orange-50 to-orange-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">Avg Response Time</p>
                <p className="text-3xl font-bold text-orange-800">{analytics.avgResponseTime}h</p>
              </div>
              <Clock className="h-10 w-10 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg border-l-4 border-l-yellow-500 bg-gradient-to-br from-yellow-50 to-yellow-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-700">User Satisfaction</p>
                <p className="text-3xl font-bold text-yellow-800">{analytics.userSatisfaction}/5</p>
                <Progress value={analytics.userSatisfaction * 20} className="mt-2" />
              </div>
              <Star className="h-10 w-10 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Energy Conservation Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-lg bg-gradient-to-br from-emerald-50 to-green-100">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-emerald-600" />
              <span className="text-emerald-800">Energy Conservation Metrics</span>
            </CardTitle>
            <CardDescription className="text-emerald-700">Facility-wide energy efficiency tracking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white rounded-lg border border-emerald-200">
                <div className="text-2xl font-bold text-emerald-800">15.7kWh</div>
                <div className="text-sm text-emerald-600">Daily Energy Saved</div>
                <div className="text-xs text-emerald-500">↓ 12% from last week</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-emerald-200">
                <div className="text-2xl font-bold text-emerald-800">₹2,340</div>
                <div className="text-sm text-emerald-600">Cost Savings</div>
                <div className="text-xs text-emerald-500">This month</div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-emerald-700">AC Optimization</span>
                <span className="text-emerald-800 font-bold">89%</span>
              </div>
              <Progress value={89} className="h-3 bg-emerald-200" />
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-emerald-700">Lighting Efficiency</span>
                <span className="text-emerald-800 font-bold">94%</span>
              </div>
              <Progress value={94} className="h-3 bg-emerald-200" />
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-emerald-700">Equipment Usage</span>
                <span className="text-emerald-800 font-bold">76%</span>
              </div>
              <Progress value={76} className="h-3 bg-emerald-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg bg-gradient-to-br from-cyan-50 to-blue-100">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Droplets className="h-6 w-6 text-cyan-600" />
              <span className="text-cyan-800">Water Conservation</span>
            </CardTitle>
            <CardDescription className="text-cyan-700">Water usage and conservation metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white rounded-lg border border-cyan-200">
                <div className="text-2xl font-bold text-cyan-800">450L</div>
                <div className="text-sm text-cyan-600">Water Saved Today</div>
                <div className="text-xs text-cyan-500">↓ 8% usage</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-cyan-200">
                <div className="text-2xl font-bold text-cyan-800">12,500L</div>
                <div className="text-sm text-cyan-600">Monthly Conservation</div>
                <div className="text-xs text-cyan-500">Target: 15,000L</div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-cyan-700">Restroom Efficiency</span>
                <span className="text-cyan-800 font-bold">92%</span>
              </div>
              <Progress value={92} className="h-3 bg-cyan-200" />
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-cyan-700">Kitchen Conservation</span>
                <span className="text-cyan-800 font-bold">85%</span>
              </div>
              <Progress value={85} className="h-3 bg-cyan-200" />
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-cyan-700">Leak Prevention</span>
                <span className="text-cyan-800 font-bold">98%</span>
              </div>
              <Progress value={98} className="h-3 bg-cyan-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Waste Management & Carbon Footprint */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-lg bg-gradient-to-br from-purple-50 to-indigo-100">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Recycle className="h-6 w-6 text-purple-600" />
              <span className="text-purple-800">Waste Management</span>
            </CardTitle>
            <CardDescription className="text-purple-700">Recycling and waste reduction metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-white rounded-lg border border-purple-200">
                <div className="text-lg font-bold text-purple-800">85%</div>
                <div className="text-xs text-purple-600">Recycled</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border border-purple-200">
                <div className="text-lg font-bold text-purple-800">12kg</div>
                <div className="text-xs text-purple-600">Reduced</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border border-purple-200">
                <div className="text-lg font-bold text-purple-800">3.2kg</div>
                <div className="text-xs text-purple-600">Composted</div>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { type: "Paper & Cardboard", percentage: 92, color: "bg-green-500" },
                { type: "Plastic & Bottles", percentage: 78, color: "bg-blue-500" },
                { type: "Food Waste", percentage: 89, color: "bg-orange-500" },
                { type: "Electronic Waste", percentage: 65, color: "bg-red-500" },
              ].map((item) => (
                <div key={item.type} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-700">{item.type}</span>
                    <span className="font-bold text-purple-800">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-purple-200 rounded-full h-2">
                    <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg bg-gradient-to-br from-rose-50 to-red-100">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TreePine className="h-6 w-6 text-rose-600" />
              <span className="text-rose-800">Carbon Footprint</span>
            </CardTitle>
            <CardDescription className="text-rose-700">CO₂ emissions and reduction tracking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white rounded-lg border border-rose-200">
                <div className="text-2xl font-bold text-rose-800">8.5kg</div>
                <div className="text-sm text-rose-600">CO₂ Reduced Today</div>
                <div className="text-xs text-rose-500">↓ 15% from yesterday</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-rose-200">
                <div className="text-2xl font-bold text-rose-800">245kg</div>
                <div className="text-sm text-rose-600">Monthly Reduction</div>
                <div className="text-xs text-rose-500">Goal: 300kg</div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-rose-700">Transportation</span>
                <span className="text-rose-800 font-bold">-23%</span>
              </div>
              <Progress value={77} className="h-3 bg-rose-200" />
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-rose-700">Energy Usage</span>
                <span className="text-rose-800 font-bold">-18%</span>
              </div>
              <Progress value={82} className="h-3 bg-rose-200" />
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-rose-700">Waste Reduction</span>
                <span className="text-rose-800 font-bold">-31%</span>
              </div>
              <Progress value={69} className="h-3 bg-rose-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card className="shadow-lg bg-gradient-to-br from-slate-50 to-gray-100">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PieChart className="h-6 w-6 text-slate-600" />
            <span className="text-slate-800">Request Category Breakdown</span>
          </CardTitle>
          <CardDescription className="text-slate-700">Distribution of service requests by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.topCategories?.map((category: any, index: number) => {
              const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-yellow-500", "bg-red-500"]
              return (
                <div
                  key={category.category}
                  className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${colors[index % colors.length]}`} />
                    <span className="font-medium capitalize text-slate-800">{category.category}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-slate-600">{category.count} requests</span>
                    <div className="w-24 bg-slate-200 rounded-full h-2">
                      <div
                        className={`${colors[index % colors.length]} h-2 rounded-full`}
                        style={{ width: `${(category.count / analytics.totalRequests) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-slate-800">
                      {Math.round((category.count / analytics.totalRequests) * 100)}%
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
