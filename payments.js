const express = require("express");
const router = express.Router();

const { stkPush } = require("./stkPush");
const { stkQuery } = require("./stkQuery");

router.post("/stk-push", async (req, res) => {
  try {
    const { phone, amount } = req.body;

    if (!phone || !amount) {
      return res.status(400).json({ message: "Phone and amount required" });
    }

    const result = await stkPush(phone, amount);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/stk-query", async (req, res) => {
  try {
    const { checkoutRequestID } = req.body;

    if (!checkoutRequestID) {
      return res.status(400).json({ message: "CheckoutRequestID required" });
    }

    const result = await stkQuery(checkoutRequestID);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

