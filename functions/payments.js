const { payment } = require("../omniModules/mongodb");

const paymentCheck = async () => {
  setInterval(async () => {
    const pays = await payment.find().toArray();
    pays.map((ele) => {
      console.log(ele);
    });
  }, 20 * 1000);
};
module.exports = paymentCheck;
