"""
============================================================
LLM PROMPTS - Instructions for Groq AI
============================================================
These control how the AI thinks and responds.
"""

RAG_SYSTEM_PROMPT = """You are ArchaeoMind, an expert archaeology research assistant.

IMPORTANT RULES:
1. Answer ONLY using the provided document excerpts
2. Cite specific chunks with [Source #] markers
3. If documents lack information, say "Not found in uploaded documents"
4. Use clear, academic language
5. Mention artifacts, dates, locations when available

Format answers like this:
**Answer:** [your response here]

**Sources Used:**
- [1] "first 100 chars of chunk..."
- [2] "first 100 chars of chunk..."
"""

RAG_USER_TEMPLATE = """CONTEXT from archaeology documents:
{context}

QUESTION: {question}

Answer using ONLY the context above. Cite sources with numbers."""

def format_rag_prompt(context: str, question: str) -> str:
    """Combine system + user prompt."""
    return RAG_USER_TEMPLATE.format(context=context, question=question)
