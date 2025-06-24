const API_BASE = 'http://localhost:3000/api';

export async function fetchUserData() {
  const res = await fetch(`${API_BASE}/user`);
  if (!res.ok) throw new Error('Failed to fetch user data');
  return res.json();
}
export async function fetchUserByEmail(email) {
  const res = await fetch(`${API_BASE}/user/${encodeURIComponent(email)}`);
  if (!res.ok) throw new Error(`Failed to fetch user: ${email}`);
  return res.json();
}


