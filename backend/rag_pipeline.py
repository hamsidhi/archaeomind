import numpy as np
from groq import Groq
from config import GROQ_API_KEY, LLM_MODEL, CHUNK_SIZE, TOP_K
from embeddings import embedder
from chroma_handler import db
from prompts import RAG_PROMPT

client = Groq(api_key=GROQ_API_KEY)

class RAG:
    def ingest(self, text, filename):
        chunks = [text[i:i+CHUNK_SIZE] for i in range(0, len(text), CHUNK_SIZE//2)]
        embeddings = [embedder.embed(c) for c in chunks]
        ids = [f'{filename}_{i}' for i in range(len(chunks))]
        db.add(embeddings, chunks, ids)
        return {'chunks': len(chunks)}
    
    def query(self, question):
        q_emb = embedder.embed(question)
        chunks = db.search(q_emb, TOP_K)
        context = '\\n'.join(chunks)
        response = client.chat.completions.create(
            model=LLM_MODEL,
            messages=[{'role': 'user', 'content': RAG_PROMPT.format(context=context, question=question)}]
        )
        return {'answer': response.choices[0].message.content, 'sources': chunks}

rag = RAG()
