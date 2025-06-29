import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { summarizeWithWebLLM } from '../llmClient';
import defaultProfile from './user_alt.jpg'; 
import './UserProfile.css';

function UserProfile() {
  const { email } = useParams();
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null); 
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handleSelection = (idx) => {
    setSelectedIndex(idx === selectedIndex ? null : idx);
  };

  const handleSummarize = async () => {
    if (selectedIndex === null) return;
    setLoading(true);
    try {
      const entry = history[selectedIndex];
      const inputText = entry.title || entry.url;
      const localSummary = await summarizeWithWebLLM(inputText);
      setSummary(localSummary || 'No summary received');
    } catch (error) {
      setSummary('⚠️ Failed to generate summary.');
      console.error('LLM Frontend Error:', error);
    }
    setLoading(false);
  };

  if (!user) return (
    <div className="userprofile-loadingcontainer">
      <div className="userprofile-spinner"></div>
      <p>Loading user profile...</p>
    </div>
  );

  return (
    <div className="userprofile-container">
      <div className="userprofile-card">
        <Link to="/" className="userprofile-backlink">← Back to Users</Link>
        
        <div className="userprofile-profileheader">
          <img
            src={user.picture || defaultProfile}
            alt={user.name}
            className="userprofile-profileimage"
          />
          <div>
            <h2 className="userprofile-profilename">{user.name}</h2>
            <p className="userprofile-profileemail">{user.email}</p>
          </div>
        </div>

        <div className="userprofile-section">
          <h3 className="userprofile-sectiontitle">📚 Browsing History</h3>
          <p className="userprofile-sectionsubtitle">Select one item to summarize</p>
          
          <div className="userprofile-historycontainer">
            {history.map((entry, i) => (
              <div 
                key={i} 
                className={`userprofile-historyitem${selectedIndex === i ? ' selected' : ''}`}
                onClick={() => handleSelection(i)}
              >
                <input
                  type="radio"
                  name="history"
                  checked={selectedIndex === i}
                  onChange={() => handleSelection(i)}
                  className="userprofile-radio"
                />
                <div className="userprofile-historycontent">
                  <a 
                    href={entry.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="userprofile-historylink"
                    onClick={e => e.stopPropagation()}
                  >
                    {entry.title || entry.url}
                  </a>
                  <p className="userprofile-historytimestamp">
                    {new Date(entry.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {selectedIndex !== null && (
            <button 
              onClick={handleSummarize} 
              className="userprofile-summarizebutton"
              disabled={loading}
            >
              {loading ? 'Summarizing...' : 'Summarize Selected'}
            </button>
          )}
        </div>

        {summary && (
          <div className="userprofile-summarysection">
            <h4 className="userprofile-summarytitle">🧠 AI Summary</h4>
            <div className="userprofile-summarybox">
              <p className="userprofile-summarytext">{summary}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
