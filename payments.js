

const express = require("express");
const router = express.Router();

// ✅ Correct, case-sensitive imports
const { stkPush } = require("./mpesa/stkPush");
const { stkQuery } = require("./mpesa/stkQuery");

/**
 * STK PUSH
 */
router.post("/stk-push", async (req, res) => {
  try {
    const { phone, amount } = req.body;

    // ✅ Input validation
    if (!phone || !amount) {
      return res.status(400).json({
        error: "phone and amount are required"
      });
    }

    const response = await stkPush(phone, amount);
    return res.status(200).json(response);

  } catch (error) {
    console.error("STK PUSH ERROR:", error.response?.data || error.message);

    return res.status(500).json({
      error: "Failed to initiate STK Push",
      details: error.response?.data || error.message
    });
  }
});

/**
 * STK QUERY
 */
router.post("/stk-query", async (req, res) => {
  try {
    const { checkoutRequestID } = req.body;

    // ✅ Input validation
    if (!checkoutRequestID) {
      return res.status(400).json({
        error: "checkoutRequestID is required"
      });
    }

    const response = await stkQuery(checkoutRequestID);
    return res.status(200).json(response);

  } catch (error) {
    console.error("STK QUERY ERROR:", error.response?.data || error.message);

    return res.status(500).json({
      error: "Failed to query STK transaction",
      details: error.response?.data || error.message
    });
  }
});

module.exports = router;


