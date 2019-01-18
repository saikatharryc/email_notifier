const mongoose = require("mongoose");
const beautifyUnique = require("mongoose-unique-validator");
const bcrypt = require("bcrypt-nodejs");

const UserSchema = new mongoose.Schema({
  password: {
    type: String,
    select: false,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  emailVerified:{
    type:Boolean,
    default:false
  },
  profile:{
    name:String,
    sex:{
      type:String,
      enum:['M','F','T']
    }
    //etc everything about users goes here. 
  }
});
UserSchema.plugin(beautifyUnique, { message: 'Error, {PATH} already Exists.' });
UserSchema.pre("save", function(next) {
  var user = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, null, function(err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function(pass, cb) {
  //as password field property has select is false
  Users.findOne({ _id: this._id })
    .select("_id")
    .select("+password")
    .exec()
    .then(data => {
      bcrypt.compare(pass, data.password, function(err, isMatch) {
        if (err) {
          return cb(err);
        }
        return cb(null, isMatch);
      });
    })
    .catch(error => {
      return cb(error);
    });
};


const Users = mongoose.model("Users", UserSchema);
module.exports = Users;
