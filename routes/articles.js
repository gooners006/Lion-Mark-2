var express = require("express");
const uuid = require("uuid/v1");
const tag_DAO = require("../public/javascripts/DAO/tag_DAO");
const common = require("../public/javascripts/common/valid");
const article_DAO = require("../public/javascripts/DAO/article_DAO");
const message = require("../public/javascripts/common/message");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var router = express.Router();

/**
 * Get article by slug
 */
router.get("/:slug", (req, res) => {
  try {
    let slug = req.params.slug;
    let result_valid_Input = common.valid_Input(slug);
    //-------------------------------------------------------------------
    if (result_valid_Input) {
      res.end(message.MSG_A_001);
    } else {
      if (slug == 'feed') {
        article_DAO.findAll_Article().then(result_Art => {
          res.json(result_Art);
        });
      } else {
        article_DAO.findOne_Article(slug, (err, result_Article) => {
          if (err) throw err;
          res.json(result_Article);
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

/**
 * Get article by filter
 */
router.get("/", (req, res) => {
  try {
    let filter = req.query;
    let query = '';
    // Find by Tag
    if (filter.tag != null) {
      query = filter.tag;
      article_DAO.findAll_Article_ByTag(query, (err, result_Article) => {
        if (err) throw err;
        res.json(result_Article);
      });
    }
    // Find by Limit
    if (filter.limit != null) {
      query = filter.limit;
      article_DAO.findAll_Article_Limit(query, (err, result_Article) => {
        if (err) throw err;
        res.json(result_Article);
      });
    }
    // Find by Author
    if (filter.author != null) {
      query = filter.author;
      article_DAO.findAll_Article_ByAuthor(query, (err, result_Article) => {
        if (err) throw err;
        res.json(result_Article);
      });
    }
  } catch (err) {
    console.log(err);
  }
});

/**
 * Method create new articles
 */
router.post('/', function (req, res) {
  try {
    let data_new_articles = req.body.article;
    let tag_Articles_Data = data_new_articles.tagList;
    let tag_duplicate = [];
    let tag_Name = [];
    let tag = '';
    // --------------------------------------------------------------------------
    tag_DAO.findAll_Tag().then(result_tag => {
      let result_tag_array = result_tag.map((r) => (r.toJSON()));
      result_tag_array.forEach(function (element_tag) {
        tag_Name.push(element_tag.name);
      });
      // --------------------------------------------------------------------------
      // Create list tag duplicate 
      for (var i = 0; i < tag_Articles_Data.length; i++) {
        tag += tag_Articles_Data[i] + ',';
        for (var j = 0; j < tag_Name.length; j++) {
          if (tag_Articles_Data[i] != null && tag_Articles_Data[i] != '' && tag_Articles_Data[i] != "" && tag_Name[j] != null && tag_Name[j] != '' && tag_Name[j] != "") {
            if (tag_Articles_Data[i].trim() == tag_Name[j].trim()) {
              tag_duplicate.push(tag_Articles_Data[i].trim());
            }
          }
        }
      }
      // Remove tag duplicate from list
      tag_Articles_Data = tag_Articles_Data.filter(item => !tag_duplicate.includes(item))
      // --------------------------------------------------------------------------
      // List Json data add to DB
      let data_tag_create = [];
      // Check if list tag is new and create list data add to DB
      if (tag_Articles_Data != null && tag_Articles_Data.length > 0) {
        for (var k = 0; k < tag_Articles_Data.length; k++) {
          data_tag_create.push({ name: tag_Articles_Data[k] });
        }
        tag_DAO.insert_Tag(data_tag_create);
      }
      // Add article to DB
      article_DAO.insert_Article(uuid(), data_new_articles.title, data_new_articles.description, data_new_articles.body, tag).then(art => {
        res.end(message.MSG_A_004);
      });
    });
  } catch (err) {
    console.log(err);
  }
});

/**
 * Delete One Article
 */
router.delete("/:slug", (req, res) => {
  try {
    let slug = req.params.slug;
    let result_valid_Input = common.valid_Input(slug);
    //-------------------------------------------------------------------
    if (result_valid_Input) {
      res.end(message.MSG_A_001);
    } else {
      article_DAO.delete_Article(slug, (err, result_Article) => {
        if (err) throw err;
        res.end(result_Article);
      });
    }
  } catch (err) {
    console.log(err);
  }
});

/**
 * Update One Article
 */
router.put("/:slug", (req, res) => {
  try {
    let slug = req.params.slug;
    let result_valid_Input = common.valid_Input(slug);
    //-------------------------------------------------------------------
    if (result_valid_Input) {
      res.end(message.MSG_A_001);
    } else {
      article_DAO.findOne_Article(slug, (err, result_Article) => {
        if (err) throw err;

        //--------------------------------------------------
        let data_new_articles = req.body.article;
        let tag_Articles_Data = data_new_articles.tagList;
        let tag_duplicate = [];
        let tag_Name = [];
        let tag = '';

        tag_DAO.findAll_Tag().then(result_tag => {
          let result_tag_array = result_tag.map((r) => (r.toJSON()));
          result_tag_array.forEach(function (element_tag) {
            tag_Name.push(element_tag.name);
          });
          // --------------------------------------------------------------------------
          // Create list tag duplicate 
          if (tag_Articles_Data != null) {
            for (var i = 0; i < tag_Articles_Data.length; i++) {
              tag += tag_Articles_Data[i] + ',';
              for (var j = 0; j < tag_Name.length; j++) {
                if (tag_Articles_Data[i] != null && tag_Articles_Data[i] != '' && tag_Articles_Data[i] != "" && tag_Name[j] != null && tag_Name[j] != '' && tag_Name[j] != "") {
                  if (tag_Articles_Data[i].trim() == tag_Name[j].trim()) {
                    tag_duplicate.push(tag_Articles_Data[i].trim());
                  }
                }
              }
            }
            // Remove tag duplicate from list
            tag_Articles_Data = tag_Articles_Data.filter(item => !tag_duplicate.includes(item))
            // --------------------------------------------------------------------------
            // List Json data add to DB
            let data_tag_create = [];
            // Check if list tag is new and create list data add to DB
            if (tag_Articles_Data != null && tag_Articles_Data.length > 0) {
              for (var k = 0; k < tag_Articles_Data.length; k++) {
                data_tag_create.push({ name: tag_Articles_Data[k] });
              }
              tag_DAO.insert_Tag(data_tag_create);
            }
          }
          // Update article to DB
          result_Article.updateAttributes(data_new_articles).then(function (result) {
            res.end(message.MSG_A_003);
          });
        });
      });
    }
  } catch (err) {
    console.log(err);
  }
});

/**
 * Method Add Favorite Article
 */
router.post("/:slug/favorite", (req, res) => {
  let slug = req.params.slug;
  let result_valid_Input = common.valid_Input(slug);
  //-------------------------------------------------------------------
  if (result_valid_Input) {
    res.end(message.MSG_A_001);
  } else {
    article_DAO.findOne_Article(slug, (err, result_Article) => {
      if (err) throw err;
      result_Article.updateAttributes({
        favorited: true
      });
      res.end(message.MSG_F_001);
    });
  }
});

/**
 * Method Delete Favorite Article
 */
router.delete("/:slug/favorite", (req, res) => {
  let slug = req.params.slug;
  let result_valid_Input = common.valid_Input(slug);
  //-------------------------------------------------------------------
  if (result_valid_Input) {
    res.end(message.MSG_A_001);
  } else {
    article_DAO.findOne_Article(slug, (err, result_Article) => {
      if (err) throw err;
      console.log(result_Article + "aaaaaaaaaaaaa");
      if (result_Article != 'Empty') {
        result_Article.updateAttributes({
          favorited: false
        });
        res.end(message.MSG_F_002);
      } else {
        res.end(message.MSG_T_001);
      }
    });
  }
});

module.exports = router;
