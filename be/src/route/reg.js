import { Router, } from 'express';
import multer from 'multer';
import ah from 'express-async-handler';
import validator from 'validator';
import { knex, models, } from '../lib/db'; 

const router = Router({
	caseSensitive: true,
	mergeParams: true,
	strict: true,	
});
const upload = multer({dest:'./tmp'});


router.get('/reg', async(req, res) =>{
	res.render('registration', {});
});

router.post(
	'/reg',
	upload.any(),
	// ah(async (req, res, next) => {
	// 	//await check('login').isLenght({min: 1, max: 32}).withMessage('login incorrect').run(req);
	// 	//await check('password').if(value => validator.isLenght({min:1, max:32})).run(req);
	// 	next();
	// }), 
	async(req, res) => {
		const {login, password} = req.body;
		const exists = await models.user.query().findOne({login,});
		if(exists) {
			res.status(403).end();
		} else {
			await models.user.query().insert({login, password});
			res.redirect('/login');
		}
	});

export default router;
