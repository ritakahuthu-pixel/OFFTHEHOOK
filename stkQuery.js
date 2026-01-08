 const express = require("express");
const router = express.Router();
const { initiateSTKPush } = require("./stkPush");
const { stkQuery } = require("./stkQuery");

/* STK PUSH */
router.post("/stk-push", async (req, res) => {
  try {
    const { phone, amount } = req.body;

    if (!phone || !amount) {
      return res.status(400).json({
        error: "phone and amount are required"
      });
    }

    const result = await initiateSTKPush(phone, amount);
    res.status(200).json(result);
  } catch (error) {
    console.error("STK PUSH ERROR:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to initiate STK push" });
  }
});

/* STK QUERY */
router.post("/stk-query", async (req, res) => {
  try {
    const { checkoutRequestID } = req.body;

    if (!checkoutRequestID) {
      return res.status(400).json({
        error: "checkoutRequestID is required"
      });
    }

    const result = await stkQuery(checkoutRequestID);
    res.status(200).json(result);
  } catch (error) {
    console.error("STK QUERY ERROR:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to query STK status" });
  }
});

module.exports = router;


