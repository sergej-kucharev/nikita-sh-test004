require('@babel/register');
require('./env');

const developmentSqlite3 = require('./db/knex/config/development.sqlite3.js');
const stageSqlite3 = require('./db/knex/config/stage.sqlite3.js');
const productionSqlite3 = require('./db/knex/config/production.sqlite3.js');

module.exports = {
  development: developmentSqlite3,
  stage: stageSqlite3,
  production: productionSqlite3,
};


// все услуги - бизнес - завантажити сертификат - заповниты анкету (email: required) - данни вирни - пароль для ключа(для пидпису) - СМС для подтверждения ключа - галки на згоду - завантаження