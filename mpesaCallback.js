const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  console.log("📥 MPESA CALLBACK RECEIVED:");
  console.log(JSON.stringify(req.body, null, 2));

  const callback = req.body?.Body?.stkCallback;

  if (!callback) {
    return res.status(400).json({ message: "Invalid callback payload" });
  }

  const { ResultCode, ResultDesc, CheckoutRequestID } = callback;

  if (ResultCode === 0) {
    console.log("✅ PAYMENT SUCCESS:", CheckoutRequestID);
  } else {
    console.log("❌ PAYMENT FAILED:", ResultDesc);
  }

  res.json({
    ResultCode: 0,
    ResultDesc: "Accepted"
  });
});

module.exports = router;

