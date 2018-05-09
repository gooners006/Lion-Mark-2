const db_users = require('../database/db_users');
const common = require('../common/valid');
const message = require('../common/message');

module.exports = {
  /**
   * Method insert new user
   */
  insert_Users: (username, email, password) => {
    db_users
      .create({
        username,
        email,
        password,
      })
      .then(result => true)
      .catch(error => false);
  },
  /**
   * Method find one user
   */
  findOne_User: (token, cb) => {
    if (common.valid_Input(token) == true) {
      return cb(message.MSG_A_001);
    }
    db_users
      .findOne({
        token,
      })
      .then(result => cb(null, result))
      .catch(error => cb(error));
  },
};
