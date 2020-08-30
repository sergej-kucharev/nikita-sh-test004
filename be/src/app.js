import dotenv from 'dotenv';
import debug from 'debug';
import { env, } from 'process';
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import swig from 'swig';
import Logger from './logger';

const logger = Logger('app');
const app = express();

const mode = env.NODE_ENV || 'dev';
const port = env.PORT || 4000;
const root = __dirname;

import route from './route/';
import api from './routes';
import { knex, models, } from './lib/db/'; 

dotenv.config();
app.set('mode', mode);
app.use(route);
app.use(api);
app.all('*', (req, res) => {
	res.status(404).json({ error: 'Not found', });
});
app.use((error, req, res, next) => {
	if (error instanceof Error && ['dev'].includes(mode)) {
		res.status(500).json({ error: `${error}`, stack: error.stack, });
	} else {
		res.status(404).json({});	
	}
});
const server = http.createServer(app);

server.listen(port, () => {
	log(`Server started on ${port}.`);
});

export default server;