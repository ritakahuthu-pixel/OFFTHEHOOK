const express = require("express");
const stkPush = require("./stkPush");
const stkQuery = require("./stkQuery");

const router = express.Router();

/**
 * Initiate STK Push
 */
router.post("/stk-push", stkPush);

/**
 * Query STK Push status
 */
router.post("/stk-query", stkQuery);

module.exports = router;


