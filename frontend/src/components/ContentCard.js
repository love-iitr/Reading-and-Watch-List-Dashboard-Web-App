import React, { useState } from 'react';
import SummaryModal from './SummaryModal';

function ContentCard({ item, type }) {
  const [showSummary, setShowSummary] = useState(false);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <>
      <div className="content-card">
        <div className="card-header">
          <span className="content-type">
            {type === 'article' ? '📄' : '🎥'} {type}
          </span>
          <span className="date">{formatDate(item.dateAdded)}</span>
        </div>
        
        <h3 className="content-title">{item.title}</h3>
        <p className="content-source">{item.source}</p>
        
        <div className="content-preview">
          <p>{item.preview || 'No preview available'}</p>
        </div>
        
        <div className="card-actions">
          <button 
            className="btn-summary"
            onClick={() => setShowSummary(true)}
            disabled={!item.summary}
          >
            📋 View Summary
          </button>
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="btn-visit">
            🔗 Visit
          </a>
          <button className="btn-share">
            📤 Share
          </button>
        </div>
        
        <div className="content-tags">
          {item.tags && item.tags.map(tag => (
            <span key={tag} className="tag">#{tag}</span>
          ))}
        </div>
      </div>
      
      {showSummary && (
        <SummaryModal 
          item={item} 
          onClose={() => setShowSummary(false)} 
        />
      )}
    </>
  );
}

export default ContentCard;
