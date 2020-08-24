import { Router, } from 'express';
import { knex, models, } from '../lib/db';
import multer from 'multer';
import ah from 'express-async-handler';
import validator from 'validator';


const router = Router({
	caseSensitive: true,
	mergeParams: true,
	strict: true,	
});
const upload = multer({dest:'./tmp'});


router.get('/', async(req, res) =>{
	res.render('index', {});
});

export default router;