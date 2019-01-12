const jwt = require("jsonwebtoken");
const mongoose= require("mongoose");
const Users = require("../models/User");

const config = require("../config");

const register = (body) => {
  return new Promise((resolve, reject) => {
    const savable = new Users(body);
    savable.save((error, saved) => {
      if (error && error.errors.email) {
        return reject(new Error(error.errors.email.message));
      }
      return resolve(saved);
    });
  });
};

const login = body => {
  return new Promise((resolve, reject) => {
    Users.findOne({ email: body.email })
      .exec()
      .then(user => {
        if (!user) {
          return reject(new Error("User Not found"));
        }
        user.comparePassword(body.password, (error, isMatch) => {
          if (isMatch && !error) {
            var token = jwt.sign(user.toObject(), config.JWT.secret, {
              expiresIn: config.JWT.expire
            });
            return resolve({ token: token, user: user });
          } else {
            return reject(new Error("wrong password"));
          }
        });
      })
      .catch(error => {
        return reject(error);
      });
  });
};

const verification = id => {
  return new Promise((resolve, reject) => {
    Users.findOne({ _id: mongoose.Types.ObjectId(id) })
      .exec()
      .then(userData => {
        if (!userData) {
          return reject({
            message: "Invalid User"
          });
        }
        if (userData.emailVerified) {
          return reject({
            status: 400,
            message: "Already Verified"
          });
        }
        userData.emailVerified = true;
        userData.save();
        return resolve({
          message: "Successfully Verified"
        });
      });
  });
};

module.exports = {
  register,
  login,
  verification
};
