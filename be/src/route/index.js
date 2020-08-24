import { Router, } from 'express';
import auth from './auth.js';
import frontPage from './front-page.js';
import reg from './reg.js';
import user from './user.js';

const router = Router({
	caseSensitive: true,
	mergeParams: true,
	strict: true,	
});

export default [
	['/', auth],
	['/', frontPage],
	['/', reg],
	['/', user],

].reduce((router, route) => router.use(...route), router);