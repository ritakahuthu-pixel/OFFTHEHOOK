const express = require("express");
const paymentsRoutes = require("./payments");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("OFFTHEHOOK API is live");
});

app.use("/payments", paymentsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});