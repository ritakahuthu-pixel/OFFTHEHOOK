const express = require("express");
const router = express.Router();

const { stkPush } = require("./mpesa/stkpush");
const { stkQuery } = require("./mpesa/stkquery");

// STK Push
router.post("/stk-push", async (req, res) => {
  try {
    const { phone, amount } = req.body;
    const response = await stkPush(phone, amount);
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// STK Query
router.post("/stk-query", async (req, res) => {
  try {
    const { checkoutRequestID } = req.body;
    const response = await stkQuery(checkoutRequestID);
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;


