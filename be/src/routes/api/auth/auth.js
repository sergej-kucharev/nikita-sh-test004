import { Router, } from 'express';
import './passport';
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
	async(req, res) => {
		const { login, password, } = req.body;
		console.log({ login, password, });
		res.end('.');
	},
);

router.get(
	'/logout',
	async(req, res) => {
		res.end('.');
	},
);

router.get(
	'/registration',
	async(req, res) => {
		const { login, password, password2, } = req.body;
		console.log({ login, password, password2, });
		res.end('.');
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

