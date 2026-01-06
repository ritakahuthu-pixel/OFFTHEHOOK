
exports.handleCallback = (req, res) => {
  console.log("MPESA CALLBACK:", JSON.stringify(req.body, null, 2));
  res.json({ ResultCode: 0, ResultDesc: "Accepted" });
};
