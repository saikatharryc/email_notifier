const jwt = require("jsonwebtoken");
const config = require("../config");

var authRoute = require("./auth");
var authEnabledRoutes = require("./authenticatedRoute");
const emailList = require('./emailList');
const campaign = require('./campaign');  

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

  app.use("/apis/*", isAuth); //authenticated routes
  app.use('/apis/emailList',emailList);
  app.use('/apis/campaign',campaign);
  app.use("/apis/authEnabled", authEnabledRoutes);
};

module.exports = api;
