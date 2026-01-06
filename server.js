require("dotenv").config();
const express = require("express");
const payments = require("./routes/payments");
const { handleCallback } = require("./callbacks/mpesaCallback");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/payments", payments);
app.post("/api/mpesa/callback", handleCallback);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
