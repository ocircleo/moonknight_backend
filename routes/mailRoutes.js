const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.get("/", (req, res) => {
  res.send("<h1>welcome to mail route</h1>");
});
router.post("/send_mail", (req, res) => {
  const transporter = nodemailer.createTransport({
    host: "",
    port: "",
    secure: true,
    auth: {
      user: "",
      pass: "",
    },
  });
  async function send() {
    const info = transporter.sendMail({
      from: "",
      to: "",
      subject: "",
      text: "",
      html: "",
    });
  }
  send.catch(console.error)
});

module.exports = router;
