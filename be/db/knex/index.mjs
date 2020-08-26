import knex from 'knex';
import process from 'process';
import objection from 'objection';

import configs from '../../knexfile.js';
import models from './models/index.mjs';

const config = configs[process.env.NODE_ENV || 'development']; // TODO: || -> ??
const knexInstance = knex(config);
objection.Model.knex(knexInstance);

export default {
	knex: knexInstance,
	models,
};
