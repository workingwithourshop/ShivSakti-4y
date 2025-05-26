"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Volume2, VolumeX, Sparkles, Loader2, AlertCircle } from "lucide-react"
import { useGreeting } from "@/hooks/use-greeting"

interface AutomatedGreetingBannerProps {
  userName?: string
  autoPlay?: boolean
  className?: string
}

export default function AutomatedGreetingBanner({
  userName,
  autoPlay = true,
  className = "",
}: AutomatedGreetingBannerProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const [startX, setStartX] = useState(0)
  const bannerRef = useRef<HTMLDivElement>(null)

  const {
    isVisible,
    isPlaying,
    hasPlayed,
    isAudioReady,
    isOffline,
    audioPreparationFailed,
    playGreeting,
    stopGreeting,
    hideGreeting,
    greetingText,
  } = useGreeting({
    userName,
    autoPlay,
  })

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
  }, [])

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return

      const currentX = e.touches[0].clientX
      const diff = currentX - startX
      setDragOffset(diff)
    },
    [isDragging, startX],
  )

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return

    setIsDragging(false)

    // If dragged more than 100px to the right, hide the banner
    if (dragOffset > 100) {
      hideGreeting()
    }

    setDragOffset(0)
  }, [isDragging, dragOffset, hideGreeting])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.clientX)
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return

      const currentX = e.clientX
      const diff = currentX - startX
      setDragOffset(diff)
    },
    [isDragging, startX],
  )

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return

    setIsDragging(false)

    if (dragOffset > 100) {
      hideGreeting()
    }

    setDragOffset(0)
  }, [isDragging, dragOffset, hideGreeting])

  if (!isVisible || isOffline) return null

  const getStatusIcon = () => {
    if (!isAudioReady) {
      return <Loader2 className="w-5 h-5 text-white animate-spin" />
    }
    if (audioPreparationFailed) {
      return <AlertCircle className="w-5 h-5 text-yellow-300" />
    }
    return <Sparkles className={`w-5 h-5 text-white ${isPlaying ? "animate-pulse" : ""}`} />
  }

  const getStatusText = () => {
    if (!isAudioReady) {
      return "Preparing greeting..."
    }
    if (isPlaying) {
      return "Playing greeting..."
    }
    if (audioPreparationFailed) {
      return "Using browser audio"
    }
    return null
  }

  return (
    <div
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-500 ${className}`}
      style={{
        transform: `translateX(${dragOffset}px)`,
        opacity: isDragging && dragOffset > 50 ? Math.max(0.3, 1 - dragOffset / 200) : 1,
      }}
    >
      <Card
        ref={bannerRef}
        className={`border-2 shadow-lg cursor-grab active:cursor-grabbing ${
          audioPreparationFailed
            ? "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200"
            : "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200"
        }`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0 ${
                  audioPreparationFailed
                    ? "bg-gradient-to-r from-yellow-500 to-orange-600"
                    : "bg-gradient-to-r from-blue-500 to-purple-600"
                }`}
              >
                {getStatusIcon()}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{greetingText}</p>
                {getStatusText() && (
                  <p className={`text-xs mt-1 ${audioPreparationFailed ? "text-yellow-600" : "text-blue-600"}`}>
                    {getStatusText()}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={isPlaying ? stopGreeting : playGreeting}
                className="h-8 w-8 p-0 hover:bg-blue-100"
                disabled={isDragging || !isAudioReady}
              >
                {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={hideGreeting}
                className="h-8 w-8 p-0 hover:bg-red-100 text-gray-500 hover:text-red-600"
                disabled={isDragging}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Swipe indicator */}
          {isDragging && dragOffset > 20 && (
            <div className="mt-2 text-xs text-gray-500 text-center">
              {dragOffset > 80 ? "Release to dismiss" : "Swipe right to dismiss"}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
