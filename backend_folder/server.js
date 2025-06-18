const express = require("express");
const bodyParser = require("body-parser");
const contentRoutes = require("./contentRoutes");

const app = express();
const PORT = process.env.PORT || 3000;



app.use(bodyParser.json());
app.use("/api/content", contentRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
