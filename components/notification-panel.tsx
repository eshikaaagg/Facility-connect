"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Bell, CheckCircle2, AlertTriangle, Gift, Wrench, Coffee } from "lucide-react"

interface Notification {
  id: string
  title: string
  message: string
  type: "success" | "warning" | "info" | "error"
  timestamp: Date
  read: boolean
  icon?: React.ReactNode
}

interface NotificationPanelProps {
  onClose: () => void
  userRole: string
}

export function NotificationPanel({ onClose, userRole }: NotificationPanelProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Request Completed",
      message: "Your AC maintenance request has been completed successfully",
      type: "success",
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      read: false,
      icon: <CheckCircle2 className="h-4 w-4 text-green-600" />,
    },
    {
      id: "2",
      title: "Food Order Ready",
      message: "Your Paneer Butter Masala order is ready for pickup",
      type: "info",
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      read: false,
      icon: <Coffee className="h-4 w-4 text-orange-600" />,
    },
    {
      id: "3",
      title: "Points Earned",
      message: "You earned 25 points for submitting a maintenance request",
      type: "success",
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      read: true,
      icon: <Gift className="h-4 w-4 text-yellow-600" />,
    },
    {
      id: "4",
      title: "Room Booking Confirmed",
      message: "Conference Room A has been booked for tomorrow 2:00 PM",
      type: "info",
      timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      read: true,
      icon: <CheckCircle2 className="h-4 w-4 text-blue-600" />,
    },
    {
      id: "5",
      title: "System Maintenance",
      message: "Scheduled maintenance tonight from 11 PM to 1 AM",
      type: "warning",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: true,
      icon: <AlertTriangle className="h-4 w-4 text-yellow-600" />,
    },
  ])

  // Add staff-specific notifications
  useEffect(() => {
    if (userRole === "staff") {
      const staffNotifications: Notification[] = [
        {
          id: "staff-1",
          title: "New Urgent Request",
          message: "High priority maintenance request in Conference Room B",
          type: "error",
          timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
          read: false,
          icon: <Wrench className="h-4 w-4 text-red-600" />,
        },
        {
          id: "staff-2",
          title: "User Feedback",
          message: "Arjun Sharma rated your service 5 stars",
          type: "success",
          timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
          read: false,
          icon: <CheckCircle2 className="h-4 w-4 text-green-600" />,
        },
      ]
      setNotifications((prev) => [...staffNotifications, ...prev])
    }
  }, [userRole])

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "border-l-green-500 bg-green-50"
      case "warning":
        return "border-l-yellow-500 bg-yellow-50"
      case "error":
        return "border-l-red-500 bg-red-50"
      case "info":
        return "border-l-blue-500 bg-blue-50"
      default:
        return "border-l-gray-500 bg-gray-50"
    }
  }

  const formatTime = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md max-h-[80vh]">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <CardTitle>Notifications</CardTitle>
              {unreadCount > 0 && <Badge className="bg-red-500 text-white">{unreadCount}</Badge>}
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="p-4 border-b">
            <Button onClick={markAllAsRead} variant="outline" size="sm" className="w-full" disabled={unreadCount === 0}>
              Mark All as Read
            </Button>
          </div>

          <ScrollArea className="h-96">
            <div className="p-4 space-y-3">
              {notifications.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No notifications yet</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`border-l-4 p-3 rounded-r-lg cursor-pointer transition-all hover:shadow-md ${getTypeColor(notification.type)} ${
                      !notification.read ? "ring-2 ring-blue-200" : "opacity-75"
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        {notification.icon}
                        <div className="flex-1">
                          <h4
                            className={`text-sm font-medium ${!notification.read ? "text-gray-900" : "text-gray-700"}`}
                          >
                            {notification.title}
                          </h4>
                          <p className={`text-xs mt-1 ${!notification.read ? "text-gray-700" : "text-gray-500"}`}>
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500">{formatTime(notification.timestamp)}</span>
                            {!notification.read && (
                              <Badge variant="secondary" className="text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 opacity-50 hover:opacity-100"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteNotification(notification.id)
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
