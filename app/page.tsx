import { HeroSection } from "@/components/sections/hero-section"
import { ChatSection } from "@/components/sections/chat-section"
import { ManifestoSection } from "@/components/sections/manifesto-section"
import { CapabilitiesSection } from "@/components/sections/capabilities-section"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* Gradient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      {/* Grid overlay */}
      <div className="fixed inset-0 grid-bg pointer-events-none opacity-30" />

      <Navbar />
      <HeroSection />
      <ManifestoSection />
      <ChatSection />
      <CapabilitiesSection />
      <Footer />
    </main>
  )
}
