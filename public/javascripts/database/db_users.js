const { db_connection, Sequelize } = require("../DAO/connectDB");

/**
 * Create DB Users
 */
const Users = db_connection.define("users", {
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
});

// Users.sync({ force: true });

module.exports = Users;
