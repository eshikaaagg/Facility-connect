"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageCircle, X, Users, Headphones, Shield, User, AlertCircle, CheckCircle2, Clock } from "lucide-react"
import SocketManager from "@/lib/socket"

interface Message {
  id: string
  text: string
  sender: {
    id: string
    name: string
    role: "user" | "staff" | "system"
  }
  timestamp: Date
  type: "general" | "support" | "request" | "system"
  targetRole?: string
}

interface OnlineUser {
  id: string
  name: string
  role: "user" | "staff"
  socketId: string
}

interface RoleBasedChatProps {
  user: {
    id: string
    name: string
    role: "user" | "staff"
  }
  onClose?: () => void
  isMinimized?: boolean
}

export function RoleBasedChat({ user, onClose, isMinimized = false }: RoleBasedChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([])
  const [isMinimizedState, setIsMinimizedState] = useState(isMinimized)
  const [messageTarget, setMessageTarget] = useState<string>(user.role === "staff" ? "user" : "staff")
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "disconnected">("connecting")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const socketManager = SocketManager.getInstance()

  useEffect(() => {
    console.log(`🔌 Connecting ${user.name} (${user.role}) to mock chat...`)

    // Connect to Mock Socket
    const socket = socketManager.connect(user.id, user.role)

    socket.on("connect", () => {
      console.log("✅ Mock chat connected successfully")
      setIsConnected(true)
      setConnectionStatus("connected")
    })

    socket.on("disconnect", () => {
      console.log("❌ Mock chat disconnected")
      setIsConnected(false)
      setConnectionStatus("disconnected")
    })

    socket.on("new_message", (message: Message) => {
      console.log("📨 New message received:", message)
      setMessages((prev) => [
        ...prev,
        {
          ...message,
          timestamp: new Date(message.timestamp),
        },
      ])
    })

    socket.on("online_users", (data: { count: number; users: OnlineUser[] }) => {
      console.log("👥 Online users updated:", data)
      setOnlineUsers(data.users || [])
    })

    socket.on("user_joined", (userData: OnlineUser) => {
      console.log("👋 User joined:", userData)
      if (userData.id !== user.id) {
        const joinMessage: Message = {
          id: Date.now().toString(),
          text: `${userData.name} (${userData.role}) joined the chat`,
          sender: { id: "system", name: "System", role: "system" },
          timestamp: new Date(),
          type: "system",
        }
        setMessages((prev) => [...prev, joinMessage])
      }
    })

    socket.on("user_left", (userData: OnlineUser) => {
      console.log("👋 User left:", userData)
      if (userData.id !== user.id) {
        const leaveMessage: Message = {
          id: Date.now().toString(),
          text: `${userData.name} (${userData.role}) left the chat`,
          sender: { id: "system", name: "System", role: "system" },
          timestamp: new Date(),
          type: "system",
        }
        setMessages((prev) => [...prev, leaveMessage])
      }
    })

    return () => {
      socket.off("connect")
      socket.off("disconnect")
      socket.off("new_message")
      socket.off("online_users")
      socket.off("user_joined")
      socket.off("user_left")
    }
  }, [user.id, user.role, user.name])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const sendMessage = () => {
    if (!newMessage.trim() || !isConnected) return

    console.log(`📤 Sending message to ${messageTarget}:`, newMessage)

    // Send via Socket.IO with proper target
    socketManager.sendMessage({
      text: newMessage,
      type: "general",
      targetRole: messageTarget,
    })

    setNewMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case "connected":
        return <CheckCircle2 className="w-3 h-3 text-green-500" />
      case "connecting":
        return <Clock className="w-3 h-3 text-yellow-500 animate-spin" />
      case "disconnected":
        return <AlertCircle className="w-3 h-3 text-red-500" />
    }
  }

  const getConnectionText = () => {
    switch (connectionStatus) {
      case "connected":
        return "Connected"
      case "connecting":
        return "Connecting..."
      case "disconnected":
        return "Disconnected"
    }
  }

  if (isMinimizedState) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsMinimizedState(false)}
          className="rounded-full w-14 h-14 bg-blue-600 hover:bg-blue-700 shadow-lg relative"
        >
          <MessageCircle className="h-6 w-6" />
          {messages.filter((m) => m.sender.id !== user.id && m.type !== "system").length > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 p-0 text-xs">
              {messages.filter((m) => m.sender.id !== user.id && m.type !== "system").length}
            </Badge>
          )}
          <div className="absolute -bottom-1 -right-1">{getConnectionIcon()}</div>
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 h-[500px]">
      <Card className="h-full shadow-2xl border-0">
        <CardHeader
          className={`${
            user.role === "staff"
              ? "bg-gradient-to-r from-green-600 to-blue-600"
              : "bg-gradient-to-r from-blue-600 to-purple-600"
          } text-white rounded-t-lg p-4`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {user.role === "staff" ? <Shield className="h-5 w-5" /> : <User className="h-5 w-5" />}
              <CardTitle className="text-lg">
                {user.role === "staff" ? "Staff Support Chat" : "User Support Chat"}
              </CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {getConnectionIcon()}
                <span className="text-xs">{getConnectionText()}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMinimizedState(true)}
                className="text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{onlineUsers.length} online</span>
              </div>
              <div className="flex items-center space-x-1">
                <Headphones className="h-4 w-4" />
                <span>
                  {user.role === "staff"
                    ? `${onlineUsers.filter((u) => u.role === "user").length} users`
                    : `${onlineUsers.filter((u) => u.role === "staff").length} staff`}
                </span>
              </div>
            </div>

            {/* Role indicator */}
            <Badge variant="secondary" className="bg-white/20 text-white">
              {user.role === "staff" ? "🛡️ Staff" : "👤 User"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0 h-full flex flex-col">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender.id === user.id ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender.id === user.id
                        ? user.role === "staff"
                          ? "bg-green-600 text-white"
                          : "bg-blue-600 text-white"
                        : message.sender.role === "system"
                          ? "bg-gray-100 text-gray-600 text-center text-sm"
                          : message.sender.role === "staff"
                            ? "bg-green-100 text-green-900 border border-green-200"
                            : "bg-blue-100 text-blue-900 border border-blue-200"
                    }`}
                  >
                    {message.sender.id !== user.id && message.sender.role !== "system" && (
                      <div className="flex items-center space-x-2 mb-1">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback
                            className={`text-xs ${
                              message.sender.role === "staff" ? "bg-green-500 text-white" : "bg-blue-500 text-white"
                            }`}
                          >
                            {message.sender.role === "staff" ? "🛡️" : "👤"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium">{message.sender.name}</span>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            message.sender.role === "staff"
                              ? "border-green-300 text-green-700"
                              : "border-blue-300 text-blue-700"
                          }`}
                        >
                          {message.sender.role === "staff" ? "Staff" : "User"}
                        </Badge>
                      </div>
                    )}
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="p-4 border-t bg-gray-50">
            {/* Message target selector for staff */}
            {user.role === "staff" && (
              <div className="mb-3">
                <Select value={messageTarget} onValueChange={setMessageTarget}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">📢 Send to All Users</SelectItem>
                    <SelectItem value="staff">🛡️ Send to Staff Only</SelectItem>
                    <SelectItem value="all">🌐 Send to Everyone</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress\
