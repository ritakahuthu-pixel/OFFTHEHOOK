const axios = require("axios");

/**
 * Initiate M-Pesa STK Push
 */
module.exports = async (req, res) => {
  try {
    const { phone, amount } = req.body;

    if (!phone || !amount) {
      return res.status(400).json({ error: "Phone and amount are required" });
    }

    /* ===== 1. GENERATE TIMESTAMP ===== */
    const timestamp = new Date()
      .toISOString()
      .replace(/[-:TZ.]/g, "")
      .slice(0, 14);

    /* ===== 2. GENERATE PASSWORD ===== */
    const password = Buffer.from(
      `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
    ).toString("base64");

    /* ===== 3. GET ACCESS TOKEN ===== */
    const auth = Buffer.from(
      `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
    ).toString("base64");

    const tokenRes = await axios.get(
      "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: { Authorization: `Basic ${auth}` },
      }
    );

    const accessToken = tokenRes.data.access_token;

    /* ===== 4. STK PUSH REQUEST ===== */
    const stkRes = await axios.post(
      "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phone,
        PartyB: process.env.MPESA_SHORTCODE,
        PhoneNumber: phone,
        CallBackURL: process.env.MPESA_CALLBACK_URL,
        AccountReference: "OFFTHEHOOK",
        TransactionDesc: "Payment",
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.status(200).json(stkRes.data);
  } catch (error) {
    console.error("STK PUSH ERROR:", error.response?.data || error.message);
    return res.status(500).json({
      error: "Failed to initiate STK Push",
      details: error.response?.data || error.message,
    });
  }
};
