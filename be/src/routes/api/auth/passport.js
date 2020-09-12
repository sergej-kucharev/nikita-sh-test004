import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { db1, } from '../../../../db';

const localStrategy = new LocalStrategy({
	usernameField: 'login',
	passwordField: 'password',
	passReqToCallback: true,
	session: true,
}, async (req, login, password, done) => {
	console.log('passport LocalStrategy');
	const auth = await db1.models.Auth.query().findOne({ login, password });
	const user = auth?.toJSON?.();
	done(auth ? null: new Error('auth unknown!'), user);
});

passport.use(localStrategy);

passport.serializeUser(async(user, done) => {
	console.log('passport.serializeUser');
	const authId = user?.authId;
	done(null, authId);
});

passport.deserializeUser(async(authId, done) => {
	console.log('passport.deserializeUser');
	const auth = await db1.models.Auth.query().findById(authId);
	const user = auth?.toJSON?.();
	done(auth ? null : new Error('auth unknown!'), user);
});

const isAdmin = async(req, res, next) => {
	next(req.user?.login==='root' ? null : new Error('Non-admin restricted area'));
};

const isModerator = async(req, res, next) => {
	next();
};

export {
	passport,
	isAdmin,
	isModerator,
};
