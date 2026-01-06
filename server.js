
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const payments = require("./payments");
const mpesaCallback = require("./mpesaCallback");

const app = express();

/* ✅ ENABLE CORS (CRITICAL) */
app.use(cors({
  origin: "*", // allow all origins (OK for now)
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use("/payments", payments);
app.use("/mpesa/callback", mpesaCallback);

// Optional root route (helps testing)
app.get("/", (req, res) => {
  res.send("OFFTHEHOOK M-Pesa API is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


