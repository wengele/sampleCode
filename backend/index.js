const express = require("express");
const app = express();
const json = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT || 5000;
const jobApplicationRouter = require("./routers/jobApplicationRouter");
const UserRouter = require("./routers/userRouter");

const stripe = require("stripe")(process.env.STRIPE_KEY);

const jobPostingRouter = require("./routers/jobPostingRouter");
const resumeRouter = require("./routers/downloadResume");
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/users", UserRouter);
app.use("/jobPostings", jobPostingRouter);
app.use("/jobApplications", jobApplicationRouter);

app.use("/download", resumeRouter);

app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

(async function () {
  try {
    if (process.env.DB_URL) {
      await mongoose.connect(process.env.DB_URL);
      console.log("DB server connected");
    } else {
      throw new Error("DB server URL not found");
    }
  } catch (error) {
    console.log(error);
  }
})();

app.listen(port, () => {
  console.log(`listen on ${port}`);
});
