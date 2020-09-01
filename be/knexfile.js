require('@babel/register');

const dotenv = require('dotenv');
const developmentSqlite3 = require('./db/knex/config/development.sqlite3.js');
const stageSqlite3 = require('./db/knex/config/stage.sqlite3.js');
const productionSqlite3 = require('./db/knex/config/production.sqlite3.js');

dotenv.config();
module.exports = {
  development: developmentSqlite3,
  stage: stageSqlite3,
  production: productionSqlite3,
};
