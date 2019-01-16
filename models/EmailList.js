const mongoose = require("mongoose");
const Emailchema = new mongoose.Schema({
   name:{
    type:String
   },
   email:{
       type:String
   },
   city:{
       type:String
   },
   state:{
       type:String
   }
},{
    timestamps:true
});

const EmailList = mongoose.model("EmailList", Emailchema);
module.exports = EmailList;
