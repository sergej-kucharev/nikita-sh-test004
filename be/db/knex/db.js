import Knex from 'knex';
import { env, } from 'process';
import { Model, } from 'objection';
import configs from '../../knexfile.js';
import * as models from './models';

const config = configs[env?.NODE_ENV ?? 'development'];
const knex = Knex(config);
Model.knex(knex);

export {
    knex,
    models,
};
