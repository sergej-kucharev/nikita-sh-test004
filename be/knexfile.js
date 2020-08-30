require('@babel/register');

const dotenv = require('dotenv');
const development = require('./db/knex/config/development.sqlite3.js');

dotenv.config();
module.exports = {
  development,
};
