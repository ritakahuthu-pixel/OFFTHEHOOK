const axios = require("axios");
const { getAccessToken } = require("./auth");

const stkQuery = async (checkoutRequestID) => {
  const accessToken = await getAccessToken();

  const timestamp = new Date()
    .toISOString()
    .replace(/[^0-9]/g, "")
    .slice(0, 14);

  const password = Buffer.from(
    `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
  ).toString("base64");

  const payload = {
    BusinessShortCode: process.env.MPESA_SHORTCODE,
    Password: password,
    Timestamp: timestamp,
    CheckoutRequestID: checkoutRequestID
  };

  const { data } = await axios.post(
    "https://api.safaricom.co.ke/mpesa/stkpushquery/v1/query",
    payload,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    }
  );

  return data;
};

module.exports = { stkQuery };
