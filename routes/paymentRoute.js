const express = require("express");
const { paymentInit, payMentValidate } = require("../modules/paymentModule");
const paymentRouter = express.Router();

paymentRouter.post("/paymentInit", paymentInit);
paymentRouter.post("/paymentValidate", payMentValidate);
module.exports = paymentRouter;
