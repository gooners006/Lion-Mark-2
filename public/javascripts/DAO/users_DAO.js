var db_users = require('../database/db_users');
const common = require("../common/valid");
const message = require("../common/message");

module.exports = {

    /**
     * Method insert new tag
     */
    insert_Users: (username, email, password) => {
        db_users.create({
            username: username,
            email: email,
            password: password
        }).then(function (result) {
            return true;
        }).catch(function (error) {
            return false;
        })
    }
}