let PxlForEmails = require("pxl-for-emails");
const { bullSystem } = require("./bull.helper");
const config = require('../config')

function pushtobull(pxl, campaigDetails,i) {
  if (campaigDetails) {
    return new Promise(async (resolve, reject) => {
        let pxlForEmails = new PxlForEmails({
          pxl,

          getFullShortenedLink(linkId) {
            return `http://localhost:3000/shortly/${linkId}`;
          }
        });
        const link = await pxl.shorten(
          config.API_BASE+"/static/tracker.png"
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
          '<div>'+campaigDetails.template +
          `</div><footer><img src='${config.API_BASE}/shortly/${
            link.linkId
          }?pxl=${createdPxl.pxl}' /><footer><a href='${config.API_BASE}/shortly/${
            link.linkId
          }?pxl=${createdPxlClick.pxl}'>click me</a></footer>`;
        emailMarkup = await pxlForEmails.addTracking(emailMarkup,{recipient: i});

        let mailOptions = {
          from: '"Email Service" <saikatchakrabortty@gmail.com>',
          to: i,
          subject: "New Update!",
          html: emailMarkup
        };
        bullSystem.addCronJob("send_email", {
          email: mailOptions,
          timePeriod:campaigDetails.timePeriod,
          frequency:campaigDetails.frequency
        },campaigDetails.frequency);
        resolve();
      
    });
  }
}

module.exports = {
pushtobull
};
