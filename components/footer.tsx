import Link from "next/link"

export function Footer() {
  return (
    <footer className="relative py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <span className="font-display text-2xl tracking-tight text-foreground">
                AIVON<span className="text-primary">.</span>AI
              </span>
            </Link>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed max-w-xs">
              Experimental AI system for creative minds. Built for chaos, creativity, and exploration.
            </p>
          </div>

          {/* Links */}
          <div className="lg:col-span-3 lg:col-start-7">
            <span className="editorial-label block mb-4">Navigate</span>
            <div className="space-y-3">
              <Link
                href="/chat"
                className="block font-mono text-sm text-foreground hover:text-primary transition-colors"
              >
                Launch AI
              </Link>
              <Link
                href="#manifesto"
                className="block font-mono text-sm text-foreground hover:text-primary transition-colors"
              >
                Manifesto
              </Link>
              <Link
                href="#capabilities"
                className="block font-mono text-sm text-foreground hover:text-primary transition-colors"
              >
                Capabilities
              </Link>
            </div>
          </div>

          {/* Social */}
          <div className="lg:col-span-3">
            <span className="editorial-label block mb-4">Connect</span>
            <div className="space-y-3">
              <Link
                href="https://x.com/AivonAIDev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-sm text-foreground hover:text-primary transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                X / Twitter
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <span className="font-mono text-xs text-muted-foreground">2026 AIVON AI. Experimental software.</span>
          <div className="flex items-center gap-6">
            <span className="editorial-label">SYS_STATUS: ONLINE</span>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </footer>
  )
}
