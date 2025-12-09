import os
from dotenv import load_dotenv

load_dotenv()  # Load .env file

# Get API key (no error checking for imports)
GROQ_API_KEY = os.getenv('GROQ_API_KEY')
LLM_MODEL = os.getenv('LLM_MODEL', 'llama3-8b-8192')
CHUNK_SIZE = 800
TOP_K = 4

print(' Config loaded successfully')
print(f' Key preview: {GROQ_API_KEY[:10] if GROQ_API_KEY else "MISSING"}...')
