const Theaters= require('../models/Theaters');


const addTheater = (data)=>{
    const savableObj = Theaters(data);
    return savableObj.save();
}

const fetchTheaterList =(limit,skip)=>{
   return Theaters.find({}).sort({_id:-1}).limit(limit).skip(skip).exec();
}

module.exports={
    addTheater,
    fetchTheaterList
}