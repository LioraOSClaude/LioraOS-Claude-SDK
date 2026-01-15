"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, FileText } from "lucide-react"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div
        className={`transition-all duration-500 ${
          isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="group flex items-center gap-3">
              <div className="logo-container w-10 h-10">
                <div className="logo-ring-glow w-14 h-14 rounded-full" />
                <div className="logo-ring-outer w-12 h-12 rounded-full" />
                <div className="logo-ring w-10 h-10 rounded-full" />
                <div className="relative w-8 h-8 animate-logo-pulse rounded-full overflow-hidden border border-primary/30">
                  <Image src="/images/aivon-logo.png" alt="Aivon AI" fill className="object-cover scale-125" />
                </div>
              </div>
              <span className="font-display text-lg tracking-tight text-foreground ml-2">
                AIVON<span className="text-primary">.</span>AI
              </span>
            </Link>

            {/* Desktop Nav - Added Docs link */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/docs"
                className="editorial-label hover:text-primary transition-colors flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" />
                Docs
              </Link>
              <Link href="/#about" className="editorial-label hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/#chat" className="editorial-label hover:text-primary transition-colors">
                Claude Chat
              </Link>
              <Link href="/#utilities" className="editorial-label hover:text-primary transition-colors">
                Utilities
              </Link>
            </div>

            {/* CTA Buttons - Added Docs button */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/docs"
                className="btn-brutal px-5 py-2.5 border-foreground/30 text-foreground hover:border-primary hover:text-primary flex items-center gap-2"
              >
                <FileText className="w-3.5 h-3.5" />
                Docs
              </Link>
              <Link
                href="/generate"
                className="btn-brutal px-5 py-2.5 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Launch AI
              </Link>
              <Link
                href="https://x.com/AivonAIDev"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brutal px-5 py-2.5 border-foreground/30 text-foreground hover:border-foreground"
              >
                <span className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Follow
                </span>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden text-foreground p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Added Docs link */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
            <div className="px-6 py-6 space-y-6">
              <div className="space-y-4">
                <Link
                  href="/docs"
                  className="block editorial-label hover:text-primary transition-colors flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FileText className="w-3.5 h-3.5" />
                  Docs
                </Link>
                <Link
                  href="/#about"
                  className="block editorial-label hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/#chat"
                  className="block editorial-label hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Claude Chat
                </Link>
                <Link
                  href="/#utilities"
                  className="block editorial-label hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Utilities
                </Link>
              </div>
              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                <Link
                  href="/docs"
                  className="btn-brutal px-5 py-3 border-foreground/30 text-foreground text-center flex items-center justify-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FileText className="w-3.5 h-3.5" />
                  Read Docs
                </Link>
                <Link
                  href="/generate"
                  className="btn-brutal px-5 py-3 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Launch AI
                </Link>
                <Link
                  href="https://x.com/AivonAIDev"
                  target="_blank"
                  className="btn-brutal px-5 py-3 border-foreground/30 text-foreground text-center flex items-center justify-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Follow on X
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
