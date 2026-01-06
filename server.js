require("dotenv").config();
const express = require("express");
const payments = require("./payments");

const app = express();
app.use(express.json());

app.use("/api/payments", payments);

app.get("/", (req, res) => {
  res.send("OFFTHEHOOK API running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));



