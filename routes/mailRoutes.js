const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const mailgun = require("mailgun-js");
const apiKey = process.env.API_KEY;
const domain = process.env.DOMAIN;
const mg = mailgun({ apiKey, domain });
router.get("/", (req, res) => {
  res.send("<h1>welcome to mail route</h1>");
});

// router.post("/send_mail", async (req, res) => {
//   const transporter = nodemailer.createTransport({
//     host: "",
//     port: "",
//     secure: true,
//     auth: {
//       user: "",
//       pass: "",
//     },
//   });
//   async function send() {
//     const info = transporter.sendMail({
//       from: "",
//       to: "",
//       subject: "",
//       text: "",
//       html: "",
//     });
//   }
//   send.catch(console.error);
// });

router.post("/send_mail", (req, res) => {
  const rData = req.body;
  const data = {
    from: "Too Late <support@moonknightll.web.app>",
    to: [rData.to],
    subject: "Too Late Support: Question Answer",
    text: rData.message,
  };
  mg.messages().send(data, (error, body) => {
    if (error) {
      res.send(JSON.stringify(error));
    } else {
      res.send(JSON.stringify(body));
    }
  });
});
router.post("/book_mail", (req, body) => {
  const msg = req.body;
  const data = {
    from: `${msg.name} <request@moonknightll.web.app>`,
    to: [msg.to],
    subject: `property booking request from ${msg.name}`,
    text: msg.text,
  };
  mg.messages().send(data, (error, body) => {
    if (error) {
      res.send({ error: true, message: JSON.stringify(error) });
    } else {
      res.send(JSON.stringify(body));
    }
  });
});
module.exports = router;
