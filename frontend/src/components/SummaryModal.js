import React from 'react';

function SummaryModal({ item, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>📋 AI Summary</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <h4>{item.title}</h4>
          <p className="summary-source">From: {item.source}</p>
          
          <div className="summary-content">
            <h5>🤖 LLM Summary:</h5>
            <p>{item.summary || 'Summary is being generated...'}</p>
          </div>
          
          <div className="summary-metadata">
            <p><strong>Reading Time:</strong> {item.readingTime || 'Unknown'}</p>
            <p><strong>Category:</strong> {item.category || 'Uncategorized'}</p>
          </div>
        </div>
        
        <div className="modal-footer">
          <button onClick={onClose}>Close</button>
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            Read Full Article
          </a>
        </div>
      </div>
    </div>
  );
}

export default SummaryModal;
