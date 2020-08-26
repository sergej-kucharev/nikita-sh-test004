// Update with your config settings.

const dotenv = require('dotenv');
const sqlite3 = require('./db/knex/config/development.sqlite3.js');

dotenv.config();
module.exports = {
  development: sqlite3,
};
