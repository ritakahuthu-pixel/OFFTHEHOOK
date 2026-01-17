import express from "express";
const router = express.Router();

// Safaricom will POST here
router.post("/payment/callback", (req, res) => {
  console.log("✅ MPESA CALLBACK RECEIVED");
  console.log(JSON.stringify(req.body, null, 2));

  // Always acknowledge Safaricom
  res.status(200).json({
    ResultCode: 0,
    ResultDesc: "Accepted"
  });
});

// Optional browser test
router.get("/payment/callback", (req, res) => {
  res.status(200).send("✅ MPESA Callback URL is working");
});

export default router;
