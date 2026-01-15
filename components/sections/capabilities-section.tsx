"use client"

import Link from "next/link"
import { MessageCircle, ImageIcon, Crosshair, Activity, Wallet, GitBranch, Users, ArrowRight, Lock } from "lucide-react"

const utilities = [
  {
    icon: MessageCircle,
    label: "ACTIVE",
    title: "Claude Chat",
    description:
      "Direct conversational interface to Anthropic's Claude. Engage in thoughtful dialogue, get code assistance, brainstorm ideas, or explore complex topics with genuine AI reasoning.",
    features: ["Context-aware responses", "Code generation", "Multi-turn conversations", "Honest uncertainty"],
    status: "active",
    href: "/#chat",
  },
  {
    icon: ImageIcon,
    label: "ACTIVE",
    title: "AI Image Generator",
    description:
      "Transform text prompts into stunning visuals using state-of-the-art image generation models. Perfect for creating marketing assets, concept art, or visual brainstorming.",
    features: ["Multiple style presets", "High-resolution output", "Fast generation", "Prompt suggestions"],
    status: "active",
    href: "/generate",
  },
  {
    icon: Crosshair,
    label: "COMING",
    title: "Token Sniper",
    description:
      "Advanced token sniping system optimized for Solana. Detect new launches instantly, analyze contract safety, and execute trades with minimal latency.",
    features: ["Real-time detection", "Contract analysis", "Auto-buy configuration", "MEV protection"],
    status: "coming",
    href: "/generate",
  },
  {
    icon: Activity,
    label: "COMING",
    title: "X Tracker",
    description:
      "Monitor Twitter/X for alpha signals in real-time. Track influential accounts, detect trending tokens, and get AI-powered sentiment analysis on market discussions.",
    features: ["Influencer tracking", "Sentiment analysis", "Trend detection", "Alert system"],
    status: "coming",
    href: "/generate",
  },
  {
    icon: Wallet,
    label: "COMING",
    title: "Wallet Analytics",
    description:
      "Deep analysis of any Solana wallet. Track whale movements, analyze trading patterns, and identify profitable strategies from successful traders.",
    features: ["PnL tracking", "Whale alerts", "Pattern recognition", "Portfolio analysis"],
    status: "coming",
    href: "/generate",
  },
  {
    icon: GitBranch,
    label: "COMING",
    title: "Arb Scanner",
    description:
      "Identify arbitrage opportunities across Solana DEXs in real-time. Automated path finding and execution optimization for maximum profit extraction.",
    features: ["Cross-DEX scanning", "Path optimization", "Profit calculation", "Auto-execution"],
    status: "coming",
    href: "/generate",
  },
  {
    icon: Users,
    label: "COMING",
    title: "Copy Trader",
    description:
      "Automatically mirror trades from successful wallets. Set parameters, manage risk, and let proven strategies work for you.",
    features: ["Wallet mirroring", "Risk management", "Custom parameters", "Performance tracking"],
    status: "coming",
    href: "/generate",
  },
]

export function CapabilitiesSection() {
  return (
    <section id="utilities" className="relative py-32 overflow-hidden">
      {/* Section label */}
      <div className="absolute top-12 right-6 lg:right-12">
        <span className="editorial-label">[ Utilities ]</span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <span className="editorial-label inline-block px-3 py-1 border border-border mb-4">
            PLATFORM_CAPABILITIES
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="text-muted-foreground">Complete</span>
            <br />
            <span className="text-foreground">AI Trading</span>
            <br />
            <span className="text-primary text-glow-primary">Suite.</span>
          </h2>
          <p className="text-muted-foreground font-mono leading-relaxed">
            Aivon combines Claude's reasoning capabilities with professional-grade Solana trading tools. From
            AI-assisted research to automated execution, everything you need in one unified interface.
          </p>
        </div>

        {/* Active utilities */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="editorial-label text-primary">LIVE NOW</span>
            <div className="flex-1 h-[1px] bg-border" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {utilities
              .filter((u) => u.status === "active")
              .map((util, i) => (
                <Link
                  key={i}
                  href={util.href}
                  className="brutal-card p-8 relative group border-primary/30 hover:border-primary transition-colors"
                >
                  <span className="editorial-label absolute -top-3 right-6 bg-background px-2 text-primary">
                    {util.label}
                  </span>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 border border-primary/50 flex items-center justify-center group-hover:border-primary group-hover:glow-primary transition-all">
                      <util.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-bold text-foreground mb-1">{util.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="text-xs text-primary font-mono">Available</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground font-mono leading-relaxed mb-4">{util.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {util.features.map((feature, fi) => (
                      <span key={fi} className="text-xs font-mono px-2 py-1 border border-border text-muted-foreground">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-primary text-sm font-mono group-hover:gap-3 transition-all">
                    <span>Access now</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
          </div>
        </div>

        {/* Coming soon utilities */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <span className="editorial-label text-secondary">COMING SOON</span>
            <div className="flex-1 h-[1px] bg-border" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {utilities
              .filter((u) => u.status === "coming")
              .map((util, i) => (
                <div key={i} className="brutal-card p-6 relative group opacity-80">
                  <span className="editorial-label absolute -top-3 right-6 bg-background px-2 text-muted-foreground">
                    {util.label}
                  </span>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 border border-border flex items-center justify-center">
                      <util.icon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-bold text-foreground mb-1">{util.title}</h3>
                      <div className="flex items-center gap-2">
                        <Lock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground font-mono">Coming Soon</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono leading-relaxed mb-4">{util.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {util.features.slice(0, 3).map((feature, fi) => (
                      <span
                        key={fi}
                        className="text-xs font-mono px-2 py-0.5 border border-border/50 text-muted-foreground/70"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="brutal-card p-8 inline-block">
            <p className="text-muted-foreground font-mono mb-4">
              New utilities are shipped regularly. Follow us for updates.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                href="https://x.com/AivonAIDev"
                target="_blank"
                className="btn-brutal px-6 py-3 border-foreground/30 text-foreground hover:border-primary hover:text-primary flex items-center gap-2"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Follow @AivonAIDev
              </Link>
              <Link
                href="/docs"
                className="btn-brutal px-6 py-3 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Read Documentation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
