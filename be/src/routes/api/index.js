import { router as auth } from './auth';
import { router as draft } from './draft';
// import { router as user } from './user';

export default [
	[ '/api/auth', auth, ],
	[ '/api/draft', draft, ],
	// [ '/api/user', user, ],
];
