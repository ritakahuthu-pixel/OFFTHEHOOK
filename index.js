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

/* Routes */
app.use("/payment", paymentsRoute);
app.use("/payment", callbackRoute);

/* IMPORTANT: Render Port Fix */
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
