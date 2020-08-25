import knex from 'knex';
import process from 'process';
import { Model, } from 'objection';

import configs from '../knexfile.js';
import models from './models/index.js';

const config = configs[process.env.NODE_ENV || 'development']; // TODO: || -> ??
const knexInstance = knex(config);
Model.knex(knexInstance);

export default {
	knex: knexInstance,
	models,
};
