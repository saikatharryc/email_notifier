const Campaign = require('../models/Campaigns');

const addCampaign = (data)=>{
    const savableObj =  new Campaign({
        campaignName:data.campaignName,
        template:data.template,
        usersSelected:data.usersSelected
    })
    return savableObj.save();
};

const runCampaign =async(data)=>{
   const updateCampaign = await Campaign.findOneAndUpdate({_id:data._id},{$set:{
    frequency:data.frequency,
    timePeriod:data.timePeriod,
    state:'running'
   }}).exec();
   //do some job add thing here

};

const fetchCampaigns = ()=>{
    return Campaign.find().select('campaignName state frequency timePeriod').exec();
}
module.exports ={
    addCampaign,
    runCampaign,
    fetchCampaigns
}