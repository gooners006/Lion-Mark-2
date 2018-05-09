var env = require("node-env-file");
env(__dirname + "/.env");

/**
 * Export data file config
 */
module.exports = {

  _DB_HOST: () => {
    return process.env.DB_host;
  },
  _DB_USER: () => {
    return process.env.DB_username;
  },
  _DB_PASS: () => {
    return process.env.DB_password;
  },
  _DB_NAME: () => {
    return process.env.DB_database;
  },
  _DB_PORT: () => {
    return process.env.DB_port;
  },
  _DB_DIALECT: () => {
    return process.env.DB_dialect;
  }
};
