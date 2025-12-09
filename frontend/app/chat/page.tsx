'use client'
import { useState, useRef, useEffect } from 'react'
import ChatBox from '@/components/ChatBox'

const initialMessages = [
  {
    role: 'assistant' as const,
    content: "👋 Hello! I'm ArchaeoMind. Upload a document first (via Upload page), then ask me questions about archaeology. Try: 'What pottery was found?'"
  }
]

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages)
  const [sending, setSending] = useState(false)

  const handleSendMessage = async (query: string) => {
    // Add user message immediately
    setMessages(prev => [...prev, { role: 'user' as const, content: query }])
    
    try {
      setSending(true)
      // Call backend via Next.js API route
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `querytext=${encodeURIComponent(query)}`
      })

      if (!response.ok) throw new Error(`API error: ${response.status}`)

      const data = await response.json()
      
      // Add assistant response
      setMessages(prev => [...prev, {
        role: 'assistant' as const,
        content: data.answer,
        sources: data.sources
      }])
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant' as const,
        content: `❌ Error: ${error instanceof Error ? error.message : 'Failed to get response'}`
      }])
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 h-screen flex flex-col">
      <h1 className="text-5xl font-bold text-gray-900 mb-8 text-center bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
        Ask Questions
      </h1>
      
      {/* Chat Interface */}
      <div className="flex-1 max-h-[70vh] overflow-hidden bg-white rounded-2xl shadow-2xl border-4 border-gray-100 mb-6">
        <ChatBox 
          messages={messages} 
          onSendMessage={handleSendMessage}
          disabled={sending}
        />
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-blue-200">
        <h2 className="text-2xl font-bold mb-6 text-blue-900">💡 Tips for Best Results</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-blue-800 list-disc list-inside">
          <li>Ask specific questions about artifacts, sites, or periods</li>
          <li>The AI searches only your uploaded documents</li>
          <li>Sources appear below each answer with similarity scores</li>
          <li>Clearer questions = better answers (who, what, where, when)</li>
        </ul>
      </div>
    </div>
  )
}
