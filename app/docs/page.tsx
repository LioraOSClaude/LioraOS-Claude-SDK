import { Suspense } from "react"
import { DocsContent } from "@/components/docs-content"

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Suspense fallback={null}>
        <DocsContent />
      </Suspense>
    </main>
  )
}
