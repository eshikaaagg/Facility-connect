"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, PieChart, TrendingUp, Clock, Users, Star, Activity, Calendar, Coffee, Wrench } from "lucide-react"

interface AnalyticsChartsProps {
  userRole: string
}

export function AnalyticsCharts({ userRole }: AnalyticsChartsProps) {
  // Mock data for charts
  const monthlyData = [
    { month: "Jan", requests: 45, satisfaction: 4.1, users: 120 },
    { month: "Feb", requests: 52, satisfaction: 4.3, users: 135 },
    { month: "Mar", requests: 38, satisfaction: 4.5, users: 142 },
    { month: "Apr", requests: 61, satisfaction: 4.2, users: 158 },
    { month: "May", requests: 47, satisfaction: 4.4, users: 163 },
    { month: "Jun", requests: 55, satisfaction: 4.6, users: 171 },
  ]

  const categoryData = [
    { category: "Maintenance", count: 35, percentage: 45, color: "bg-blue-500" },
    { category: "Cleaning", count: 20, percentage: 26, color: "bg-green-500" },
    { category: "IT Support", count: 15, percentage: 19, color: "bg-purple-500" },
    { category: "Food Services", count: 8, percentage: 10, color: "bg-orange-500" },
  ]

  const performanceMetrics = [
    { label: "Response Time", value: 85, target: 90, unit: "%" },
    { label: "User Satisfaction", value: 92, target: 95, unit: "%" },
    { label: "Completion Rate", value: 88, target: 90, unit: "%" },
    { label: "First Call Resolution", value: 76, target: 80, unit: "%" },
  ]

  const maxValue = Math.max(...monthlyData.map((d) => d.requests))

  return (
    <div className="space-y-8">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-lg border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                <p className="text-3xl font-bold text-blue-600">238</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +12% from last month
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <p className="text-3xl font-bold text-green-600">88%</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +5% improvement
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <PieChart className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                <p className="text-3xl font-bold text-orange-600">2.5h</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  -30min faster
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">User Satisfaction</p>
                <p className="text-3xl font-bold text-purple-600">4.6/5</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <Star className="h-4 w-4 mr-1" />
                  Excellent rating
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Trends Chart */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <span>Monthly Request Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={data.month} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{data.month}</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600">{data.requests} requests</span>
                      <Badge variant="outline" className="text-xs">
                        {data.satisfaction}★
                      </Badge>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(data.requests / maxValue) * 100}%` }}
                      ></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-medium text-white">{data.requests}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5 text-green-600" />
              <span>Request Categories</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {categoryData.map((category, index) => (
                <div key={category.category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                      <span className="font-medium">{category.category}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{category.count} requests</span>
                      <Badge variant="secondary">{category.percentage}%</Badge>
                    </div>
                  </div>
                  <Progress value={category.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <span>Performance Metrics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {performanceMetrics.map((metric, index) => (
              <div key={metric.label} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{metric.label}</span>
                  <span className="text-sm text-gray-600">
                    Target: {metric.target}
                    {metric.unit}
                  </span>
                </div>
                <div className="relative">
                  <Progress value={metric.value} className="h-3" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-medium text-white">
                      {metric.value}
                      {metric.unit}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Current</span>
                  <span className={metric.value >= metric.target ? "text-green-600" : "text-orange-600"}>
                    {metric.value >= metric.target ? "✓ Target Met" : "⚠ Below Target"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity Heatmap */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-indigo-600" />
            <span>Weekly Activity Heatmap</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-8 gap-2 text-xs text-gray-600">
              <div></div>
              <div className="text-center">Mon</div>
              <div className="text-center">Tue</div>
              <div className="text-center">Wed</div>
              <div className="text-center">Thu</div>
              <div className="text-center">Fri</div>
              <div className="text-center">Sat</div>
              <div className="text-center">Sun</div>
            </div>
            {["Week 1", "Week 2", "Week 3", "Week 4"].map((week, weekIndex) => (
              <div key={week} className="grid grid-cols-8 gap-2 items-center">
                <div className="text-xs text-gray-600">{week}</div>
                {[1, 2, 3, 4, 5, 6, 7].map((day) => {
                  const activity = Math.floor(Math.random() * 4) + 1
                  const intensityClass =
                    activity === 1
                      ? "bg-green-100"
                      : activity === 2
                        ? "bg-green-200"
                        : activity === 3
                          ? "bg-green-400"
                          : "bg-green-600"
                  return (
                    <div
                      key={day}
                      className={`h-8 rounded ${intensityClass} flex items-center justify-center text-xs font-medium`}
                      title={`${activity * 3} requests`}
                    >
                      {activity * 3}
                    </div>
                  )
                })}
              </div>
            ))}
            <div className="flex items-center justify-between text-xs text-gray-600 mt-4">
              <span>Less activity</span>
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-green-100 rounded"></div>
                <div className="w-3 h-3 bg-green-200 rounded"></div>
                <div className="w-3 h-3 bg-green-400 rounded"></div>
                <div className="w-3 h-3 bg-green-600 rounded"></div>
              </div>
              <span>More activity</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Type Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wrench className="h-5 w-5 text-blue-600" />
              <span>Maintenance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">35</div>
                <div className="text-sm text-gray-600">Total Requests</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Completed</span>
                  <span className="font-medium">28</span>
                </div>
                <Progress value={80} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span>In Progress</span>
                  <span className="font-medium">5</span>
                </div>
                <Progress value={14} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span>Pending</span>
                  <span className="font-medium">2</span>
                </div>
                <Progress value={6} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Coffee className="h-5 w-5 text-green-600" />
              <span>Food Orders</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">142</div>
                <div className="text-sm text-gray-600">Total Orders</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Delivered</span>
                  <span className="font-medium">135</span>
                </div>
                <Progress value={95} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span>Preparing</span>
                  <span className="font-medium">5</span>
                </div>
                <Progress value={4} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span>Ordered</span>
                  <span className="font-medium">2</span>
                </div>
                <Progress value={1} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-600" />
              <span>User Engagement</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">89%</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Daily Active</span>
                  <Badge className="bg-green-100 text-green-800">156 users</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Weekly Active</span>
                  <Badge className="bg-blue-100 text-blue-800">203 users</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Monthly Active</span>
                  <Badge className="bg-purple-100 text-purple-800">245 users</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
