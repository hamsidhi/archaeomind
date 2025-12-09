"use client"
import { useState } from "react"
import axios from "axios"

export default function Home() {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [sources, setSources] = useState<string[]>([])
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const uploadFile = async () => {
    if (!file) return
    setLoading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      await axios.post("http://localhost:8000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      alert("File uploaded & indexed!")
    } catch (e) {
      alert("Upload failed – is backend at http://localhost:8000 running?")
    }
    setLoading(false)
  }

  const askQuestion = async () => {
    if (!question.trim()) return
    setLoading(true)
    try {
      const res = await axios.post(
        "http://localhost:8000/api/query",
        new URLSearchParams({ q: question }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
      )
      setAnswer(res.data.answer)
      setSources(res.data.sources || [])
    } catch (e: any) {
      setAnswer(`Error: ${e.response?.data?.detail || e.message}`)
      setSources([])
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-stone-900 via-amber-900/30 to-stone-900 p-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mb-6 drop-shadow-2xl">
            🗿 ArchaeoMind AI
          </h1>
          <p className="text-xl text-stone-300 max-w-2xl mx-auto">
            Upload archaeology texts. Ask AI questions. Get answers with sources.
          </p>
        </div>

        <div className="bg-stone-800/40 backdrop-blur-xl p-10 rounded-3xl mb-12 border border-amber-500/30 shadow-2xl">
          <h2 className="text-3xl font-bold text-amber-300 mb-8 flex items-center">
            📜 Upload Archaeology Documents
          </h2>
          <div className="flex gap-6">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="flex-1 p-4 bg-stone-900/50 border-2 border-dashed border-stone-600 rounded-2xl text-lg file:mr-6 file:py-4 file:px-8 file:rounded-2xl file:border-0 file:bg-gradient-to-r file:from-amber-500 file:to-amber-600 file:text-stone-900 file:font-bold file:text-lg hover:file:from-amber-400 hover:file:to-amber-500 transition-all"
              accept=".txt"
            />
            <button
              onClick={uploadFile}
              disabled={!file || loading}
              className="px-12 py-6 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-900 font-black text-xl rounded-2xl hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 shadow-xl hover:shadow-2xl transition-all whitespace-nowrap"
            >
              {loading ? "⏳ Indexing..." : "🚀 INDEX NOW"}
            </button>
          </div>
        </div>

        <div className="bg-stone-800/40 backdrop-blur-xl p-10 rounded-3xl border border-amber-500/30 shadow-2xl">
          <h2 className="text-3xl font-bold text-amber-300 mb-8">🧠 Ask Archaeology Questions</h2>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What seals were found in Harappa?"
            className="w-full p-8 bg-stone-900/50 border-2 border-stone-600 rounded-3xl text-xl mb-8 resize-none min-h-[160px] focus:border-amber-400 focus:outline-none focus:shadow-amber-500/25 transition-all placeholder-stone-500"
          />
          <button
            onClick={askQuestion}
            disabled={!question.trim() || loading}
            className="w-full p-8 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-stone-900 font-black text-2xl rounded-3xl hover:from-amber-400 hover:via-amber-500 hover:to-amber-600 disabled:opacity-50 shadow-2xl hover:shadow-3xl transition-all mb-8"
          >
            {loading ? "🤔 ArchaeoMind is thinking..." : "💭 ASK ARCHAEOMIND AI"}
          </button>

          {answer && (
            <div className="space-y-6">
              <div className="p-8 bg-gradient-to-br from-stone-900/90 via-amber-900/10 to-stone-900/90 rounded-3xl border-2 border-amber-500/40 backdrop-blur-xl shadow-2xl">
                <h3 className="text-2xl font-bold text-amber-300 mb-6 flex items-center">🧠 AI Answer</h3>
                <p className="text-xl whitespace-pre-wrap leading-relaxed">{answer}</p>
              </div>

              {sources.length > 0 && (
                <div className="p-8 bg-stone-800/60 rounded-3xl border border-stone-600/50">
                  <h4 className="text-2xl font-bold text-amber-400 mb-6">📚 Document Sources</h4>
                  <div className="space-y-4">
                    {sources.slice(0, 5).map((source, i) =>
                      <div key={i} className="p-4 bg-stone-700/50 rounded-2xl border border-stone-600/40">
                        <p className="text-lg leading-relaxed">{source}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}