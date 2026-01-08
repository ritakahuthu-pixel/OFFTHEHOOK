const express = require("express");
const app = express();

// 🔴 MUST BE AT THE TOP
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const stkPushRoutes = require("./routes/stkPush");
const stkQueryRoutes = require("./routes/stkQuery");

// Mount routes
app.use("/payments", stkPushRoutes);
app.use("/payments", stkQueryRoutes);

// STK CALLBACK (Safaricom hits this)
app.post("/payment/callback", (req, res) => {
  console.log("📥 STK CALLBACK RECEIVED");
  console.log(JSON.stringify(req.body, null, 2));

  res.status(200).json({
    ResultCode: 0,
    ResultDesc: "Accepted"
  });
});

// Health check
app.get("/", (req, res) => {
  res.send("OFFTHEHOOK API is live");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
