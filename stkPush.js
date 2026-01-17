import axios from "axios";
import { getAccessToken } from "./auth.js";

export async function stkPush(phone, amount) {
  const token = await getAccessToken();

  const timestamp = new Date()
    .toISOString()
    .replace(/[^0-9]/g, "")
    .slice(0, 14);

  const password = Buffer.from(
    process.env.SHORT_CODE + process.env.PASSKEY + timestamp
  ).toString("base64");

  const payload = {
    BusinessShortCode: process.env.SHORT_CODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerBuyGoodsOnline",
    Amount: amount,
    PartyA: phone,
    PartyB: process.env.SHORT_CODE,
    PhoneNumber: phone,
    CallBackURL: process.env.CALLBACK_URL,
    AccountReference: "OFFTHEHOOK",
    TransactionDesc: "Payment"
  };

  const response = await axios.post(
    "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}
