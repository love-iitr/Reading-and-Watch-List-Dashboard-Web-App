document.addEventListener('DOMContentLoaded', function() {
    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    const profilePicture = document.getElementById('profilePicture');
    const viewHistoryBtn = document.getElementById('viewHistory');
    const historyContainer = document.getElementById('historyContainer');
    const historyList = document.getElementById('historyList');
    const exportBtn = document.getElementById('exportData');
    const clearBtn = document.getElementById('clearHistory');
  
    // Load profile and stats
    chrome.storage.local.get(['userProfile'], function(result) {
      const profile = result.userProfile;
      if (profile) {
        profileName.textContent = profile.name;
        profileEmail.textContent = profile.email;
        if (profile.picture) profilePicture.src = profile.picture;
      }
    });
  
    loadStats();
  
    // History logic
    viewHistoryBtn.addEventListener('click', function() {
      chrome.storage.local.get(['visitHistory'], function(result) {
        const history = result.visitHistory || [];
        if (history.length === 0) {
          alert('No browsing history found. Visit some websites first!');
          historyList.innerHTML = '<div>No browsing history found.</div>';
          return;
        }
        historyContainer.style.display = 'block';
        let html = '<div class="history-items">';
        history.slice(-10).reverse().forEach(visit => {
          html += `
            <div class="history-item">
              <div class="title"><a href="${visit.url}" target="_blank">${visit.title}</a></div>
              <div class="domain">${visit.domain}</div>
              <div class="time">${new Date(visit.timestamp).toLocaleString()}</div>
            </div>`;
        });
        html += '</div>';
        historyList.innerHTML = html;
      });
    });
  
    exportBtn.addEventListener('click', function() {
      chrome.storage.local.get(['visitHistory'], function(result) {
        const history = result.visitHistory || [];
        const dataStr = JSON.stringify(history, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `reading-history-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
      });
    });
  
    clearBtn.addEventListener('click', function() {
      if (confirm('Are you sure you want to clear all history?')) {
        chrome.storage.local.set({ visitHistory: [] }, function() {
          loadStats();
          historyContainer.style.display = 'none';
        });
      }
    });
  
    function loadStats() {
      chrome.storage.local.get(['visitHistory'], function(result) {
        const history = result.visitHistory || [];
        const today = new Date().toDateString();
        const todayVisits = history.filter(visit => new Date(visit.timestamp).toDateString() === today);
        document.getElementById('todayCount').textContent = `Today: ${todayVisits.length} visits`;
        document.getElementById('totalCount').textContent = `Total: ${history.length} visits`;
      });
    }
  });
  