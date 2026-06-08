import express from "express";
import { stkPush } from "./stkPush.js";

const router = express.Router();

router.post("/stk-push", async (req, res) => {
  try {
    let { phone, amount } = req.body;

    if (!phone || !amount) {
      return res.status(400).json({
        error: "Phone and amount are required"
      });
    }

    if (!phone.startsWith("254")) {
      return res.status(400).json({
        error: "Phone must be in format 2547XXXXXXXX"
      });
    }

    amount = Number(amount);

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        error: "Invalid amount"
      });
    }

    console.log("STK REQUEST:", { phone, amount });

    const result = await stkPush({
      phone,
      amount,
      accountReference: "HPTRADERS",
      transactionDesc: "Payment"
    });

    return res.json(result);

  } catch (error) {
    console.error("❌ STK Error:", error.response?.data || error.message);

    return res.status(500).json({
      error: "Failed to initiate payment",
      details: error.response?.data
    });
  }
});

export default router;
