import React from 'react';

function UserFeed({ feed }) {
  return (
    <div className="user-feed">
      <div className="feed-header">
        <h2>🌐 Community Feed</h2>
        <p>See what others are reading and watching</p>
      </div>
      
      <div className="feed-items">
        {feed.map(item => (
          <div key={item.id} className="feed-item">
            <div className="feed-user">
              <img src={item.user.avatar} alt={item.user.name} />
              <div className="user-details">
                <h4>{item.user.name}</h4>
                <span className="activity-time">{item.timeAgo}</span>
              </div>
            </div>
            
            <div className="feed-content">
              <p className="activity-text">
                {item.action} "{item.content.title}"
              </p>
              <div className="content-preview">
                <h5>{item.content.title}</h5>
                <p>{item.content.summary}</p>
                <a href={item.content.url} target="_blank" rel="noopener noreferrer">
                  View Content
                </a>
              </div>
            </div>
            
            <div className="feed-actions">
              <button>👍 Like</button>
              <button>💬 Comment</button>
              <button>📤 Share</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserFeed;
