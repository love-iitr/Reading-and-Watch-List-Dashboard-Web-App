import React from 'react';
import ContentCard from './ContentCard';

function WatchList({ items }) {
  return (
    <div className="content-list">
      <div className="list-header">
        <h2>🎥 Your Watch List</h2>
        <p>Videos tracked by your browser extension</p>
      </div>
      
      <div className="content-grid">
        {items.map(item => (
          <ContentCard 
            key={item.id} 
            item={item} 
            type="video"
          />
        ))}
      </div>
      
      {items.length === 0 && (
        <div className="empty-state">
          <p>No videos yet! Your extension will automatically track meaningful content.</p>
        </div>
      )}
    </div>
  );
}

export default WatchList;
