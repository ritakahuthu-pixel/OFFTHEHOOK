import axios from "axios";
import { getAccessToken } from "./auth.js";

/**
 * Generate timestamp in YYYYMMDDHHMMSS format
 */
function generateTimestamp() {
  const now = new Date();
  return now
    .toISOString()
    .replace(/[^0-9]/g, "")
    .slice(0, 14);
}

/**
 * Generate STK Password
 */
function generatePassword(shortCode, passkey, timestamp) {
  return Buffer.from(shortCode + passkey + timestamp).toString("base64");
}

/**
 * Send STK Push
 */
export async function stkPush({
  phone,
  amount,
  accountReference = "Payment",
  transactionDesc = "STK Push"
}) {
  try {
    const token = await getAccessToken();

    const shortCode = process.env.MPESA_SHORTCODE;
    const passkey = process.env.MPESA_PASSKEY;
    const callbackUrl = process.env.MPESA_CALLBACK_URL;

    const timestamp = generateTimestamp();
    const password = generatePassword(shortCode, passkey, timestamp);

    const payload = {
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: shortCode,
      PhoneNumber: phone,
      CallBackURL: callbackUrl,
      AccountReference: accountReference,
      TransactionDesc: transactionDesc
    };

    const response = await axios.post(
      "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("❌ STK Push Error:", error.response?.data || error.message);
    throw error;
  }
}
