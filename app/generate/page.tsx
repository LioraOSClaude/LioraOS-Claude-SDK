"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Sparkles,
  Download,
  Loader2,
  ImageIcon,
  Target,
  Radio,
  BarChart3,
  Zap,
  Lock,
  ChevronRight,
  Terminal,
  Activity,
  Cpu,
} from "lucide-react"

const MENU_ITEMS = [
  { id: "image", label: "AI Image", icon: ImageIcon, available: true, description: "Generate images with FAL" },
  { id: "sniper", label: "Token Sniper", icon: Target, available: false, description: "Auto-snipe new launches" },
  { id: "tracker", label: "X Tracker", icon: Radio, available: false, description: "Track Twitter/X signals" },
  {
    id: "analytics",
    label: "Wallet Analytics",
    icon: BarChart3,
    available: false,
    description: "Deep wallet analysis",
  },
  { id: "arbitrage", label: "Arb Scanner", icon: Zap, available: false, description: "Cross-DEX arbitrage" },
  { id: "copytrader", label: "Copy Trader", icon: Activity, available: false, description: "Mirror whale wallets" },
]

const STYLES = [
  { id: "default", label: "Default" },
  { id: "anime", label: "Anime" },
  { id: "realistic", label: "Realistic" },
  { id: "cyberpunk", label: "Cyberpunk" },
  { id: "fantasy", label: "Fantasy" },
  { id: "minimalist", label: "Minimalist" },
]

const SUGGESTED_PROMPTS = [
  "A futuristic city at night with neon lights",
  "A mystical forest with glowing mushrooms",
  "An astronaut floating in space near a nebula",
  "A cyberpunk samurai in rain",
]

const TERMINAL_LINES = [
  "$ initializing aivon_core...",
  ">> loading neural_network [████████] 100%",
  ">> connecting to solana_mainnet...",
  ">> rpc_endpoint: https://api.mainnet-beta.solana.com",
  ">> wallet_adapter: initialized",
  ">> fetching token_metadata...",
  ">> jupiter_aggregator: online",
  ">> raydium_pool_scanner: standby",
  ">> pump.fun_listener: active",
  "$ awaiting_user_input...",
  ">> system_status: OPERATIONAL",
  ">> latency: 12ms | blocks: 298,412,847",
]

function TerminalAnimation() {
  const [lines, setLines] = useState<string[]>([])

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index < TERMINAL_LINES.length) {
        setLines((prev) => [...prev, TERMINAL_LINES[index]])
        index++
      } else {
        index = 0
        setLines([])
      }
    }, 800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="font-mono text-xs text-primary/60 space-y-1 h-48 overflow-hidden">
      {lines.map((line, i) => {
        if (!line) return null
        return (
          <div key={i} className="animate-fade-in">
            {line.startsWith("$") ? (
              <span className="text-accent">{line}</span>
            ) : line.startsWith(">>") ? (
              <span className="text-muted-foreground">{line}</span>
            ) : (
              <span>{line}</span>
            )}
          </div>
        )
      })}
      <span className="inline-block w-2 h-4 bg-primary animate-pulse" />
    </div>
  )
}

function LiveStats() {
  const [stats, setStats] = useState({
    price: 187.42,
    volume: 2.4,
    txCount: 14829,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        price: 187 + Math.random() * 5,
        volume: 2 + Math.random() * 1,
        txCount: Math.floor(14000 + Math.random() * 2000),
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    null
  )
}

function ComingSoonPage({ activeMenu }: { activeMenu: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-lg">
        <div className="relative w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-2 border-primary/30">
          <Image src="/images/aivon-logo.png" alt="Aivon AI" fill className="object-cover scale-125 opacity-50" />
        </div>

        <span className="editorial-label block mb-4">UTILITY // LOCKED</span>
        <h2 className="font-display text-4xl font-bold text-foreground mb-4">
          {MENU_ITEMS.find((m) => m.id === activeMenu)?.label}
        </h2>
        <p className="text-muted-foreground font-mono text-sm mb-8">
          {MENU_ITEMS.find((m) => m.id === activeMenu)?.description}
        </p>

        <div className="brutal-card p-6 mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Lock className="w-4 h-4 text-accent" />
            <span className="text-accent font-mono text-sm">COMING SOON</span>
          </div>
          <p className="text-muted-foreground font-mono text-xs">
            This utility is currently under development. Follow us on X for updates.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-left">
          {activeMenu === "sniper" && (
            <>
              <div className="p-4 bg-muted/20 border border-border">
                <span className="text-xs text-primary font-mono">FEATURE</span>
                <p className="text-sm text-foreground mt-1">Auto-detect new launches</p>
              </div>
              <div className="p-4 bg-muted/20 border border-border">
                <span className="text-xs text-primary font-mono">FEATURE</span>
                <p className="text-sm text-foreground mt-1">Instant buy execution</p>
              </div>
              <div className="p-4 bg-muted/20 border border-border">
                <span className="text-xs text-primary font-mono">FEATURE</span>
                <p className="text-sm text-foreground mt-1">Pump.fun integration</p>
              </div>
              <div className="p-4 bg-muted/20 border border-border">
                <span className="text-xs text-primary font-mono">FEATURE</span>
                <p className="text-sm text-foreground mt-1">Customizable filters</p>
              </div>
            </>
          )}
          {activeMenu === "tracker" && (
            <>
              <div className="p-4 bg-muted/20 border border-border">
                <span className="text-xs text-primary font-mono">FEATURE</span>
                <p className="text-sm text-foreground mt-1">KOL wallet tracking</p>
              </div>
              <div className="p-4 bg-muted/20 border border-border">
                <span className="text-xs text-primary font-mono">FEATURE</span>
                <p className="text-sm text-foreground mt-1">Tweet sentiment analysis</p>
              </div>
              <div className="p-4 bg-muted/20 border border-border">
                <span className="text-xs text-primary font-mono">FEATURE</span>
                <p className="text-sm text-foreground mt-1">Real-time alerts</p>
              </div>
              <div className="p-4 bg-muted/20 border border-border">
                <span className="text-xs text-primary font-mono">FEATURE</span>
                <p className="text-sm text-foreground mt-1">Influencer signals</p>
              </div>
            </>
          )}
          {activeMenu === "analytics" && (
            <>
              <div className="p-4 bg-muted/20 border border-border">
                <span className="text-xs text-primary font-mono">FEATURE</span>
                <p className="text-sm text-foreground mt-1">Wallet PnL analysis</p>
              </div>
              <div className="p-4 bg-muted/20 border border-border">
                <span className="text-xs text-primary font-mono">FEATURE</span>
                <p className="text-sm text-foreground mt-1">Token distribution</p>
              </div>
              <div className="p-4 bg-muted/20 border border-border">
                <span className="text-xs text-primary font-mono">FEATURE</span>
                <p className="text-sm text-foreground mt-1">Holder statistics</p>
              </div>
              <div className="p-4 bg-muted/20 border border-border">
                <span className="text-xs text-primary font-mono">FEATURE</span>
                <p className="text-sm text-foreground mt-1">Transaction history</p>
              </div>
            </>
          )}
          {activeMenu === "arbitrage" && (
            <>
              <div className="p-4 bg-muted/20 border border-border">
                <span className="text-xs text-primary font-mono">FEATURE</span>
                <p className="text-sm text-foreground mt-1">Multi-DEX scanning</p>
              </div>
              <div className="p-4 bg-muted/20 border border-border">
                <span className="text-xs text-primary font-mono">FEATURE</span>
                <p className="text-sm text-foreground mt-1">Price discrepancy alerts</p>
              </div>
              <div className="p-4 bg-muted/20 border border-border">
                <span className="text-xs text-primary font-mono">FEATURE</span>
                <p className="text-sm text-foreground mt-1">Jupiter routing</p>
              </div>
              <div className="p-4 bg-muted/20 border border-border">
                <span className="text-xs text-primary font-mono">FEATURE</span>
                <p className="text-sm text-foreground mt-1">Profit calculator</p>
              </div>
            </>
          )}
          {activeMenu === "copytrader" && (
            <>
              <div className="p-4 bg-muted/20 border border-border">
                <span className="text-xs text-primary font-mono">FEATURE</span>
                <p className="text-sm text-foreground mt-1">Whale wallet list</p>
              </div>
              <div className="p-4 bg-muted/20 border border-border">
                <span className="text-xs text-primary font-mono">FEATURE</span>
                <p className="text-sm text-foreground mt-1">Auto-copy trades</p>
              </div>
              <div className="p-4 bg-muted/20 border border-border">
                <span className="text-xs text-primary font-mono">FEATURE</span>
                <p className="text-sm text-foreground mt-1">Position sizing</p>
              </div>
              <div className="p-4 bg-muted/20 border border-border">
                <span className="text-xs text-primary font-mono">FEATURE</span>
                <p className="text-sm text-foreground mt-1">Performance tracking</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function GeneratePage() {
  const [activeMenu, setActiveMenu] = useState("image")
  const [prompt, setPrompt] = useState("")
  const [style, setStyle] = useState("default")
  const [isLoading, setIsLoading] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const generateImage = async (inputPrompt?: string) => {
    const finalPrompt = inputPrompt || prompt
    if (!finalPrompt.trim() || isLoading) return

    setIsLoading(true)
    setError(null)
    setGeneratedImage(null)

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: finalPrompt, style }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate image")
      }

      setGeneratedImage(data.imageUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    generateImage()
  }

  const handleDownload = async () => {
    if (!generatedImage) return

    try {
      const response = await fetch(generatedImage)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `aivon-generated-${Date.now()}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error("Download failed:", err)
    }
  }

  return (
    <main className="relative min-h-screen bg-background flex">
      <div className="fixed inset-0 grid-bg opacity-10 pointer-events-none" />

      <aside
        className={`fixed left-0 top-0 h-full bg-card/80 backdrop-blur-xl border-r border-border z-50 transition-all duration-300 ${sidebarCollapsed ? "w-16" : "w-64"}`}
      >
        <div className="p-4 border-b border-border">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary/50 flex-shrink-0">
              <Image src="/images/aivon-logo.png" alt="Aivon" fill className="object-cover scale-125" />
            </div>
            {!sidebarCollapsed && (
              <div>
                <span className="font-display font-bold text-foreground">AIVON</span>
                <span className="block text-[10px] text-muted-foreground font-mono">SOLANA TOOLKIT</span>
              </div>
            )}
          </Link>
        </div>

        <nav className="p-2 space-y-1">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => item.available && setActiveMenu(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded transition-all ${
                activeMenu === item.id
                  ? "bg-primary/20 border border-primary/50 text-primary"
                  : item.available
                    ? "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                    : "text-muted-foreground/50 cursor-not-allowed"
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && (
                <>
                  <div className="flex-1 text-left">
                    <span className="text-sm font-mono block">{item.label}</span>
                    {!item.available && <span className="text-[10px] text-accent">COMING SOON</span>}
                  </div>
                  {!item.available && <Lock className="w-3 h-3 text-muted-foreground/50" />}
                </>
              )}
            </button>
          ))}
        </nav>

        {!sidebarCollapsed && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
            <div className="flex items-center gap-2 mb-3">
              <Terminal className="w-3 h-3 text-primary" />
              <span className="text-[10px] text-muted-foreground font-mono">SYSTEM LOG</span>
            </div>
            <TerminalAnimation />
          </div>
        )}

        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute top-1/2 -right-3 w-6 h-6 bg-card border border-border rounded-full flex items-center justify-center hover:border-primary transition-colors"
        >
          <ChevronRight className={`w-3 h-3 transition-transform ${sidebarCollapsed ? "" : "rotate-180"}`} />
        </button>
      </aside>

      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-64"}`}>
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-xs"
              >
                <ArrowLeft className="w-3 h-3" />
                HOME
              </Link>
              <span className="text-border">/</span>
              <span className="text-foreground font-mono text-sm">
                {MENU_ITEMS.find((m) => m.id === activeMenu)?.label.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-mono text-muted-foreground">MAINNET</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-muted/30 border border-border">
                <Cpu className="w-3 h-3 text-primary" />
                <span className="text-xs font-mono text-muted-foreground">Claude AI</span>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 lg:p-8">
          {activeMenu === "image" ? (
            <>
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-primary/50">
                    <Image src="/images/aivon-logo.png" alt="Aivon AI" fill className="object-cover scale-125" />
                  </div>
                  <div>
                    <span className="editorial-label block mb-1">UTILITY_01 // ACTIVE</span>
                    <h1 className="font-display text-3xl font-bold text-foreground">
                      AI <span className="text-primary">IMAGE</span> GENERATOR
                    </h1>
                  </div>
                </div>
                <p className="text-muted-foreground font-mono text-sm max-w-xl">
                  Generate high-quality images from text prompts. Powered by FAL neural networks.
                </p>
              </div>

              <div className="mb-8">
                <LiveStats />
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <div className="brutal-card p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="editorial-label">PROMPT INPUT</span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-mono text-muted-foreground mb-2">Describe your image</label>
                      <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="> Enter your prompt here..."
                        rows={4}
                        className="w-full px-4 py-3 bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary font-mono transition-colors resize-none"
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-mono text-muted-foreground mb-3">Style</label>
                      <div className="flex flex-wrap gap-2">
                        {STYLES.map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setStyle(s.id)}
                            className={`btn-brutal px-4 py-2 text-xs transition-all ${
                              style === s.id
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                            }`}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading || !prompt.trim()}
                      className="w-full btn-brutal px-6 py-4 border-primary bg-primary text-primary-foreground hover:bg-transparent hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          Generate Image
                        </>
                      )}
                    </button>
                  </form>

                  <div className="mt-8 pt-6 border-t border-border">
                    <span className="editorial-label block mb-4">SUGGESTED PROMPTS</span>
                    <div className="space-y-2">
                      {SUGGESTED_PROMPTS.map((p, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            setPrompt(p)
                            generateImage(p)
                          }}
                          disabled={isLoading}
                          className="w-full text-left px-4 py-3 bg-muted/30 border border-border text-sm text-muted-foreground hover:border-primary hover:text-primary font-mono transition-all disabled:opacity-50"
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="brutal-card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-primary" />
                      <span className="editorial-label">OUTPUT</span>
                    </div>
                    {generatedImage && (
                      <button
                        onClick={handleDownload}
                        className="btn-brutal px-4 py-2 text-xs border-border text-muted-foreground hover:border-primary hover:text-primary flex items-center gap-2"
                      >
                        <Download className="w-3 h-3" />
                        Download
                      </button>
                    )}
                  </div>

                  <div className="aspect-square w-full bg-muted/30 border border-border flex items-center justify-center overflow-hidden">
                    {isLoading ? (
                      <div className="flex flex-col items-center gap-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/50 animate-pulse">
                          <Image
                            src="/images/aivon-logo.png"
                            alt="Generating"
                            fill
                            className="object-cover scale-125"
                          />
                        </div>
                        <div className="text-center">
                          <p className="text-foreground font-mono text-sm mb-1">Generating...</p>
                          <p className="text-muted-foreground font-mono text-xs">This may take a few seconds</p>
                        </div>
                      </div>
                    ) : generatedImage ? (
                      <img
                        src={generatedImage || "/placeholder.svg"}
                        alt="Generated image"
                        className="w-full h-full object-cover"
                      />
                    ) : error ? (
                      <div className="text-center p-6">
                        <p className="text-destructive font-mono text-sm mb-2">Error</p>
                        <p className="text-muted-foreground font-mono text-xs">{error}</p>
                      </div>
                    ) : (
                      <div className="text-center p-6">
                        <div className="relative w-12 h-12 mx-auto mb-4 rounded-full overflow-hidden opacity-30">
                          <Image src="/images/aivon-logo.png" alt="Aivon AI" fill className="object-cover scale-125" />
                        </div>
                        <p className="text-muted-foreground font-mono text-sm">Your generated image will appear here</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-border">
                    <span className="editorial-label">Powered by Claude</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <ComingSoonPage activeMenu={activeMenu} />
          )}
        </div>
      </div>
    </main>
  )
}
