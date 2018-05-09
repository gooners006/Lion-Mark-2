var db_tag = require('../database/db_tag');
const common = require("../common/valid");
const message = require("../common/message");

module.exports = {

    /**
     * Method find all tag
     */
    findAll_Tag: () => {
        return db_tag.findAll();
    },
    /**
     * Method insert new tag
     */
    insert_Tag: (data) => {
        db_tag.bulkCreate(data).then(function (result) {
            return true;
        }).catch(function (error) {
            return false;
        })
    }
}