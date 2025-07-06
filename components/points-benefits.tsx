"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RedemptionPopup } from "@/components/redemption-popup"
import { X, Gift, Coffee, Calendar, Trophy, Star, Crown, Zap, Coins } from "lucide-react"

interface PointsBenefitsProps {
  userPoints: number
  userLevel: number
  onClose: () => void
  onRedemption?: (benefit: any, pointsUsed: number) => void
}

export function PointsBenefits({ userPoints, userLevel, onClose, onRedemption }: PointsBenefitsProps) {
  const [showRedemptionPopup, setShowRedemptionPopup] = useState<any>(null)

  const benefits = [
    {
      pointsRequired: 100,
      title: "Free Coffee Voucher",
      description: "Get a complimentary coffee from the cafeteria",
      icon: <Coffee className="h-6 w-6 text-brown-600" />,
      color: "bg-amber-100 text-amber-800",
      available: userPoints >= 100,
    },
    {
      pointsRequired: 250,
      title: "Priority Room Booking",
      description: "Book meeting rooms 2 weeks in advance",
      icon: <Calendar className="h-6 w-6 text-blue-600" />,
      color: "bg-blue-100 text-blue-800",
      available: userPoints >= 250,
    },
    {
      pointsRequired: 500,
      title: "Free Lunch Voucher",
      description: "Enjoy a complimentary meal worth ₹500",
      icon: <Gift className="h-6 w-6 text-green-600" />,
      color: "bg-green-100 text-green-800",
      available: userPoints >= 500,
    },
    {
      pointsRequired: 750,
      title: "Flexible Work Hours",
      description: "Choose your preferred working hours for a week",
      icon: <Zap className="h-6 w-6 text-purple-600" />,
      color: "bg-purple-100 text-purple-800",
      available: userPoints >= 750,
    },
    {
      pointsRequired: 1000,
      title: "Premium Parking Spot",
      description: "Reserved parking spot for a month",
      icon: <Star className="h-6 w-6 text-yellow-600" />,
      color: "bg-yellow-100 text-yellow-800",
      available: userPoints >= 1000,
    },
    {
      pointsRequired: 1500,
      title: "Team Lunch Sponsorship",
      description: "Sponsor lunch for your entire team",
      icon: <Trophy className="h-6 w-6 text-orange-600" />,
      color: "bg-orange-100 text-orange-800",
      available: userPoints >= 1500,
    },
    {
      pointsRequired: 2000,
      title: "Work From Home Day",
      description: "Extra work from home day per week for a month",
      icon: <Crown className="h-6 w-6 text-indigo-600" />,
      color: "bg-indigo-100 text-indigo-800",
      available: userPoints >= 2000,
    },
  ]

  const levelBenefits = [
    {
      level: 1,
      title: "Newcomer",
      perks: ["Basic facility access", "Standard support"],
      color: "bg-gray-100 text-gray-800",
    },
    {
      level: 2,
      title: "Regular User",
      perks: ["Priority support", "Monthly newsletter"],
      color: "bg-blue-100 text-blue-800",
    },
    {
      level: 3,
      title: "Active Member",
      perks: ["Fast-track requests", "Exclusive events access"],
      color: "bg-green-100 text-green-800",
    },
    {
      level: 4,
      title: "Power User",
      perks: ["VIP support", "Beta feature access"],
      color: "bg-purple-100 text-purple-800",
    },
    {
      level: 5,
      title: "Elite Member",
      perks: ["Personal concierge", "Premium amenities"],
      color: "bg-yellow-100 text-yellow-800",
    },
  ]

  const redeemableNow = benefits.filter((benefit) => benefit.available)
  const upcomingBenefits = benefits.filter((benefit) => !benefit.available)

  const handleRedemption = (benefit: any) => {
    setShowRedemptionPopup(benefit)
  }

  const confirmRedemption = () => {
    if (showRedemptionPopup && onRedemption) {
      onRedemption(showRedemptionPopup, showRedemptionPopup.pointsRequired)
    }
    setShowRedemptionPopup(null)
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <CardHeader className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Coins className="h-8 w-8" />
                <div>
                  <CardTitle className="text-2xl">Points & Benefits</CardTitle>
                  <p className="text-yellow-100">Redeem your points for amazing rewards</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
                <X className="h-6 w-6" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            {/* Current Status */}
            <div className="mb-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-yellow-800">Your Current Status</h3>
                  <p className="text-yellow-700">
                    Level {userLevel} • {userPoints} Points Available
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-yellow-800">{userPoints}</div>
                  <div className="text-yellow-600">Total Points</div>
                </div>
              </div>
              <div className="mb-2">
                <div className="flex justify-between text-sm text-yellow-700">
                  <span>Progress to Level {userLevel + 1}</span>
                  <span>{userPoints % 500}/500</span>
                </div>
                <Progress value={(userPoints % 500) / 5} className="h-3 mt-1" />
              </div>
            </div>

            {/* Available Benefits */}
            {redeemableNow.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Gift className="h-6 w-6 text-green-600 mr-2" />
                  Available to Redeem Now
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {redeemableNow.map((benefit, index) => (
                    <Card key={index} className="border-2 border-green-200 bg-green-50">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="p-3 bg-white rounded-full">{benefit.icon}</div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{benefit.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{benefit.description}</p>
                            <div className="flex items-center justify-between mt-3">
                              <Badge className={benefit.color}>{benefit.pointsRequired} points</Badge>
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleRedemption(benefit)}
                              >
                                Redeem Now
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Benefits */}
            {upcomingBenefits.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Star className="h-6 w-6 text-blue-600 mr-2" />
                  Upcoming Rewards
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {upcomingBenefits.map((benefit, index) => (
                    <Card key={index} className="border-2 border-gray-200 opacity-75">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="p-3 bg-gray-100 rounded-full">{benefit.icon}</div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-700">{benefit.title}</h4>
                            <p className="text-sm text-gray-500 mt-1">{benefit.description}</p>
                            <div className="flex items-center justify-between mt-3">
                              <Badge variant="outline">{benefit.pointsRequired} points</Badge>
                              <div className="text-sm text-gray-500">
                                Need {benefit.pointsRequired - userPoints} more points
                              </div>
                            </div>
                            <Progress value={(userPoints / benefit.pointsRequired) * 100} className="h-2 mt-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Level Benefits */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Crown className="h-6 w-6 text-purple-600 mr-2" />
                Level Benefits
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {levelBenefits.map((level, index) => (
                  <Card
                    key={index}
                    className={`border-2 ${
                      userLevel >= level.level
                        ? "border-green-200 bg-green-50"
                        : userLevel === level.level - 1
                          ? "border-blue-200 bg-blue-50"
                          : "border-gray-200"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="text-center mb-3">
                        <Badge className={level.color}>Level {level.level}</Badge>
                        <h4 className="font-semibold mt-2">{level.title}</h4>
                      </div>
                      <ul className="text-sm space-y-1">
                        {level.perks.map((perk, perkIndex) => (
                          <li key={perkIndex} className="flex items-center">
                            <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                            {perk}
                          </li>
                        ))}
                      </ul>
                      {userLevel >= level.level && (
                        <Badge className="w-full mt-3 bg-green-600 text-white justify-center">Unlocked!</Badge>
                      )}
                      {userLevel === level.level - 1 && (
                        <Badge className="w-full mt-3 bg-blue-600 text-white justify-center">Next Level</Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* How to Earn Points */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">How to Earn More Points</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Daily Activities</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Submit service requests (+25-75 pts)</li>
                    <li>• Order food (+10 pts per item)</li>
                    <li>• Book meeting rooms (+15 pts)</li>
                    <li>• Daily login (+10 pts)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Special Actions</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Provide feedback (+20 pts)</li>
                    <li>• Help colleagues (+30 pts)</li>
                    <li>• Attend events (+50 pts)</li>
                    <li>• Eco-friendly actions (+25 pts)</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Redemption Popup */}
      {showRedemptionPopup && (
        <RedemptionPopup
          benefit={showRedemptionPopup}
          onClose={() => setShowRedemptionPopup(null)}
          onConfirm={confirmRedemption}
        />
      )}
    </>
  )
}
