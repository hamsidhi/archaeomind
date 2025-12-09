# ArchaeoMind Phase 1 - Deployment Guide

**Status:** Production Ready | **Version:** 1.0.0 | **Date:** Dec 10, 2025

---

## 🎯 **Overview**

Deploy ArchaeoMind in 3 ways:

1. **Local:** Docker (3 min)
2. **GitHub → Vercel/Render:** Full production (25 min)
3. **Manual:** Step-by-step (custom)

---

## 📋 **Deployment Paths**

### Option 1: Docker Local (Fastest)

```bash
# Copy env template
cp backend/.env.example backend/.env
nano backend/.env  # Add GROQ_API_KEY

# Start everything
docker-compose up -d

# URLs
Frontend:  http://localhost:3000
Backend:   http://localhost:8000
Docs:      http://localhost:8000/docs

# Stop
docker-compose down
```

**Time:** 3 minutes  
**Best For:** Testing locally

---

### Option 2: GitHub → Vercel/Render (Production)

#### Part 1: Push to GitHub (5 min)

```bash
# Initialize git (if needed)
cd E:\ArchaeoMind
git init
git config user.name "Your Name"
git config user.email "your@email.com"

# Create GitHub repo first at github.com
# Then add remote:
git remote add origin https://github.com/YOUR_USERNAME/archaeomind.git

# Copy docs (PowerShell)
Copy-Item README_UPDATED.md docs\README.md
Copy-Item SUMMARY.md docs\SUMMARY.md
Copy-Item .\*.md docs\

# Stage & commit
git add .
git commit -m "🎉 ArchaeoMind Phase 1 MVP - RAG System"
git branch -M main
git push -u origin main

# Verify on github.com
```

**Check:**
- ✅ Code appears on GitHub
- ✅ .env files not visible
- ✅ All docs in /docs folder

---

#### Part 2: Deploy Frontend to Vercel (5 min)

**Step 1: Create Project**
1. Go to vercel.com
2. Sign up / Log in
3. Click "New Project"
4. Click "Import Git Repository"
5. Select your GitHub repo

**Step 2: Configure**
1. Set Root Directory: `frontend`
2. Click "Continue"

**Step 3: Environment Variables**
1. Add variable: `NEXTPUBLIC_API_URL`
2. Value: `http://localhost:8000` (temp, will update later)
3. Click "Deploy"

**Wait for deployment...**

**Get your URL:** https://archaeomind.vercel.app (example)

---

#### Part 3: Deploy Backend to Render (10 min)

**Step 1: Create Service**
1. Go to render.com
2. Sign up / Log in
3. Click "New +" → "Web Service"
4. Click "Connect Repository"
5. Select your GitHub repo
6. Click "Connect"

**Step 2: Configure**
1. Name: `archaeomind-backend`
2. Root Directory: `backend`
3. Runtime: Python 3.11
4. Build Command: `pip install -r requirements.txt`
5. Start Command: `uvicorn main:app --host 0.0.0.0`

**Step 3: Environment Variables**
Add these:
```
GROQ_API_KEY           gsk_your_actual_key
CHUNK_SIZE             512
CHUNK_OVERLAP          50
LLM_MODEL              llama-3.1-8b-instant
CORS_ORIGINS           https://archaeomind.vercel.app
```

**Step 4: Deploy**
Click "Create Web Service"

**Wait for deployment...**

**Get your URL:** https://archaeomind-backend.onrender.com (example)

---

#### Part 4: Link Services (2 min)

**Update Vercel:**
1. Go to Vercel project
2. Settings → Environment Variables
3. Update `NEXTPUBLIC_API_URL` to: `https://archaeomind-backend.onrender.com`
4. Click "Save"
5. Redeploy

**Update Render:**
1. Go to Render project
2. Settings → Environment
3. Update `CORS_ORIGINS` to: `https://archaeomind.vercel.app`
4. Click "Save"
5. Redeploy

---

#### Part 5: Test Production (3 min)

1. Go to `https://archaeomind.vercel.app`
2. Upload: `data/harappan_pottery.txt`
3. Chat: Ask a question
4. Verify: Answer + sources appear
5. Check network tab for API calls

**Success:** ✅ Production running!

---

## 🔧 **Manual Deployment** (Custom Server)

### AWS EC2 Example

```bash
# Launch EC2 instance (t3.small, Ubuntu)
ssh -i key.pem ubuntu@your-instance-ip

# Install dependencies
sudo apt update
sudo apt install python3.11 python3-pip nodejs npm

# Clone repo
git clone https://github.com/YOUR_USERNAME/archaeomind.git
cd archaeomind

# Backend setup
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
echo "GROQ_API_KEY=your_key" > .env

# Run with PM2 (persistent)
npm install -g pm2
pm2 start "uvicorn main:app --host 0.0.0.0" --name archaeomind-backend
pm2 save

# Frontend setup
cd ../frontend
npm install
npm run build
pm2 start "npm start" --name archaeomind-frontend
pm2 save

# Setup Nginx (reverse proxy)
sudo apt install nginx
# Configure nginx.conf to proxy to localhost:3000 and :8000

# Get SSL (Let's Encrypt)
sudo apt install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d yourdomain.com

# Start services
pm2 restart all
sudo service nginx restart
```

**URLs:**
- Frontend: https://yourdomain.com
- Backend: https://api.yourdomain.com

---

## 📊 **Deployment Comparison**

| Method | Time | Cost | Effort | Best For |
|--------|------|------|--------|----------|
| **Docker Local** | 3 min | $0 | Easy | Testing |
| **Vercel/Render** | 25 min | $0 | Easy | Production |
| **AWS EC2** | 30 min | $5-10/mo | Medium | Control |
| **Custom VPS** | 45 min | $5+/mo | Hard | Custom |

---

## 🔐 **Security Checklist**

- [ ] GROQ_API_KEY in environment only (not code)
- [ ] .env files in .gitignore
- [ ] CORS_ORIGINS set to specific domain
- [ ] HTTPS enabled (Vercel/Render auto)
- [ ] Error messages don't leak data
- [ ] No sensitive logs in console.log()
- [ ] Database credentials in environment
- [ ] Rate limiting configured

---

## 📈 **Monitoring** (Render/Vercel)

### Health Check
```bash
curl https://archaeomind-backend.onrender.com/health
→ {"status": "LIVE"}
```

### View Logs
- **Vercel:** Dashboard → Logs
- **Render:** Dashboard → Logs

### Monitor Performance
- **Vercel:** Analytics tab
- **Render:** Metrics tab

---

## 🐛 **Troubleshooting**

### Vercel Deployment Fails

**Check:**
1. Frontend directory correct: `frontend/`
2. build command: `npm run build`
3. start command: `npm start`
4. No hardcoded localhost URLs

**Fix:**
```javascript
// Use environment variable
const apiUrl = process.env.NEXTPUBLIC_API_URL;
fetch(`${apiUrl}/api/query`);
```

### Render Backend Won't Start

**Check logs:**
1. Go to Render dashboard
2. Click "Logs" tab
3. Look for error messages

**Common issues:**
- GROQ_API_KEY not set
- requirements.txt has errors
- Python version mismatch
- Port binding issue

**Fix:**
```bash
# Check locally first
pip install -r requirements.txt
uvicorn main:app
```

### CORS Errors in Production

**Error:** `Access to XMLHttpRequest has been blocked by CORS policy`

**Fix:**
1. Vercel has URL: `https://archaeomind.vercel.app`
2. Render needs: `CORS_ORIGINS=https://archaeomind.vercel.app`
3. Redeploy Render
4. Update Vercel `NEXTPUBLIC_API_URL` to Render URL
5. Redeploy Vercel

### File Upload Fails

**Check:**
1. Backend is responding
2. File size < 50MB
3. File format is TXT
4. Disk space available

**Debug:**
```bash
curl -X POST http://localhost:8000/api/upload \
  -F "file=@test.txt"
```

### Database Errors

**ChromaDB issues:**
```bash
# Clear and restart
rm -rf chroma_data/
docker-compose restart
```

**Verify:**
```bash
curl http://localhost:8000/health
```

---

## 📋 **Deployment Checklist**

### Before Deployment
- [ ] Code tested locally
- [ ] No console errors
- [ ] Upload works
- [ ] Query returns answer + sources
- [ ] .env files not in git
- [ ] Groq API key obtained
- [ ] GitHub account ready
- [ ] Vercel account ready
- [ ] Render account ready

### During GitHub Push
- [ ] Repository created
- [ ] .gitignore includes .env
- [ ] Code committed
- [ ] Push successful
- [ ] Code visible on GitHub

### During Vercel Deploy
- [ ] Project imported
- [ ] frontend directory selected
- [ ] NEXTPUBLIC_API_URL set
- [ ] Build successful
- [ ] Frontend loads

### During Render Deploy
- [ ] Service created
- [ ] backend directory selected
- [ ] Environment variables added
- [ ] Build successful
- [ ] Health check passes

### After Deployment
- [ ] Update Vercel env var
- [ ] Update Render CORS_ORIGINS
- [ ] Redeploy both
- [ ] Test upload + query
- [ ] Verify logs clean
- [ ] Monitor performance

---

## 🚀 **Post-Deployment**

### Setup Monitoring
```bash
# Vercel Analytics
Dashboard → Analytics tab → Enable

# Render Metrics
Dashboard → Metrics tab → View
```

### Setup Alerts
- Vercel: Settings → Alerts
- Render: Settings → Alerts

### Backup Strategy
- Code: GitHub (automatic)
- Data: Export ChromaDB regularly

### Update Strategy
```bash
# Make changes locally
git add .
git commit -m "Feature: X"
git push

# Vercel auto-deploys on git push
# Update environment vars if needed
```

---

## 📞 **Support**

| Issue | Solution |
|-------|----------|
| Deployment fails | Check logs in platform dashboard |
| CORS errors | Update env vars + redeploy |
| Slow queries | Check Groq rate limits |
| Upload fails | Verify file size < 50MB |
| Not responding | Restart service (Render/Vercel) |

---

## ✅ **Success Indicators**

You're done when:
- ✅ Frontend loads at production URL
- ✅ Backend responds at /health
- ✅ Upload endpoint works
- ✅ Query endpoint returns answer + sources
- ✅ No errors in logs
- ✅ Response time < 5 seconds
- ✅ Team can access URL

---

**Status:** 🟢 Ready to Deploy  
**Version:** 1.0.0  
**Last Updated:** December 10, 2025

Get help: See README_UPDATED.md or GITHUB_DEPLOYMENT.md
