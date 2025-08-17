const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { v4: uuidv4 } = require("uuid"); // for unique IDs

const app = express();
app.use(bodyParser.json());

// ✅ serve static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));

let workerLocations = {}; // stores all workers

// ✅ Receive worker location
app.post("/api/worker-location", (req, res) => {
  let { workerId, lat, lng, timestamp } = req.body;

  // If no workerId provided, generate one
  if (!workerId) {
    workerId = uuidv4();
    console.log(`Generated workerId for new device: ${workerId}`);
  }

  // Save/Update worker location
  workerLocations[workerId] = { lat, lng, timestamp };

  console.log(`Worker ${workerId}: ${lat}, ${lng}`);
  res.send({ status: "ok", workerId });
});

// ✅ Return all workers' latest locations
app.get("/api/all-locations", (req, res) => {
  res.json(workerLocations);
});

// ✅ Start server (Render uses process.env.PORT)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
