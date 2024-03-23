const SSLCommerzPayment = require("sslcommerz-lts");
const { payment } = require("../omniModules/mongodb");

const store_id = "moonk65fd87ef3b729";
const store_passwd = "moonk65fd87ef3b729@ssl";
const is_live = false;
const transId = Date.now();
const paymentInit = async (req, res, next) => {
  const { price, email, name, date, days } = req.body;
  const data = {
    total_amount: price,
    currency: "BDT",
    tran_id: `REF123${transId}`, // use unique tran_id for each api call
    success_url: `https://moonknightll.web.app/paysucces?id=REF123${transId}`,
    fail_url: "http://localhost:5173/fail",
    cancel_url: "http://localhost:5173/cancel",
    ipn_url: "https://moonknight-backend.vercel.app/pay/paymentValidate",
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: name,
    cus_email: email,
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };
  const newdata = data;
  newdata.date = date;
  newdata.days = days;
  newdata.payed = false;
  const result = await payment.insertOne(data);
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz.init(data).then((apiResponse) => {
    // Redirect the user to payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL;
    res.send({ url: GatewayPageURL, result });
  });
};
const payMentValidate = async (req, res, next) => {
  const { tran_id, status } = req.body;
  if (status == "VALID") {
    const result = await payment.updateOne(
      { tran_id: id },
      { $set: { payed: true } }
    );
  }
};
module.exports = { paymentInit, payMentValidate };
