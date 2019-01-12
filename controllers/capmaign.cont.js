const PxlForEmails = require("pxl-for-emails");
const Campaign = require("../models/Campaigns");
const Bull = require('../helpers/bull.helper');

module.exports = pxl => {
  const addCampaign = data => {
    const savableObj = new Campaign({
      campaignName: data.campaignName,
      template: data.template,
      usersSelected: data.usersSelected
    });
    return savableObj.save();
  };

 const  fetchCampaigns = () => {
    return Campaign.find()
      .select("campaignName state frequency timePeriod")
      .exec();
  };
  const emailPxl = new PxlForEmails({
    pxl,
    getFullShortenedLink(linkId) {
      return `https://localhost:3000/shortly/${linkId}`;
    }
  });
  const pushToBull =  campaigDetails => {
    return new Promise( (resolve, reject) => {
    for(let i of  campaigDetails.usersSelected){
    const emailMarkup = emailPxl.addTracking(campaigDetails.template, {
      recipient: i
    });

    let mailOptions = {
      from: '"Email Service" <saikatchakrabortty@gmail.com>',
      to: i,
      subject: "New Update!",
      html: emailMarkup
    };
    Bull.addJob('send_email', {
        email: mailOptions
      });
      resolve();
    }
});
  };
  const runCampaign = async data => {
    let updateCampaign = await Campaign.find({ _id: data._id }).exec();

    (updateCampaign.frequency = data.frequency),
      (updateCampaign.timePeriod = data.timePeriod),
      (updateCampaign.state = "running");
    await updateCampaign.save();
    await pushToBull(updateCampaign);
    return true;
  };
fetchCampaigns,addCampaign,runCampaign
};
