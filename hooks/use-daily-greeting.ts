"use client"

import { useState, useEffect } from "react"

const GREETING_STORAGE_KEY = "daily-greeting-shown"

export function useDailyGreeting() {
  const [shouldShowGreeting, setShouldShowGreeting] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkDailyGreeting = () => {
      try {
        const lastShownDate = localStorage.getItem(GREETING_STORAGE_KEY)
        const today = new Date().toDateString()

        if (!lastShownDate || lastShownDate !== today) {
          // Haven't shown greeting today
          setShouldShowGreeting(true)
        } else {
          // Already shown today
          setShouldShowGreeting(false)
        }
      } catch (error) {
        console.error("Error checking daily greeting:", error)
        // If localStorage fails, show greeting as fallback
        setShouldShowGreeting(true)
      }

      setIsChecking(false)
    }

    checkDailyGreeting()
  }, [])

  const markGreetingShown = () => {
    try {
      const today = new Date().toDateString()
      localStorage.setItem(GREETING_STORAGE_KEY, today)
      setShouldShowGreeting(false)
    } catch (error) {
      console.error("Error saving daily greeting:", error)
    }
  }

  const resetDailyGreeting = () => {
    try {
      localStorage.removeItem(GREETING_STORAGE_KEY)
      setShouldShowGreeting(true)
    } catch (error) {
      console.error("Error resetting daily greeting:", error)
    }
  }

  return {
    shouldShowGreeting,
    isChecking,
    markGreetingShown,
    resetDailyGreeting,
  }
}
