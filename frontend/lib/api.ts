/**
 * API Client Helpers
 * Wraps fetch() calls to backend
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function uploadDocument(file: File): Promise<any> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/api/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.statusText}`);
  }

  return response.json();
}

export async function sendQuery(queryText: string): Promise<any> {
  const formData = new FormData();
  formData.append("query_text", queryText);

  const response = await fetch(`${API_URL}/api/query`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Query failed: ${response.statusText}`);
  }

  return response.json();
}
