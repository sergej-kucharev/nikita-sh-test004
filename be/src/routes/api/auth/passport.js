import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { db1, } from '../../../../db';

const Auth = db1.models.Auth;

const localStrategy = new LocalStrategy({
	usernameField: 'login',
	passwordField: 'password',
	passReqToCallback: true,
	session: true,
}, async (req, login, password, done) => {
	const auth = await Auth.query().findOne({login, password});
	auth ? done(null, auth) : done(new Error('auth unknown!'));
});

passport.use(localStrategy);

passport.serializeUser(async(auth, done) => {
	done(null, auth.authId);
});

passport.deserializeUser(async(authId, done) => {
	const auth = await Auth.query().findOne({authId});
	done(auth ? null : new Error('auth unknown!'), auth.toJSON());
});
