// Update with your config settings.

import dotenv from 'dotenv';
import sqlite3 from './db/config/sqlite3';

dotenv.config();
export default {
  development: sqlite3,
};
