import sqlite3 from 'sqlite3';

export default {
  client: 'sqlite3',
  connection: {
    filename: './db/data/dev.sqlite3'
  },
  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  },
  useNullAsDefault: true
};