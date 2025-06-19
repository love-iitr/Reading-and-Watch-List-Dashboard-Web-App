const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, './data.json');

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

  existingData.push(newEntry);

  try {
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
  } catch (err) {
    console.error("❌ Error writing to data.json:", err);
  }
};

module.exports = { writeData };
