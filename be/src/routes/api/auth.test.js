import dotenv from 'dotenv';
import faker from 'faker';
import frisby from 'frisby';
import jest from 'jest';
import { env, } from 'process';

dotenv.config();

describe('auth', () => {
    it('env is test', () => expect(env.NODE_ENV).toBe('test'));

    it('login as root', () => frisby
        .post(`${ env.URI_BASE }/login`, {
            login: 'root',
            password: 'root',
        }).expect('status', 200)
    );
});