import { env, } from '../env';

import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import moment from 'moment';
import passport from 'passport';
import session from 'express-session';
import swig from 'swig';

// import { knex, models, } from '../db/knex';
import Logger from './logger';
import routes from './routes';

const app = express();
const logger = Logger('app');
const mode = env.NODE_ENV ?? 'development';
const port = env.PORT ?? 4000;
const xPoweredBy = env.X_POWERED_BY ?? 'owner';
const root = __dirname;

app.set('mode', mode);
app.set('port', port);
app.set('root', root);

app.use((req, res, next) => {
	const { body, headers, method, url, } = req;
	logger.debug({ text: 'req', data: { method, url, headers, body } });
	res.set('x-powered-by', xPoweredBy);
	next();
});

app.set('trust proxy', 1);
app.use(cors({
	credentials: true,
	methods: [ 'DELETE', 'GET', 'POST', 'PUT', ],
	maxAge: moment.duration(1, 'hour').asSeconds(),
	optionsSuccessStatus: 204,
	origin: (origin, next) => {
		const allowed = true;
		if (allowed) {
			next(null, true);
		} else {
			next(new Error('ERROR WITH CORS'), false);
		}
	},
	preflightContinue: false,
}));
// app.use(cors(( req, done ) => {
// 	done(null, {
// 		credentials: true,
// 		methods: [ 'DELETE', 'GET', 'POST', 'PUT', ],
// 		maxAge: moment.duration(1, 'hour').asSeconds(),
// 		optionsSuccessStatus: 204,
// 		origin: (origin, next) => {
// 			const allowed = true;
// 			if (allowed) {
// 				next(null, true);
// 			} else {
// 				next(new Error('ERROR WITH CORS'), false);
// 			}
// 		},
// 		preflightContinue: false,
// 	});
// }));

app.use(express.static('asset', {
	dotfiles: 'ignore',
	etag: true,
	extensions: false,
	index: false,
	maxAge: '1d',
	redirect: false,
	setHeaders: function (res, path, stat) {
		res.set('x-timestamp', Date.now())
	}
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false,
}));

app.use(session({
	cookie: {
		path: '/', 
	},
	name: 'sessionId',
	resave: false,
	secret: env.SESSION_SECRET ?? 'hello',
	saveUninitialized: false,
	unset: 'keep',
}));
app.use(passport.initialize());
app.use(passport.session());

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', `${ root }/views`);
app.set('view cache', false);
swig.setDefaults({ cache: false });

app.use((req, res, next) => {
	res.set('pragma', 'no-cache');
	res.set('cache-control', 'no-cache');
	next();
});
app.use(routes);

app.use((error, req, res, next) => {
	if ([ 'production' ].includes(mode)) {
		const json = { error: 'Forbidden', };
		res.status(403).json(json);
	} else if (error instanceof Error) {
		const json = { error: `${error}`, stack: error.stack, };
		res.status(500).json(json);
	} else if (error) {
		const json = { error: JSON.stringify(error), };
		res.status(500).json(json);
	} else {
		const json = { error: 'Resource Not Found', };
		res.status(404).json(json);
	}
});

const server = http.createServer(app);
server.listen(port, () => logger.debug({ text: 'Server started', data: { port }, }));

export default server;