const mongoose = require("mongoose");
const Emailchema = new mongoose.Schema({

   email:{
       type:String
   },
   location:{
    city:String,
    state:String
   },
   profile:{
    name:String
   },
   services:{
       password:String,
       authToken:String
       //service related things goes here
   }
   
},{
    timestamps:true
});

const EmailList = mongoose.model("EmailList", Emailchema);
module.exports = EmailList;
