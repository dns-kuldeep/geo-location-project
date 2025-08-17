const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.json());

// ✅ Serve static files (frontend)
app.use(express.static(path.join(__dirname, "public")));

let workerLocations = {}; // Stores latest location per worker

// ✅ Save worker location
app.post("/api/worker-location", (req, res) => {
  const { workerId, lat, lng, timestamp } = req.body;

  // Store the latest location
  workerLocations[workerId] = { lat, lng, timestamp };

  console.log(`Worker ${workerId}: ${lat}, ${lng}`);
  res.send({ status: "ok" });
});

// ✅ Fetch all worker locations
app.get("/api/all-locations", (req, res) => {
  res.json(workerLocations);
});

// ✅ Root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ Use Render’s PORT or local
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
