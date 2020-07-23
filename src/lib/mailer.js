const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "880a25fb03f30a",
    pass: "51b19365ac6e6b"
  }
});
