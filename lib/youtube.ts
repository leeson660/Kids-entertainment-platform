const BASE_URL = "https://www.googleapis.com/youtube/v3"

export interface YouTubeVideo {
  id: string
  title: string
  description: string
  thumbnail: string
  publishedAt: string
  duration: string
  viewCount: string
  channelTitle: string
}

export interface ChannelInfo {
  subscriberCount: string
  videoCount: string
  thumbnailUrl: string
  title: string
}

async function getUploadsPlaylistId(): Promise<string> {
  const res = await fetch(
    `${BASE_URL}/channels?key=${process.env.YOUTUBE_API_KEY}&id=${process.env.YOUTUBE_CHANNEL_ID}&part=contentDetails`,
    { next: { revalidate: 86400 } } // cache 24h
  )
  if (!res.ok) throw new Error(`YouTube channels API error: ${res.status}`)
  const data = await res.json()
  if (!data.items?.[0]) throw new Error("Channel not found")
  return data.items[0].contentDetails.relatedPlaylists.uploads
}

export async function getChannelInfo(): Promise<ChannelInfo | null> {
  try {
    const res = await fetch(
      `${BASE_URL}/channels?key=${process.env.YOUTUBE_API_KEY}&id=${process.env.YOUTUBE_CHANNEL_ID}&part=snippet,statistics`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return null
    const data = await res.json()
    const ch = data.items?.[0]
    if (!ch) return null
    return {
      subscriberCount: ch.statistics?.subscriberCount || "0",
      videoCount: ch.statistics?.videoCount || "0",
      thumbnailUrl: ch.snippet?.thumbnails?.default?.url || "",
      title: ch.snippet?.title || "",
    }
  } catch {
    return null
  }
}

export async function getChannelVideos(): Promise<YouTubeVideo[]> {
  try {
    const playlistId = await getUploadsPlaylistId()
    const playlistItems: {
      snippet: { title: string; description: string; publishedAt: string; resourceId: { videoId: string }; thumbnails: { medium?: { url: string }; default?: { url: string } } }
    }[] = []
    let nextPageToken = ""

    do {
      const url =
        `${BASE_URL}/playlistItems?key=${process.env.YOUTUBE_API_KEY}` +
        `&playlistId=${playlistId}&part=snippet,contentDetails&maxResults=50` +
        (nextPageToken ? `&pageToken=${nextPageToken}` : "")

      const res = await fetch(url, { next: { revalidate: 3600 } })
      if (!res.ok) {
        console.error("YouTube playlistItems error", res.status)
        break
      }
      const data = await res.json()
      playlistItems.push(...(data.items || []))
      nextPageToken = data.nextPageToken || ""
    } while (nextPageToken)

    if (playlistItems.length === 0) return []

    // Batch fetch video details (durations + stats) — 50 per call = 1 quota unit each
    const videoIds = playlistItems.map(
      (item) => item.snippet.resourceId.videoId
    )
    const detailsMap = await getVideoDetailsMap(videoIds)

    return playlistItems.map((item) => {
      const videoId = item.snippet.resourceId.videoId
      const details = detailsMap[videoId] || {}
      return {
        id: videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail:
          item.snippet.thumbnails?.medium?.url ||
          item.snippet.thumbnails?.default?.url ||
          "/placeholder-video.svg",
        publishedAt: item.snippet.publishedAt,
        duration: formatDuration(details.duration || ""),
        viewCount: formatViewCount(details.viewCount || "0"),
        channelTitle: "",
      }
    })
  } catch (err) {
    console.error("getChannelVideos error:", err)
    return []
  }
}

async function getVideoDetailsMap(
  videoIds: string[]
): Promise<Record<string, { duration?: string; viewCount?: string }>> {
  const map: Record<string, { duration?: string; viewCount?: string }> = {}
  // batch 50 at a time
  for (let i = 0; i < videoIds.length; i += 50) {
    const batch = videoIds.slice(i, i + 50)
    try {
      const res = await fetch(
        `${BASE_URL}/videos?key=${process.env.YOUTUBE_API_KEY}&id=${batch.join(",")}&part=snippet,statistics,contentDetails`,
        { next: { revalidate: 3600 } }
      )
      if (!res.ok) continue
      const data = await res.json()
      for (const item of data.items || []) {
        map[item.id] = {
          duration: item.contentDetails?.duration || "",
          viewCount: item.statistics?.viewCount || "0",
        }
      }
    } catch {
      // continue with what we have
    }
  }
  return map
}

function formatDuration(isoDuration: string): string {
  if (!isoDuration) return ""
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return ""
  const h = parseInt(match[1] || "0")
  const m = parseInt(match[2] || "0")
  const s = parseInt(match[3] || "0")
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
  return `${m}:${String(s).padStart(2, "0")}`
}

function formatViewCount(count: string): string {
  const n = parseInt(count, 10)
  if (isNaN(n)) return "0"
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`
  return String(n)
}
