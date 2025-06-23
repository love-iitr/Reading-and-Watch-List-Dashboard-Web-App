import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function UserProfile() {
  const { email } = useParams();
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userRes = await fetch('http://localhost:3000/api/users');
      const users = await userRes.json();
      const target = users.find(u => u.email === email);
      setUser(target);

      const historyRes = await fetch(`http://localhost:3000/api/history/${email}`);
      const historyData = await historyRes.json();
      setHistory(historyData);
    };

    fetchData();
  }, [email]);

  if (!user) return <p>Loading user profile...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <Link to="/">← Back</Link>
      <h2>{user.name}</h2>
      <img
        src={user.picture}
        alt={user.name}
        style={{ width: 80, height: 80, borderRadius: '50%' }}
      />
      <p>{user.email}</p>

      <h3 style={{ marginTop: '2rem' }}>Browsing History</h3>
      <ul>
        {history.map((entry, i) => (
          <li key={i} style={{ marginBottom: '1rem' }}>
            <a href={entry.url} target="_blank" rel="noopener noreferrer">
  {entry.title || entry.url}
</a>
<br />
            <small>{new Date(entry.timestamp).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserProfile;
