
require("dotenv").config();
const express = require("express");
const payments = require("./routes/payments");
const { handleCallback } = require("./callbacks/mpesaCallback");
const app = express();
app.use(express.json());
app.use("/api/payments", payments);
app.post("/api/mpesa/callback", handleCallback);
app.listen(process.env.PORT, () => console.log("Server running"));
