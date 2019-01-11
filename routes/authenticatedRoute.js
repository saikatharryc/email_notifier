const express = require("express");
const router = express.Router();

router.get("/amIautheticated", (req, res, next) => {
  return res.json({ yeah: true });
});
module.exports = router;
