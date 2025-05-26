"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ThinkingIndicatorProps {
  thinking: string
  isComplete: boolean
}

export default function ThinkingIndicator({ thinking, isComplete }: ThinkingIndicatorProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  if (!thinking) return null

  return (
    <div className="my-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "w-full justify-between text-xs p-2 h-auto rounded-lg transition-all duration-200",
          isComplete
            ? "bg-gray-50 hover:bg-gray-100 text-gray-600"
            : "bg-blue-50 hover:bg-blue-100 text-blue-700 animate-pulse",
        )}
      >
        <div className="flex items-center gap-2">
          <Brain className={cn("h-3 w-3", isComplete ? "text-gray-500" : "text-blue-600")} />
          <span className="font-medium">{isComplete ? "AI Thinking (Complete)" : "AI Thinking..."}</span>
        </div>
        {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
      </Button>

      {isExpanded && (
        <div
          className={cn(
            "mt-2 p-3 rounded-lg text-xs leading-relaxed transition-all duration-200",
            isComplete
              ? "bg-gray-50 border border-gray-200 text-gray-700"
              : "bg-blue-50 border border-blue-200 text-blue-800",
          )}
        >
          <div className="whitespace-pre-wrap font-mono">{thinking}</div>
        </div>
      )}
    </div>
  )
}
