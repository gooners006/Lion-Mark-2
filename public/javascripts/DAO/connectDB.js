const Sequelize = require("sequelize");
const util = require("../util");

/**
 * Create connect sequelize to postgreSQL
 */
const db_connection = new Sequelize({
  database: util._DB_NAME(),
  username: util._DB_USER(),
  password: util._DB_PASS(),
  host: util._DB_HOST(),
  port: util._DB_PORT(),
  dialect: util._DB_DIALECT(),
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
  
});

/**
 * Method test connection to DB and show log
 */
db_connection.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


module.exports = { db_connection, Sequelize };
