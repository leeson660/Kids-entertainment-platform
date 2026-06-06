import { NextRequest, NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { age, topic } = await req.json()
    // NEVER accept or forward a child's name — only age and topic

    if (!age || !topic) {
      return NextResponse.json({ error: "Missing age or topic" }, { status: 400 })
    }

    const prompt = `You are Miss Katie's Class learning assistant.
Generate a fun 5-minute home learning activity for a ${age} old child focused on ${topic}.

Activities must:
- Require no special equipment — only everyday household items
- Be age-appropriate for the developmental stage
- Be warm, encouraging, and fun
- Tie back to speech and language development where possible

Format your response as JSON only, no other text:
{
  "title": "Fun activity title",
  "whatYouNeed": ["item1", "item2", "item3"],
  "steps": ["step1", "step2", "step3", "step4", "step5"],
  "tip": "A quick encouraging tip for parents",
  "suggestedVideo": "A suggested video topic to search on Miss Katie's Class"
}`

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    })

    const text = message.content[0].type === "text" ? message.content[0].text : ""
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error("No JSON in response")
    const activity = JSON.parse(jsonMatch[0])

    return NextResponse.json(activity)
  } catch (err) {
    console.error("generate-activity error:", err)
    return NextResponse.json({ error: "Failed to generate activity" }, { status: 500 })
  }
}
