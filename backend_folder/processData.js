const fs = require('fs');
const path = require('path');

const inputFilePath = path.join(__dirname, 'data', 'data.json');
const usersFilePath = path.join(__dirname, 'data', 'users.json');
const historyFilePath = path.join(__dirname, 'data', 'history.json');

try {
  const raw = fs.readFileSync(inputFilePath, 'utf8');
  const allData = JSON.parse(raw);

  const userMap = new Map();
  const history = [];

  for (const entry of allData) {
    const { profile, ...visit } = entry;

    // ✅ Use email as fallback ID if no profile.id
    const userId = profile?.id || profile?.email;

    if (!profile || !userId) continue;

    // Add unique user using userId
    if (!userMap.has(userId)) {
      userMap.set(userId, { ...profile, id: userId });
    }

    // Add visit with userId
    history.push({
      ...visit,
      userId: userId
    });
  }

  // Write users.json
  fs.writeFileSync(usersFilePath, JSON.stringify([...userMap.values()], null, 2));
  console.log("✅ users.json written successfully");

  // Write history.json
  fs.writeFileSync(historyFilePath, JSON.stringify(history, null, 2));
  console.log("✅ history.json written successfully");

} catch (err) {
  console.error("❌ Error processing data:", err.message);
}
