import React from 'react';

function Profile({ user }) {
  return (
    <div className="profile-card">
      <div className="profile-avatar">
        <img src={user?.avatar || '/default-avatar.png'} alt="Profile" />
      </div>
      <h3>{user?.name || 'Your Name'}</h3>
      <p className="profile-bio">{user?.bio || 'Share your reading journey'}</p>
      
      <div className="profile-stats">
        <div className="stat">
          <span className="stat-number">{user?.totalRead || 0}</span>
          <span className="stat-label">Articles Read</span>
        </div>
        <div className="stat">
          <span className="stat-number">{user?.totalWatched || 0}</span>
          <span className="stat-label">Videos Watched</span>
        </div>
        <div className="stat">
          <span className="stat-number">{user?.followers || 0}</span>
          <span className="stat-label">Followers</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
