import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { worksheets } from "@/lib/worksheetData"
import { WorksheetPrintClient } from "./WorksheetPrintClient"
import { siteConfig } from "@/lib/siteConfig"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return worksheets.map((ws) => ({ slug: ws.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const ws = worksheets.find((w) => w.slug === slug)
  if (!ws) return {}
  return {
    title: `${ws.title} Worksheet | Miss Katie's Class`,
    description: ws.description,
  }
}

// Worksheet content definitions
const worksheetContent: Record<string, React.ReactNode> = {
  animals: (
    <div className="space-y-8">
      <p className="font-body text-lg text-gray-600">Draw a line from each animal to its name.</p>
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-6">
          {["🐶", "🐱", "🐮", "🦆"].map((emoji) => (
            <div key={emoji} className="flex items-center gap-4 text-4xl border-b border-dashed border-gray-300 pb-4">
              {emoji}
              <div className="flex-1 border-b-2 border-dotted border-gray-400 mt-2" />
            </div>
          ))}
        </div>
        <div className="space-y-6">
          {["Duck", "Dog", "Cat", "Cow"].map((name) => (
            <div key={name} className="flex items-center gap-4 border-b border-dashed border-gray-300 pb-4">
              <div className="flex-1 border-b-2 border-dotted border-gray-400 mt-2" />
              <span className="font-body text-xl font-bold text-gray-700">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  "first-words": (
    <div className="space-y-8">
      <p className="font-body text-lg text-gray-600">Trace the word, then draw a picture of it!</p>
      <div className="grid grid-cols-2 gap-8">
        {["cat", "dog", "cup", "ball"].map((word) => (
          <div key={word} className="border-2 border-dashed border-gray-300 rounded-xl p-4">
            <p className="font-display font-black text-4xl text-gray-200 tracking-widest mb-4" style={{ WebkitTextStroke: "2px #aaa" }}>
              {word}
            </p>
            <div className="h-20 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-300 font-body text-sm">Draw here</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
  songs: (
    <div className="space-y-8">
      <p className="font-body text-lg text-gray-600">Fill in the missing word from the nursery rhyme!</p>
      <div className="space-y-6">
        {[
          { text: "Twinkle, twinkle, little ___", answer: "star" },
          { text: "Baa baa black ___, have you any wool?", answer: "sheep" },
          { text: "The wheels on the bus go round and ___", answer: "round" },
          { text: "Humpty Dumpty sat on a ___", answer: "wall" },
        ].map((item, i) => (
          <div key={i} className="bg-gray-50 rounded-xl p-5">
            <p className="font-body text-xl text-gray-700">{item.text}</p>
            <div className="mt-3 border-b-2 border-brand-primary w-32 inline-block" />
          </div>
        ))}
      </div>
    </div>
  ),
  "sign-language": (
    <div className="space-y-6">
      <p className="font-body text-lg text-gray-600">Colour in the hand signs and try to copy them!</p>
      <div className="grid grid-cols-2 gap-6">
        {[
          { sign: "Hello", desc: "Wave your hand with fingers together" },
          { sign: "More", desc: "Bring your fingers together in front" },
          { sign: "All Done", desc: "Turn palms down, then up" },
          { sign: "Please", desc: "Rub hand in circles on your chest" },
        ].map((item) => (
          <div key={item.sign} className="border-2 border-dashed border-gray-300 rounded-xl p-5 text-center">
            <div className="w-24 h-24 mx-auto border-2 border-gray-300 rounded-xl flex items-center justify-center mb-3 bg-gray-50">
              <span className="text-5xl">✋</span>
            </div>
            <p className="font-display font-bold text-xl text-gray-700">{item.sign}</p>
            <p className="font-body text-sm text-gray-500 mt-1">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  ),
  emotions: (
    <div className="space-y-8">
      <p className="font-body text-lg text-gray-600">Circle the face that shows the emotion!</p>
      <div className="grid grid-cols-2 gap-6">
        {[
          { emotion: "Happy", faces: ["😊", "😢", "😠"] },
          { emotion: "Sad", faces: ["😊", "😢", "😮"] },
          { emotion: "Surprised", faces: ["😢", "😮", "😠"] },
          { emotion: "Angry", faces: ["😊", "😮", "😠"] },
        ].map((item) => (
          <div key={item.emotion} className="bg-gray-50 rounded-xl p-5">
            <p className="font-display font-bold text-lg text-gray-700 mb-3">{item.emotion}</p>
            <div className="flex gap-4">
              {item.faces.map((face, i) => (
                <div key={i} className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center text-3xl bg-white">
                  {face}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
  abc: (
    <div className="space-y-8">
      <p className="font-body text-lg text-gray-600">Trace the letters with your pencil!</p>
      <div className="grid grid-cols-3 gap-6">
        {["A", "B", "C", "D", "E", "F"].map((letter) => (
          <div key={letter} className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center">
            <p
              className="font-display font-black text-8xl text-gray-100"
              style={{ WebkitTextStroke: "3px #ccc" }}
            >
              {letter}
            </p>
            <p className="font-body text-sm text-gray-400 mt-2">Trace me!</p>
          </div>
        ))}
      </div>
    </div>
  ),
}

export default async function WorksheetPage({ params }: Props) {
  const { slug } = await params
  const ws = worksheets.find((w) => w.slug === slug)
  if (!ws) notFound()

  const content = worksheetContent[slug]

  return (
    <>
      {/* Print area */}
      <div id="printable" className="max-w-[794px] mx-auto px-8 py-6">
        {/* Branding header */}
        <div className="flex items-center justify-between border-b-4 border-brand-primary pb-4 mb-6">
          <div>
            <h1 className="font-display font-black text-brand-dark text-2xl">
              {ws.emoji} {ws.title}
            </h1>
            <p className="font-body text-brand-dark/60 text-sm">misskatiesclass.com</p>
          </div>
          <div className="text-right">
            <p className="font-body text-sm text-gray-500">Name: ___________________________</p>
            <p className="font-body text-sm text-gray-500 mt-1">Date: ____________________________</p>
          </div>
        </div>

        {/* Worksheet content */}
        {content}

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-gray-200 flex items-center justify-between">
          <p className="font-body text-xs text-gray-400">© {siteConfig.companyName}</p>
          <p className="font-body text-xs text-gray-400">misskatiesclass.com</p>
        </div>
      </div>

      {/* Controls — hidden on print */}
      <div className="no-print max-w-[794px] mx-auto px-8 py-4 flex items-center justify-between border-t">
        <Link href="/worksheets" className="font-body text-sm text-brand-primary hover:underline">
          ← Back to worksheets
        </Link>
        <WorksheetPrintClient slug={ws.slug} />
      </div>
    </>
  )
}
