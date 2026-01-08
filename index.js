const axios = require("axios");
const { getAccessToken } = require("./auth");

function getTimestamp() {
  const now = new Date();
  return (
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0") +
    String(now.getHours()).padStart(2, "0") +
    String(now.getMinutes()).padStart(2, "0") +
    String(now.getSeconds()).padStart(2, "0")
  );
}

async function stkQuery(checkoutRequestID) {
  const accessToken = await getAccessToken();
  const timestamp = getTimestamp();

  const password = Buffer.from(
    process.env.MPESA_SHORTCODE +
      process.env.MPESA_PASSKEY +
      timestamp
  ).toString("base64");

  const payload = {
    BusinessShortCode: process.env.MPESA_SHORTCODE,
    Password: password,
    Timestamp: timestamp,
    CheckoutRequestID: checkoutRequestID
  };

  const response = await axios.post(
    "https://api.safaricom.co.ke/mpesa/stkpushquery/v1/query",
    payload,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );

  return response.data;
}

module.exports = { stkQuery };
