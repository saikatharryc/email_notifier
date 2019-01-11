"use strict";
const nodemailer = require("nodemailer");
const config = require("../config");

let transporter = nodemailer.createTransport({
  host: config.MAIL.smtp_host,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: config.MAIL.user,
    pass: config.MAIL.pass
  }
});

const sendMail = (toMail, subject, text) => {
  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Auth Service" <saikatchakrabortty@gmail.com>',
    to: toMail,
    subject: subject,
    text: text,
    html: text
  };

  transporter.sendMail(mailOptions, (error,success) => {
    if (error) {
      return console.log(error);
    }
    return success;
  });
};

module.exports = {sendMail};
