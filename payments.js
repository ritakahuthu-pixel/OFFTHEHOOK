
const express = require("express");
const { stkPush } = require("../mpesa/stkPush");
const { stkQuery } = require("../mpesa/stkQuery");
const router = express.Router();
router.post("/stk-push", async (req, res) => {
  const { phone, amount } = req.body;
  res.json(await stkPush(phone, amount));
});
router.post("/stk-query", async (req, res) => {
  const { checkoutRequestID } = req.body;
  res.json(await stkQuery(checkoutRequestID));
});
module.exports = router;
