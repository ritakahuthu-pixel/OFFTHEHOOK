
const express = require("express");
const stkPush = require("./stkPush");
const stkQuery = require("./stkQuery");

const router = express.Router();

// STK Push
router.post("/stk-push", async (req, res) => {
  try {
    const { phone, amount } = req.body;

    if (!phone || !amount) {
      return res.status(400).json({
        error: "phone and amount are required",
      });
    }

    const response = await stkPush(phone, amount);
    res.json(response);
  } catch (error) {
    console.error("STK Push error:", error.message);
    res.status(500).json({ error: "STK Push failed" });
  }
});

// STK Query
router.post("/stk-query", async (req, res) => {
  try {
    const { checkoutRequestID } = req.body;

    if (!checkoutRequestID) {
      return res.status(400).json({
        error: "checkoutRequestID is required",
      });
    }

    const response = await stkQuery(checkoutRequestID);
    res.json(response);
  } catch (error) {
    console.error("STK Query error:", error.message);
    res.status(500).json({ error: "STK Query failed" });
  }
});

module.exports = router;
