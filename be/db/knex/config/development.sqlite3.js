import sqlite3 from 'sqlite3';
import Logger from '../../../src/logger';

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

export const log = Logger('db:knex');

// export const pool = {
//   min: 0,
//   max: 7,
// };
