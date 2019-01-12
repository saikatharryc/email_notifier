const mongoose = require("mongoose");
const Emailchema = new mongoose.Schema({
   email:{
       type:String
   }
},{
    timestamps:true
});

const EmailList = mongoose.model("EmailList", Emailchema);
module.exports = EmailList;
