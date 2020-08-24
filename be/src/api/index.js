import { Router, } from 'express';
// import auth from './auth';

const router = Router({
	caseSensitive: true,
	mergeParams: true,
	strict: true,	
});

export default [
	// ['/', auth],
].reduce((router, route) => router.use(...route), router);