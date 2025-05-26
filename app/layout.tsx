import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import AIAssistant from "@/components/ai-assistant"
import AutomatedGreetingBanner from "@/components/automated-greeting-banner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Shivshakti - Reliable Labor Services",
  description:
    "Professional labor services for construction, industrial, and logistics needs. Trusted, fast, and affordable.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        

      {/* Automated Greeting Banner */}
      <AutomatedGreetingBanner userName="Visitor" autoPlay={true} />

        <main className="min-h-screen">{children}</main>
        <AIAssistant />
        <Footer />
      </body>
    </html>
  )
}
