'use client'
import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  sources?: Array<{
    text: string
    similarity: number
    filename: string
  }>
}

interface ChatBoxProps {
  messages: Message[]
  onSendMessage: (message: string) => void
  disabled?: boolean
}

export default function ChatBox({ 
  messages, 
  onSendMessage, 
  disabled = false 
}: ChatBoxProps) {
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input.trim())
      setInput('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        {messages.map((message, index) => (
          <div key={index} className="flex flex-col">
            {/* Message Bubble */}
            <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-3xl rounded-2xl p-6 shadow-lg ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-900'
              }`}>
                <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
              </div>
            </div>

            {/* Sources */}
            {message.sources && message.sources.length > 0 && (
              <div className="ml-4 mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm font-bold text-gray-600 mb-3">📚 Sources:</p>
                {message.sources.map((source, i) => (
                  <div key={i} className="mb-4 p-4 bg-gray-50 rounded-xl border-l-4 border-blue-400">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-semibold text-blue-900">{source.filename}</span>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-mono">
                        {Math.round(source.similarity * 100)}% match
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 italic max-w-2xl">{source.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t bg-gradient-to-r from-gray-50 to-blue-50 p-6">
        <div className="flex gap-3 items-end">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about archaeology, artifacts, excavation sites..."
            className="flex-1 p-4 border-2 border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all min-h-[80px] max-h-[200px] overflow-y-auto"
            rows={3}
            disabled={disabled}
          />
          <button
            onClick={handleSend}
            disabled={disabled || !input.trim()}
            className={`px-8 py-4 font-bold rounded-2xl shadow-lg transform transition-all duration-300 h-fit ${
              disabled || !input.trim()
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-2xl hover:-translate-y-1 hover:from-blue-700 hover:to-indigo-700 active:translate-y-0'
            }`}
          >
            {disabled ? '🤔 Thinking...' : 'Send'}
          </button>
        </div>
        {disabled && (
          <p className="text-sm text-gray-500 mt-2 text-center">ArchaeoMind is processing your question...</p>
        )}
      </div>
    </div>
  )
}
