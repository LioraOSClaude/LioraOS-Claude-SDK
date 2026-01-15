import { type NextRequest, NextResponse } from "next/server"
import * as fal from "@fal-ai/serverless-client"

fal.config({
  credentials: process.env.FAL_KEY,
})

const STYLE_PROMPTS: Record<string, string> = {
  default: "high quality, detailed",
  anime: "anime style, manga aesthetic, cel shading, vibrant colors",
  realistic: "photorealistic, highly detailed, 8k resolution, cinematic lighting",
  cyberpunk: "cyberpunk style, neon lights, futuristic, dark atmosphere, sci-fi",
  fantasy: "fantasy art style, magical, ethereal, mystical atmosphere",
  minimalist: "minimalist style, clean lines, simple composition, modern",
}

const BASE_PROMPT = `masterpiece, best quality, highly detailed illustration, sharp focus, professional artwork, `

export async function POST(request: NextRequest) {
  try {
    const { prompt, style = "default" } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const stylePrompt = STYLE_PROMPTS[style] || STYLE_PROMPTS.default
    const enhancedPrompt = `${BASE_PROMPT}${stylePrompt}, ${prompt}`

    const result = await fal.subscribe("fal-ai/flux/schnell", {
      input: {
        prompt: enhancedPrompt,
        image_size: "square_hd",
        num_inference_steps: 4,
        num_images: 1,
      },
    })

    const imageUrl = result.images?.[0]?.url
    if (!imageUrl) throw new Error("No image generated")

    return NextResponse.json({ imageUrl })
  } catch (error) {
    console.error("Error generating image:", error)
    return NextResponse.json({ error: "Failed to generate image" }, { status: 500 })
  }
}
