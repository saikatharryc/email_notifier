const mongoose = require("mongoose");
const TheaterSchema = new mongoose.Schema({
   name:{
    type:String,
   },
   theaterId:{
    type:String,
    unique:true
   },
   location:{
       city:String,
       state:String
   },
   metadata:{
       organization:String,
       openingTime:String,
       closingTime:String
   }
});

const Theaters = mongoose.model("Theaters", TheaterSchema);
module.exports = Theaters;
