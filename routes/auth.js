const express = require("express");
const router = express.Router();

const UserAuthCont = require("../controllers/user.auth.cont");

router.post("/signup", (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return next({
      message: "All fields are required.",
      status: 400
    });
  }
  
  UserAuthCont.register(req.body)
    .then(data => {
      return res.json({
        message:
          "You can now login."
      });
    })
    .catch(error => {
      return next(error);
    });
});
router.post("/login", (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return next({
      message: "All fields are required.",
      status: 400
    });
  }
  UserAuthCont.login(req.body)
    .then(data => {
      return res.json(data);
    })
    .catch(error => {
      return next(error);
    });
});
router.get("/verification/:id", (req, res, next) => {
  if (!req.params.id) {
    return next({
      status: "400",
      message: "Invalid request"
    });
  }
  UserAuthCont.verification(req.params.id)
    .then(data => {
      return res.json(data);
    })
    .catch(error => {
      return next(error);
    });
});

module.exports = router;
