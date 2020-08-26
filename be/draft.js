const { knex } = require('./db/knex');

(async () => {
    console.log(await knex.select(knex.fn.now()).timeout(1000));
})();
