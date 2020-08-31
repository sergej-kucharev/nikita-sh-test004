require('@babel/register');

const dotenv = require('dotenv');
const developmentSqlite3 = require('./db/knex/config/development.sqlite3.js');
const testSqlite3 = require('./db/knex/config/test.sqlite3.js');

dotenv.config();
module.exports = {
  development: developmentSqlite3,
  test: testSqlite3,
};
