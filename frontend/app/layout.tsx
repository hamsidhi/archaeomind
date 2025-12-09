import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'

// Metadata for SEO (server-only, no hydration issues)
export const metadata: Metadata = {
  title: 'ArchaeoMind - AI Research Assistant',
  description: 'Upload archaeology documents. Ask AI-powered questions with sources.',
}

// Root layout - 100% hydration-safe for Next.js 16 + Turbopack
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preload critical fonts - prevents layout shift */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-slate-900 antialiased font-sans min-h-screen">
        {/* Fixed Navigation - server-rendered */}
        <Navigation />
        
        {/* Main content - flexible container */}
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 min-h-[calc(100vh-80px)]">
          {children}
        </main>
        
        {/* Suppress ONLY body hydration warnings from extensions */}
        <script 
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Ignore extension-added attributes during hydration
                if (typeof window !== 'undefined') {
                  const html = document.documentElement;
                  html.removeAttribute('crxlauncher');
                  html.removeAttribute('data-darkreader');
                  html.removeAttribute('darkreader');
                }
              })();
            `,
          }}
          suppressHydrationWarning
        />
      </body>
    </html>
  )
}
