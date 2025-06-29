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

// Normalize utility
const normalize = (str) =>
  typeof str === 'string'
    ? str.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/+$/, '')
    : '';

// === POST /api/save ===
app.post('/api/save', (req, res) => {
  const { profile, history } = req.body;

  if (!profile || !history || !Array.isArray(history)) {
    return res.status(400).json({ message: 'Invalid payload' });
  }

  // --- Save profile to users.json ---
  const users = getUsers();
  const existingUserIndex = users.findIndex(u => u.email === profile.email);
  if (existingUserIndex !== -1) {
    users[existingUserIndex] = profile;
  } else {
    users.push(profile);
  }
  fs.writeFileSync(userFile, JSON.stringify(users, null, 2));

  // --- Save history to history.json with deduplication ---
  const allHistory = getHistory();
  const updatedHistory = [...allHistory];

  history.forEach(entry => {
    const normalizedEmail = normalize(profile.email);
    const normalizedURL = normalize(entry.url);

    const existingIndex = updatedHistory.findIndex(
      h => normalize(h.email) === normalizedEmail && normalize(h.url) === normalizedURL
    );

    const newEntry = {
      ...entry,
      email: profile.email,
      timestamp: new Date().toISOString()
    };

    if (existingIndex !== -1) {
      // Update existing entry
      updatedHistory[existingIndex] = { ...updatedHistory[existingIndex], ...newEntry };
      console.log(`🔁 Updated: ${entry.url}`);
    } else {
      // Add new entry
      updatedHistory.push(newEntry);
      console.log(`🆕 Added: ${entry.url}`);
    }
  });

  fs.writeFileSync(historyFile, JSON.stringify(updatedHistory, null, 2));
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
