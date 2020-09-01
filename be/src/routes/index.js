import { Router, } from 'express';
import { router as apiDraft } from './api/draft';
// import auth from './auth';

const router = Router({
	caseSensitive: true,
	mergeParams: true,
	strict: true,	
});

export default [
	['/api', apiDraft],
].reduce((router, route) => router.use(...route), router);