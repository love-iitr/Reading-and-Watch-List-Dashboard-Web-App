const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const filePath = path.join(__dirname, './data/data.json');

// Normalize a URL by trimming, lowercasing, and removing protocol/trailing slashes
const normalizeURL = (url) =>
  url?.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/+$/, '');

// Normalize email by trimming and lowercasing
const normalizeEmail = (email) => email?.trim().toLowerCase();

const writeData = (newEntry) => {
  let existingData = [];

  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath);
      existingData = JSON.parse(raw);
    }
  } catch (err) {
    console.error("❌ Error reading data.json:", err);
  }

  const normalizedNewURL = normalizeURL(newEntry.url);
  const normalizedNewEmail = normalizeEmail(newEntry.email);

  // Find existing entry with same email + URL
  const index = existingData.findIndex(
    (entry) =>
      normalizeURL(entry.url) === normalizedNewURL &&
      normalizeEmail(entry.email) === normalizedNewEmail
  );

  if (index !== -1) {
    // Update existing entry
    existingData[index] = {
      ...existingData[index],
      ...newEntry,
      time: new Date().toISOString(),
    };
    console.log("🔁 Duplicate URL for same user. Entry updated.");
  } else {
    // Add new entry
    existingData.push({
      ...newEntry,
      time: new Date().toISOString(),
    });
    console.log("🆕 New URL added.");
  }

  try {
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
    console.log("✅ Data written to data.json");

    // Optional: run script after saving
    exec('node ./processData.js', { cwd: __dirname }, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error running processData.js: ${error.message}`);
        return;
      }
      console.log(stdout);
    });
  } catch (err) {
    console.error("❌ Error writing to data.json:", err);
  }
};

module.exports = { writeData };
