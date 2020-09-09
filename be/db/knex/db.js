import { env, } from '../../env';

import Knex from 'knex';
import { Model, } from 'objection';
import configs from './config';
import * as models from './models';

const config = configs[env?.NODE_ENV];
const knex = Knex(config);
Model.knex(knex);

export {
    knex,
    models,
};
