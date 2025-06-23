import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error("Error fetching users:", err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>User List</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.map(user => (
          <li
            key={user.email}
            onClick={() => navigate(`/user/${encodeURIComponent(user.email)}`)}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '1rem',
              border: '1px solid #ccc',
              borderRadius: '10px',
              marginBottom: '1rem',
              cursor: 'pointer'
            }}
          >
            <img
              src={user.picture}
              alt={user.name}
              style={{ width: 50, height: 50, borderRadius: '50%', marginRight: 15 }}
            />
            <div>
              <strong>{user.name}</strong><br />
              <small>{user.email}</small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
