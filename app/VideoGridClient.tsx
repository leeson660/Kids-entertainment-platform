"use client"

import { useState } from "react"
import { YouTubeVideo } from "@/lib/youtube"
import { VideoCard } from "@/components/VideoCard"
import { VideoModal } from "@/components/VideoModal"

interface VideoGridClientProps {
  videos: YouTubeVideo[]
}

export function VideoGridClient({ videos }: VideoGridClientProps) {
  const [selected, setSelected] = useState<YouTubeVideo | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} onClick={setSelected} />
        ))}
      </div>
      <VideoModal video={selected} onClose={() => setSelected(null)} />
    </>
  )
}
