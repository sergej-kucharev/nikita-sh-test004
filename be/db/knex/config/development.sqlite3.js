import Debug from 'debug';
import sqlite3 from 'sqlite3';

const debug = Debug('db:knex');

const config = {
  client: 'sqlite3',
  connection: {
    filename: './db/knex/data/development.sqlite3',
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
    warn(message) { debug(`[warn]: ${ message }`); },
    error(message) { debug(`[error]: ${ message }`); },
    deprecate(message) { debug(`[deprecate]: ${ message }`); },
    debug(message) { debug(`[debug]: ${ message }`); },
  },
  // pool: {
  //   min: 0,
  //   max: 7,
  // },
};

module.exports = {
  ...config,
};