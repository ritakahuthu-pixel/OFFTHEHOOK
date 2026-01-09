const express = require("express");
const router = express.Router();

router.post("/callback", (req, res) => {
  console.log("📥 MPESA CALLBACK FULL BODY:", JSON.stringify(req.body, null, 2));

  const callback = req.body?.Body?.stkCallback;

  if (!callback) {
    console.error("❌ Invalid callback structure");
    return res.status(400).json({ error: "Invalid callback" });
  }

  const {
    MerchantRequestID,
    CheckoutRequestID,
    ResultCode,
    ResultDesc,
    CallbackMetadata
  } = callback;

  /* ===== MATCH USING CheckoutRequestID ===== */
  console.log("🔗 MATCHING CHECKOUT REQUEST ID:", CheckoutRequestID);

  /* ===== FAILED TRANSACTION ===== */
  if (ResultCode !== 0) {
    console.log("❌ PAYMENT FAILED:", ResultDesc);

    // 🔴 UPDATE DB: status = FAILED where checkoutRequestID
    return res.status(200).json({
      ResultCode: 0,
      ResultDesc: "Accepted"
    });
  }

  /* ===== SUCCESSFUL PAYMENT ===== */
  const metadata = {};
  CallbackMetadata.Item.forEach(item => {
    metadata[item.Name] = item.Value;
  });

  const paymentData = {
    checkoutRequestID: CheckoutRequestID,
    merchantRequestID: MerchantRequestID,
    amount: metadata.Amount,
    receipt: metadata.MpesaReceiptNumber,
    phone: metadata.PhoneNumber,
    transactionDate: metadata.TransactionDate
  };

  console.log("✅ PAYMENT SUCCESS:", paymentData);

  // 🟢 UPDATE DB: status = SUCCESS + receipt + amount

  return res.status(200).json({
    ResultCode: 0,
    ResultDesc: "Accepted"
  });
});

module.exports = router;
