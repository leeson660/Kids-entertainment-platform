import type { Metadata, Viewport } from "next"
import { Outfit, Inter } from "next/font/google"
import "./globals.css"
import { NavBar } from "@/components/NavBar"
import { MobileNav } from "@/components/MobileNav"
import { InstallPrompt } from "@/components/InstallPrompt"
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister"

// Outfit — clean, geometric, modern; replaces the rounded child-friendly Nunito
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
})

// Inter — industry-standard professional body font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

export const viewport: Viewport = {
  themeColor: "#6366f1",
}

export const metadata: Metadata = {
  title: {
    default: "[Creator Name] | Official Content Hub",
    template: "%s | [Creator Name]",
  },
  description:
    "Watch, learn and explore with [Creator Name]. Videos, free resources, an AI-powered activity generator, and exclusive content — all in one place.",
  keywords: [
    "[creator name]",
    "[niche] videos",
    "[niche] tutorials",
    "[niche] tips",
    "[niche] resources",
    "free [niche] content",
    "[creator name] channel",
  ],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "[Creator Name]",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "[Creator Name] | Official Content Hub",
    description:
      "Videos, free resources, and exclusive content from [Creator Name].",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://[your-domain].com",
    siteName: "[Creator Name]'s Hub",
    type: "website",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://[your-domain].com",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-slate-50 font-body antialiased">
        <NavBar />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <MobileNav />
        <InstallPrompt />
        <ServiceWorkerRegister />
        <StorageNotice />
      </body>
    </html>
  )
}

function StorageNotice() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            if (!localStorage.getItem('mkc_notice_seen')) {
              var d = document.createElement('div');
              d.id = 'mkc-notice';
              d.style.cssText = 'position:fixed;bottom:70px;left:16px;right:16px;background:rgba(15,23,42,0.96);color:white;padding:12px 16px;border-radius:12px;z-index:9999;font-family:sans-serif;font-size:13px;display:flex;align-items:center;justify-content:space-between;gap:12px;max-width:480px;margin:0 auto;';
              d.innerHTML = '<span>🔒 We store your progress on this device only. No data leaves your device.</span><button onclick="document.getElementById(\\'mkc-notice\\').remove();localStorage.setItem(\\'mkc_notice_seen\\',\\'1\\')" style="background:#6366f1;color:white;border:none;padding:6px 14px;border-radius:8px;cursor:pointer;font-weight:bold;white-space:nowrap;">OK</button>';
              document.body.appendChild(d);
            }
          })();
        `,
      }}
    />
  )
}
