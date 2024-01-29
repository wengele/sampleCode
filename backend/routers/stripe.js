// require("dotenv").config();
// const express = require("express");
// const Stripe = require("stripe");
// const stripe = Stripe(process.env.STRIPE_KEY);

// const router = express.Router();
// const YOUR_DOMAIN = "http://localhost:3000";
// router.post("/create-checkout-session", async (req, res) => {
//   //   const session = await stripe.checkout.sessions.create({
//   //     line_items: [
//   //       {
//   //         price_data: {
//   //           currency: "usd",
//   //           product_data: { name: "Job posting payment" },
//   //           unit_amount: 0.5,
//   //         },
//   //         quantity: 1,
//   //       },
//   //     ],
//   //     mode: "payment",
//   //     success_url: `${YOUR_DOMAIN}/employer/jobs`,
//   //     cancel_url: `${YOUR_DOMAIN}/signin`,
//   //   });
//   //   res.send({ url: session.url });
// });

// module.exports = router;
