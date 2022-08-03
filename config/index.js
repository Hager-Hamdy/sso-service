const { DB_HOST, DB_NAME, DB_USER, DB_PASS } = require("../config.js");

module.exports = {
    development: {
      "username": DB_USER,
      "password": DB_PASS,
      "database": DB_NAME,
      "host": DB_HOST,
      "dialect": "mysql"
    },
    test: {
      "username": DB_USER,
      "password": DB_PASS,
      "database": "sso_service_test",
      "host": DB_HOST,
      "dialect": "mysql",
      "logging": false
    },
    production: {
      "username": DB_USER,
      "password": DB_PASS,
      "database": DB_NAME,
      "host": DB_HOST,
      "dialect": "mysql"
    }
  }
  