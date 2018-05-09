var express = require("express");
const tag_DAO = require("../public/javascripts/DAO/tag_DAO");
const common = require("../public/javascripts/common/valid");
const message = require("../public/javascripts/common/message");
var router = express.Router();

/**
 * Method comment in Art
 */
router.get("/", function (req, res, next) {
    try {
        tag_DAO.findAll_Tag().then(result_Tag => {
            res.json(result_Tag);
        });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
