const express = require("express");
const router = express.Router();

// ✅ Correct imports for your structure
const { stkPush } = require("./stkPush");
const { stkQuery } = require("./stkQuery");

/**
 * STK PUSH
 */
router.post("/stk-push", async (req, res) => {
  try {
    const { phone, amount } = req.body;

    if (!phone || !amount) {
      return res.status(400).json({
        error: "phone and amount are required"
      });
    }

    const response = await stkPush(phone, amount);
    res.json(response);

  } catch (error) {
    console.error("STK PUSH ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
});

/**
 * STK QUERY
 */
router.post("/stk-query", async (req, res) => {
  try {
    const { checkoutRequestID } = req.body;

    if (!checkoutRequestID) {
      return res.status(400).json({
        error: "checkoutRequestID is required"
      });
    }

    const response = await stkQuery(checkoutRequestID);
    res.json(response);

  } catch (error) {
    console.error("STK QUERY ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
