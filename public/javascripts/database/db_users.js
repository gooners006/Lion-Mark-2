const { db_connection, Sequelize } = require('../DAO/connectDB');

/**
 * Create DB Users
 */
const Users = db_connection.define('users', {
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  token: Sequelize.STRING,
  password: Sequelize.STRING,
  bio: Sequelize.STRING,
  image: Sequelize.STRING,
});

// Users.sync({ force: true });

module.exports = Users;
