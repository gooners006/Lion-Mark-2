var express = require("express");
const users_DAO = require("../public/javascripts/DAO/users_DAO");
const common = require("../public/javascripts/common/valid");
const message = require("../public/javascripts/common/message");
var router = express.Router();

/* GET users listing. */
router.post("/users", function (req, res, next) {
  try {
    let data_new_users = req.body.user;
    users_DAO.insert_Users(data_new_users.username, data_new_users.email, data_new_users.password);
    res.end(message.MSG_U_001);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
