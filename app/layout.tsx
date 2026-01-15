import type React from "react"
import type { Metadata } from "next"
import { IBM_Plex_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm",
})

export const metadata: Metadata = {
  title: "AIVON AI - Experimental AI System",
  description:
    "Aivon AI is an experimental AI system for creative minds. Built for chaos, creativity, and exploration.",
  generator: "v0.app",
  keywords: ["Aivon AI", "AI Lab", "AI Chat", "AI Image Generation", "AI Characters", "Creative AI", "Experimental AI"],
  authors: [{ name: "Aivon AI", url: "https://x.com/AivonAIDev" }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${ibmPlexMono.variable} font-sans antialiased`}>
        <div className="noise-overlay" />
        <div className="noise-overlay-2" />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
