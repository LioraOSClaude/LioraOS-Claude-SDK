"use client"

import Image from "next/image"
import { Brain, Shield, Zap, Globe } from "lucide-react"

export function ManifestoSection() {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Section label */}
      <div className="absolute top-12 left-6 lg:left-12">
        <span className="editorial-label">[ About Aivon ]</span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Main intro */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 mb-24">
          <div className="lg:col-span-5 lg:col-start-2">
            <div className="sticky top-32">
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
                <span className="text-foreground">Intelligence</span>
                <br />
                <span className="text-primary text-glow-primary">Redefined.</span>
              </h2>
              <div className="w-24 h-[1px] bg-primary mb-8" />
              <p className="text-muted-foreground font-mono leading-relaxed">
                Aivon AI represents a new paradigm in artificial intelligence interfaces. Built on the foundation of
                Anthropic's Claude, we deliver thoughtful, nuanced, and genuinely helpful AI interactions that
                understand context and intent.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 space-y-8">
            {/* Claude highlight card */}
            <div className="brutal-card p-8 relative group border-primary/50">
              <span className="editorial-label absolute -top-3 left-6 bg-background px-2 text-primary">CLAUDE</span>
              <div className="flex items-start gap-4 mb-4">
                <div className="logo-container w-16 h-16 flex-shrink-0">
                  <div className="logo-ring rounded-full" style={{ inset: "-4px" }} />
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border border-primary/30">
                    <Image src="/images/aivon-logo.png" alt="Claude" fill className="object-cover scale-125" />
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">Powered by Claude</h3>
                  <p className="text-sm text-muted-foreground font-mono">Anthropic's most advanced AI model</p>
                </div>
              </div>
              <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                Claude is designed to be helpful, harmless, and honest. Unlike other AI systems, Claude engages in
                genuine reasoning, admits uncertainty, and provides thoughtful responses that consider multiple
                perspectives. This is the intelligence that powers Aivon.
              </p>
            </div>

            {/* Philosophy card */}
            <div className="brutal-card p-8 relative group">
              <span className="editorial-label absolute -top-3 left-6 bg-background px-2">PHILOSOPHY</span>
              <p className="text-muted-foreground font-mono leading-relaxed mb-4">
                We believe AI should augment human capability, not replace human judgment. Every feature in Aivon is
                designed with this principle in mind — providing powerful tools while keeping you in control.
              </p>
              <p className="text-foreground font-mono text-sm">"AI that thinks with you, not for you."</p>
            </div>
          </div>
        </div>

        {/* Core values grid */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <span className="editorial-label inline-block px-3 py-1 border border-border mb-4">CORE_VALUES</span>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              What Makes <span className="text-primary">Aivon</span> Different
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Brain,
                title: "Deep Reasoning",
                description:
                  "Claude doesn't just pattern-match. It engages in genuine reasoning, considering context and nuance in every response.",
              },
              {
                icon: Shield,
                title: "Safety First",
                description:
                  "Built on Anthropic's Constitutional AI principles. Helpful and capable while maintaining ethical boundaries.",
              },
              {
                icon: Zap,
                title: "Solana Speed",
                description:
                  "Optimized for the Solana ecosystem. Fast, efficient, and built for the demands of on-chain trading.",
              },
              {
                icon: Globe,
                title: "Open Access",
                description:
                  "No gatekeeping. No enterprise tiers. Professional-grade AI tools accessible to everyone in crypto.",
              },
            ].map((item, i) => (
              <div key={i} className="brutal-card p-6 group">
                <div className="w-12 h-12 border border-primary/50 flex items-center justify-center mb-4 group-hover:border-primary group-hover:glow-primary transition-all">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-display text-lg font-bold text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground font-mono leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Anthropic section */}
        <div className="brutal-card p-8 md:p-12 relative">
          <span className="editorial-label absolute -top-3 left-6 bg-background px-2">ANTHROPIC</span>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Built on <span className="text-primary">Anthropic's</span> Foundation
              </h3>
              <p className="text-muted-foreground font-mono leading-relaxed mb-4">
                Anthropic is an AI safety company founded by former members of OpenAI. Their mission is to build AI
                systems that are safe, beneficial, and understandable. Claude, their flagship AI assistant, represents
                the state of the art in helpful, harmless, and honest AI.
              </p>
              <p className="text-muted-foreground font-mono leading-relaxed">
                By building on Claude, Aivon inherits these principles — delivering AI that you can actually trust. No
                hallucinations presented as facts. No harmful outputs. Just genuinely useful intelligence.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="logo-container w-48 h-48">
                <div className="logo-ring-glow rounded-full" style={{ inset: "-24px" }} />
                <div className="logo-ring-outer rounded-full" style={{ inset: "-16px" }} />
                <div className="logo-ring rounded-full" style={{ inset: "-8px" }} />
                <div className="relative w-48 h-48 animate-logo-pulse rounded-full overflow-hidden border-2 border-primary/30">
                  <Image src="/images/aivon-logo.png" alt="Aivon AI" fill className="object-cover scale-125" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background accent */}
      <div className="absolute top-1/2 left-0 w-[40vw] h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  )
}
