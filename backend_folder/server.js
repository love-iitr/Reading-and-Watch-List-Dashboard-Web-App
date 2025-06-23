const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// === MIDDLEWARE ===
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));
app.use(express.json());

// === HELPERS ===

// Paths
const userFile = path.join(__dirname, 'data', 'users.json');
const historyFile = path.join(__dirname, 'data', 'history.json');

// Read users.json
const getUsers = () => {
  try {
    return JSON.parse(fs.readFileSync(userFile, 'utf-8'));
  } catch {
    return [];
  }
};

// Read history.json
const getHistory = () => {
  try {
    return JSON.parse(fs.readFileSync(historyFile, 'utf-8'));
  } catch {
    return [];
  }
};

// Group history by user
const groupByUser = () => {
  const users = getUsers();
  const history = getHistory();
  return users.map(user => ({
    ...user,
    history: history.filter(h => h.email === user.email)
  }));
};

// === POST /api/save ===
app.post('/api/save', (req, res) => {
  const { profile, history } = req.body;
  if (!profile || !history || !Array.isArray(history)) {
    return res.status(400).json({ message: 'Invalid payload' });
  }

  // Save profile to users.json
  const users = getUsers();
  const existingIndex = users.findIndex(u => u.email === profile.email);
  if (existingIndex !== -1) {
    users[existingIndex] = profile;
  } else {
    users.push(profile);
  }
  fs.writeFileSync(userFile, JSON.stringify(users, null, 2));

  // Save history to history.json (attach user email)
  const allHistory = getHistory();
  const newEntries = history.map(entry => ({
    ...entry,
    email: profile.email
  }));
  allHistory.push(...newEntries);
  fs.writeFileSync(historyFile, JSON.stringify(allHistory, null, 2));

  console.log("✅ Data saved to users.json and history.json");
  res.status(200).json({ message: "Data saved successfully" });
});

// === GET all users (without history)
app.get('/api/users', (req, res) => {
  const users = getUsers().map(({ email, name, picture }) => ({
    email, name, picture
  }));
  res.json(users);
});

// === GET user history by email
app.get('/api/history/:email', (req, res) => {
  const email = req.params.email;
  const history = getHistory().filter(h => h.email === email);
  if (history.length === 0) return res.status(404).json({ message: 'User not found or no history' });
  res.json(history);
});

// === Fallback for unknown routes
app.all('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// === Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
