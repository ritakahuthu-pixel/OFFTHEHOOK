const express = require("express");
const router = express.Router();
const { initiateSTKPush } = require("./stkPush");

router.post("/stk-push", async (req, res) => {
  try {
    const { phone, amount } = req.body;

    if (!phone || !amount) {
      return res.status(400).json({ error: "phone and amount are required" });
    }

    const response = await initiateSTKPush(phone, amount);
    res.status(200).json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "STK Push failed" });
  }
});

module.exports = router;