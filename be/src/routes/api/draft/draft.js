import { Router, } from 'express';

export const router = Router({
	caseSensitive: true,
	mergeParams: true,
	strict: true,	
});

router.get(
	'/',
	async(req, res) =>{
		res.json({ data: { success: true, } });
	}
);
