#!/usr/bin/env node

require('@babel/register');

const { knex, models, } = require('./db/knex');
const { default: Logger } = require('./src/logger');
const logger = Logger('draft');
const TIMEOUT = 1000;

(async () => {
    const now = await knex.select(knex.fn.now()).first().timeout(TIMEOUT);
    const auth = await models.Auth.query().findById(2).timeout(TIMEOUT);
    logger.debug({ now });
    logger.debug({ auth });
})();
