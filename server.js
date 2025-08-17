const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.json());

// Mock DB (replace with MongoDB/MySQL later)
app.get("/", (req, res) => {
  res.send("🚀 Geo Location Project backend is running on Render!");
});

// ✅ serve static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));

let workerLocations = {};

app.post("/api/worker-location", (req, res) => {
  const { workerId, lat, lng, timestamp } = req.body;

  // Save latest worker location
  workerLocations[workerId] = { lat, lng, timestamp };

  console.log(`Worker ${workerId}: ${lat}, ${lng}`);
  res.send({ status: "ok" });
});

app.get("/api/all-locations", (req, res) => {
  res.json(workerLocations);
});

app.listen(3000, () => console.log("Server running on port 3000"));
