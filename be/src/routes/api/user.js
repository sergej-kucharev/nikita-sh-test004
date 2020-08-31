import { Router, } from 'express';
import { knex, models, } from '../lib/db';
import multer from 'multer';
import ah from 'express-async-handler';
import validator from 'validator';
import fs from 'fs';
import path from 'path';

const router = Router({
	caseSensitive: true,
	mergeParams: true,
	strict: true,	
});
const upload = multer({dest:'./tmp'});

const move = async (from, to) => new Promise((resolve, reject) => {
	fs.rename(from, to, (error) => {
		error ? reject(error) : resolve();
	});
});

const remove = async (file) => new Promise((resolve, reject) => {
	fs.unlink(file, (error) => {
		error ? reject(error) : resolve();
	});
}); 

router.get('/user/me', async(req, res) => {
	if(req.user) {
		res.render('user', {user: req.user});
	} else {
		res.redirect('/login');
	}
});

router.get('/user/:userId', async (req, res) => {
	const { userId = 0, } = req?.params ?? {};
	const user = await models.user.query().findById(+userId);
	console.log('user', user);
	if (user) {
		res.render('user', { user: user.toJSON(), });
	} else {
		res.redirect('/user/me');
	}
});

router.get('/user/:userId/edit', async (req, res) => {
	const { userId = 0, } = req?.params ?? {};
	const user = await models.user.query().findById(+userId);
	if (user) {
		res.render('user-form', { user: user.toJSON(), });
	} else {
		res.redirect('/user/me');
	}
});

router.post('/user/:userId/edit', 
	upload.fields([
		{ name: 'login', maxCount: 1, },
		{ name: 'password', maxCount: 1, },
		{ name: 'password2', maxCount: 1, },
		{ name: 'avatar', maxCount: 64, },
		{ name: 'avatar-del', maxCount: 1,},
	]),
	async (req, res) => {
		const { userId = 0, } = req?.params ?? {};
		const { login, password, password2, 'avatar-del': del, } = req?.body ?? {};
		const avatar = req?.files?.avatar?.[0] ?? {};
		const user = await models.user.query().findById(+userId);
		if (!user || !login || !password || password != password2) {
			res.redirect('/user/${ userId }/edit');
		// } else if (user.userId != req?.user?.id){
		// 	res.redirect('/user/me');
		} else if (avatar?.size) {
			try {
				await remove(`./asset/avatar/${ user.avatar }`);
			} catch (error) { 
				console.log(error);
			}
			const aname = avatar?.filename;
			try {
				await move(`./tmp/${ aname }`, `./asset/avatar/${ aname }`);
			} catch (error) { 
				console.log(error);
			}
			await models.user.query().findById(+userId).patch({ login, password, avatar: aname, });
			res.redirect('/user/${ userId }/edit');
		} else if (del) {
			try {
				await remove(`./asset/avatar/${ user.avatar }`);
			} catch (error) { 
				console.log(error);
			}
			await models.user.query().findById(+userId).patch({ login, password, avatar: null, });
			res.redirect('/user/${ userId }/edit');
		} else {
			await models.user.query().findById(+userId).patch({ login, password, });
			res.redirect('/user/${ userId }/edit');
		}
		console.log(userId, login, password, password2, avatar);
		res.end();
	});



export default router;