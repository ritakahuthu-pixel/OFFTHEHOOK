const express = require("express");
const payments = require("./payments");

const app = express();
app.use(express.json());

app.use("/api/payments", payments);

app.listen(process.env.PORT || 3000, () =>
  console.log("Server running")
);


