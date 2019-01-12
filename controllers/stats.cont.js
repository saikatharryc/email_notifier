const Pxls = require("../models/pxls");

const getStats = async () => {
    //use limit skip here, it will be too many 
  const toalSent = await Pxls.countDocuments({ type: "open" });
  const allData = await Pxls.find().sort({_id:-1}).exec();
  const openData =[]
  const clickData=[]
  for(let i of allData){
      i.type=="click" ? clickData.push(i) : openData.push(i) ;
  }
  return { toalSent: toalSent , openData:openData,clickData:clickData};
};

module.exports = {
  getStats
};
