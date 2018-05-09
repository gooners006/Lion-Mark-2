var express = require("express");
const comment_DAO = require("../public/javascripts/DAO/comment_DAO");
const common = require("../public/javascripts/common/valid");
const message = require("../public/javascripts/common/message");
var router = express.Router();

/**
 * Method comment in Art
 */
router.get("/articles/:slug/comments", function (req, res, next) {
    try {
        let slug = req.params.slug;
        let result_valid_Input = common.valid_Input(slug);
        //-------------------------------------------------------------------
        if (result_valid_Input) {
            res.end(message.MSG_A_001);
        } else {
            comment_DAO.findOne_Comment(slug, (err, result_Comment) => {
                if (err) throw err;
                res.json(result_Comment);
            })
        }
    } catch (err) {
        console.log(err);
    }
});

/**
 * Method add new comment
 */
router.post("/articles/:slug/comments", function (req, res, next) {
    try {
        let slug = req.params.slug;
        let result_valid_Input = common.valid_Input(slug);
        //-------------------------------------------------------------------
        if (result_valid_Input) {
            res.end(message.MSG_A_001);
        } else {
            let data_new_comment = req.body.comment;
            comment_DAO.insert_Comment(slug, data_new_comment.body, 1);
            res.end(message.MSG_C_004);
        }
    } catch (err) {
        console.log(err);
    }
});

/**
 * Method delete comment
 */
router.delete("/articles/:slug/comments/:id", (req, res) => {
    try {
        let slug = req.params.slug;
        let result_valid_Input = common.valid_Input(slug);
        //-------------------------------------------------------------------
        if (result_valid_Input) {
            res.end(message.MSG_A_001);
        } else {
            comment_DAO.delete_Comment(slug, (err, result_Article) => {
                if (err) throw err;
                res.end(result_Article);
            });
        }
    } catch (err) {
        console.log(err);
    }
});
module.exports = router;
