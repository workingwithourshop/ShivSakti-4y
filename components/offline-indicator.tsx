"use client"

import { Card, CardContent } from "@/components/ui/card"
import { WifiOff } from "lucide-react"
import { useOffline } from "@/hooks/use-offline"

export default function OfflineIndicator() {
  const isOffline = useOffline()

  if (!isOffline) return null

  return (
    <div className="fixed top-4 left-4 right-4 z-40">
      <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300 shadow-lg">
        <CardContent className="p-3">
          <div className="flex items-center justify-center space-x-2">
            <WifiOff className="w-5 h-5 text-gray-600" />
            <p className="text-sm font-medium text-gray-700">
              You're offline. Greeting features are temporarily unavailable.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
