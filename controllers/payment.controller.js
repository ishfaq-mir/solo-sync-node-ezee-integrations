const razorPay = require("razorpay");
async function order(items) {
  let { amount, currency } = items;
  if (!amount) {
    throw new Error(`Invalid Amount`);
  }
  if (!currency) {
    throw new Error("Invalid Currency");
  }

  amount *= 100;

  const instance = new razorPay({
    key_id: process.env.RAZOR_PAY_KEY_ID,
    key_secret: process.env.RAZOR_PAY_SECRET,
  });

  const order = await instance.orders.create({
    amount,
    currency,
  });

  return order.id;
}

module.exports = { order };
