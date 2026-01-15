"use client"

import { useEffect, useRef } from "react"
import { Wallet, MessageCircle, Sparkles, Heart } from "lucide-react"

const steps = [
  { icon: Wallet, label: "Link your wallet", color: "primary" },
  { icon: MessageCircle, label: "Start chatting", color: "secondary" },
  { icon: Sparkles, label: "Describe your waifu", color: "accent" },
  { icon: Heart, label: "Download and share", color: "primary" },
]

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = sectionRef.current?.querySelectorAll(".reveal")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden bg-muted/50">
      <div className="absolute inset-0 dots-pattern opacity-30" />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <div className="text-center mb-16 reveal opacity-0">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Simple to <span className="text-primary">start</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="reveal opacity-0 animation-delay-100 grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {steps.map((step, i) => {
            const iconColors = {
              primary: "text-primary bg-primary/10",
              secondary: "text-secondary bg-secondary/10",
              accent: "text-accent bg-accent/10",
            }
            return (
              <div key={i} className="text-center">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${iconColors[step.color as keyof typeof iconColors]}`}
                >
                  <step.icon className="w-8 h-8" />
                </div>
                <p className="font-medium text-foreground">{step.label}</p>
              </div>
            )
          })}
        </div>

        <div className="reveal opacity-0 animation-delay-200 text-center space-y-2">
          <p className="text-foreground">No setup required. No tutorials to watch.</p>
          <p className="text-lg font-semibold text-primary">Connect and we're good to go.</p>
        </div>

        {/* Bottom badges */}
        <div className="reveal opacity-0 animation-delay-300 flex flex-wrap justify-center gap-4 mt-12">
          <div className="px-4 py-2 bg-card border-2 border-primary/30 rounded-full flex items-center gap-2">
            <Wallet className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground">Phantom / MetaMask</span>
          </div>
          <div className="px-4 py-2 bg-card border-2 border-secondary/30 rounded-full flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-secondary" />
            <span className="text-sm text-foreground">Chat with Yara</span>
          </div>
          <div className="px-4 py-2 bg-card border-2 border-accent/30 rounded-full flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm text-foreground">Generate waifus</span>
          </div>
        </div>
      </div>
    </section>
  )
}
