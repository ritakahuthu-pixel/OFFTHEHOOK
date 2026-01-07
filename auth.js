const axios = require("axios");

async function getAccessToken() {
  try {
    const auth = Buffer.from(
      `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
    ).toString("base64");

    const response = await axios.get(
      "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );

    return response.data.access_token;

  } catch (error) {
    console.error(
      "❌ AUTH ERROR:",
      error.response?.data || error.message
    );
    throw new Error("Failed to generate access token");
  }
}

module.exports = { getAccessToken };

