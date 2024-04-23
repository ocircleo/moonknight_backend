const express = require("express");
const { paymentInit, myPayments } = require("../modules/paymentModule");
const paymentRouter = express.Router();

paymentRouter.post("/paymentInit", paymentInit);
paymentRouter.post("/mypayments", myPayments);
module.exports = paymentRouter;
