import express from "express";

const router = express.Router();

router.post("/callback", async (req, res) => {
  console.log("🔥 CALLBACK HIT");
  console.log(JSON.stringify(req.body, null, 2));

  try {
    const callback = req.body?.Body?.stkCallback;

    if (callback?.ResultCode === 0) {
      console.log("✅ PAYMENT SUCCESSFUL");

      const payment = global.lastPayment;

      console.log("Payment Data:", payment);

      // Optional: Save payment to database here
      console.log("Payment processed successfully");
    } else {
      console.log(
        "❌ Payment failed:",
        callback?.ResultCode,
        callback?.ResultDesc
      );
    }

    return res.status(200).json({
      ResultCode: 0,
      ResultDesc: "Accepted"
    });
  } catch (error) {
    console.error("❌ Callback Error:", error);

    return res.status(200).json({
      ResultCode: 0,
      ResultDesc: "Accepted"
    });
  }
});

router.get("/callback", (req, res) => {
  res.send("✅ MPESA Callback URL is working");
});

export default router;
