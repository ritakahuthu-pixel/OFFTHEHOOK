async function initiateSTKPush(phone, amount) {
  // TEMP MOCK (replace with Daraja logic)
  return {
    message: "STK Push initiated",
    phone,
    amount,
    status: "PENDING"
  };
}

module.exports = { initiateSTKPush };