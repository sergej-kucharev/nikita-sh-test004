require('@babel/register');

const db1 = require('./knex');
const knexfile1 = require('./knex/knexfile');

module.exports = {
    db1: { ...db1, config: knexfile1, },
};
