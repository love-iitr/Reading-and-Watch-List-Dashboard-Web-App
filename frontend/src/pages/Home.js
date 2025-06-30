import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultProfile from './user_alt.jpg';
import bgImage from './bg_image.jpg';

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
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100vh',
        width: '100vw',
        overflowX: 'hidden'
      }}
    >
      <div style={{ padding: '2rem' }}>
        <h2
          style={{
            background: 'linear-gradient(90deg, #4e54c8, #8f94fb)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
            fontSize: '2.2rem',
            letterSpacing: '1px',
            marginBottom: '1rem'
          }}
        >
          🧠 Reading Mirror: See What You've Explored


        </h2>
        
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'flex-start'
          }}
        >
          {users.map(user => (
            <li
              key={user.email}
              onClick={() => navigate(`/user/${encodeURIComponent(user.email)}`)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.7rem 1rem',         // Reduced padding
                border: 'none',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                boxShadow: '0 2px 8px rgba(78, 84, 200, 0.10)',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                minWidth: 200,
                maxWidth: 260,
                width: '100%',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(78, 84, 200, 0.16)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(78, 84, 200, 0.10)';
              }}
            >
              <img
                src={user.picture || defaultProfile}
                alt={user.name}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  marginRight: 12,
                  border: '2px solid #8f94fb',
                  background: '#fff'
                }}
              />
              <div>
                <strong style={{ color: '#4e54c8', fontSize: '1rem' }}>{user.name}</strong><br />
                <small style={{ color: '#555', fontSize: '0.88rem' }}>{user.email}</small>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
