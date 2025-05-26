"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Volume2, VolumeX, Sparkles } from "lucide-react"

interface GreetingBannerProps {
  userName?: string
  showAudioButton?: boolean
  customMessage?: string
}

export default function GreetingBanner({ userName, showAudioButton = true, customMessage }: GreetingBannerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    // Animate in the greeting
    const timer = setTimeout(() => setIsVisible(true), 500)

    // Set current time for personalized greeting
    const updateTime = () => {
      const now = new Date()
      const hour = now.getHours()
      let timeOfDay = "day"

      if (hour < 12) timeOfDay = "morning"
      else if (hour < 17) timeOfDay = "afternoon"
      else timeOfDay = "evening"

      setCurrentTime(timeOfDay)
    }

    updateTime()
    return () => clearTimeout(timer)
  }, [])

  const getGreetingMessage = () => {
    if (customMessage) return customMessage

    const baseGreeting = `Good ${currentTime}${userName ? `, ${userName}` : ""}!`
    const welcomeText = "Welcome to our website. We're excited to have you here!"

    return `${baseGreeting} ${welcomeText}`
  }

  const handleAudioGreeting = async () => {
    if (!audioEnabled) {
      setAudioEnabled(true)
      // Here you could integrate with your Google AI TTS API
      // For now, we'll use the Web Speech API as a fallback
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(getGreetingMessage())
        utterance.rate = 0.9
        utterance.pitch = 1
        speechSynthesis.speak(utterance)
      }
    } else {
      setAudioEnabled(false)
      if ("speechSynthesis" in window) {
        speechSynthesis.cancel()
      }
    }
  }

  return (
    <div
      className={`transition-all duration-1000 transform ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
      }`}
    >
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  {currentTime && `Good ${currentTime}${userName ? `, ${userName}` : ""}!`}
                </h2>
                <p className="text-gray-600">Welcome to our website. We're excited to have you here!</p>
              </div>
            </div>

            {showAudioButton && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleAudioGreeting}
                className="flex items-center space-x-2 hover:bg-blue-50"
              >
                {audioEnabled ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span className="hidden sm:inline">{audioEnabled ? "Stop" : "Listen"}</span>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
