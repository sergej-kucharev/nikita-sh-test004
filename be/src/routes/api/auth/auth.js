import { Router, } from 'express';
import { access, notAuthenticated, passport, } from '../../../passport';
import { db1, } from '../../../../db';
// import multer from 'multer';
// import ah from 'express-async-handler';
// import validator from 'validator';

const Auth = db1.models.Auth;

export const router = Router({
	caseSensitive: true,
	mergeParams: true,
	strict: true,	
});


router.get(
	'/login',
	notAuthenticated,
	passport.authenticate('local'),
	access(),
	// isAdmin,
	async(req, res) => {
		res.json({ login: true, authenticated: req.isAuthenticated(), });
	},
);

router.get(
	'/logined',
	access('root'),
	async(req, res) => {
		res.json({ logined: true, auth: req.auth, });
	},
);

router.get(
	'/logout',
	access(),
	async(req, res) => {
		req.logOut();
		req.session.destroy((error) => {
			error ? next(error) : res.json({ logout: true, authenticated: req.isAuthenticated(), });
		});
	},
);

router.get(
	'/registration',
	notAuthenticated,
	async(req, res) => {
		const { login, password, password2, code, } = req.body;
		console.log({ login, password, password2, code, });
		res.json({ registration: true, });
	},
);

// const upload = multer({dest:'./tmp'});


// router.get('/login', async(req, res) =>{
// 	res.render('login-form', {});
// });
// router.post(
// 	'/login',
// 	upload.any(),
// 	// ah(async (req, res, next) => {
// 	// 	//await check('login').isLenght({min: 1, max: 32}).withMessage('login incorrect').run(req);
// 	// 	//await check('password').if(value => validator.isLenght({min:1, max:32})).run(req);
// 	// 	next();
// 	// }),
// 	passport.authenticate('local', {session: true, failureRedirect: '/error'}), 
// 	async(req, res) =>{
// 		//res.json({data: req.user});
// 		res.redirect('/user/me');
// 	});

// router.get('/logout', async(req, res) => {
// 	if(req.user) {
// 		req.logOut();
// 		//res.json({data: true});
// 		res.redirect('/login');
// 	} else{
// 		res.status(403).end('User not found');
// 	}
// });

