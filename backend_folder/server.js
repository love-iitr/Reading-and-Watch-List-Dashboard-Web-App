const express = require("express");
const cors = require("cors");
const contentRoutes = require("./contentRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Enable CORS before routes
app.use(cors({
  origin: "http://localhost:3001",
  credentials: true
}));

// ✅ Middleware
app.use(express.json());

// ✅ Content-related routes (e.g. /api/save)
app.use("/api", contentRoutes);

// ✅ /api/user — return mock user info
app.get("/api/user", (req, res) => {
  res.json({
    user: {
      name: "Geeta",
      email: "geeta@example.com"
    }
  });
});

// ✅ /api/lists — return readingList, watchList, and userFeed
app.get("/api/lists", (req, res) => {
  res.json({
    readingList: [
      {
        id: 1,
        title: "Understanding React useEffect",
        url: "https://reactjs.org/docs/hooks-effect.html"
      }
    ],
    watchList: [
      {
        id: 2,
        title: "How LLMs Work",
        url: "https://www.youtube.com/watch?v=WXuK6gekU1Y"
      }
    ],
    userFeed: [
      {
        id: 3,
        user: "Alice",
        type: "article",
        title: "A great post on WebGPU"
      }
    ]
  });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
