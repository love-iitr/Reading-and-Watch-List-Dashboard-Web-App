import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import ReadingHistory from './components/History/ReadingHistory';
import WatchHistory from './components/History/WatchHistory';
import Navbar from './components/Common/Navbar';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<AuthenticatedApp />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

function AuthenticatedApp() {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reading-history" element={<ReadingHistory />} />
          <Route path="/watch-history" element={<WatchHistory />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
