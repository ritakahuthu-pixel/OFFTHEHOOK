const express = require("express");
const router = express.Router();

const { stkPush } = require("./mpesa/stkPush");
const { stkQuery } = require("./mpesa/stkQuery");

// STK Push
router.post("/stk-push", async (req, res) => {
  try {
    const { phone, amount } = req.body;
    const response = await stkPush(phone, amount);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// STK Query
router.post("/stk-query", async (req, res) => {
  try {
    const { checkoutRequestID } = req.body;
    const response = await stkQuery(checkoutRequestID);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;



