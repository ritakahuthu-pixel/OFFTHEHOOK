const axios = require("axios");
const getAccessToken = require("./auth");

module.exports = async function stkPush(phone, amount) {
  const accessToken = await getAccessToken();

  const timestamp = new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, "")
    .slice(0, 14);

  const password = Buffer.from(
    process.env.MPESA_SHORTCODE +
      process.env.MPESA_PASSKEY +
      timestamp
  ).toString("base64");

  const url =
    "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

  const payload = {
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
  };

  const response = await axios.post(url, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

