const knex = require('knex');
const { env, } = require('process');
const { Model, } = require('objection');

const configs = require('../../knexfile.js');
const models = require('./models');

const config = configs[env.NODE_ENV || 'development']; // TODO: || -> ??
const knexInstance = knex(config);
Model.knex(knexInstance);

module.exports = {
	knex: knexInstance,
	models,
};
