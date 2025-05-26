"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Trash2, MessageSquare, Calendar, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatSession {
  id: string
  hashedKey: string
  createdAt: number
  messageCount?: number
  lastMessage?: string
}

interface ChatHistoryManagerProps {
  onSelectSession: (sessionId: string) => void
  onClose: () => void
  currentSessionId: string
}

export default function ChatHistoryManager({ onSelectSession, onClose, currentSessionId }: ChatHistoryManagerProps) {
  const [sessions, setSessions] = useState<ChatSession[]>([])

  useEffect(() => {
    loadChatSessions()
  }, [])

  const loadChatSessions = () => {
    try {
      const sessionsKey = "chat_sessions_index"
      const existingSessions = JSON.parse(localStorage.getItem(sessionsKey) || "[]")

      // Enrich sessions with additional data
      const enrichedSessions = existingSessions.map((session: ChatSession) => {
        try {
          const chatData = localStorage.getItem(session.hashedKey)
          if (chatData) {
            const parsedData = JSON.parse(chatData)
            return {
              ...session,
              messageCount: parsedData.messages?.length || 0,
              lastMessage:
                parsedData.messages?.length > 0
                  ? parsedData.messages[parsedData.messages.length - 1].content.substring(0, 50) + "..."
                  : "No messages",
            }
          }
        } catch (error) {
          console.error("Error loading session data:", error)
        }
        return session
      })

      // Sort by creation date (newest first)
      enrichedSessions.sort((a, b) => b.createdAt - a.createdAt)
      setSessions(enrichedSessions)
    } catch (error) {
      console.error("Failed to load chat sessions:", error)
    }
  }

  const deleteSession = (sessionId: string, hashedKey: string) => {
    try {
      // Remove from localStorage
      localStorage.removeItem(hashedKey)

      // Update sessions index
      const sessionsKey = "chat_sessions_index"
      const existingSessions = JSON.parse(localStorage.getItem(sessionsKey) || "[]")
      const updatedSessions = existingSessions.filter((s: ChatSession) => s.id !== sessionId)
      localStorage.setItem(sessionsKey, JSON.stringify(updatedSessions))

      // Update local state
      setSessions((prev) => prev.filter((s) => s.id !== sessionId))
    } catch (error) {
      console.error("Failed to delete session:", error)
    }
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } else if (diffInHours < 24 * 7) {
      return date.toLocaleDateString([], { weekday: "short", hour: "2-digit", minute: "2-digit" })
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" })
    }
  }

  return (
    <Card className="shadow-2xl border-0 bg-white h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            Chat History
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-80">
          <div className="px-4 space-y-2">
            {sessions.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm">No chat history found</p>
              </div>
            ) : (
              sessions.map((session) => (
                <div
                  key={session.id}
                  className={cn(
                    "p-3 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors",
                    session.id === currentSessionId ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200",
                  )}
                  onClick={() => onSelectSession(session.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{formatDate(session.createdAt)}</span>
                        {session.messageCount && (
                          <Badge variant="secondary" className="text-xs">
                            {session.messageCount} messages
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 truncate">{session.lastMessage || "Empty conversation"}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteSession(session.id, session.hashedKey)
                      }}
                      className="h-8 w-8 p-0 text-gray-400 hover:text-red-500 ml-2"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
