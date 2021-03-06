import sqlite3 from 'sqlite3';
import Logger from '../../../src/logger';

export const client = 'sqlite3';
export const connection = {
  filename: './db/knex/data/production.sqlite3',
};
export const migrations = {
  directory: './db/knex/migrations',
  tableName: 'migrations',
};
export const seeds = {
  directory: './db/knex/seeds/production',
  tableName: 'seeds',
};

export const acquireConnectionTimeout = 1000 * 8;
export const asyncStackTraces = true;
export const debug = false;
export const fetchAsString = [ 'clob', ];
export const useNullAsDefault = true;

const logger = Logger('db:knex');
export const log = {
  error: (text) => logger.error({ text }),
  warn: (text) => logger.warn({ text }),
  deprecate: (text) => logger.deprecate({ text }),
  debug: (text) => logger.debug({ text }),
};

// export const pool = {
//   min: 0,
//   max: 7,
// };
