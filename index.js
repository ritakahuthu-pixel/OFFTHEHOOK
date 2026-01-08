const express = require("express");
const cors = require("cors");
require("dotenv").config();

const paymentsRoutes = require("./payments");
const mpesaCallbackRoutes = require("./mpesaCallback");

const app = express();

/* MIDDLEWARE — MUST COME FIRST */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* HEALTH CHECK */
app.get("/", (req, res) => {
  res.send("OFFTHEHOOK API is live");
});

/* ROUTES */
app.use("/payments", paymentsRoutes);
app.use("/mpesa", mpesaCallbackRoutes);

/* SERVER */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
