'use client'
import { useState, useRef } from 'react'

interface FileUploaderProps {
  onUploadStart?: () => void
  onUploadComplete?: (response: any) => void
  onUploadError?: (error: string) => void
}

export default function FileUploader({
  onUploadStart,
  onUploadComplete,
  onUploadError
}: FileUploaderProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = async (file: File) => {
    // Validate file type
    if (!file.name.endsWith('.txt')) {
      onUploadError?.('Only .txt files are supported (Phase 1)')
      return
    }

    // Validate file size (50MB)
    if (file.size > 50 * 1024 * 1024) {
      onUploadError?.('File size must be less than 50 MB')
      return
    }

    setUploading(true)
    onUploadStart?.()

    try {
      const formData = new FormData()
      formData.append('file', file)

      // Upload via Next.js API route (proxies to backend)
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`)
      }

      const data = await response.json()
      onUploadComplete?.(data)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed'
      onUploadError?.(errorMessage)
    } finally {
      setUploading(false)
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <>
      <div 
        className={`
          w-full border-4 border-dashed rounded-2xl p-16 text-center cursor-pointer
          transition-all duration-300 hover:shadow-xl
          ${dragActive 
            ? 'border-blue-500 bg-blue-50 shadow-2xl scale-105' 
            : 'border-gray-300 bg-gray-50'
          }
          ${uploading ? 'opacity-70 cursor-not-allowed' : ''}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt"
          onChange={handleChange}
          className="hidden"
          disabled={uploading}
        />
        
        <div 
          onClick={() => !uploading && fileInputRef.current?.click()}
          className="cursor-pointer"
        >
          <div className="text-6xl mb-8">📁</div>
          <p className="text-2xl font-bold mb-4">
            {uploading ? '⏳ Uploading...' : 'Drag & drop your file here'}
          </p>
          <p className="text-xl text-gray-600 mb-2">
            or click to select a <code className="bg-blue-200 px-2 py-1 rounded font-mono">.txt</code> file
          </p>
          <p className="text-lg text-gray-500">Maximum 50 MB</p>
        </div>
      </div>

      {/* File type info */}
      <div className="mt-8 p-6 bg-yellow-50 rounded-xl border-2 border-yellow-200">
        <p className="text-sm text-yellow-800">
          🛠️ <strong>Phase 1:</strong> Only <code>.txt</code> files (plain text). 
          PDF/DOCX support in Phase 1.5.
        </p>
      </div>
    </>
  )
}
