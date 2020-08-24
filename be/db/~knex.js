import knex from 'knex';
import process from 'process';
import config from '../knexfile';

export default knex(config[process.env.NODE_ENV || 'development']); // TODO: || -> ??
