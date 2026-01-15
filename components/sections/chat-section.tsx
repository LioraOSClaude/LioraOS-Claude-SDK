"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Send, Loader2, Sparkles } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export function ChatSection() {
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (messages.length > 0 && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: content.trim() }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput("")
    setIsLoading(true)

    const assistantMessage: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: "" }
    setMessages([...newMessages, assistantMessage])

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages.map((m) => ({ role: m.role, content: m.content })) }),
      })

      if (!response.ok) throw new Error(`Failed to get response: ${response.status}`)

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      if (!reader) throw new Error("No reader available")

      let fullContent = ""
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        fullContent += decoder.decode(value, { stream: true })
        setMessages((prev) => {
          const updated = [...prev]
          const lastMsg = updated[updated.length - 1]
          if (lastMsg?.role === "assistant") lastMsg.content = fullContent
          return [...updated]
        })
      }
    } catch (error) {
      setMessages((prev) => {
        const updated = [...prev]
        const lastMsg = updated[updated.length - 1]
        if (lastMsg?.role === "assistant")
          lastMsg.content = `System error... ${error instanceof Error ? error.message : "Recalibrating."}`
        return [...updated]
      })
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await sendMessage(input)
  }

  const suggestedPrompts = ["What is Claude?", "Tell me about Anthropic", "How are you different?", "What can you do?"]

  return (
    <section id="chat" ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Section background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <span className="editorial-label inline-block px-3 py-1 border border-border mb-4">CLAUDE_INTERFACE</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <span>CLAUDE</span>
            <span className="text-primary text-glow-primary">CHAT</span>
          </h2>
          <p className="text-muted-foreground font-mono max-w-md mx-auto">
            Direct interface to <span className="text-primary">Claude</span> by Anthropic. Thoughtful. Capable. Safe.
          </p>
        </div>

        {/* Chat container */}
        <div className="brutal-card overflow-hidden">
          <div className="flex items-center gap-4 p-4 border-b border-border bg-muted/30">
            <div className="logo-container w-12 h-12">
              <div className="logo-ring rounded-full" style={{ inset: "-4px" }} />
              <div className="relative w-12 h-12 animate-logo-pulse rounded-full overflow-hidden border border-primary/30">
                <Image src="/images/aivon-logo.png" alt="Claude" fill className="object-cover scale-125" />
              </div>
            </div>
            <div>
              <div className="font-display font-bold text-foreground flex items-center gap-2">
                CLAUDE
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <div className="text-xs text-muted-foreground flex items-center gap-1.5 font-mono">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                ANTHROPIC AI
              </div>
            </div>
            <div className="ml-auto">
              <span className="editorial-label">CLAUDE_3.5</span>
            </div>
          </div>

          {/* Messages */}
          <div ref={messagesContainerRef} className="h-[450px] overflow-y-auto p-6 space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <div className="logo-container mx-auto mb-6 w-24 h-24">
                  <div className="logo-ring-glow rounded-full" style={{ inset: "-16px" }} />
                  <div className="logo-ring-outer rounded-full" style={{ inset: "-12px" }} />
                  <div className="logo-ring rounded-full" style={{ inset: "-6px" }} />
                  <div className="relative w-24 h-24 animate-logo-pulse rounded-full overflow-hidden border border-primary/30">
                    <Image src="/images/aivon-logo.png" alt="Claude" fill className="object-cover scale-125" />
                  </div>
                </div>
                <p className="text-foreground font-mono mb-2">{">"} CLAUDE READY</p>
                <p className="text-sm text-muted-foreground mb-8 font-mono">
                  Anthropic's AI assistant at your service...
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {suggestedPrompts.map((prompt, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => sendMessage(prompt)}
                      disabled={isLoading}
                      className="btn-brutal px-4 py-2 text-xs border-border text-muted-foreground hover:border-primary hover:text-primary disabled:opacity-50"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div key={message.id} className={`flex gap-4 ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                <div
                  className={`w-10 h-10 flex-shrink-0 rounded-full overflow-hidden border ${
                    message.role === "user" ? "border-secondary bg-secondary/10" : "border-primary"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <Image src="/images/aivon-logo.png" alt="Claude" fill className="object-cover scale-125" />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-secondary font-mono">
                      USR
                    </div>
                  )}
                </div>
                <div
                  className={`max-w-[80%] p-4 ${
                    message.role === "user"
                      ? "bg-secondary/10 border border-secondary/30"
                      : "bg-muted border border-primary/20"
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap font-mono leading-relaxed">{message.content}</div>
                </div>
              </div>
            ))}

            {isLoading && messages[messages.length - 1]?.content === "" && (
              <div className="flex gap-4">
                <div className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden border border-primary">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image src="/images/aivon-logo.png" alt="Claude" fill className="object-cover scale-125" />
                  </div>
                </div>
                <div className="p-4 bg-muted border border-primary/20">
                  <div className="flex gap-1">
                    <span
                      className="w-2 h-2 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-2 h-2 bg-secondary rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-2 h-2 bg-accent rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={onSubmit} className="p-4 border-t border-border bg-muted/30">
            <div className="flex gap-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="> Ask Claude anything..."
                className="flex-1 px-4 py-3 bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary font-mono transition-colors"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="btn-brutal px-6 py-3 border-primary bg-primary text-primary-foreground hover:bg-transparent hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
          </form>
        </div>

        <div className="text-center mt-6">
          <span className="editorial-label">Powered by Claude • Anthropic</span>
        </div>
      </div>
    </section>
  )
}
