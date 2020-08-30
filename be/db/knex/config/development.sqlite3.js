import Debug from 'debug';
import sqlite3 from 'sqlite3';

export const client = 'sqlite3';
export const connection = {
  filename: './db/knex/data/development.sqlite3',
};
export const migrations = {
  directory: './db/knex/migrations',
  tableName: 'migrations',
};
export const seeds = {
  directory: './db/knex/seeds',
  tableName: 'seeds',
};

export const acquireConnectionTimeout = 1000 * 8;
export const asyncStackTraces = true;
export const fetchAsString = [ 'clob', ];
export const useNullAsDefault = true;

const debug = Debug('db:knex');
export const log = {
  warn(message) { debug(`[warn]: ${ message }`); },
  error(message) { debug(`[error]: ${ message }`); },
  deprecate(message) { debug(`[deprecate]: ${ message }`); },
  debug(message) { debug(`[debug]: ${ message }`); },
};

// export const pool = {
//   min: 0,
//   max: 7,
// };
