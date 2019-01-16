const _ = require('lodash');
const Pxls = require("../models/pxls");

const getStats = async () => {
    //use limit skip here, it will be too many 
     const data = await Pxls.aggregate(
      [
        { $match: {type:{$exists:true}} },
        { $group: { _id: "$type", total: { $sum: "$count" },count:{$sum:1} } }
      ]
    );
    console.log(data)
  // const toalSent = await Pxls.countDocuments({ type: "open" });
  // const allData = await Pxls.find().sort({_id:-1}).exec();
  // const openData =[]
  // const clickData=[]
  // for(let i of allData){
  //     i.type=="click" ? clickData.push(i) : openData.push(i) ;
  // }
  const countData = data.length ? data[0].count  : 0;
  let opened = _.map(data, (o)=>{
    if (o._id == "open") return o.total;
});
 opened = _.without(opened,undefined)
let closed = _.map(data, (o)=>{
  if (o._id == "close") return o.total;
});
 closed = _.without(closed,undefined)
  return { toalSent: countData , openData:opened[0],clickData:closed[0]};
};

module.exports = {
  getStats
};
