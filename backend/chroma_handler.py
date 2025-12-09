import chromadb
import os

os.makedirs('chroma_data', exist_ok=True)
client = chromadb.PersistentClient(path='./chroma_data')
collection = client.get_or_create_collection('docs')
print(' ChromaDB ready')

def add(embeddings, texts, ids):
    collection.add(embeddings=[e.tolist() for e in embeddings], documents=texts, ids=ids)

def search(query_emb, k=4):
    results = collection.query(query_embeddings=[query_emb.tolist()], n_results=k)
    return results['documents'][0] if results['documents'] else []

db = {'add': add, 'search': search}
