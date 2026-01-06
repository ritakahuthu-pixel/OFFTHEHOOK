require("dotenv").config();
const express = require("express");

// Import local modules (match repo files exactly)
const payments = require("./payments");
const mpesaCallback = require("./mpesaCallback");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check (VERY important for Render)
app.get("/", (req, res) => {
  res.status(200).send("API is running");
});

// Routes
app.use("/api/payments", payments);
app.post("/api/mpesa/callback", mpesaCallback);

// Port (Render provides PORT automatically)
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
