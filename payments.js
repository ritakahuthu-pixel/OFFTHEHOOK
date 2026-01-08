const express = require("express");
const router = express.Router();
const { initiateSTKPush } = require("./stkPush");
const { stkQuery } = require("./stkQuery");

/* =========================
   STK PUSH
========================= */
router.post("/stk-push", async (req, res) => {
  console.log("✅ /payments/stk-push HIT");
  console.log("BODY RECEIVED:", req.body);

  try {
    const { phone, amount } = req.body;

    if (!phone || !amount) {
      return res.status(400).json({
        error: "phone and amount are required"
      });
    }

    const result = await initiateSTKPush(phone, amount);

    return res.status(200).json(result);

  } catch (error) {
    console.error("🔥 STK PUSH ERROR FULL:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });

    return res.status(500).json({
      error: "STK push failed",
      details: error.response?.data || error.message
    });
  }
});

/* =========================
   STK QUERY
========================= */
router.post("/stk-query", async (req, res) => {
  console.log("✅ /payments/stk-query HIT");
  console.log("BODY RECEIVED:", req.body);

  try {
    const { checkoutRequestID } = req.body;

    if (!checkoutRequestID) {
      return res.status(400).json({
        error: "checkoutRequestID is required"
      });
    }

    const result = await stkQuery(checkoutRequestID);
    return res.status(200).json(result);

  } catch (error) {
    console.error("🔥 STK QUERY ERROR FULL:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });

    return res.status(500).json({
      error: "STK query failed",
      details: error.response?.data || error.message
    });
  }
});

module.exports = router;
