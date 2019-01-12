const nodemailer = require("nodemailer");
const config = require("../config");
let transporter = undefined;

const sendMail = async(job,done) => {
  const { data ,opts} = job;
  const { email,timePeriod,frequency } = data;
  console.log(timePeriod);
if(timePeriod){
    const daily = 1;
    const weekly=7;
    const monthly=30;
   const deletable = frequency ? (frequency =="daily" && timePeriod <= opts.repeat.count/daily ? true : false) 
   || (frequency =="weekly" && timePeriod <= opts.repeat.count/weekly ? true : false)
   || (frequency =="monthly" && timePeriod <= opts.repeat.count/monthly ? true : false)
   : timePeriod <= opts.repeat.count;

   if(deletable){
     try{
    const removed = await job.remove() //its giving error
     }catch(error){
       console.log(error)
     }
    // console.log(removed);
    // job.moveToFailed(Error('move to failed'))
     done();
   }
  }
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
  return done();
};

module.exports = bullSystem => {
  sendMail, bullSystem.bullJobs.process("send_email", sendMail);
};
