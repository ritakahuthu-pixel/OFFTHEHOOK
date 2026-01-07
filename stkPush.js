const axios = require("axios");

module.exports = async (req, res) => {
  try {
    const { phone, amount } = req.body;

    if (!phone || !amount) {
      return res.status(400).json({ error: "Phone and amount are required" });
    }

    // Generate timestamp
    const timestamp = new Date()
      .toISOString()
      .replace(/[-:TZ.]/g, "")
      .slice(0, 14);

    // Generate password
    const password = Buffer.from(
      process.env.MPESA_SHORTCODE +
      process.env.MPESA_PASSKEY +
      timestamp
    ).toString("base64");

    // Generate access token
    const auth = Buffer.from(
      process.env.MPESA_CONSUMER_KEY +
      ":" +
      process.env.MPESA_CONSUMER_SECRET
    ).toString("base64");

    const tokenResponse = await axios.get(
      "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: { Authorization: `Basic ${auth}` }
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // STK Push
    const stkResponse = await axios.post(
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
        TransactionDesc: "Payment"
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.status(200).json(stkResponse.data);

  } catch (error) {
    console.error("STK PUSH ERROR:", error.response?.data || error.message);
    res.status(500).json({
      error: "Failed to initiate STK Push",
      details: error.response?.data || error.message
    });
  }
};

