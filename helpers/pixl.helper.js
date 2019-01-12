let PxlForEmails = require("pxl-for-emails");
const { bullSystem } = require("./bull.helper");

function pushtobull(pxl, campaigDetails) {
  if (campaigDetails) {
    return new Promise(async (resolve, reject) => {
      for (let i of campaigDetails.usersSelected) {
        let pxlForEmails = new PxlForEmails({
          pxl,

          getFullShortenedLink(linkId) {
            return `http://localhost:3000/shortly/${linkId}`;
          }
        });
        const link = await pxl.shorten(
          "https://b8179d42.ngrok.io/static/tracker.png"
        );
        const metadata = {
          link:link.linkId,
          recipient: i,
          type:'open'
        };
        const metadataClick = {
          link:link.linkId,
          recipient: i,
          type:'click'
        };

        const createdPxl = await pxl.createPxl(metadata);
        const createdPxlClick = await pxl.createPxl(metadataClick);
        let emailMarkup =
          campaigDetails.template +
          `<footer><img src='https://b8179d42.ngrok.io/shortly/${
            link.linkId
          }?pxl=${createdPxl.pxl}' /><footer><a href='https://b8179d42.ngrok.io/shortly/${
            link.linkId
          }?pxl=${createdPxlClick.pxl}'>click me</a></footer>`;
        emailMarkup = await pxlForEmails.addTracking(emailMarkup,{recipient: i});

        let mailOptions = {
          from: '"Email Service" <saikatchakrabortty@gmail.com>',
          to: i,
          subject: "New Update!",
          html: emailMarkup
        };
        bullSystem.addJob("send_email", {
          email: mailOptions
        });
        resolve();
      }
    });
  }
}

module.exports = {
  pushtobull
};