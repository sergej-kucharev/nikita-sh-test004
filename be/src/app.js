import app from './lib/express/';
import dotenv from 'dotenv';
import debug from 'debug';
import http from 'http';
import process from 'process';

const log = debug('app:server');
const mode = process.env.NODE_ENV || 'dev';
const port = process.env.PORT || 4000;
const root = __dirname;

import route from './route/';
import api from './api/';
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