
const Campaign = require("../models/Campaigns");
const BullPusher = require('../helpers/pixl.helper'); 

const addCampaign = (data) => {
  const savableObj = new Campaign({
    campaignName: data.campaignName,
    template: data.template,
    usersSelected: data.usersSelected
  });
  return savableObj.save();
}; 
 const fetchCampaigns = () => {
  return Campaign.find()
    .select("campaignName state frequency timePeriod")
    .exec();
};
 const runCampaign = async (pxl,data) => {
  let updateCampaign = await Campaign.findOne({ _id: data._id }).exec();

  (updateCampaign.frequency = data.frequency),
    (updateCampaign.timePeriod = data.timePeriod),
    (updateCampaign.state = "running");
  await updateCampaign.save();
  await BullPusher.pushtobull(pxl,updateCampaign);
  return true;
};
module.exports ={ 
  addCampaign,fetchCampaigns,runCampaign
};
