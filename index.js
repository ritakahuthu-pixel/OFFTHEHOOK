import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import paymentsRoute from "./payments.js";
import callbackRoute from "./mpesaCallback.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/* Health check */
app.get("/", (req, res) => {
  res.send("OFFTHEHOOK MPESA API RUNNING 🚀");
});

/* ============================
   🤖 AI CHAT ENDPOINT
=============================== */
app.post("/ask", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: "Prompt is required"
      });
    }

    // ✅ Temporary reply (for testing)
    res.json({
      reply: `Hello Hakim 👋 You said: ${prompt}`
    });

  } catch (error) {
    console.error("ASK ERROR:", error);
    res.status(500).json({
      error: "AI failed"
    });
  }
});

/* ============================
   💳 PAYMENT ROUTES
=============================== */
app.use("/payment", paymentsRoute);
app.use("/payment", callbackRoute);

/* IMPORTANT: Render Port Fix */
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
