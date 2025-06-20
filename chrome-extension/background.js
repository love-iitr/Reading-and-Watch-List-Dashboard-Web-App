let lastSentId = null;
let userProfile = null;

// Fetch user profile via OAuth2
function fetchUserProfile() {
  chrome.identity.getAuthToken({ interactive: false }, function(token) {
    if (chrome.runtime.lastError || !token) {
      // Not signed in or permission not granted; try interactive
      chrome.identity.getAuthToken({ interactive: true }, function(token) {
        if (chrome.runtime.lastError || !token) return;
        getUserInfo(token);
      });
    } else {
      getUserInfo(token);
    }
  });
}

function getUserInfo(token) {
  fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + token)
    .then(response => response.json())
    .then(data => {
      userProfile = {
        email: data.email,
        id: data.id,
        name: data.name || 'Unknown',
        picture: data.picture || ''
      };
      chrome.storage.local.set({ userProfile });
    })
    .catch(error => {
      console.error('Failed to fetch user info:', error);
    });
}

// Auto-send new history to backend
setInterval(() => {
  chrome.storage.local.get(['userProfile', 'visitHistory'], function(result) {
    if (!userProfile) userProfile = result.userProfile;
    const profile = result.userProfile;
    const history = result.visitHistory || [];
    if (!userProfile) return;

    // Find new entries since last send
    let newEntries = [];
    if (lastSentId) {
      const lastIndex = history.findIndex(entry => entry.id === lastSentId);
      newEntries = lastIndex >= 0 ? history.slice(lastIndex + 1) : history;
    } else if (history.length > 0) {
      newEntries = history;
    }

    if (newEntries.length > 0) {
      lastSentId = newEntries[newEntries.length - 1].id;
      const payload = {
        profile: userProfile,
        history: newEntries
      };
      fetch('http://localhost:3000/api/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(response => {
        if (!response.ok) {
            console.error('Backend responded with an error:', response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log('Successfully sent data to backend:', data);
    })
    
  }
  });
}, 1000); // Check every second

// Track browsing
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === 'complete' &&
    tab.url &&
    (tab.url.startsWith('http://') || tab.url.startsWith('https://'))
  ) {
    chrome.storage.local.get(['visitHistory'], function(result) {
      let history = result.visitHistory || [];
      const id = Date.now().toString();
      const visitData = {
        id,
        url: tab.url,
        title: tab.title || 'No Title',
        domain: new URL(tab.url).hostname,
        timestamp: new Date().toISOString(),
        date: new Date().toDateString()
      };
      history.push(visitData);
      if (history.length > 1000) {
        history = history.slice(-1000);
      }
      chrome.storage.local.set({ visitHistory: history });
    });
  }
});

// Fetch profile when extension starts
fetchUserProfile();
