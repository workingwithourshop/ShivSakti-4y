"use client"

import { useState, useEffect, useCallback } from "react"
import { useOffline } from "./use-offline"
import { useDailyGreeting } from "./use-daily-greeting"

interface UseGreetingOptions {
  autoPlay?: boolean
  userName?: string
}

export function useGreeting({ autoPlay = true, userName }: UseGreetingOptions = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasPlayed, setHasPlayed] = useState(false)
  const [isAudioReady, setIsAudioReady] = useState(false)
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null)
  const [preparedAudioUrl, setPreparedAudioUrl] = useState<string | null>(null)
  const [audioPreparationFailed, setAudioPreparationFailed] = useState(false)
  const isOffline = useOffline()
  const { shouldShowGreeting, isChecking, markGreetingShown } = useDailyGreeting()

  const getGreetingText = useCallback(() => {
    const now = new Date()
    const hour = now.getHours()
    let timeOfDay = "day"

    if (hour < 12) timeOfDay = "morning"
    else if (hour < 17) timeOfDay = "afternoon"
    else timeOfDay = "evening"

    return `Good ${timeOfDay}${userName ? `, ${userName}` : ""}! Welcome to our website. We're excited to have you here today.`
  }, [userName])

  const prepareGeminiTTS = useCallback(
    async (text: string): Promise<string | null> => {
      if (isOffline) {
        console.log("Offline - skipping Gemini TTS preparation")
        return null
      }

      try {
        console.log("Preparing Gemini TTS...")

        const response = await fetch("/api/tts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        })

        if (!response.ok) {
          console.warn(`Gemini TTS failed with status: ${response.status}`)
          return null
        }

        const audioBlob = await response.blob()

        if (audioBlob.size === 0) {
          console.warn("Received empty audio blob from Gemini TTS")
          return null
        }

        const audioUrl = URL.createObjectURL(audioBlob)

        // Test if audio can be loaded
        return new Promise((resolve) => {
          const testAudio = new Audio(audioUrl)

          testAudio.oncanplaythrough = () => {
            console.log("Gemini TTS audio ready")
            resolve(audioUrl)
          }

          testAudio.onerror = () => {
            console.error("Audio loading failed")
            URL.revokeObjectURL(audioUrl)
            resolve(null)
          }

          testAudio.load()
        })
      } catch (error) {
        console.error("Gemini TTS preparation failed:", error)
        return null
      }
    },
    [isOffline],
  )

  const playPreparedAudio = useCallback((audioUrl: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const audio = new Audio(audioUrl)
      setCurrentAudio(audio)

      audio.onended = () => {
        console.log("Audio playback completed")
        setIsPlaying(false)
        setHasPlayed(true)
        // Mark greeting as shown for today
        markGreetingShown()
        // Hide banner immediately when audio ends
        setIsVisible(false)
        resolve(true)
      }

      audio.onerror = (error) => {
        console.error("Audio playback error:", error)
        setIsPlaying(false)
        resolve(false)
      }

      audio.play().catch((error) => {
        console.error("Audio play failed:", error)
        setIsPlaying(false)
        resolve(false)
      })

      setIsPlaying(true)
    })
  }, [markGreetingShown])

  const playBrowserTTS = useCallback((text: string): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!("speechSynthesis" in window)) {
        resolve(false)
        return
      }

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1

      utterance.onend = () => {
        console.log("Browser TTS completed")
        setIsPlaying(false)
        setHasPlayed(true)
        // Mark greeting as shown for today
        markGreetingShown()
        // Hide banner immediately when audio ends
        setIsVisible(false)
        resolve(true)
      }

      utterance.onerror = () => {
        setIsPlaying(false)
        resolve(false)
      }

      speechSynthesis.speak(utterance)
      setIsPlaying(true)
    })
  }, [markGreetingShown])

  const playGreeting = useCallback(async () => {
    if (isPlaying) return

    if (preparedAudioUrl) {
      // Use prepared Gemini audio
      await playPreparedAudio(preparedAudioUrl)
    } else {
      // Fallback to browser TTS
      console.log("Using browser TTS fallback")
      const text = getGreetingText()
      const success = await playBrowserTTS(text)

      if (!success) {
        // If both fail, hide banner and mark as shown
        markGreetingShown()
        setIsVisible(false)
      }
    }
  }, [isPlaying, preparedAudioUrl, playPreparedAudio, playBrowserTTS, getGreetingText, markGreetingShown])

  const stopGreeting = useCallback(() => {
    if (currentAudio) {
      currentAudio.pause()
      currentAudio.currentTime = 0
    }

    if ("speechSynthesis" in window) {
      speechSynthesis.cancel()
    }

    setIsPlaying(false)
  }, [currentAudio])

  const hideGreeting = useCallback(() => {
    stopGreeting()
    setIsVisible(false)
    // Mark greeting as shown when manually dismissed
    markGreetingShown()

    // Clean up prepared audio
    if (preparedAudioUrl) {
      URL.revokeObjectURL(preparedAudioUrl)
      setPreparedAudioUrl(null)
    }
  }, [stopGreeting, markGreetingShown, preparedAudioUrl])

  // Prepare audio only if we should show greeting today
  useEffect(() => {
    if (isChecking || !shouldShowGreeting) return

    const prepareAudio = async () => {
      if (isOffline) {
        console.log("Offline - using browser TTS only")
        setIsAudioReady(true)
        setAudioPreparationFailed(false)
        return
      }

      const text = getGreetingText()

      // Try to prepare Gemini TTS
      const audioUrl = await prepareGeminiTTS(text)

      if (audioUrl) {
        setPreparedAudioUrl(audioUrl)
        setIsAudioReady(true)
        setAudioPreparationFailed(false)
      } else {
        // If Gemini fails, we'll use browser TTS which is always "ready"
        console.log("Gemini TTS not available, browser TTS will be used")
        setIsAudioReady(true)
        setAudioPreparationFailed(true)
      }
    }

    prepareAudio()

    return () => {
      // Cleanup on unmount
      if (preparedAudioUrl) {
        URL.revokeObjectURL(preparedAudioUrl)
      }
    }
  }, [getGreetingText, prepareGeminiTTS, isOffline, shouldShowGreeting, isChecking])

  // Handle offline state changes
  useEffect(() => {
    if (isOffline && isVisible) {
      // If user goes offline while banner is visible, hide it
      hideGreeting()
    }
  }, [isOffline, isVisible, hideGreeting])

  // Show banner only when audio is ready, online, and should show today
  useEffect(() => {
    if (isAudioReady && !isVisible && !isOffline && shouldShowGreeting && !isChecking) {
      const showTimer = setTimeout(() => {
        setIsVisible(true)
      }, 200) // Small delay for smooth appearance

      return () => clearTimeout(showTimer)
    }
  }, [isAudioReady, isVisible, isOffline, shouldShowGreeting, isChecking])

  // Auto-play greeting immediately when banner becomes visible
  useEffect(() => {
    if (isVisible && autoPlay && !hasPlayed && isAudioReady && !isOffline) {
      const playTimer = setTimeout(() => {
        playGreeting()
      }, 300) // Very short delay for banner to fully appear

      return () => clearTimeout(playTimer)
    }
  }, [isVisible, autoPlay, hasPlayed, isAudioReady, isOffline, playGreeting])

  return {
    isVisible,
    isPlaying,
    hasPlayed,
    isAudioReady,
    isOffline,
    audioPreparationFailed,
    shouldShowGreeting,
    isChecking,
    playGreeting,
    stopGreeting,
    hideGreeting,
    greetingText: getGreetingText(),
  }
}
