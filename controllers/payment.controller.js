const razorPay = require("razorpay");
async function order(items) {
  let { amount, currency } = items;

  amount *= 100; //converting rupess into

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
