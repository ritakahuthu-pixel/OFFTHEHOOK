const express = require("express");
const cors = require("cors");
require("dotenv").config();

const payments = require("./payments");
const mpesaCallback = require("./mpesaCallback");

const app = express();

app.use(cors());
app.use(express.json());

/* HEALTH CHECK */
app.get("/", (req, res) => {
  res.send("OFFTHEHOOK API is live");
});

app.use("/payments", payments);
app.use("/mpesa/callback", mpesaCallback);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);



