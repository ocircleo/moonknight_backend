const SSLCommerzPayment = require("sslcommerz-lts");
const { payment, payment_status } = require("../omniModules/mongodb");

const store_id = "moonk65fd87ef3b729";
const store_passwd = "moonk65fd87ef3b729@ssl";
const is_live = false;
const transId = Date.now();
const paymentInit = async (req, res, next) => {
  const { price, email, name, date, days, house_id } = req.body;
  const data = {
    total_amount: price,
    currency: "BDT",
    tran_id: `${email + transId}`, // use unique tran_id for each api call
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
  const databaseInfo = {
    ...data,
    time: transId,
    date: date,
    days: days,
    paid: false,
    house_id: house_id,
  };
  const result = await payment.insertOne(databaseInfo);
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz.init(data).then((apiResponse) => {
    // Redirect the user to payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL;
    res.send({ url: GatewayPageURL, result });
  });
  setTimeout(async () => {
    sslcz.transactionQueryByTransactionId(data).then(async (data) => {
      let newTranId = databaseInfo.tran_id;
      const test = await payment.findOne({ tran_id: newTranId });
      if (data.element[0].status == "VALID") {
        const newResult = await payment.updateOne(
          { tran_id: newTranId },
          { $set: { paid: true } }
        );
      }
    });
  }, 5 * 60 * 1000);
};
const myPayments = async (req, res, next) => {
  const { email } = req.body;
  const result = await payment.find({ cus_email: email }).toArray();
  res.send(result);
};
module.exports = { paymentInit, myPayments };
