require('@babel/register');

const { knex, models, } = require('./db/knex');
const TIMEOUT = 1000;

(async () => {
    console.log(await knex.select(knex.fn.now()).timeout(TIMEOUT));
    console.log(await models.Auth.query().findById(2).timeout(TIMEOUT));
})();
