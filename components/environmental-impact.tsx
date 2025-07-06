"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { X, Leaf, Droplets, Zap, Recycle, TreePine, Award } from "lucide-react"

interface EnvironmentalImpactProps {
  userPoints: number
  onClose: () => void
}

export function EnvironmentalImpact({ userPoints, onClose }: EnvironmentalImpactProps) {
  // Calculate environmental impact based on points
  const carbonSaved = Math.round((userPoints / 10) * 0.5) // 0.5 kg CO2 per 10 points
  const waterSaved = Math.round((userPoints / 5) * 2) // 2 liters per 5 points
  const energySaved = Math.round((userPoints / 15) * 1.2) // 1.2 kWh per 15 points
  const wasteReduced = Math.round((userPoints / 8) * 0.3) // 0.3 kg per 8 points
  const treesEquivalent = Math.round(carbonSaved / 22) // 1 tree absorbs ~22kg CO2/year

  const impactData = [
    {
      icon: <Leaf className="h-8 w-8 text-green-600" />,
      title: "Carbon Footprint Reduced",
      value: `${carbonSaved} kg`,
      description: "CO₂ emissions prevented",
      color: "bg-green-100 text-green-800",
    },
    {
      icon: <Droplets className="h-8 w-8 text-blue-600" />,
      title: "Water Conserved",
      value: `${waterSaved} L`,
      description: "Through efficient facility usage",
      color: "bg-blue-100 text-blue-800",
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-600" />,
      title: "Energy Saved",
      value: `${energySaved} kWh`,
      description: "Electricity consumption reduced",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      icon: <Recycle className="h-8 w-8 text-purple-600" />,
      title: "Waste Reduced",
      value: `${wasteReduced} kg`,
      description: "Less waste to landfills",
      color: "bg-purple-100 text-purple-800",
    },
  ]

  const achievements = [
    {
      title: "Eco Warrior",
      description: "Saved equivalent of 1 tree's annual CO₂ absorption",
      achieved: treesEquivalent >= 1,
      icon: "🌳",
    },
    {
      title: "Water Guardian",
      description: "Conserved over 100 liters of water",
      achieved: waterSaved >= 100,
      icon: "💧",
    },
    {
      title: "Energy Saver",
      description: "Reduced energy consumption by 50+ kWh",
      achieved: energySaved >= 50,
      icon: "⚡",
    },
    {
      title: "Carbon Neutral",
      description: "Prevented 25+ kg of CO₂ emissions",
      achieved: carbonSaved >= 25,
      icon: "🌍",
    },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Leaf className="h-8 w-8" />
              <div>
                <CardTitle className="text-2xl">Your Environmental Impact</CardTitle>
                <p className="text-green-100">Making a difference, one point at a time</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="h-6 w-6" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          {/* Impact Overview */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <TreePine className="h-6 w-6 text-green-600 mr-2" />
              Your Positive Impact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {impactData.map((impact, index) => (
                <Card key={index} className="border-2 border-gray-100 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gray-50 rounded-full">{impact.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{impact.title}</h4>
                        <p className="text-2xl font-bold text-gray-800 mt-1">{impact.value}</p>
                        <p className="text-sm text-gray-600">{impact.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Tree Equivalent */}
          <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold text-green-800 mb-2">🌳 Tree Equivalent Impact</h4>
                <p className="text-green-700">
                  Your actions have saved the equivalent of{" "}
                  <span className="font-bold text-2xl text-green-800">{treesEquivalent}</span> tree
                  {treesEquivalent !== 1 ? "s" : ""} worth of CO₂ absorption for a year!
                </p>
              </div>
              <div className="text-6xl">🌲</div>
            </div>
          </div>

          {/* Environmental Achievements */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Award className="h-6 w-6 text-yellow-600 mr-2" />
              Environmental Achievements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${
                    achievement.achieved ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200 opacity-60"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${achievement.achieved ? "text-green-800" : "text-gray-600"}`}>
                        {achievement.title}
                      </h4>
                      <p className={`text-sm ${achievement.achieved ? "text-green-700" : "text-gray-500"}`}>
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.achieved && <Badge className="bg-green-600 text-white">Achieved!</Badge>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress to Next Milestone */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Progress to Next Milestone</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Next Tree Equivalent (22 kg CO₂)</span>
                  <span>{carbonSaved % 22}/22 kg</span>
                </div>
                <Progress value={(carbonSaved % 22) * (100 / 22)} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Water Guardian Milestone (100L)</span>
                  <span>{Math.min(waterSaved, 100)}/100 L</span>
                </div>
                <Progress value={Math.min(waterSaved, 100)} className="h-3" />
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-2">Keep Making a Difference! 🌍</h3>
            <p className="mb-4">
              Every action you take in FacilityConnect contributes to a more sustainable future. Continue earning points
              to increase your positive environmental impact!
            </p>
            <div className="flex justify-center space-x-4">
              <Badge className="bg-white text-blue-600 px-4 py-2">Current Points: {userPoints}</Badge>
              <Badge className="bg-white text-green-600 px-4 py-2">CO₂ Saved: {carbonSaved} kg</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
