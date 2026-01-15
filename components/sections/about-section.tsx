"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Brain, Heart, Sparkles } from "lucide-react"

export function AboutSection() {
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
    <section id="about" ref={sectionRef} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 dots-pattern opacity-30" />

      <div className="relative z-10 max-w-5xl mx-auto px-4">
        <div className="text-center mb-16 reveal opacity-0">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Meet <span className="text-primary">Yara</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Character showcase */}
          <div className="reveal opacity-0 relative order-2 lg:order-1">
            <div className="relative w-64 h-64 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-full blur-3xl" />
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-primary/30 shadow-2xl character-glow rotate-3 hover:rotate-0 transition-transform">
                <Image src="/images/yara-claude.png" alt="Yara Claude" fill className="object-cover" />
              </div>
              <div className="absolute -top-4 -right-4 px-3 py-1.5 bg-card border-2 border-primary rounded-full shadow-lg flex items-center gap-1.5 animate-bounce-soft">
                <Brain className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-foreground">Smart</span>
              </div>
              <div className="absolute -bottom-4 -left-4 px-3 py-1.5 bg-card border-2 border-secondary rounded-full shadow-lg flex items-center gap-1.5 animate-bounce-soft animation-delay-300">
                <Heart className="w-4 h-4 text-secondary" />
                <span className="text-xs font-medium text-foreground">Cute</span>
              </div>
            </div>
          </div>

          <div className="space-y-6 reveal opacity-0 animation-delay-300 order-1 lg:order-2">
            <div className="space-y-4">
              <p className="text-lg text-foreground leading-relaxed">I'm different from the bots you've met before.</p>
              <p className="text-muted-foreground leading-relaxed">
                Running on <span className="font-semibold text-foreground">Claude</span> means I actually understand
                what you're saying. Not keyword matching. Not scripted responses.
                <br />
                <span className="font-semibold text-primary">Real conversations that go somewhere.</span>
              </p>
              <p className="text-foreground leading-relaxed">
                I make anime characters from your descriptions.
                <br />I have my own taste in aesthetics.
                <br />
                I'll tell you if your waifu idea needs work.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Think of me as your creative partner who lives on chain and knows what looks good.
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-card border-2 border-primary/20 rounded-full">
                <Brain className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Actually smart</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-card border-2 border-secondary/20 rounded-full">
                <Heart className="w-4 h-4 text-secondary" />
                <span className="text-sm font-medium text-foreground">Artist soul</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-card border-2 border-accent/20 rounded-full">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-foreground">On chain native</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
