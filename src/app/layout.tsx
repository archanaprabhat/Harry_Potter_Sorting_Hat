import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond, IM_Fell_Great_Primer } from 'next/font/google'
import './globals.css'
import { AudioProvider } from "@/components/layout/AudioProvider";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})
const fell = IM_Fell_Great_Primer({
  weight: '400',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-fell',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Harry Potter Sorting Hat',
  description: 'Discover your true Hogwarts house',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable} ${fell.variable} font-sans`}>
        <AudioProvider>
          {children}
          <Analytics />
        </AudioProvider></body>
    </html>
  )
}