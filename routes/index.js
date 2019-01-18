const jwt = require("jsonwebtoken");
const config = require("../config");

const authRoute = require("./auth");
const emailList = require('./v1/emailList');
const campaign = require('./v1/campaign');  
const stats = require('./v1/stats');
const theaters = require("./v1/theaters");

const api = {};
const isAuth = (req,res,next) => {
  if (req.headers.authorization) {
    jwt.verify(
      req.headers.authorization,
      config.JWT.secret,
      (error, decoded) => {
        if (error) {
          return next({
            message: "Unauthenticated",
            status: 401
          });
        }
        req.user = {
          _id: decoded._id,
          email: decoded.email,
          username: decoded.username,
          wallet: decoded.wallet || null
        };
        next();
      }
    );
  } else {
    return next({
      message: "Unauthenticated",
      head: "Header is not present in the request.",
      status: 401
    });
  }
};
api.includeRoutes = app => {
  app.use("/auth", authRoute);
  
  app.use("/api/v1/*", isAuth); //authenticated routes
  app.use('/api/v1/emails',emailList);
  app.use('/api/v1/campaigns',campaign);
  app.use('/api/v1/stats',stats);
  app.use('/api/v1/theaters',theaters);
};

module.exports = api;
