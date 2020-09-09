require('@babel/register');
require('./env');

module.exports = require('./db/knex/knexfile');
