const EmailList= require('../models/EmailList');


const addEmail = (email)=>{
    const savableObj = EmailList({email:email});
    return savableObj.save();
}

const fetchEmailList =(limit,skip)=>{
   return EmailList.find({}).limit(limit).skip(skip).exec();
}

module.exports={
    addEmail,
    fetchEmailList
}