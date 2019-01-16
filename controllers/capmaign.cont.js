
const Campaign = require("../models/Campaigns");
const EmailList = require("../models/EmailList");

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
    let query={}
    if(updateCampaign.usersSelected.city!="all"){
      query["city"] =updateCampaign.usersSelected.city;
    }
    if(updateCampaign.usersSelected.state!="all"){
      query["state"] =updateCampaign.usersSelected.state;
    }
   
//if there is lots of docs, using MDB cursor it will fetch only one an a time, and go next.
 EmailList.find(query).select('email').cursor().
  on('data', async(doc)=> { 
      //construct email options 
    await BullPusher.pushtobull(pxl,updateCampaign,doc.email);
    // console.log(doc.email)
   }).
  on('end', async()=> { 
    //change state of campaign r something
    await updateCampaign.save();
    // console.log("done")
   });
  //above thing will do its work, lets not block things.
  return true;
};
module.exports ={ 
  addCampaign,fetchCampaigns,runCampaign
};
