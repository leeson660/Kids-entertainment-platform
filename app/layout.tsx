import type { Metadata, Viewport } from "next"
import { Nunito, Poppins } from "next/font/google"
import "./globals.css"
import { NavBar } from "@/components/NavBar"
import { MobileNav } from "@/components/MobileNav"
import { InstallPrompt } from "@/components/InstallPrompt"
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister"

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

export const viewport: Viewport = {
  themeColor: "#3BB8F0",
}

export const metadata: Metadata = {
  title: {
    default: "Miss Katie's Class | Toddler Learning Videos, Games & Activities",
    template: "%s | Miss Katie's Class",
  },
  description:
    "Learn, sing and play with Miss Katie. Free educational videos, interactive games and printable activities for babies and toddlers aged 0-4.",
  keywords: [
    "toddler learning",
    "baby learning videos",
    "miss katie's class",
    "toddler games",
    "nursery rhymes",
    "first words",
    "BSL for toddlers",
    "free toddler activities",
  ],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Miss Katie's Class",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Miss Katie's Class | Toddler Learning Videos & Games",
    description:
      "Fun educational videos, games and activities for babies and toddlers.",
    url: "https://misskatiesclass.com",
    siteName: "Miss Katie's Class",
    type: "website",
  },
  alternates: { canonical: "https://misskatiesclass.com" },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${nunito.variable} ${poppins.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-gray-50 font-body antialiased">
        <NavBar />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <MobileNav />
        <InstallPrompt />
        <ServiceWorkerRegister />

        {/* First-visit storage notice */}
        <StorageNotice />
      </body>
    </html>
  )
}

// Simple client-side storage notice
function StorageNotice() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            if (!localStorage.getItem('mkc_notice_seen')) {
              var d = document.createElement('div');
              d.id = 'mkc-notice';
              d.style.cssText = 'position:fixed;bottom:70px;left:16px;right:16px;background:rgba(26,26,46,0.95);color:white;padding:12px 16px;border-radius:16px;z-index:9999;font-family:sans-serif;font-size:13px;display:flex;align-items:center;justify-content:space-between;gap:12px;max-width:480px;margin:0 auto;';
              d.innerHTML = '<span>🔒 We store your progress on this device only. No data leaves your phone.</span><button onclick="document.getElementById(\\'mkc-notice\\').remove();localStorage.setItem(\\'mkc_notice_seen\\',\\'1\\')" style="background:#3BB8F0;color:white;border:none;padding:6px 14px;border-radius:10px;cursor:pointer;font-weight:bold;white-space:nowrap;">OK</button>';
              document.body.appendChild(d);
            }
          })();
        `,
      }}
    />
  )
}
