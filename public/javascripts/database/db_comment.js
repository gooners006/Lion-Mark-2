const { db_connection, Sequelize } = require("../DAO/connectDB");

/**
 * Create DB comment
 */
const Comment = db_connection.define("comments", {
  slug: Sequelize.STRING,
  body: Sequelize.STRING,
  author: Sequelize.INTEGER
});

// Comment.sync({ force: true });

module.exports = Comment;
