"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Volume2, VolumeX, Sparkles, Clock, MapPin } from "lucide-react"

interface AdvancedGreetingProps {
  userName?: string
  location?: string
  showWeather?: boolean
  customGreeting?: string
}

export default function AdvancedGreeting({
  userName,
  location,
  showWeather = false,
  customGreeting,
}: AdvancedGreetingProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [currentTime, setCurrentTime] = useState("")
  const [currentDate, setCurrentDate] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)

    const updateDateTime = () => {
      const now = new Date()
      const hour = now.getHours()
      let timeOfDay = "day"

      if (hour < 12) timeOfDay = "morning"
      else if (hour < 17) timeOfDay = "afternoon"
      else timeOfDay = "evening"

      setCurrentTime(timeOfDay)
      setCurrentDate(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      )
    }

    updateDateTime()
    return () => clearTimeout(timer)
  }, [])

  const getPersonalizedGreeting = () => {
    if (customGreeting) return customGreeting

    const greetings = [
      `Good ${currentTime}${userName ? `, ${userName}` : ""}! Welcome back to our website.`,
      `Hello${userName ? ` ${userName}` : ""}! Great to see you this ${currentTime}.`,
      `Welcome${userName ? ` back, ${userName}` : ""}! Hope you're having a wonderful ${currentTime}.`,
    ]

    return greetings[Math.floor(Math.random() * greetings.length)]
  }

  const handleAudioGreeting = async () => {
    setAudioEnabled(!audioEnabled)

    if (!audioEnabled && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(getPersonalizedGreeting())
      utterance.rate = 0.9
      utterance.pitch = 1
      speechSynthesis.speak(utterance)
    } else if ("speechSynthesis" in window) {
      speechSynthesis.cancel()
    }
  }

  return (
    <div
      className={`transition-all duration-1000 transform ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
      }`}
    >
      <Card className="bg-gradient-to-br from-indigo-50 via-white to-cyan-50 border-indigo-200 shadow-xl">
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-cyan-600 rounded-full shadow-lg">
                <Sparkles className="w-8 h-8 text-white animate-pulse" />
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-800">{getPersonalizedGreeting()}</h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{currentDate}</span>
                  </div>

                  {location && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{location}</span>
                    </div>
                  )}
                </div>

                <p className="text-gray-600 max-w-md">
                  We're thrilled to have you here. Explore our latest features and discover what's new!
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={handleAudioGreeting}
                className="flex items-center space-x-2 hover:bg-indigo-50 border-indigo-200"
              >
                {audioEnabled ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>{audioEnabled ? "Stop Audio" : "Hear Greeting"}</span>
              </Button>

              <Button className="bg-gradient-to-r from-indigo-500 to-cyan-600 hover:from-indigo-600 hover:to-cyan-700">
                Get Started
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
