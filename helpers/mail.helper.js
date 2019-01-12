const nodemailer = require("nodemailer");
const config = require("../config");
let transporter = undefined;

const sendMail = async(job) => {
  const { data } = job;
  const { email } = data;

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: config.MAIL.smtp_host,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: config.MAIL.user,
        pass: config.MAIL.pass
      }
    });
  }

  // setup email data with unicode symbols
  // let mailOptions = {
  //   from: '"Email Service" <saikatchakrabortty@gmail.com>',
  //   to: toMail,
  //   subject: subject,
  //   html: html
  // };

 await transporter.sendMail({ ...email, textEncoding: "base64" });
 return true;
};

module.exports = bullSystem => {
  sendMail, bullSystem.bullJobs.process("send_email", sendMail);
};
