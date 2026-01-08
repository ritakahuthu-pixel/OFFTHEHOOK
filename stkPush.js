const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/stk-push", async (req, res) => {
  try {
    const { phone, amount } = req.body;

    if (!phone || !amount) {
      return res.status(400).json({ error: "phone and amount required" });
    }

    // 🔧 TEMP DEBUG (keep for now)
    console.log("STK PUSH BODY:", req.body);

    return res.status(200).json({
      message: "STK push route reached",
      phone,
      amount
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "STK push failed" });
  }
});

module.exports = router;
