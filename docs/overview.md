# ArchaeoMind: Phase 1 MVP - Quick Overview

**Status:** ✅ Production Ready (Dec 10, 2025)  
**Version:** 1.0.0  
**Cost:** $0/month (forever!)

---

## 🚀 **What Is ArchaeoMind?**

An **AI-powered archaeology research assistant** that lets you:
- 📤 Upload archaeology documents (TXT files - Phase 1)
- 🤖 Ask natural language questions
- 📚 Get AI answers + source documents
- 📊 See similarity scores (0-1 scale)
- ⚡ Get answers in <3 seconds

---

## 🎯 **Phase 1 Features** (LIVE NOW)

✅ **Document Upload**
- TXT file support
- Auto-chunking (512 chars, 50 overlap)
- Instant processing

✅ **RAG Query System**
- Natural language questions
- Semantic search (top-3 results)
- Groq Llama 3 answers (free tier)
- Source citations + similarity %

✅ **Fast & Free**
- 2-3 second response time
- Zero monthly cost
- Local ChromaDB (persistent)
- 5,000 tokens/min (Groq free tier)

---

## 🛠️ **Tech Stack**

| Component | Technology | Status |
|-----------|-----------|--------|
| **Backend** | FastAPI 0.109 | ✅ Live |
| **Frontend** | Next.js 16 + Tailwind | ✅ Live |
| **LLM** | Groq Llama 3 8B | ✅ Connected |
| **Embeddings** | SentenceTransformers | ✅ Working |
| **Vector DB** | ChromaDB (local) | ✅ Persistent |
| **Language** | Python 3.11+ / TypeScript 5.0 | ✅ Tested |

---

## 📊 **Quick Stats**

```
Lines of Code:        ~800
Files:                20+
Response Time:        2-3 seconds
Free Tier?            Yes ✅
Production Ready?     Yes ✅
Tested On:            Windows E:\ArchaeoMind
```

---

## 🚀 **Get Started in 5 Minutes**

### **Local Setup**
```bash
# Backend
cd backend && python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
echo GROQ_API_KEY=your_key > .env
uvicorn main:app --host 0.0.0.0 --port 8000

# Frontend (new terminal)
cd frontend && npm install
echo NEXTPUBLIC_API_URL=http://localhost:8000 > .env.local
npm run dev
```

### **Test It**
1. Open http://localhost:3000
2. Upload `data/harappan_pottery.txt`
3. Ask: "What was found at Harappa?"
4. ✅ Get answer + 3 sources + similarity scores

---

## 🌍 **Deployment** (Production in 30 min)

| Platform | Time | URL |
|----------|------|-----|
| **GitHub** | 5 min | github.com/hamsidhi/archaeomind |
| **Vercel** (Frontend) | 5 min | archaeomind.vercel.app |
| **Render** (Backend) | 10 min | archaeomind-backend.onrender.com |

**See:** `/docs/GITHUB_DEPLOYMENT.md` for step-by-step

---

## 📚 **Key Endpoints**

```
GET  /health                    Health check
POST /api/upload               Upload TXT file
POST /api/query                Ask question (RAG)
GET  /docs                     API documentation
```

---

## 🎓 **How RAG Works** (Simple)

```
1. Upload TXT
   ↓
2. Auto-chunk into 512-char pieces
   ↓
3. Generate embeddings (384D vectors)
   ↓
4. Store in ChromaDB (persistent)
   ↓
5. User asks question
   ↓
6. Search similar chunks (top-3)
   ↓
7. Pass to Groq Llama 3
   ↓
8. Return answer + sources + similarity %
```

---

## 🔐 **Security & Best Practices**

✅ No secrets in code  
✅ Environment variables only  
✅ .env files not in git  
✅ CORS configured  
✅ Input validation  
✅ Error handling  
✅ HTTPS ready  

---

## 📖 **Documentation**

| File | Purpose |
|------|---------|
| **README.md** | Main docs (complete) |
| **QUICK_START.md** | 5-min setup |
| **GITHUB_DEPLOYMENT.md** | Deploy guide |
| **DEPLOYMENT_CHECKLIST.md** | Verification |
| **ENV_SETUP.txt** | Environment templates |

---

## 🎯 **Phase 2+ Roadmap**

**Coming Soon:**
- [ ] PDF/DOCX parsing
- [ ] Image artifact analysis (CLIP)
- [ ] Timeline generation
- [ ] User authentication
- [ ] Advanced search filters

---

## 💡 **Key Learnings**

✅ **RAG architecture works perfectly**  
✅ **Groq free tier is enough**  
✅ **ChromaDB is fast & reliable**  
✅ **Next.js + FastAPI = best combo**  
✅ **Production deployment = simple**  

---

## 🎉 **Ready to Deploy?**

1. ✅ Code working? YES
2. ✅ Tests passing? YES
3. ✅ Docs complete? YES
4. ✅ Security verified? YES

**→ See `/docs/GITHUB_DEPLOYMENT.md` for exact steps**

---

**Built with ❤️ for archaeological research** 🏛️
