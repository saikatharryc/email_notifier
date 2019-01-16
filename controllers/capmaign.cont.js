
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
    let query={}
    let cityQuery ={}
    let stateQuery ={}
    const cpgStates =updateCampaign.usersSelected.state;
    const cpgcities =updateCampaign.usersSelected.city;
    if(cpgcities.indexOf('all') ==-1){
      cityQuery['city']={$in :cpgcities}
    }
    if(cpgStates.indexOf('all')==-1){
      stateQuery['state']={$in :cpgStates}
    }
    if(Object.keys(cityQuery).length && Object.keys(stateQuery).length){
          query["$or"]=[
              cityQuery,stateQuery
            ]
          
    }else if(Object.keys(cityQuery).length || Object.keys(stateQuery).length){
      query=cityQuery.length ? cityQuery :stateQuery;
    }
   
//if there is lots of docs, using MDB cursor it will fetch only one an a time, and go next.
 EmailList.find(query).select('email').cursor().
  on('data', async(doc)=> { 
      //construct email options 
    // await BullPusher.pushtobull(pxl,updateCampaign,doc.email);
    console.log(doc.email)
   }).
  on('end', async()=> { 
    //change state of campaign r something
    (updateCampaign.frequency = data.frequency),
    (updateCampaign.timePeriod = data.timePeriod),
    (updateCampaign.state = "running");
    await updateCampaign.save();
    // console.log("done")
   });
  //above thing will do its work, lets not block things.
  return true;
};
module.exports ={ 
  addCampaign,fetchCampaigns,runCampaign
};
