const API_BASE = 'http://localhost:5000/api';

export async function fetchUserData() {
  const response = await fetch(`${API_BASE}/user`);
  if (!response.ok) throw new Error('Failed to fetch user data');
  return response.json();
}

export async function fetchUserLists() {
  const response = await fetch(`${API_BASE}/lists`);
  if (!response.ok) throw new Error('Failed to fetch lists');
  return response.json();
}

export async function sendContentToSummarize(contentData) {
  const response = await fetch(`${API_BASE}/summarize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contentData)
  });
  if (!response.ok) throw new Error('Failed to send content');
  return response.json();
}
