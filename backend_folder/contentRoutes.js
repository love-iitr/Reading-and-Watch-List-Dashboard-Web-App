const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { saveContent } = require('./contentController');

const dataPath = path.join(__dirname, 'data.json');

// POST /api/content
router.post('/', saveContent);

router.get('/history', (req, res) => {
  if (!fs.existsSync(dataPath)) {
    return res.json([]);
  }
  try {
    const rawData = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(rawData);
    res.json(data);
  } catch (err) {
    console.error('❌ Error reading history:', err);
    res.status(500).json({ message: 'Error reading history data.' });
  }
});

module.exports = router;
