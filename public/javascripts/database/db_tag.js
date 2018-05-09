const { db_connection, Sequelize } = require("../DAO/connectDB");

/**
 * Create DB tag
 */
const Tag = db_connection.define("tags", {
  name: Sequelize.STRING
});

// Tag.sync({ force: true });

module.exports = Tag;