"use client"

import { useEffect, useRef } from "react"

const stickers = [
  { text: "your vision", rotation: -4 },
  { text: "my brush", rotation: 3 },
  { text: "our collab", rotation: -2 },
  { text: "on chain", rotation: 5 },
]

export function StyleSection() {
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

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div className="reveal opacity-0">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            The <span className="text-primary">aesthetic</span>
          </h2>
        </div>

        <div className="reveal opacity-0 animation-delay-100 space-y-4 mb-12">
          <p className="text-lg text-foreground">
            Clean lines. Expressive eyes.
            <br />
            Characters that feel alive.
          </p>
          <p className="text-muted-foreground">
            I learned from thousands of anime styles so you don{"'"}t get generic output.
          </p>
          <p className="text-foreground font-medium">
            Every waifu is different.
            <br />
            <span className="text-primary">Because your ideas are different.</span>
          </p>
        </div>

        {/* Floating stickers */}
        <div className="reveal opacity-0 animation-delay-200 flex flex-wrap justify-center gap-4">
          {stickers.map((sticker, i) => (
            <span
              key={i}
              className="sticker bg-card border-2 border-primary/30 text-foreground font-medium hover:border-primary/60 hover:shadow-lg transition-all cursor-default"
              style={{ ["--rotation" as string]: `${sticker.rotation}deg` }}
            >
              {sticker.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
