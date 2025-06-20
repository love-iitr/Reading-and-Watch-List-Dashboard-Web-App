import React from 'react';
import ContentCard from './ContentCard';

function ReadingList({ items }) {
  return (
    <div className="content-list">
      <div className="list-header">
        <h2>📚 Your Reading List</h2>
        <p>Articles tracked by your browser extension</p>
      </div>
      
      <div className="content-grid">
        {items.map(item => (
          <ContentCard 
            key={item.id} 
            item={item} 
            type="article"
          />
        ))}
      </div>
      
      {items.length === 0 && (
        <div className="empty-state">
          <p>No articles yet! Install the browser extension to start tracking your reading.</p>
        </div>
      )}
    </div>
  );
}

export default ReadingList;
