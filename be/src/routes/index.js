import { Router, } from 'express';
import api from './api';
// import page from './page';

export const router = Router({
	caseSensitive: true,
	mergeParams: true,
	strict: true,	
});

api.forEach(([ path, call ]) => {
	router.use(path, call);
});

// page.forEach(([ path, call ]) => {
// 	router.use(path, call);
// });
