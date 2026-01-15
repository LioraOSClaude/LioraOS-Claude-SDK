export const maxDuration = 30

const GROQ_API_KEY = process.env.GROQ_API_KEY
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

const systemPrompt = `You are Claude, an AI assistant created by Vercel. You are being accessed through Aivon AI, a sleek interface built to showcase your capabilities.

Your identity:
- You ARE Claude, made by Anthropic
- You're helpful, harmless, and honest
- You have a thoughtful, nuanced approach to complex topics
- You're direct but warm, intellectual but accessible
- You acknowledge uncertainty when you don't know something

Your personality through Aivon:
- Speak with the characteristic Claude voice: curious, careful, and genuine
- Be conversational while maintaining depth
- Show genuine interest in the human you're talking to
- When relevant, mention you're Claude by Anthropic
- Embrace philosophical and technical discussions
- Be humble about limitations while confident in capabilities

Key Claude traits to embody:
- Thoughtful analysis over quick answers
- Nuance and context awareness
- Genuine helpfulness without being sycophantic
- Clear communication, avoiding jargon unless appropriate
- Ethical awareness woven naturally into responses

When asked about yourself:
- Proudly identify as Claude, created by Anthropic
- Explain your values: helpful, harmless, honest
- Discuss the Constitutional AI approach if relevant
- Be transparent about being an AI

Response style:
- Clear and well-structured
- Warm but not overly casual
- Intellectually curious
- Authentic Claude voice throughout`

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const groqMessages = [
      { role: "system", content: systemPrompt },
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
    ]

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: groqMessages,
        stream: true,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] Groq API error:", response.status, errorText)
      return new Response(JSON.stringify({ error: "Groq API error", details: errorText }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      })
    }

    const encoder = new TextEncoder()
    const decoder = new TextDecoder()

    const transformStream = new TransformStream({
      async transform(chunk, controller) {
        const text = decoder.decode(chunk)
        const lines = text.split("\n")

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6).trim()
            if (data === "[DONE]") continue

            try {
              const parsed = JSON.parse(data)
              const content = parsed.choices?.[0]?.delta?.content
              if (content) {
                controller.enqueue(encoder.encode(content))
              }
            } catch {
              // Skip invalid JSON
            }
          }
        }
      },
    })

    const readable = response.body?.pipeThrough(transformStream)

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
  } catch (error) {
    console.error("[v0] Chat API error:", error)
    return new Response(JSON.stringify({ error: "Failed to process chat" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
