import { getChannelVideos } from "@/lib/youtube"
import { NextResponse } from "next/server"

export const revalidate = 3600

export async function GET() {
  try {
    const videos = await getChannelVideos()
    return NextResponse.json(videos)
  } catch (err) {
    console.error(err)
    return NextResponse.json([], { status: 500 })
  }
}
