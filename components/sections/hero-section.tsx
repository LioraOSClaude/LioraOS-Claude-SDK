"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Copy, Check, FileText, Sparkles } from "lucide-react"
import { useState } from "react"

export function HeroSection() {
  const [copied, setCopied] = useState(false)
  const CA_ADDRESS = "TBA"

  const handleCopy = () => {
    navigator.clipboard.writeText(CA_ADDRESS)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Floating labels - editorial style */}
      <div className="absolute top-32 left-8 lg:left-24 animate-float">
        <span className="editorial-label">SYS_01</span>
      </div>
      <div className="absolute top-48 right-12 lg:right-32 animate-float-reverse">
        <span className="editorial-label">POWERED BY CLAUDE</span>
      </div>
      <div className="absolute bottom-32 left-16 lg:left-48 animate-float">
        <span className="editorial-label">ANTHROPIC</span>
      </div>
      <div className="absolute bottom-48 right-8 lg:right-24 animate-float-reverse">
        <span className="editorial-label">SOLANA NATIVE</span>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center text-center">
          {/* Logo with rings */}
          <div className="logo-container w-48 h-48 md:w-64 md:h-64 mb-8">
            <div className="logo-ring-glow w-56 h-56 md:w-72 md:h-72 rounded-full" />
            <div
              className="logo-ring-outer w-52 h-52 md:w-68 md:h-68 rounded-full"
              style={{ width: "13rem", height: "13rem" }}
            />
            <div className="logo-ring w-48 h-48 md:w-64 md:h-64 rounded-full" />
            <div
              className="logo-ring-inner w-44 h-44 md:w-60 md:h-60 rounded-full"
              style={{ width: "11rem", height: "11rem" }}
            />
            <div className="relative w-36 h-36 md:w-48 md:h-48 animate-logo-pulse rounded-full overflow-hidden border-2 border-primary/30">
              <Image src="/images/aivon-logo.png" alt="Aivon AI" fill className="object-cover scale-125" priority />
            </div>
          </div>

          <div className="mb-6">
            <button
              onClick={handleCopy}
              className="group flex items-center gap-3 px-4 py-2 bg-background/50 border border-border hover:border-primary rounded-full transition-all duration-300"
            >
              <span className="text-xs font-mono text-muted-foreground">CA:</span>
              <span className="text-sm font-mono text-foreground">{CA_ADDRESS}</span>
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              )}
            </button>
          </div>

          <div className="mb-4 flex items-center gap-3 flex-wrap justify-center">
            <span className="editorial-label inline-block px-3 py-1 border border-border">Claude AI Interface</span>
            <span className="editorial-label inline-block px-3 py-1 border border-primary text-primary">
              by Anthropic
            </span>
            <span className="editorial-label inline-block px-3 py-1 border border-secondary text-secondary flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Solana
            </span>
          </div>

          {/* Main title */}
          <div className="relative mb-8">
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tight">
              <span className="block text-foreground">AIVON</span>
              <span className="block text-primary text-glow-primary">AI</span>
            </h1>
          </div>

          <div className="max-w-2xl mb-10">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-mono mb-4">
              The convergence of <span className="text-primary">Claude's intelligence</span> and{" "}
              <span className="text-secondary">Solana's speed</span>. A unified AI platform built for the next
              generation of on-chain builders.
            </p>
            <p className="text-sm text-muted-foreground/70 font-mono">
              Chat with Claude. Generate images. Access professional trading utilities. All in one interface.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center">
            <Link
              href="/generate"
              className="group btn-brutal px-8 py-4 border-primary bg-primary text-primary-foreground hover:bg-transparent hover:text-primary flex items-center gap-3"
            >
              Launch AI
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/docs"
              className="btn-brutal px-8 py-4 border-foreground/30 text-foreground hover:border-primary hover:text-primary flex items-center gap-3"
            >
              <FileText className="w-4 h-4" />
              Read Docs
            </Link>
            <Link
              href="https://x.com/AivonAIDev"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brutal px-8 py-4 border-foreground/30 text-foreground hover:border-primary hover:text-primary flex items-center gap-3"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Follow on X
            </Link>
          </div>

          {/* Bottom floating element */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
            <div className="flex flex-col items-center gap-2">
              <span className="editorial-label">Scroll to explore</span>
              <div className="w-[1px] h-8 bg-border animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Large decorative text */}
      <div className="absolute -bottom-20 -right-20 opacity-[0.02] pointer-events-none">
        <span className="font-display text-[40vw] font-bold leading-none">AI</span>
      </div>
    </section>
  )
}
