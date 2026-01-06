const express = require("express");
require("dotenv").config();

const paymentsRoutes = require("./payments");
const mpesaCallback = require("./mpesaCallback");

const app = express();
app.use(express.json());

app.use("/payments", paymentsRoutes);
app.use("/mpesa/callback", mpesaCallback);

app.get("/", (req, res) => {
  res.send("🚀 OFFTHEHOOK Daraja LIVE API running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});


