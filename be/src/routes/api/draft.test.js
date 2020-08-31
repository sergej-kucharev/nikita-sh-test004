import dotenv from 'dotenv';
import faker from 'faker';
import frisby from 'frisby';
import jest from 'jest';
import { env, } from 'process';

dotenv.config();

describe('draft', () => {
    it('env is test', () => expect(env.NODE_ENV).toBe('test'));

    it('GET /draft success', async () => {
        await frisby
            .get(`${ env.URI_BASE }/draft`)
            .expect('status', 200);
    });
});