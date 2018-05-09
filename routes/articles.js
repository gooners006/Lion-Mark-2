const express = require('express');
const uuid = require('uuid/v1');
const tag_DAO = require('../public/javascripts/DAO/tag_DAO');
const common = require('../public/javascripts/common/valid');
const article_DAO = require('../public/javascripts/DAO/article_DAO');
const message = require('../public/javascripts/common/message');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;
const router = express.Router();

/**
 * Get article by slug
 */
router.get('/:slug', (req, res) => {
  try {
    const token = req.session.token;
    if (token != null) {
      const slug = req.params.slug;
      const result_valid_Input = common.valid_Input(slug);
      //-------------------------------------------------------------------
      if (result_valid_Input) {
        res.end(message.MSG_A_001);
      } else if (slug == 'feed') {
        article_DAO.findAll_Article().then((result_Art) => {
          res.json(result_Art);
        });
      } else {
        article_DAO.findOne_Article(slug, (err, result_Article) => {
          if (err) throw err;
          res.json(result_Article);
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
 * Get article by filter
 */
router.get('/', (req, res) => {
  try {
    const token = req.session.token;
    if (token != null) {
      const filter = req.query;
      let query = '';
      // Find by Tag
      if (filter.tag != null) {
        query = filter.tag;
        article_DAO.findAll_Article_ByTag(query, (err, result_Article) => {
          if (err) throw err;
          res.json(result_Article);
        });
      } else if (filter.limit != null) {
        // Find by Limit
        query = filter.limit;
        article_DAO.findAll_Article_Limit(query, (err, result_Article) => {
          if (err) throw err;
          res.json(result_Article);
        });
      } else if (filter.author != null) {
        // Find by Author
        query = filter.author;
        article_DAO.findAll_Article_ByAuthor(query, (err, result_Article) => {
          if (err) throw err;
          res.json(result_Article);
        });
      } else {
        res.end('Please enter params');
      }
    } else {
      res.json(message.MSG_U_005);
    }
  } catch (err) {
    console.log(err);
  }
});

/**
 * Method create new articles
 */
router.post('/', (req, res) => {
  try {
    const token = req.session.token;
    if (token != null) {
      const data_new_articles = req.body.article;
      let tag_Articles_Data = data_new_articles.tagList;
      const tag_duplicate = [];
      const tag_Name = [];
      let tag = '';
      // --------------------------------------------------------------------------
      tag_DAO.findAll_Tag().then((result_tag) => {
        const result_tag_array = result_tag.map(r => r.toJSON());
        result_tag_array.forEach((element_tag) => {
          tag_Name.push(element_tag.name);
        });
        // --------------------------------------------------------------------------
        // Create list tag duplicate
        for (let i = 0; i < tag_Articles_Data.length; i++) {
          tag += `${tag_Articles_Data[i]},`;
          for (let j = 0; j < tag_Name.length; j++) {
            if (
              tag_Articles_Data[i] != null &&
              tag_Articles_Data[i] != '' &&
              tag_Articles_Data[i] != '' &&
              tag_Name[j] != null &&
              tag_Name[j] != '' &&
              tag_Name[j] != ''
            ) {
              if (tag_Articles_Data[i].trim() == tag_Name[j].trim()) {
                tag_duplicate.push(tag_Articles_Data[i].trim());
              }
            }
          }
        }
        // Remove tag duplicate from list
        tag_Articles_Data = tag_Articles_Data.filter(item => !tag_duplicate.includes(item));
        // --------------------------------------------------------------------------
        // List Json data add to DB
        const data_tag_create = [];
        // Check if list tag is new and create list data add to DB
        if (tag_Articles_Data != null && tag_Articles_Data.length > 0) {
          for (let k = 0; k < tag_Articles_Data.length; k++) {
            data_tag_create.push({ name: tag_Articles_Data[k] });
          }
          tag_DAO.insert_Tag(data_tag_create);
        }
        // Add article to DB
        const check = article_DAO.insert_Article(
          uuid(),
          data_new_articles.title,
          data_new_articles.description,
          data_new_articles.body,
          tag,
        );
        res.end(message.MSG_A_004);
      });
    } else {
      res.json(message.MSG_U_005);
    }
  } catch (err) {
    console.log(err);
  }
});

/**
 * Delete One Article
 */
router.delete('/:slug', (req, res) => {
  try {
    const token = req.session.token;
    if (token != null) {
      const slug = req.params.slug;
      const result_valid_Input = common.valid_Input(slug);
      //-------------------------------------------------------------------
      if (result_valid_Input) {
        res.end(message.MSG_A_001);
      } else {
        article_DAO.delete_Article(slug, (err, result_Article) => {
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

/**
 * Update One Article
 */
router.put('/:slug', (req, res) => {
  try {
    const token = req.session.token;
    if (token != null) {
      const slug = req.params.slug;
      const result_valid_Input = common.valid_Input(slug);
      //-------------------------------------------------------------------
      if (result_valid_Input) {
        res.end(message.MSG_A_001);
      } else {
        article_DAO.findOne_Article(slug, (err, result_Article) => {
          if (err) throw err;

          //--------------------------------------------------
          const data_new_articles = req.body.article;
          let tag_Articles_Data = data_new_articles.tagList;
          const tag_duplicate = [];
          const tag_Name = [];
          let tag = '';

          tag_DAO.findAll_Tag().then((result_tag) => {
            const result_tag_array = result_tag.map(r => r.toJSON());
            result_tag_array.forEach((element_tag) => {
              tag_Name.push(element_tag.name);
            });
            // --------------------------------------------------------------------------
            // Create list tag duplicate
            if (tag_Articles_Data != null) {
              for (let i = 0; i < tag_Articles_Data.length; i++) {
                tag += `${tag_Articles_Data[i]},`;
                for (let j = 0; j < tag_Name.length; j++) {
                  if (
                    tag_Articles_Data[i] != null &&
                    tag_Articles_Data[i] != '' &&
                    tag_Articles_Data[i] != '' &&
                    tag_Name[j] != null &&
                    tag_Name[j] != '' &&
                    tag_Name[j] != ''
                  ) {
                    if (tag_Articles_Data[i].trim() == tag_Name[j].trim()) {
                      tag_duplicate.push(tag_Articles_Data[i].trim());
                    }
                  }
                }
              }
              // Remove tag duplicate from list
              tag_Articles_Data = tag_Articles_Data.filter(item => !tag_duplicate.includes(item));
              // --------------------------------------------------------------------------
              // List Json data add to DB
              const data_tag_create = [];
              // Check if list tag is new and create list data add to DB
              if (tag_Articles_Data != null && tag_Articles_Data.length > 0) {
                for (let k = 0; k < tag_Articles_Data.length; k++) {
                  data_tag_create.push({ name: tag_Articles_Data[k] });
                }
                tag_DAO.insert_Tag(data_tag_create);
              }
            }
            // Update article to DB
            result_Article.updateAttributes(data_new_articles).then((result) => {
              res.end(message.MSG_A_003);
            });
          });
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
 * Method Add Favorite Article
 */
router.post('/:slug/favorite', (req, res) => {
  try {
    const token = req.session.token;
    if (token != null) {
      const slug = req.params.slug;
      const result_valid_Input = common.valid_Input(slug);
      //-------------------------------------------------------------------
      if (result_valid_Input) {
        res.end(message.MSG_A_001);
      } else {
        article_DAO.findOne_Article(slug, (err, result_Article) => {
          if (err) throw err;
          result_Article.updateAttributes({
            favorited: true,
          });
          res.end(message.MSG_F_001);
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
 * Method Delete Favorite Article
 */
router.delete('/:slug/favorite', (req, res) => {
  try {
    const token = req.session.token;
    if (token != null) {
      const slug = req.params.slug;
      const result_valid_Input = common.valid_Input(slug);
      //-------------------------------------------------------------------
      if (result_valid_Input) {
        res.end(message.MSG_A_001);
      } else {
        article_DAO.findOne_Article(slug, (err, result_Article) => {
          if (err) throw err;
          console.log(`${result_Article}aaaaaaaaaaaaa`);
          if (result_Article != 'Empty') {
            result_Article.updateAttributes({
              favorited: false,
            });
            res.end(message.MSG_F_002);
          } else {
            res.end(message.MSG_T_001);
          }
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
