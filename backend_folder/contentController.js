const { writeData } = require('./fileHandler');

const saveContent = (req, res) => {
  const { type, url, content } = req.body;

  if (!url || !content) {
    return res.status(400).json({ message: "Missing URL or content" });
  }

  const newEntry = {
    timestamp: new Date().toISOString(),
    type,
    url,
    content
  };

  writeData(newEntry); // Save to data.json
  res.status(200).json({ message: "✅ Content received and saved." });
};

module.exports = { saveContent };
