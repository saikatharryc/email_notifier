const mongoose = require("mongoose");
const CampaignSchema = new mongoose.Schema({
    campaignName:{
        type:String
    },
    state:{
        type:String,
        enum:['running','notRunning'],
        default:'notRunning'
    },
    template:{
        type:String
    },
    usersSelected:{
        type:Array
    },
    frequency:{
        type:String,
        enum:['daily','weekly','monthly','none'],
        default:'none'
    },
    timePeriod:{
        type:Number
    }
},{
    timestamps:true
});

const Campaign = mongoose.model("Campaign", CampaignSchema);
module.exports = Campaign;
