const mongoose = require("mongoose");
const TheaterSchema = new mongoose.Schema({
   name:{
    type:String,
    unique:true
   },
   city:{
       type:String
   },
   state:{
       type:String
   }
});

const Theaters = mongoose.model("Theaters", TheaterSchema);
module.exports = Theaters;
