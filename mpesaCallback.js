import express from "express";
import twilio from "twilio";

const router = express.Router();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

router.post("/callback", async (req, res) => {
  console.log("🔥 CALLBACK HIT");
  console.log(JSON.stringify(req.body, null, 2));

  try {
    const callback = req.body?.Body?.stkCallback;

    if (callback?.ResultCode === 0) {
      console.log("✅ PAYMENT SUCCESSFUL");

      const payment = global.lastPayment;

      console.log("Payment Data:", payment);

      if (payment?.phone) {
        const sms = await client.messages.create({
          body: `Dear ${payment.customerName || "Customer"},

Your payment for ${
  payment.packageName || "Fuliza Boost"
} has been received successfully.

Your request will be processed within 30 minutes.

Thank you for choosing Fuliza Boost Inc.`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: `+${payment.phone}`
        });

        console.log("✅ SMS Sent");
        console.log("Message SID:", sms.sid);
      } else {
        console.log("⚠️ No phone number found in global.lastPayment");
      }
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
