import { Router, } from 'express';
import multer from 'multer';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { knex, models, } from '../../../db/knex';
import ah from 'express-async-handler';
import validator from 'validator';


const router = Router({
	caseSensitive: true,
	mergeParams: true,
	strict: true,	
});
const upload = multer({dest:'./tmp'});


passport.use(new LocalStrategy({
	usernameField: 'login',
	passwordField: 'password',
	passReqToCallback: true,
	session: true,
}, async (req, login, password, done) => {
	// const [user] = await knex.from('user').where({login, password});
	const [user] = await models.user.query().where($ => $.where({login, password}));
	if(user){ 
		done(null,user);
	}else{
		done(new Error('user unknown!'));
	}
}));
passport.serializeUser( async (user, done) => {
	done(null, user.userId);
});
passport.deserializeUser( async (userId, done) => {
	// const [user] = await knex.from('user').where({userId});
	const [user] = await models.user.query().where($ => $.where({userId}));
	done(user ? null : new Error('user unknown!'), user.toJSON());
});

router.get('/login', async(req, res) =>{
	res.render('login-form', {});
});
router.post(
	'/login',
	upload.any(),
	// ah(async (req, res, next) => {
	// 	//await check('login').isLenght({min: 1, max: 32}).withMessage('login incorrect').run(req);
	// 	//await check('password').if(value => validator.isLenght({min:1, max:32})).run(req);
	// 	next();
	// }),
	passport.authenticate('local', {session: true, failureRedirect: '/error'}), 
	async(req, res) =>{
		//res.json({data: req.user});
		res.redirect('/user/me');
	});

router.get('/logout', async(req, res) => {
	if(req.user) {
		req.logOut();
		//res.json({data: true});
		res.redirect('/login');
	} else{
		res.status(403).end('User not found');
	}
});





export default router;
