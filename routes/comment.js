const express = require('express');
const comment_DAO = require('../public/javascripts/DAO/comment_DAO');
const common = require('../public/javascripts/common/valid');
const message = require('../public/javascripts/common/message');

const router = express.Router();

/**
 * Method comment in Art
 */
router.get('/articles/:slug/comments', (req, res, next) => {
  try {
    const token = req.session.token;
    if (token != null) {
      // Get slug comments
      const slug = req.params.slug;
      const result_valid_Input = common.valid_Input(slug);
      //-------------------------------------------------------------------
      if (result_valid_Input) {
        res.end(message.MSG_A_001);
      } else {
        comment_DAO.findOne_Comment(slug, (err, result_Comment) => {
          if (err) throw err;
          res.json(result_Comment);
        });
      }
    } else {
      res.json(message.MSG_U_005);
    }
  } catch (err) {
    console.log(err);
  }
});

/**
 * Method add new comment
 */
router.post('/articles/:slug/comments', (req, res, next) => {
  try {
    const token = req.session.token;
    if (token != null) {
      // Get slug comments
      const slug = req.params.slug;
      const result_valid_Input = common.valid_Input(slug);
      //-------------------------------------------------------------------
      if (result_valid_Input) {
        res.end(message.MSG_A_001);
      } else {
        const data_new_comment = req.body.comment;
        comment_DAO.insert_Comment(slug, data_new_comment.body, 1);
        res.end(message.MSG_C_004);
      }
    } else {
      res.json(message.MSG_U_005);
    }
  } catch (err) {
    console.log(err);
  }
});

/**
 * Method delete comment
 */
router.delete('/articles/:slug/comments/:id', (req, res) => {
  try {
    const token = req.session.token;
    if (token != null) {
      // Get id and slug comments should be delete
      const slug = req.params.slug;
      const id = req.params.id;
      const result_valid_Input = common.valid_Input(slug);
      const result_valid_Input_id = common.valid_Input(id);
      //-------------------------------------------------------------------
      if (result_valid_Input && result_valid_Input_id) {
        res.end(message.MSG_A_001);
      } else {
        comment_DAO.delete_Comment(slug, id, (err, result_Article) => {
          if (err) throw err;
          res.end(result_Article);
        });
      }
    } else {
      res.json(message.MSG_U_005);
    }
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
