'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()
  
  const isActive = (href: string) => pathname === href

  return (
    <nav className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            ArchaeoMind
          </Link>
          
          {/* Navigation Links */}
          <div className="flex gap-6">
            <Link 
              href="/" 
              className={`px-3 py-2 rounded transition-all ${
                isActive('/') 
                  ? 'bg-blue-600 shadow-md' 
                  : 'hover:bg-blue-700 hover:shadow-lg'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/upload" 
              className={`px-3 py-2 rounded transition-all ${
                isActive('/upload') 
                  ? 'bg-blue-600 shadow-md' 
                  : 'hover:bg-blue-700 hover:shadow-lg'
              }`}
            >
              Upload
            </Link>
            <Link 
              href="/chat" 
              className={`px-3 py-2 rounded transition-all ${
                isActive('/chat') 
                  ? 'bg-blue-600 shadow-md' 
                  : 'hover:bg-blue-700 hover:shadow-lg'
              }`}
            >
              Chat
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
