import type { Metadata } from 'next'
import './globals.css'

// Static metadata - NO hydration issues
export const metadata: Metadata = {
  title: 'ArchaeoMind',
  description: 'AI Archaeology Assistant',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  )
}
