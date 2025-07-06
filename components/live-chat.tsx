"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, X, Users, Headphones } from "lucide-react"
import SocketManager from "@/lib/socket"

interface Message {
  id: string
  text: string
  sender: {
    id: string
    name: string
    role: "user" | "staff" | "admin"
  }
  timestamp: Date
  type: "general" | "support" | "request"
}

interface LiveChatProps {
  user: {
    id: string
    name: string
    role: "user" | "staff" | "admin"
  }
  onClose?: () => void
  isMinimized?: boolean
}

export function LiveChat({ user, onClose, isMinimized = false }: LiveChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Welcome to FacilityConnect support! How can we help you today?",
      sender: { id: "system", name: "Support Bot", role: "staff" },
      timestamp: new Date(),
      type: "support",
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const [onlineUsers, setOnlineUsers] = useState<number>(0)
  const [isMinimizedState, setIsMinimizedState] = useState(isMinimized)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const socketManager = SocketManager.getInstance()

  useEffect(() => {
    // Connect to Socket.IO
    const socket = socketManager.connect(user.id, user.role)

    socket.on("connect", () => {
      setIsConnected(true)
    })

    socket.on("disconnect", () => {
      setIsConnected(false)
    })

    socket.on("new_message", (message: Message) => {
      setMessages((prev) => [...prev, message])
    })

    socket.on("online_users", (count: number) => {
      setOnlineUsers(count)
    })

    socket.on("user_joined", (userData: { name: string; role: string }) => {
      const joinMessage: Message = {
        id: Date.now().toString(),
        text: `${userData.name} joined the chat`,
        sender: { id: "system", name: "System", role: "staff" },
        timestamp: new Date(),
        type: "general",
      }
      setMessages((prev) => [...prev, joinMessage])
    })

    socket.on("user_left", (userData: { name: string; role: string }) => {
      const leaveMessage: Message = {
        id: Date.now().toString(),
        text: `${userData.name} left the chat`,
        sender: { id: "system", name: "System", role: "staff" },
        timestamp: new Date(),
        type: "general",
      }
      setMessages((prev) => [...prev, leaveMessage])
    })

    return () => {
      socket.off("connect")
      socket.off("disconnect")
      socket.off("new_message")
      socket.off("online_users")
      socket.off("user_joined")
      socket.off("user_left")
    }
  }, [user.id, user.role])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: user,
      timestamp: new Date(),
      type: "general",
    }

    // Add to local state immediately
    setMessages((prev) => [...prev, message])

    // Send via Socket.IO
    socketManager.sendMessage({
      text: newMessage,
      type: "general",
    })

    setNewMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (isMinimizedState) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsMinimizedState(false)}
          className="rounded-full w-14 h-14 bg-blue-600 hover:bg-blue-700 shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 p-0 text-xs">
            {messages.filter((m) => m.sender.id !== user.id).length}
          </Badge>
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 h-96">
      <Card className="h-full shadow-2xl border-0">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5" />
              <CardTitle className="text-lg">Live Support</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-400" : "bg-red-400"}`} />
                <span className="text-xs">{isConnected ? "Online" : "Offline"}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsMinimizedState(true)} className="text-white">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{onlineUsers} online</span>
            </div>
            <div className="flex items-center space-x-1">
              <Headphones className="h-4 w-4" />
              <span>Support available</span>
            </div>
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
                        ? "bg-blue-600 text-white"
                        : message.sender.id === "system"
                          ? "bg-gray-100 text-gray-600 text-center text-sm"
                          : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    {message.sender.id !== user.id && message.sender.id !== "system" && (
                      <div className="flex items-center space-x-2 mb-1">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">
                            {message.sender.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium">{message.sender.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {message.sender.role}
                        </Badge>
                      </div>
                    )}
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1"
                disabled={!isConnected}
              />
              <Button onClick={sendMessage} disabled={!newMessage.trim() || !isConnected} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
