"use client"

import { useEffect, useRef, useState } from "react"
import { Pencil, Layers, Zap, Palette, BookOpen, Heart } from "lucide-react"

const howItWorks = [
  {
    icon: Pencil,
    name: "Write Your Scene",
    desc: "Describe what happens - a hero on a rooftop, a chase through the city, anything!",
    status: "Step 1",
  },
  {
    icon: Layers,
    name: "4 Panels Created",
    desc: "Claude turns your scene into a 4-panel story with beginning, middle, and end",
    status: "Step 2",
  },
  {
    icon: Palette,
    name: "Manga Style Applied",
    desc: "Clean lineart, dramatic shading, and that classic 90s anime look",
    status: "Step 3",
  },
  { icon: Zap, name: "Ready in Seconds", desc: "Download your comic and share it with the world!", status: "Step 4" },
  {
    icon: Heart,
    name: "Keep Creating",
    desc: "Make as many comics as you want - your imagination is the only limit",
    status: "Repeat",
  },
  {
    icon: BookOpen,
    name: "Build Your Story",
    desc: "Connect multiple comics to create longer narratives and series",
    status: "Bonus",
  },
]

const codeSnippets = [
  `// Your idea becomes art
scene: "A detective stands in 
the rain, cigarette glowing, 
neon signs reflected in puddles"

// Claude creates 4 panels:
// 1. Wide shot of rainy city
// 2. Detective lights cigarette  
// 3. Close-up, eyes determined
// 4. Walks into the night...`,
  `// Action sequence? Easy.
scene: "Samurai vs robot ninja 
in a cherry blossom garden, 
swords clashing at sunset"

// You get:
// 1. Opponents face off
// 2. Blades meet, sparks fly
// 3. Decisive strike!
// 4. Victor stands alone`,
  `// Comedy works too!
scene: "Cat tries to catch fish 
from a tank, knocks everything 
over, looks guilty"

// Panels tell the story:
// 1. Cat spots the fish
// 2. Sneaky approach...
// 3. CHAOS! Everything falls
// 4. "It wasn't me" face`,
  `// Romance? Got you covered.
scene: "Two people share an 
umbrella in autumn, leaves 
falling around them"

// A sweet 4-panel story:
// 1. Rain starts suddenly
// 2. "Share my umbrella?"
// 3. Walking close together
// 4. Shy smiles, hearts flutter`,
]

export function TechSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [currentSnippet, setCurrentSnippet] = useState(0)
  const [displayedCode, setDisplayedCode] = useState("")

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

  // Auto-typing code effect
  useEffect(() => {
    const code = codeSnippets[currentSnippet]
    let index = 0
    setDisplayedCode("")

    const typeInterval = setInterval(() => {
      if (index < code.length) {
        setDisplayedCode(code.slice(0, index + 1))
        index++
      } else {
        clearInterval(typeInterval)
        setTimeout(() => {
          setCurrentSnippet((prev) => (prev + 1) % codeSnippets.length)
        }, 3000)
      }
    }, 25)

    return () => clearInterval(typeInterval)
  }, [currentSnippet])

  return (
    <section id="tech" ref={sectionRef} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 synthwave-grid opacity-30" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center mb-16 reveal opacity-0">
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-primary pixel-text mb-4">[HOW_IT_WORKS]</h2>
          <p className="font-mono text-muted-foreground max-w-2xl mx-auto">
            From idea to comic in just a few simple steps
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* How it works steps */}
          <div className="space-y-4 reveal opacity-0">
            {howItWorks.map((step, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 bg-card/50 border-2 border-primary/20 rounded-lg hover:border-primary/50 transition-all"
              >
                <step.icon className="w-8 h-8 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-mono text-sm font-bold text-foreground">{step.name}</h3>
                    <span className="font-mono text-[10px] px-2 py-1 bg-accent/20 text-accent rounded">
                      {step.status}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-muted-foreground mt-1">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Live examples runner */}
          <div className="reveal opacity-0 animation-delay-300">
            <div className="bg-card border-2 border-primary/30 rounded-lg overflow-hidden">
              <div className="flex items-center gap-2 p-3 border-b border-primary/20 bg-muted/30">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 bg-secondary rounded-full" />
                  <span className="w-3 h-3 bg-primary rounded-full" />
                  <span className="w-3 h-3 bg-accent rounded-full" />
                </div>
                <span className="font-mono text-xs text-muted-foreground ml-2">example-scenes.txt</span>
                <span className="ml-auto font-mono text-[10px] text-accent animate-pulse">TYPING...</span>
              </div>
              <div className="p-4 h-[300px] overflow-hidden bg-background/50">
                <pre className="font-mono text-sm text-foreground whitespace-pre-wrap">
                  <code>
                    {displayedCode}
                    <span className="animate-blink text-primary">|</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
