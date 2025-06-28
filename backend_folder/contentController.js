const { writeData } = require('./fileHandler');

const saveContent = (req, res) => {
  const { profile, history } = req.body;

  if (!profile || !history || !Array.isArray(history)) {
    return res.status(400).json({ message: "Missing profile or history array" });
  }

  history.forEach(entry => {
    const newEntry = {
      timestamp: new Date().toISOString(),
      type: entry.type || 'visit',
      url: entry.url,
      content: entry.title,
      profile
    };
    writeData(newEntry);
  });

  res.status(200).json({ message: "✅ History received and saved." });
};

module.exports = { saveContent };
