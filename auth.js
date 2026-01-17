import axios from "axios";

export async function getAccessToken() {
  try {
    const consumerKey = process.env.CONSUMER_KEY;
    const consumerSecret = process.env.CONSUMER_SECRET;

    const auth = Buffer.from(
      `${consumerKey}:${consumerSecret}`
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
    console.error("Access Token Error:", error.response?.data || error.message);
    throw new Error("Failed to generate access token");
  }
}
