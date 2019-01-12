const express = require("express");
const router = express.Router();
const statCont = require('../controllers/stats.cont');

router.get('/',(req,res,next)=>{
    statCont.getStats().then(data=>{
        return res.json(data);
    }).catch(error=>{
        return next(error);
    })
});

module.exports=router;