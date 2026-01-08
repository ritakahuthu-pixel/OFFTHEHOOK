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

async function initiateSTKPush(phone, amount) {
  const accessToken = await getAccessToken();
  const timestamp = getTimestamp();

  const password = Buffer.from(
    process.env.MPESA_SHORTCODE +
      process.env.MPESA_PASSKEY +
      timestamp
  ).toString("base64");

  const payload = {
    BusinessShortCode: process.env.MPESA_SHORTCODE, // 9512320
    Password: password,
    Timestamp: timestamp,

    TransactionType: "CustomerBuyGoodsOnline",

    Amount: Number(amount),
    PartyA: phone,
    PartyB: "5619444", // ✅ TILL RECEIVING MONEY
    PhoneNumber: phone,

    CallBackURL: process.env.MPESA_CALLBACK_URL,
    AccountReference: "OFFTHEHOOK",
    TransactionDesc: "OFFTHEHOOK Payment"
  };

  const response = await axios.post(
    "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    payload,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data;
}

module.exports = { initiateSTKPush };
