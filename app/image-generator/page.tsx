"use client"

import { useState, useEffect, useCallback } from "react"
import { Navbar } from "@/components/navbar"
import Image from "next/image"
import {
  Loader2,
  Download,
  RefreshCw,
  Wand2,
  ImageIcon,
  Wallet,
  X,
  AlertCircle,
  Lock,
  Sparkles,
  Heart,
  Star,
} from "lucide-react"

type WalletType = "phantom" | "metamask" | null

interface WalletState {
  connected: boolean
  address: string | null
  type: WalletType
}

const FREE_GENERATIONS = 5
const REQUIRED_TOKEN_BALANCE = 100000
const TOKEN_NAME = "YARACLAUDE"

const STYLE_PRESETS = [
  { id: "cute", label: "Cute", emoji: "💕", color: "from-pink-400 to-rose-400" },
  { id: "cool", label: "Cool", emoji: "❄️", color: "from-cyan-400 to-blue-400" },
  { id: "elegant", label: "Elegant", emoji: "✨", color: "from-purple-400 to-violet-400" },
  { id: "sporty", label: "Sporty", emoji: "🔥", color: "from-orange-400 to-red-400" },
]

const BACKGROUND_OPTIONS = [
  { id: "sakura", label: "Sakura Garden" },
  { id: "city", label: "Neon City" },
  { id: "beach", label: "Sunset Beach" },
  { id: "school", label: "School Rooftop" },
  { id: "fantasy", label: "Fantasy World" },
  { id: "abstract", label: "Abstract" },
]

async function checkTokenBalance(walletAddress: string): Promise<number> {
  const mockBalances: Record<string, number> = {}
  if (!mockBalances[walletAddress]) {
    mockBalances[walletAddress] = Math.floor(Math.random() * 200000)
  }
  return mockBalances[walletAddress] ?? 0
}

function getUsageCount(walletAddress: string): number {
  if (typeof window === "undefined") return 0
  const usage = localStorage.getItem(`yaraclaude_usage_${walletAddress}`)
  return usage ? Number.parseInt(usage, 10) : 0
}

function incrementUsageCount(walletAddress: string): void {
  if (typeof window === "undefined") return
  const current = getUsageCount(walletAddress)
  localStorage.setItem(`yaraclaude_usage_${walletAddress}`, (current + 1).toString())
}

export default function ImageGeneratorPage() {
  const [prompt, setPrompt] = useState("")
  const [selectedStyle, setSelectedStyle] = useState("cute")
  const [selectedBg, setSelectedBg] = useState("sakura")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [floatingHearts, setFloatingHearts] = useState<Array<{ id: number; x: number; delay: number }>>([])

  const [wallet, setWallet] = useState<WalletState>({ connected: false, address: null, type: null })
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [walletError, setWalletError] = useState<string | null>(null)

  const [usageCount, setUsageCount] = useState(0)
  const [tokenBalance, setTokenBalance] = useState<number | null>(null)
  const [isCheckingAccess, setIsCheckingAccess] = useState(false)

  useEffect(() => {
    const hearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 8,
    }))
    setFloatingHearts(hearts)
  }, [])

  useEffect(() => {
    async function checkAccess() {
      if (!wallet.connected || !wallet.address) {
        setUsageCount(0)
        setTokenBalance(null)
        return
      }

      setIsCheckingAccess(true)
      try {
        const usage = getUsageCount(wallet.address)
        setUsageCount(usage)

        if (usage >= FREE_GENERATIONS) {
          const balance = await checkTokenBalance(wallet.address)
          setTokenBalance(balance)
        } else {
          setTokenBalance(null)
        }
      } catch (err) {
        console.error("Error checking access:", err)
      } finally {
        setIsCheckingAccess(false)
      }
    }

    checkAccess()
  }, [wallet.connected, wallet.address])

  const freeGenerationsRemaining = Math.max(0, FREE_GENERATIONS - usageCount)
  const hasFreeTier = usageCount < FREE_GENERATIONS
  const hasEnoughTokens = tokenBalance !== null && tokenBalance >= REQUIRED_TOKEN_BALANCE
  const canGenerate = wallet.connected && (hasFreeTier || hasEnoughTokens)

  const checkPhantomInstalled = useCallback(() => {
    return typeof window !== "undefined" && (window as any).phantom?.solana?.isPhantom
  }, [])

  const checkMetaMaskInstalled = useCallback(() => {
    return typeof window !== "undefined" && (window as any).ethereum?.isMetaMask
  }, [])

  const connectPhantom = async () => {
    setIsConnecting(true)
    setWalletError(null)

    try {
      const phantom = (window as any).phantom?.solana

      if (!phantom) {
        setWalletError("Phantom wallet not found. Please install it.")
        return
      }

      const response = await phantom.connect()
      const address = response.publicKey.toString()

      setWallet({
        connected: true,
        address,
        type: "phantom",
      })
      setShowWalletModal(false)
    } catch (err: any) {
      setWalletError(err.message || "Failed to connect Phantom")
    } finally {
      setIsConnecting(false)
    }
  }

  const connectMetaMask = async () => {
    setIsConnecting(true)
    setWalletError(null)

    try {
      const ethereum = (window as any).ethereum

      if (!ethereum?.isMetaMask) {
        setWalletError("MetaMask wallet not found. Please install it.")
        return
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" })

      if (accounts.length > 0) {
        setWallet({
          connected: true,
          address: accounts[0],
          type: "metamask",
        })
        setShowWalletModal(false)
      }
    } catch (err: any) {
      setWalletError(err.message || "Failed to connect MetaMask")
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = async () => {
    if (wallet.type === "phantom") {
      try {
        const phantom = (window as any).phantom?.solana
        await phantom?.disconnect()
      } catch (e) {
        console.error("Phantom disconnect error:", e)
      }
    }
    setWallet({ connected: false, address: null, type: null })
    setUsageCount(0)
    setTokenBalance(null)
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const handleGenerate = async () => {
    if (!prompt.trim() || !wallet.connected || !canGenerate) return

    setIsGenerating(true)
    setError(null)

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          walletAddress: wallet.address,
          style: selectedStyle,
          background: selectedBg,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate image")
      }

      setGeneratedImage(data.imageUrl)

      if (wallet.address) {
        incrementUsageCount(wallet.address)
        setUsageCount((prev) => prev + 1)

        if (usageCount + 1 >= FREE_GENERATIONS) {
          const balance = await checkTokenBalance(wallet.address)
          setTokenBalance(balance)
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = async () => {
    if (!generatedImage) return

    try {
      const response = await fetch(generatedImage)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `yaraclaude-waifu-${Date.now()}.png`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      console.error("Download failed:", err)
    }
  }

  const renderAccessStatus = () => {
    if (!wallet.connected) return null

    if (isCheckingAccess) {
      return (
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 border border-pink-200">
          <Loader2 className="w-4 h-4 text-pink-500 animate-spin" />
          <span className="font-mono text-xs text-pink-600">Checking access...</span>
        </div>
      )
    }

    if (hasFreeTier) {
      return (
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 border border-green-200">
          <Heart className="w-4 h-4 text-green-500 fill-green-500" />
          <span className="font-mono text-xs text-green-600">
            {freeGenerationsRemaining} free generation{freeGenerationsRemaining !== 1 ? "s" : ""} left
          </span>
        </div>
      )
    }

    if (hasEnoughTokens) {
      return (
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 border border-violet-200">
          <Star className="w-4 h-4 text-violet-500 fill-violet-500" />
          <span className="font-mono text-xs text-violet-600">
            {tokenBalance?.toLocaleString()} {TOKEN_NAME} - Unlimited
          </span>
        </div>
      )
    }

    return (
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 border border-red-200">
        <Lock className="w-4 h-4 text-red-500" />
        <span className="font-mono text-xs text-red-600">
          Need {REQUIRED_TOKEN_BALANCE.toLocaleString()} {TOKEN_NAME}
        </span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-violet-50 relative overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {floatingHearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute text-pink-200 animate-float-up opacity-40"
            style={{
              left: `${heart.x}%`,
              bottom: "-20px",
              animationDelay: `${heart.delay}s`,
              animationDuration: "12s",
            }}
          >
            <Heart className="w-6 h-6 fill-current" />
          </div>
        ))}
        <div className="absolute top-20 left-10 w-64 h-64 bg-pink-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-violet-200/30 rounded-full blur-3xl" />
      </div>

      <Navbar />

      {showWalletModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowWalletModal(false)} />
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-pink-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-pink-500" />
                Connect Wallet
              </h3>
              <button
                onClick={() => setShowWalletModal(false)}
                className="p-2 rounded-full hover:bg-pink-50 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <p className="text-sm text-gray-500 mb-6">
              Connect your wallet to start generating adorable waifu art! New wallets get {FREE_GENERATIONS} free
              generations.
            </p>

            {walletError && (
              <div className="mb-4 p-3 rounded-xl border border-red-200 bg-red-50 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span className="text-red-600 text-sm">{walletError}</span>
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={connectPhantom}
                disabled={isConnecting}
                className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-purple-100 bg-purple-50 hover:bg-purple-100 hover:border-purple-200 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center">
                  <svg viewBox="0 0 128 128" className="w-7 h-7">
                    <circle cx="64" cy="64" r="64" fill="#AB9FF2" />
                    <g fill="#FFFDF8">
                      <path d="M110.6 62.9c-.2-3.1-2.8-5.5-6-5.5h-5.7c-25.2 0-45.7 20.5-45.7 45.7v7.6c0 .8.6 1.4 1.4 1.4h10.9c3.1 0 5.8-2.4 6-5.5.4-5.8 4.9-10.5 10.6-11 6.5-.5 11.9 4.5 11.9 10.9v5.6c0 .8.6 1.4 1.4 1.4h10.9c3.1 0 5.8-2.4 6-5.5.4-5.9 5-10.6 10.8-11 6.5-.4 11.8 4.6 11.8 11v5.5c0 .8.6 1.4 1.4 1.4h10.9c3.1 0 5.8-2.4 6-5.5.4-6 5.2-10.7 11.1-11 .8 0 1.4-.6 1.4-1.4V96c0-25.2-20.5-45.7-45.7-45.7h-7.6c-.8 0-1.4.6-1.4 1.4v5.6c0 6.4-5.4 11.4-11.9 10.9-5.7-.5-10.2-5.2-10.6-11z" />
                    </g>
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-bold text-purple-700">Phantom</h4>
                  <p className="text-xs text-gray-500">{checkPhantomInstalled() ? "Solana Wallet" : "Not Installed"}</p>
                </div>
                {isConnecting && <Loader2 className="w-5 h-5 text-purple-500 animate-spin" />}
              </button>

              <button
                onClick={connectMetaMask}
                disabled={isConnecting}
                className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-orange-100 bg-orange-50 hover:bg-orange-100 hover:border-orange-200 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
                  <svg viewBox="0 0 40 40" className="w-7 h-7">
                    <path fill="#E17726" d="M35.5 5.5L21.7 15.9l2.5-6z" />
                    <path
                      fill="#E27625"
                      d="M4.5 5.5l13.6 10.5-2.4-6zM30.4 27.5l-3.6 5.6 7.8 2.1 2.2-7.6zM3.2 27.6l2.2 7.6 7.8-2.1-3.6-5.6z"
                    />
                    <path fill="#E27625" d="M12.8 17.6l-2.2 3.3 7.8.4-.3-8.4zM27.2 17.6l-5.4-4.8-.2 8.5 7.8-.4z" />
                    <path fill="#E27625" d="M13.2 33.1l4.7-2.3-4-3.2zM22.1 30.8l4.7 2.3-.7-5.5z" />
                    <path fill="#D5BFB2" d="M26.8 33.1l-4.7-2.3.4 3.1-.1 1.3zM13.2 33.1l4.4 2.1-.1-1.3.4-3.1z" />
                    <path fill="#233447" d="M17.7 25.4l-3.9-1.1 2.7-1.3zM22.3 25.4l1.2-2.4 2.8 1.3z" />
                    <path
                      fill="#CC6228"
                      d="M13.2 33.1l.7-5.6-4.3.1zM26.1 27.5l.7 5.6 3.6-5.5zM29.4 20.9l-7.8.4.7 3.9 1.2-2.4 2.8 1.3zM13.8 24.1l2.8-1.3 1.2 2.4.7-3.9-7.8-.4z"
                    />
                    <path
                      fill="#E27625"
                      d="M10.7 20.9l3.2 6.3-.1-3.1zM26.2 24.1l-.1 3.1 3.2-6.3zM18.5 21.3l-.7 3.9.9 4.6.2-6.1zM21.6 21.3l-.4 2.4.2 6.1.9-4.6z"
                    />
                    <path fill="#F5841F" d="M22.3 25.2l-.9 4.6.6.5 4-3.2.1-3.1zM13.8 24l.1 3.1 4 3.2.6-.5-.9-4.6z" />
                    <path
                      fill="#C0AC9D"
                      d="M22.4 35.2l.1-1.3-.3-.3h-4.4l-.3.3.1 1.3-4.4-2.1 1.5 1.3 3.1 2.1h4.5l3.1-2.1 1.5-1.3z"
                    />
                    <path fill="#161616" d="M22.1 30.8l-.6-.5h-3l-.6.5-.4 3.1.3-.3h4.4l.3.3z" />
                    <path
                      fill="#763E1A"
                      d="M36.1 16.5l1.1-5.5-1.7-5.5-13.4 10 5.2 4.4 7.3 2.1 1.6-1.9-.7-.5 1.1-1-.8-.6 1.1-.9zM2.8 11l1.1 5.5 1.1.9-.8.6 1.1 1-.7.5 1.6 1.9 7.3-2.1 5.2-4.4L4.5 5.5z"
                    />
                    <path
                      fill="#F5841F"
                      d="M34.6 22l-7.3-2.1 2.2 3.3-3.2 6.3 4.3-.1h6.3zM12.8 19.9l-7.3 2.1-2.4 5.5h6.3l4.3.1-3.2-6.3zM21.6 21.3l.5-8.4 2.1-5.8h-8.4l2.1 5.8.5 8.4.2 2.4v6.1h3l.2-6.1z"
                    />
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-bold text-orange-700">MetaMask</h4>
                  <p className="text-xs text-gray-500">
                    {checkMetaMaskInstalled() ? "Ethereum Wallet" : "Not Installed"}
                  </p>
                </div>
                {isConnecting && <Loader2 className="w-5 h-5 text-orange-500 animate-spin" />}
              </button>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-pink-50 to-violet-50 border border-pink-100">
              <h4 className="text-sm font-bold text-gray-700 mb-2">Access Tiers</h4>
              <div className="space-y-2 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
                  <span>New wallets: {FREE_GENERATIONS} free generations</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-3 h-3 text-violet-500 fill-violet-500" />
                  <span>
                    Hold {REQUIRED_TOKEN_BALANCE.toLocaleString()} {TOKEN_NAME}: Unlimited
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="relative z-10 pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 border border-pink-200 shadow-sm mb-6">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span className="font-mono text-xs text-pink-600 uppercase tracking-wide">
                Yara Claude Waifu Generator
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-gray-800">
              Create Your Perfect{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-violet-500">
                Waifu
              </span>
            </h1>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              Generate stunning anime character art with AI. Choose a style, describe your character, and watch the
              magic happen.
            </p>
          </div>

          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/80 border border-pink-100 shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${wallet.connected ? "bg-green-100" : "bg-pink-100"}`}
                >
                  <Wallet className={`w-5 h-5 ${wallet.connected ? "text-green-600" : "text-pink-500"}`} />
                </div>
                <div>
                  {wallet.connected ? (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-green-600">Connected</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs ${wallet.type === "phantom" ? "bg-purple-100 text-purple-600" : "bg-orange-100 text-orange-600"}`}
                        >
                          {wallet.type === "phantom" ? "Phantom" : "MetaMask"}
                        </span>
                      </div>
                      <p className="font-mono text-xs text-gray-400">{formatAddress(wallet.address!)}</p>
                    </>
                  ) : (
                    <>
                      <span className="text-sm font-medium text-gray-700">Wallet Not Connected</span>
                      <p className="text-xs text-gray-400">Connect to generate images</p>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                {wallet.connected && renderAccessStatus()}
                {wallet.connected ? (
                  <button
                    onClick={disconnectWallet}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-200 bg-red-50 text-red-500 text-sm hover:bg-red-100 transition-all"
                  >
                    <X className="w-4 h-4" />
                    Disconnect
                  </button>
                ) : (
                  <button
                    onClick={() => setShowWalletModal(true)}
                    className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-pink-200 transition-all"
                  >
                    <Wallet className="w-4 h-4" />
                    Connect Wallet
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Controls */}
            <div className="space-y-6">
              {/* Style Selector */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-pink-100 shadow-sm p-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-pink-500" />
                  Character Style
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {STYLE_PRESETS.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`relative p-4 rounded-2xl border-2 transition-all ${
                        selectedStyle === style.id
                          ? "border-pink-400 bg-pink-50 shadow-md"
                          : "border-gray-100 bg-white hover:border-pink-200"
                      }`}
                    >
                      <span className="text-2xl mb-1 block">{style.emoji}</span>
                      <span className="font-medium text-sm text-gray-700">{style.label}</span>
                      {selectedStyle === style.id && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center">
                          <Heart className="w-3 h-3 text-white fill-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Background Selector */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-pink-100 shadow-sm p-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-violet-500" />
                  Background
                </h3>
                <div className="flex flex-wrap gap-2">
                  {BACKGROUND_OPTIONS.map((bg) => (
                    <button
                      key={bg.id}
                      onClick={() => setSelectedBg(bg.id)}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        selectedBg === bg.id
                          ? "bg-violet-500 text-white shadow-md"
                          : "bg-violet-50 text-violet-600 hover:bg-violet-100"
                      }`}
                    >
                      {bg.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Prompt Input */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-pink-100 shadow-sm p-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-rose-500" />
                  Describe Your Character
                </h3>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., A cheerful girl with long blue hair and sparkling eyes, wearing a cute summer dress..."
                  className="w-full h-32 bg-gray-50 border border-gray-200 rounded-2xl p-4 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100 resize-none transition-all"
                />
                <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
                  <span>{prompt.length} characters</span>
                  <span>Be creative and detailed!</span>
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating || !canGenerate}
                className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
                  canGenerate && prompt.trim() && !isGenerating
                    ? "bg-gradient-to-r from-pink-500 via-rose-500 to-violet-500 text-white hover:shadow-xl hover:shadow-pink-200 hover:-translate-y-0.5"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Creating Your Waifu...
                    </>
                  ) : !wallet.connected ? (
                    <>
                      <Wallet className="w-5 h-5" />
                      Connect Wallet to Generate
                    </>
                  ) : !canGenerate ? (
                    <>
                      <Lock className="w-5 h-5" />
                      Need {TOKEN_NAME} Tokens
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate Waifu
                    </>
                  )}
                </span>
              </button>

              {error && (
                <div className="p-4 rounded-2xl border border-red-200 bg-red-50 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                  <span className="text-red-600 text-sm">{error}</span>
                </div>
              )}
            </div>

            {/* Right: Preview */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-pink-100 shadow-sm p-6 min-h-[600px] flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500" />
                  Your Creation
                </h3>
                {generatedImage && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setGeneratedImage(null)
                        handleGenerate()
                      }}
                      disabled={isGenerating || !canGenerate}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-violet-200 text-violet-600 text-xs hover:bg-violet-50 transition-colors disabled:opacity-50"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Regenerate
                    </button>
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-pink-500 text-white text-xs hover:bg-pink-600 transition-colors"
                    >
                      <Download className="w-3 h-3" />
                      Download
                    </button>
                  </div>
                )}
              </div>

              <div className="flex-1 rounded-2xl border-2 border-dashed border-pink-200 bg-gradient-to-br from-pink-50 to-violet-50 overflow-hidden flex items-center justify-center">
                {generatedImage ? (
                  <Image
                    src={generatedImage || "/placeholder.svg"}
                    alt="Generated waifu"
                    width={768}
                    height={768}
                    className="w-full h-auto object-contain rounded-xl"
                  />
                ) : isGenerating ? (
                  <div className="text-center p-8">
                    <div className="relative w-24 h-24 mx-auto mb-6">
                      <div className="absolute inset-0 rounded-full border-4 border-pink-200" />
                      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-pink-500 animate-spin" />
                      <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-rose-400 animate-spin-reverse" />
                      <div className="absolute inset-4 rounded-full border-4 border-transparent border-t-violet-400 animate-spin" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Heart className="w-8 h-8 text-pink-500 animate-pulse fill-pink-500" />
                      </div>
                    </div>
                    <p className="text-pink-600 font-medium animate-pulse mb-2">Creating your waifu...</p>
                    <p className="text-gray-400 text-sm">This may take a moment</p>
                  </div>
                ) : (
                  <div className="text-center p-8">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-100 to-violet-100 flex items-center justify-center">
                      <Sparkles className="w-12 h-12 text-pink-300" />
                    </div>
                    <p className="text-gray-500 font-medium mb-2">Your waifu will appear here</p>
                    <p className="text-gray-400 text-sm">Choose a style and describe your character</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.4;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-float-up {
          animation: float-up 12s linear infinite;
        }
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        .animate-spin-reverse {
          animation: spin-reverse 1.5s linear infinite;
        }
      `}</style>
    </div>
  )
}
