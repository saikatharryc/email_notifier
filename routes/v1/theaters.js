const express = require("express");
const router = express.Router();
const theaterCont = require('../../controllers/theater.cont');

router.post("/", (req, res, next) => {
    if(!req.body.name || !req.body.city || !req.body.state){
        return next({
            status:400,
            message:"fields are required"
        })
    }
    theaterCont.addTheater(req.body).then(data=>{
        return res.json(data);
    }).catch(error=>{
        return next(error);
    })
});

router.get("/", (req, res, next) => {
    if(!req.query.limit ||!req.query.skip){
        return next({
            status:400,
            message:"all params are is required"
        })
    }
    theaterCont.fetchTheaterList(Number(req.query.limit),Number(req.query.skip)).then(data=>{
        return res.json(data);
    }).catch(error=>{
        return next(error);
    })
});



module.exports = router;
