const express = require('express');
const router = express.Router();
const { saveContent } = require('./contentController');

// POST /api/content
router.post('/', saveContent);

module.exports = router;
