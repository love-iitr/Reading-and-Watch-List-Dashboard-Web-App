import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Profile from './components/Profile';
import ReadingList from './components/ReadingList';
import WatchList from './components/WatchList';
import UserFeed from './components/UserFeed';
import { fetchUserData, fetchUserLists } from './api/api';
import './styles/App.css';

function App() {
  const [activeTab, setActiveTab] = useState('reading');
  const [user, setUser] = useState(null);
  const [readingList, setReadingList] = useState([]);
  const [watchList, setWatchList] = useState([]);
  const [userFeed, setUserFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await fetchUserData();
        const listsData = await fetchUserLists();
        
        setUser(userData.user);
        setReadingList(listsData.readingList);
        setWatchList(listsData.watchList);
        setUserFeed(listsData.userFeed);
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div className="loading">Loading your reading & watch lists...</div>;
  }

  return (
    <div className="App">
      <Header user={user} />
      
      <div className="main-container">
        <div className="sidebar">
          <Profile user={user} />
          
          <nav className="nav-tabs">
            <button 
              className={activeTab === 'reading' ? 'active' : ''}
              onClick={() => setActiveTab('reading')}
            >
              📚 Reading List ({readingList.length})
            </button>
            <button 
              className={activeTab === 'watching' ? 'active' : ''}
              onClick={() => setActiveTab('watching')}
            >
              🎥 Watch List ({watchList.length})
            </button>
            <button 
              className={activeTab === 'feed' ? 'active' : ''}
              onClick={() => setActiveTab('feed')}
            >
              🌐 Community Feed
            </button>
          </nav>
        </div>

        <div className="content-area">
          {activeTab === 'reading' && <ReadingList items={readingList} />}
          {activeTab === 'watching' && <WatchList items={watchList} />}
          {activeTab === 'feed' && <UserFeed feed={userFeed} />}
        </div>
      </div>
    </div>
  );
}

export default App;
