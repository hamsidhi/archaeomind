export default function Home() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
          ArchaeoMind
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          AI Research Assistant for Archaeology
        </p>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-12">
          Upload excavation reports and research papers. Ask questions about ancient civilizations.
          Get precise answers with source citations from your documents.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all">
          <div className="text-4xl mb-6">📄</div>
          <h3 className="text-2xl font-bold mb-4">Upload Documents</h3>
          <p className="text-gray-600">TXT files with archaeological data (PDF support coming soon)</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all">
          <div className="text-4xl mb-6">🧠</div>
          <h3 className="text-2xl font-bold mb-4">AI Analysis</h3>
          <p className="text-gray-600">Automatic text chunking, embedding, and vector storage</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all">
          <div className="text-4xl mb-6">💬</div>
          <h3 className="text-2xl font-bold mb-4">Ask Questions</h3>
          <p className="text-gray-600">Get answers grounded in your documents with source citations</p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-2xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Explore Ancient History?</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/upload" 
            className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            🚀 Upload First Document
          </a>
          <a 
            href="/chat" 
            className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300"
          >
            💬 Start Asking Questions
          </a>
        </div>
      </div>
    </div>
  )
}
