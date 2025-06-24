const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const filePath = path.join(__dirname, './data/data.json');

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
    console.log("✅ New data written to data.json");

    // Optional: auto-process data
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
