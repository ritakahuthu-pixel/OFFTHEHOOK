import express from "express";

const router = express.Router();

router.post("/payment/callback", (req, res) => {
  console.log("✅ MPESA CALLBACK RECEIVED:");
  console.log(JSON.stringify(req.body, null, 2));

  // Always respond with 200 OK
  res.status(200).json({
    ResultCode: 0,
    ResultDesc: "Accepted"
  });
});

export default router;
