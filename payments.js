payment js

router.post("/payment/stk-push", async (req, res) => {
  const { phone, amount } = req.body;

  if (!phone || !amount) {
    return res.status(400).json({ error: "Phone and amount are required" });
  }

  try {
    const response = await stkPush({ phone, amount });
    res.json(response);
  } catch (err) {
    console.error("🔥 MPESA ERROR:", err.response?.data || err.message);

    res.status(500).json({
      error: "Failed to initiate payment",
      details: err.response?.data || err.message
    });
  }
});
