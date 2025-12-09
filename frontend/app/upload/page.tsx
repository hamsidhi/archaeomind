'use client'
import { useState } from 'react'
import FileUploader from '@/components/FileUploader'

export default function UploadPage() {
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')

  const handleUploadComplete = (response: any) => {
    setUploading(false)
    if (response.status === 'success') {
      setMessageType('success')
      setMessage(`${response.filename} uploaded successfully! ${response.chunkscount} chunks indexed.`)
    } else {
      setMessageType('error')
      setMessage(`Upload failed: ${response.message || 'Unknown error'}`)
    }
  }

  const handleUploadError = (error: string) => {
    setUploading(false)
    setMessageType('error')
    setMessage(`Error: ${error}`)
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-5xl font-bold text-gray-900 mb-12 text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Upload Document
      </h1>
      
      {/* File Uploader */}
      <FileUploader
        onUploadStart={() => {
          setUploading(true)
          setMessage('')
        }}
        onUploadComplete={handleUploadComplete}
        onUploadError={handleUploadError}
      />

      {/* Status Message */}
      {message && (
        <div className={`mt-8 p-6 rounded-xl shadow-lg ${
          messageType === 'success'
            ? 'bg-green-100 border-2 border-green-300 text-green-800'
            : 'bg-red-100 border-2 border-red-300 text-red-800'
        }`}>
          {message}
        </div>
      )}

      {/* Instructions */}
      <div className="mt-12 bg-blue-50 rounded-xl p-8 border-2 border-blue-200">
        <h2 className="text-2xl font-bold mb-6 text-blue-900">📋 Instructions</h2>
        <ul className="space-y-3 text-lg text-blue-800 list-disc list-inside">
          <li>Supported format: <code className="bg-blue-200 px-2 py-1 rounded font-mono">.txt</code> files (plain text)</li>
          <li>Maximum file size: 50 MB</li>
          <li>After uploading, go to <strong>Chat</strong> page to ask questions</li>
          <li>Documents are automatically processed and indexed for search</li>
        </ul>
      </div>
    </div>
  )
}
