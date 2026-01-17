import express from "express";

const router = express.Router();

router.post("/callback", (req, res) => {
  console.log("MPESA CALLBACK RECEIVED:");
  console.log(JSON.stringify(req.body, null, 2));

  res.json({
    ResultCode: 0,
    ResultDesc: "Accepted"
  });
});

export default router;
