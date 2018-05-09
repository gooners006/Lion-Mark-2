var db_article = require('../database/db_article');
const common = require("../common/valid");
const message = require("../common/message");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {

    /**
     * Method find One Article by slug
     */
    findOne_Article: (slug, cb) => {
        if (common.valid_Input(slug) == true) {
            return cb(message.MSG_A_001);
        } else {
            db_article.findOne({
                where: {
                    slug: slug
                }
            }).then(function (users) {
                if (users != null) {
                    return cb(null, users);
                } else {
                    return cb(null, message.MSG_T_001);
                }
            }).catch(function (err) {
                return cb(err);
            });
        }
    },

    /**
     * Method find All Article
     */
    findAll_Article: () => {
        return db_article.findAll();
    },

    /**
     * Method find One Article by tag
     */
    findAll_Article_ByTag: (tag_name, cb) => {
        if (common.valid_Input(tag_name) == true) {
            return cb(message.MSG_A_001);
        } else {
            db_article.findAll({
                where: {
                    tag: {
                        [Op.like]: '%' + tag_name + '%'
                    }
                },
                plain: false
            }).then(function (users) {
                if (users != null) {
                    return cb(null, users);
                } else {
                    return cb(null, message.MSG_T_001);
                }
            }).catch(function (err) {
                return cb(err);
            });
        }
    },
    /**
     * Method find One Article by tag
     */
    findAll_Article_ByAuthor: (name, cb) => {
        if (common.valid_Input(name) == true) {
            return cb(message.MSG_A_001);
        } else {
            db_article.findAll({
                where: {
                    authorID: {
                        [Op.like]: '%' + name + '%'
                    }
                },
                plain: false
            }).then(function (users) {
                if (users != null) {
                    return cb(null, users);
                } else {
                    return cb(null, message.MSG_T_001);
                }
            }).catch(function (err) {
                return cb(err);
            });
        }
    },
    /**
     * Method find Art limit
     */
    findAll_Article_Limit: (limit, cb) => {
        if (common.valid_Input(limit) == true) {
            return cb(message.MSG_A_001);
        } else {
            db_article.findAll({
                limit: limit,
                plain: false
            }).then(function (users) {
                if (users != null) {
                    return cb(null, users);
                } else {
                    return cb(null, message.MSG_T_001);
                }
            }).catch(function (err) {
                return cb(err);
            });
        }
    },
    /**
     * Method delete One Article by slug
     */
    delete_Article: (slug, cb) => {
        if (common.valid_Input(slug) == true) {
            return cb(message.MSG_A_001);
        } else {
            db_article.destroy({
                where: {
                    slug: slug
                }
            }).then(() => {
                return cb(null, message.MSG_A_002);
            }).catch(function (err) {
                return cb(err);
            });
        }
    },
    /**
     * Insert new article
     */
    insert_Article: (slug, title, description, body, tagList) => {
        db_article.create({
            slug: slug,
            title: title,
            description: description,
            body: body,
            tag: tagList
        });
    }
}