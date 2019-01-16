const EmailList= require('../models/EmailList');


const addEmail = (data)=>{
    const savableObj = EmailList(data);
    return savableObj.save();
}

const fetchEmailList =(limit,skip)=>{
   return EmailList.find({}).sort({_id:-1}).limit(limit).skip(skip).exec();
}

module.exports={
    addEmail,
    fetchEmailList
}