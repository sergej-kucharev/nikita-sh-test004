// Update with your config settings.

import dotenv from 'dotenv';
import sqlite3 from './db/config/sqlite3.js';

dotenv.config();
export default {
  development: sqlite3,
};
