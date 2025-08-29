import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AudioProvider } from "@/components/layout/AudioProvider";

const inter = Inter({ subsets: ['latin'] })

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
      <body className={inter.className}>
      <AudioProvider>
          {children}
        </AudioProvider></body>
    </html>
  )
}