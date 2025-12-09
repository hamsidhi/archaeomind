from sentence_transformers import SentenceTransformer
import numpy as np

print('🔄 Loading embeddings...')
model = SentenceTransformer('all-MiniLM-L6-v2')
print(' Embeddings ready')

def embed(text):
    if not text.strip(): return np.zeros(384)
    return model.encode(text)

embedder = embed
