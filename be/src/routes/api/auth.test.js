import { env, } from '../../../env';

import faker from 'faker';
import frisby from 'frisby';
import jest from 'jest';

describe('auth', () => {
    it('ok', () => expect(true).toBe(true));
    // it('env is development', () => expect(env?.NODE_ENV).toBe(env.NODE_ENV_EXPECTED ?? 'test'));

    // it('login as root', () => frisby
    //     .post(`${ env.URI_BASE }/login`, {
    //         login: 'root',
    //         password: 'root',
    //     }).expect('status', 200)
    // );
});