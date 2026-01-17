import express from "express";
import { stkPush } from "./stkPush.js";

const router = express.Router();

router.post("/stk-push", async (req, res) => {
  try {
    const { phone, amount } = req.body;

    if (!phone || !amount) {
      return res.status(400).json({
        error: "Phone and amount are required"
      });
    }

    // ✅ PASS OBJECT (not separate parameters)
    const result = await stkPush({
      phone,
      amount,
      accountReference: "OFFTHEHOOK",
      transactionDesc: "Payment"
    });

    res.json(result);

  } catch (error) {
    console.error("❌ STK Error:", error.response?.data || error.message);

    res.status(500).json({
      error: "Failed to initiate payment",
      details: error.response?.data
    });
  }
});

export default router;
