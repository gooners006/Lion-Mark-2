const { db_connection, Sequelize } = require("../DAO/connectDB");

/**
 * Create DB article
 */
const Article = db_connection.define("articles", {
  slug: Sequelize.STRING,
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  body: Sequelize.STRING,
  tag: Sequelize.STRING,
  commentID: Sequelize.STRING,
  favorited: Sequelize.BOOLEAN,
  favoritesCount: Sequelize.INTEGER,
  authorID: Sequelize.STRING
});

// Article.sync({ force: true });

module.exports = Article;
