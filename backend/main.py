import os
from dotenv import load_dotenv
load_dotenv()
os.environ['GROQ_API_KEY'] = "gsk_xxxxxxxx"  
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from sentence_transformers import SentenceTransformer
import chromadb

app = FastAPI(title=' ArchaeoMind')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

# LAZY LOAD EVERYTHING
model = None
collection = None
client_groq = None

def get_model():
    global model
    if model is None:
        print(' Loading embeddings...')
        model = SentenceTransformer('all-MiniLM-L6-v2')
        print(' Embeddings ready')
    return model

def get_db():
    global collection
    if collection is None:
        print(' Loading ChromaDB...')
        client = chromadb.Client()
        collection = client.create_collection('docs')
        print('✅ ChromaDB ready')
    return collection

def get_groq():
    global client_groq
    if client_groq is None:
        print('🔄 Loading Groq...')
        from groq import Groq
        client_groq = Groq()
        print('✅ Groq ready')
    return client_groq

def embed(text):
    return get_model().encode(text) if text.strip() else np.zeros(384)

def ingest(text, filename):
    coll = get_db()
    chunks = [text[i:i+800] for i in range(0, len(text), 400)]
    embeddings = [embed(c) for c in chunks]
    ids = [f'{filename}_{i}' for i in range(len(chunks))]
    coll.add(embeddings=[e.tolist() for e in embeddings], documents=chunks, ids=ids)
    return {'chunks': len(chunks)}

def query(question):
    coll = get_db()
    client = get_groq()
    q_emb = embed(question)
    results = coll.query(query_embeddings=[q_emb.tolist()], n_results=3)
    chunks = results['documents'][0] if results['documents'] else []
    context = '\n'.join(chunks)
    response = client.chat.completions.create(
        model='llama-3.1-8b-instant',  #  CORRECT MODEL ID
        messages=[{'role': 'user', 'content': f'Docs:\n{context}\n\nQ: {question}\n\nAnswer concisely with sources.'}]
    )
    return {'answer': response.choices[0].message.content, 'sources': chunks}

@app.get('/health')
def health():
    return {'status': 'LIVE'}

@app.post('/api/upload')
async def upload(file: UploadFile = File(...)):
    content = await file.read()
    text = content.decode('utf-8')
    result = ingest(text, file.filename or 'doc.txt')
    return {'status': 'success', **result}

@app.post('/api/query')
async def ask(q: str = Form(...)):
    result = query(q)
    return result

if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000, log_level='info')
