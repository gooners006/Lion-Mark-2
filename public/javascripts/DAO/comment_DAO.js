var db_comment = require('../database/db_comment');
const common = require("../common/valid");
const message = require("../common/message");

module.exports = {

    /**
     * Method find comment by slug
     */
    findOne_Comment: (slug, cb) => {
        if (common.valid_Input(slug) == true) {
            return cb(message.MSG_A_001);
        } else {
            db_comment.findOne({
                where: {
                    slug: slug
                }
            }).then(function (comment) {
                if (comment != null) {
                    return cb(null, comment.dataValues);
                } else {
                    return cb(null, message.MSG_T_001);
                }
            }).catch(function (err) {
                return cb(err);
            });
        }
    },
    /**
     * Method insert new comment
     */
    insert_Comment: (slug, body, author) => {
        db_comment.create({
            slug: slug,
            body: body,
            author: author
        });
    },
    /**
     * Method delete One Article by slug
     */
    delete_Comment: (slug, cb) => {
        if (common.valid_Input(slug) == true) {
            return cb(message.MSG_A_001);
        } else {
            db_comment.destroy({
                where: {
                    slug: slug
                }
            }).then(() => {
                return cb(null, message.MSG_C_005);
            }).catch(function (err) {
                return cb(err);
            });
        }
    },
}