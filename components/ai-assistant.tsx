"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useChat } from "@ai-sdk/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, X, Send, Bot, User, History, Plus, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import ChatHistoryManager from "./chat-history-manager"
import MarkdownRenderer from "./markdown-renderer"
import VoiceInput from "./voice-input"
import ThinkingIndicator from "./thinking-indicator"

// Simple hash function for localStorage keys
function simpleHash(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36)
}

// Generate session ID based on timestamp
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: number
  thinking?: string
}

interface ChatSession {
  id: string
  messages: ChatMessage[]
  createdAt: number
  updatedAt: number
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [sessionId, setSessionId] = useState<string>("")
  const [isTyping, setIsTyping] = useState(false)
  const [currentThinking, setCurrentThinking] = useState<string>("")
  const [isThinkingComplete, setIsThinkingComplete] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, input, handleInputChange, handleSubmit, setMessages, isLoading, setInput } = useChat({
    api: "/api/chat",
    onFinish: () => {
      setIsTyping(false)
      setCurrentThinking("")
      setIsThinkingComplete(false)
    },
  })

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping, currentThinking])

  // Monitor messages for thinking content
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1]

      // Check if the last message has parts (reasoning)
      if (lastMessage?.parts && Array.isArray(lastMessage.parts)) {
        const reasoningPart = lastMessage.parts.find((part: any) => part.type === "" && part.reasoning)

        if (reasoningPart && reasoningPart.reasoning) {
          setCurrentThinking(reasoningPart.reasoning)
          setIsThinkingComplete(false)

          // If the message also has content, mark thinking as complete
          if (lastMessage.content && lastMessage.content.trim()) {
            setTimeout(() => {
              setIsThinkingComplete(true)
              // Auto-collapse thinking after 3 seconds when complete
              setTimeout(() => {
                setCurrentThinking("")
                setIsThinkingComplete(false)
              }, 3000)
            }, 500)
          }
        }
      }

      // If we have thinking but the message now has content, mark as complete
      if (currentThinking && lastMessage?.content && lastMessage.content.trim() && !isThinkingComplete) {
        setIsThinkingComplete(true)
        // Auto-collapse thinking after 3 seconds when complete
        setTimeout(() => {
          setCurrentThinking("")
          setIsThinkingComplete(false)
        }, 3000)
      }
    }
  }, [messages, currentThinking, isThinkingComplete])

  // Set typing state when loading
  useEffect(() => {
    setIsTyping(isLoading)
    if (!isLoading) {
      setCurrentThinking("")
      setIsThinkingComplete(false)
    }
  }, [isLoading])

  // Initialize session and load chat history
  useEffect(() => {
    const currentSessionId = generateSessionId()
    setSessionId(currentSessionId)
    loadChatHistory(currentSessionId)
  }, [])

  // Save chat history whenever messages change
  useEffect(() => {
    if (sessionId && messages.length > 0) {
      saveChatHistory(sessionId, messages)
    }
  }, [messages, sessionId])

  const saveChatHistory = (sessionId: string, messages: any[]) => {
    try {
      const hashedKey = `chat_${simpleHash(sessionId)}`
      const chatSession: ChatSession = {
        id: sessionId,
        messages: messages.map((msg) => ({
          id: msg.id,
          role: msg.role,
          content: msg.content,
          timestamp: Date.now(),
          thinking: msg.parts?.find((part: any) => part.type === "" && part.reasoning)?.reasoning || undefined,
        })),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }

      localStorage.setItem(hashedKey, JSON.stringify(chatSession))

      // Also maintain a list of all chat sessions
      const sessionsKey = "chat_sessions_index"
      const existingSessions = JSON.parse(localStorage.getItem(sessionsKey) || "[]")
      const sessionExists = existingSessions.some((s: any) => s.id === sessionId)

      if (!sessionExists) {
        existingSessions.push({
          id: sessionId,
          hashedKey,
          createdAt: Date.now(),
        })
        localStorage.setItem(sessionsKey, JSON.stringify(existingSessions))
      }
    } catch (error) {
      console.error("Failed to save chat history:", error)
    }
  }

  const loadChatHistory = (sessionId: string) => {
    try {
      const hashedKey = `chat_${simpleHash(sessionId)}`
      const savedSession = localStorage.getItem(hashedKey)

      if (savedSession) {
        const chatSession: ChatSession = JSON.parse(savedSession)
        setMessages(chatSession.messages)
      } else {
        setMessages([])
      }
    } catch (error) {
      console.error("Failed to load chat history:", error)
    }
  }

  const clearChatHistory = () => {
    setMessages([])
    setCurrentThinking("")
    setIsThinkingComplete(false)
    if (sessionId) {
      try {
        const hashedKey = `chat_${simpleHash(sessionId)}`
        localStorage.removeItem(hashedKey)
      } catch (error) {
        console.error("Failed to clear chat history:", error)
      }
    }
  }

  const startNewChat = () => {
    const newSessionId = generateSessionId()
    setSessionId(newSessionId)
    setMessages([])
    setCurrentThinking("")
    setIsThinkingComplete(false)
    setShowHistory(false)
  }

  const selectSession = (selectedSessionId: string) => {
    setSessionId(selectedSessionId)
    loadChatHistory(selectedSessionId)
    setCurrentThinking("")
    setIsThinkingComplete(false)
    setShowHistory(false)
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setShowHistory(false)
  }

  const customHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsTyping(true)
    setCurrentThinking("")
    setIsThinkingComplete(false)
    handleSubmit(e)
  }

  const handleVoiceTranscript = (transcript: string) => {
    setInput(transcript)
  }

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={toggleChat}
          size="lg"
          className="h-16 w-16 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-2 border-white/20"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <div className="relative">
              <MessageCircle className="h-6 w-6 text-white" />
              <Sparkles className="h-3 w-3 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
            </div>
          )}
        </Button>
      </div>

      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-[420px] max-w-[calc(100vw-3rem)] h-[600px]">
          {showHistory ? (
            <ChatHistoryManager
              onSelectSession={selectSession}
              onClose={() => setShowHistory(false)}
              currentSessionId={sessionId}
            />
          ) : (
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-xl h-full flex flex-col">
              <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg flex-shrink-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      AI Assistant
                    </span>
                  </CardTitle>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowHistory(true)}
                      className="h-8 w-8 p-0 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
                      title="Chat History"
                    >
                      <History className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={startNewChat}
                      className="h-8 w-8 p-0 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-full transition-all"
                      title="New Chat"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearChatHistory}
                      className="h-8 w-8 p-0 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                      title="Clear Chat"
                    >
                      <span className="text-xs">Clear</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleChat}
                      className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0 flex-1 flex flex-col min-h-0">
                {/* Messages Area */}
                <ScrollArea className="flex-1 px-4" ref={scrollAreaRef}>
                  <div className="space-y-4 py-4">
                    {messages.length === 0 ? (
                      <div className="text-center text-gray-500 py-12">
                        <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center mx-auto mb-4">
                          <Bot className="h-8 w-8 text-blue-600" />
                        </div>
                        <p className="text-sm font-medium mb-2">Welcome to AI Assistant!</p>
                        <p className="text-xs text-gray-400">Start a conversation and I'll help you with anything.</p>
                      </div>
                    ) : (
                      messages.map((message) => (
                        <div
                          key={message.id}
                          className={cn(
                            "flex gap-3 animate-in slide-in-from-bottom-2 duration-300",
                            message.role === "user" ? "ml-auto flex-row-reverse max-w-[85%]" : "mr-auto max-w-[90%]",
                          )}
                        >
                          {/* Avatar */}
                          <div className="flex-shrink-0">
                            {message.role === "assistant" ? (
                              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                                <Bot className="h-4 w-4 text-white" />
                              </div>
                            ) : (
                              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-gray-400 to-gray-500 flex items-center justify-center shadow-lg">
                                <User className="h-4 w-4 text-white" />
                              </div>
                            )}
                          </div>

                          {/* Message Bubble */}
                          <div
                            className={cn(
                              "rounded-2xl px-4 py-3 text-sm shadow-lg transition-all duration-200 hover:shadow-xl max-w-full overflow-hidden",
                              message.role === "user"
                                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md"
                                : "bg-white border border-gray-200 text-gray-900 rounded-bl-md",
                            )}
                          >
                            {message.role === "assistant" ? (
                              <div className="overflow-hidden">
                                {/* Show thinking for saved messages */}
                                {message.thinking && (
                                  <ThinkingIndicator thinking={message.thinking} isComplete={true} />
                                )}
                                <MarkdownRenderer content={message.content} />
                              </div>
                            ) : (
                              <div className="whitespace-pre-wrap break-words">{message.content}</div>
                            )}
                          </div>
                        </div>
                      ))
                    )}

                    {/* Current Thinking Indicator */}
                    {currentThinking && (
                      <div className="flex gap-3 max-w-[90%] mr-auto animate-in slide-in-from-bottom-2 duration-300">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                            <Bot className="h-4 w-4 text-white" />
                          </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-lg max-w-full overflow-hidden">
                          <ThinkingIndicator thinking={currentThinking} isComplete={isThinkingComplete} />
                        </div>
                      </div>
                    )}

                    {/* Typing Indicator */}
                    {isTyping && !currentThinking && (
                      <div className="flex gap-3 max-w-[85%] mr-auto animate-in slide-in-from-bottom-2 duration-300">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                            <Bot className="h-4 w-4 text-white" />
                          </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-lg">
                          <div className="flex items-center space-x-1">
                            <div className="flex space-x-1">
                              <div
                                className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0ms" }}
                              ></div>
                              <div
                                className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                                style={{ animationDelay: "150ms" }}
                              ></div>
                              <div
                                className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                                style={{ animationDelay: "300ms" }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500 ml-2">AI is thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="border-t border-gray-100 p-4 bg-gray-50/50 flex-shrink-0">
                  <form onSubmit={customHandleSubmit} className="flex gap-3">
                    <Input
                      name="prompt"
                      value={input}
                      onChange={handleInputChange}
                      placeholder="Type your message..."
                      className="flex-1 border-gray-200 focus:border-blue-400 focus:ring-blue-400 rounded-xl bg-white shadow-sm"
                      autoComplete="off"
                      disabled={isTyping}
                    />
                    <VoiceInput onTranscript={handleVoiceTranscript} disabled={isTyping} />
                    <Button
                      type="submit"
                      size="sm"
                      disabled={!input.trim() || isTyping}
                      className="h-10 w-10 p-0 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </>
  )
}
