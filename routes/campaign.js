const express = require("express");
const router = express.Router();
const capmaignCont = require('../controllers/capmaign.cont');


router.post('/createCampaign',(req,res,next)=>{
    const  data=  {
    campaignName: req.body.campaignName,
    template: req.body.template,
    usersSelected: req.body.usersSelected
        };
    capmaignCont.addCampaign(data).then(result=>{
            return res.json(result);
        }).catch(error=>{
            return next(error);
        });
});

router.get('/fetchCampaign',(req,res,next)=>{
  
    capmaignCont.fetchCampaigns().then(data=>{
            return res.json(data);
        }).catch(error=>{
            return next(error);
        });
});

router.post('/runCampaign',(req,res,next)=>{
    const data={
        frequency:req.body.frequency,
        timePeriod:req.body.timePeriod,
        _id:req.body._id
    };
    const pxl =req.app.pxl;
    capmaignCont.runCampaign(pxl,data).then(result=>{
            return res.json(result);
        }).catch(error=>{
            return next(error);
        });
});

module.exports=router;