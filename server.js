require("dotenv").config();
const express = require("express");

const payments = require("./payments");
const mpesaCallback = require("./mpesaCallback");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("API is running");
});

app.use("/api/payments", payments);
app.use("/api/mpesa/callback", mpesaCallback);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

