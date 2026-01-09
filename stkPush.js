const axios = require("axios");
const { getAccessToken } = require("./auth");

/* =========================
   HELPERS
========================= */
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

function formatPhone(phone) {
  if (phone.startsWith("0")) return "254" + phone.slice(1);
  if (phone.startsWith("+")) return phone.slice(1);
  return phone;
}

/* =========================
   STK PUSH
========================= */
async function initiateSTKPush(phone, amount) {
  const accessToken = await getAccessToken();
  const timestamp = getTimestamp();
  const formattedPhone = formatPhone(phone);

  const password = Buffer.from(
    process.env.MPESA_SHORTCODE +
      process.env.MPESA_PASSKEY +
      timestamp
  ).toString("base64");

  const payload = {
    BusinessShortCode: process.env.MPESA_SHORTCODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerBuyGoodsOnline",
    Amount: Number(amount),
    PartyA: formattedPhone,
    PartyB: process.env.MPESA_TILL_NUMBER, // ✅ 5619444
    PhoneNumber: formattedPhone,
    CallBackURL: process.env.MPESA_CALLBACK_URL,
    AccountReference: "OFFTHEHOOK",
    TransactionDesc: "OFFTHEHOOK Payment"
  };

  console.log("📤 STK PUSH PAYLOAD:", payload);

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

  console.log("✅ STK PUSH RESPONSE:", response.data);

  return response.data;
}

module.exports = { initiateSTKPush };
