import { NextRequest, NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    // "age" field is reused here to carry the skill level — rename on full refactor
    const { age: level, topic } = await req.json()

    if (!level || !topic) {
      return NextResponse.json({ error: "Missing level or topic" }, { status: 400 })
    }

    const prompt = `You are a helpful content assistant for a YouTube creator's fan hub.
Generate a fun, practical activity idea for a ${level} level viewer interested in ${topic}.

The activity should:
- Be achievable in 15–30 minutes
- Require only commonly available tools or materials
- Be directly relevant to the topic
- Include an encouraging, actionable tip

Format your response as JSON only, no other text:
{
  "title": "Engaging activity title",
  "whatYouNeed": ["item1", "item2", "item3"],
  "steps": ["step1", "step2", "step3", "step4", "step5"],
  "tip": "A quick encouraging tip for the viewer",
  "suggestedVideo": "A suggested video topic to search for on the creator's channel"
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
