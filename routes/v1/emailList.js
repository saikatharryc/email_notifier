const express = require("express");
const router = express.Router();
const emailListCont = require('../../controllers/emaillist.cont');

//create in Email List 
router.post("/", (req, res, next) => {
    if(!req.body.email || !req.body.city || !req.body.state){
        return next({
            status:400,
            message:"fields are required"
        })
    }
    emailListCont.addEmail(req.body).then(data=>{
        return res.json(data);
    }).catch(error=>{
        return next(error);
    })
});

//fetch from email list
router.get("/", (req, res, next) => {
    if(!req.query.limit ||!req.query.skip){
        return next({
            status:400,
            message:"all params are is required"
        })
    }
    emailListCont.fetchEmailList(Number(req.query.limit),Number(req.query.skip)).then(data=>{
        return res.json(data);
    }).catch(error=>{
        return next(error);
    })
});



module.exports = router;
