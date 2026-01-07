const express = require("express");
const stkPush = require("./stkPush");
const stkQuery = require("./stkQuery");

const router = express.Router();

router.post("/stk-push", stkPush);
router.post("/stk-query", stkQuery);

module.exports = router;



