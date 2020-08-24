import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import debug from 'debug';
import express from 'express';
import passport from 'passport';
import process from 'process';
import session from 'express-session';
import swig from 'swig';


const app = express();
const log = debug('app: http');


app.set('trust proxy', 1);
app.use(cors(( req, done ) => {
	done(null, {
		credentials: true,
		optionsSuccessStatus: 200,
		origin: (origin, done) => done(null, true),
	});
}));

app.use(session({
	cookie: {
		path: '/', 
	},
	name: 'sessionId',
	resave: false,
	secret: process.env.SESSION_SECRET || 'hello',
	saveUninitialized: false,
	unset: 'keep',
}));



app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use((req, res, next) => {
	const {body, headers, method, url,} = req;
	log(`req as ${method} for ${url} with ${JSON.stringify(body)}`);
	log(`req headers: ${JSON.stringify(headers)}`);
	res.set('x-powered-by', 'Nikita');
	next();
});

const options = {
  dotfiles: 'ignore',
  etag: true,
  extensions: false,
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
};
app.use(express.static('asset', options));

app.use((req, res, next) => {
	res.set('pragma', 'no-cache');
	res.set('cache-control', 'no-cache');
	next();
});


app.use(passport.initialize());
app.use(passport.session());
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/../../../views');
app.set('view cache', false);
swig.setDefaults({ cache: false });

export default app;