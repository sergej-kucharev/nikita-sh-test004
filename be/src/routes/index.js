import { Router, } from 'express';
import { router as apiDraft } from './api/draft';
import { router as apiAuth } from './api/auth';
// import auth from './auth';

const router = Router({
	caseSensitive: true,
	mergeParams: true,
	strict: true,	
});

export default [
	['/api/auth', apiAuth],
	['/api', apiDraft],
].reduce((router, route) => router.use(...route), router);