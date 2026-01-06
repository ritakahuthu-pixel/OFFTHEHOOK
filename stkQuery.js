
const axios = require("axios");
const { getAccessToken } = require("./auth");
exports.stkQuery = async (checkoutRequestID) => {
  const token = await getAccessToken();
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0,14);
  const password = Buffer.from(
    process.env.MPESA_SHORTCODE + process.env.MPESA_PASSKEY + timestamp
  ).toString("base64");
  const res = await axios.post(
    "https://api.safaricom.co.ke/mpesa/stkpushquery/v1/query",
    {
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      CheckoutRequestID: checkoutRequestID
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
