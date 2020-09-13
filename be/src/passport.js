import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { db1, } from '../db';

passport.use(new LocalStrategy({
	usernameField: 'login',
	passwordField: 'password',
	passReqToCallback: true,
	session: true,
}, async (req, login, password, done) => {
	const auth = await db1.models.Auth.query().findOne({ login, password });
	done(auth ? null: new Error('auth unknown!'), auth);
}));

passport.serializeUser(async(auth, done) => {
	done(null, auth?.authId ?? 0);
});

passport.deserializeUser(async(authId, done) => {
	const auth = await db1.models.Auth.query().findById(authId);
	done(auth ? null : new Error('auth unknown!'), auth);
});

const access = (...users) => async(req, res, next) => {
	try {
		if (!req.auth) {
			throw new Error('auth unknown!');
		}
		if (users.length && !users.includes(req.auth?.login)) {
			throw new Error('Non-admin restricted area');
		}
		next();
	} catch (error) {
		next(error);	
	}	
};

const notAuthenticated = (req, res, next) => {
	next(req?.isAuthenticated?.() ? new Error('Multi login not allowed') : null);
};

export {
	access,
	notAuthenticated,
	passport,
};
