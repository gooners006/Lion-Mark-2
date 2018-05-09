const express = require('express');
const tag_DAO = require('../public/javascripts/DAO/tag_DAO');
const common = require('../public/javascripts/common/valid');
const message = require('../public/javascripts/common/message');

const router = express.Router();

/**
 * Method comment in Art
 */
router.get('/', (req, res, next) => {
  try {
    const token = req.session.token;
    if (token != null) {
      tag_DAO.findAll_Tag().then((result_Tag) => {
        res.json(result_Tag);
      });
    } else {
      res.json(message.MSG_U_005);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
