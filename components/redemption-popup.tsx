"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Gift, Sparkles, X } from "lucide-react"

interface RedemptionPopupProps {
  benefit: {
    title: string
    description: string
    pointsRequired: number
    icon: React.ReactNode
  }
  onClose: () => void
  onConfirm: () => void
}

export function RedemptionPopup({ benefit, onClose, onConfirm }: RedemptionPopupProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white text-center">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <Gift className="h-8 w-8" />
              </div>
              <CardTitle className="text-xl">Redeem Reward</CardTitle>
              <p className="text-green-100 mt-2">Confirm your redemption</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border border-green-200">
              <div className="flex items-center justify-center mb-3">{benefit.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{benefit.description}</p>
              <Badge className="bg-green-600 text-white">{benefit.pointsRequired} Points Required</Badge>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center justify-center space-x-2 text-yellow-800">
                <Sparkles className="h-5 w-5" />
                <span className="font-medium">Ready to redeem?</span>
              </div>
              <p className="text-sm text-yellow-700 mt-2">
                This will deduct {benefit.pointsRequired} points from your account.
              </p>
            </div>

            <div className="flex space-x-3">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button onClick={onConfirm} className="flex-1 bg-green-600 hover:bg-green-700">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Confirm Redemption
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
