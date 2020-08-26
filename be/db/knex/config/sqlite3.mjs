import debug from 'debug';
import sqlite3 from 'sqlite3';

const log = debug('db:knex');

export default {
  client: 'sqlite3',
  connection: {
    filename: './db/knex/data/dev.sqlite3',
  },
  migrations: {
    directory: './db/knex/migrations',
    tableName: 'migrations',
  },
  seeds: {
    directory: './db/knex/seeds',
    tableName: 'seeds',
  },
  asyncStackTraces: true,
  acquireConnectionTimeout: 1000 * 8,
  fetchAsString: [ 'clob', ],
  useNullAsDefault: true,
  log: {
    warn(message) { log(`[warn]: ${ message }`); },
    error(message) { log(`[error]: ${ message }`); },
    deprecate(message) { log(`[deprecate]: ${ message }`); },
    debug(message) { log(`[debug]: ${ message }`); },
  },
  // pool: {
  //   min: 0,
  //   max: 7,
  // },
};