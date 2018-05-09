const express = require('express');
const jwt = require('jsonwebtoken');
const users_DAO = require('../public/javascripts/DAO/users_DAO');
const db_users = require('../public/javascripts/database/db_users');
const common = require('../public/javascripts/common/valid');
const message = require('../public/javascripts/common/message');

const router = express.Router();

/**
 * Method create new users
 */
router.post('/users', (req, res, next) => {
  try {
    const data_new_users = req.body.user;
    const check = users_DAO.insert_Users(
      data_new_users.username,
      data_new_users.email,
      data_new_users.password,
    );
    res.end(message.MSG_U_001);
  } catch (e) {
    console.log(e);
  }
});

/**
 * Method login user using username and password using JWT
 */
router.post('/users/login', (req, res, next) => {
  try {
    // Get user from body
    const user = req.body.user;
    // ---------------------------------------------------------------------
    if (user != null && user != '' && user != '') {
      db_users
        .findOne({
          email: user.email,
          password: user.password,
        })
        .then((user) => {
          if (!user) {
            res.json({ success: false, message: message.MSG_U_003 });
          } else if (user) {
            const users = { email: user.email, password: user.password };
            const token = jwt.sign(users, 'jsonwebtoken', {
              // 60*60*24*7
              expiresIn: 604800,
            });
            req.session.users = users;
            req.session.token = token;
            res.json({
              success: true,
              message: message.MSG_U_004,
              token,
            });
            // Update token to DB
            user.updateAttributes({
              token,
            });
          }
        });
    } else {
      res.end(message.MSG_U_002);
    }
  } catch (err) {
    console.log(err);
  }
});

/**
 * Method get info user login
 */
router.get('/user', (req, res, next) => {
  try {
    // get token from session
    const token = req.session.token;
    if (token != null) {
      users_DAO.findOne_User(token, (err, result) => {
        if (err) throw err;
        res.json(result);
      });
    } else {
      res.json(message.MSG_U_005);
    }
  } catch (e) {
    console.log(e);
  }
});

/**
 * Update user
 */
router.put('/user', (req, res, next) => {
  try {
    const token = req.session.token;
    if (token != null) {
      const data_new_users = req.body.user;
      if (data_new_users != null) {
        users_DAO.findOne_User(token, (err, result) => {
          if (err) throw err;
          if (result != null) {
            result.updateAttributes(data_new_users);
            res.end(message.MSG_U_006);
          }
        });
      }
    } else {
      res.json(message.MSG_U_005);
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
