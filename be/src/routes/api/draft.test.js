import faker from 'faker';
import frisby from 'frisby';
import jest from 'jest';
import { env, } from '../../../env';

describe('draft', () => {
    it('env is development', () => expect(env.NODE_ENV).toBe(env.NODE_ENV_EXPECTED ?? 'test'));

    it('GET /api/draft success', async () => {
        await frisby
            .get(`${ env.URI_BASE }/draft`)
            .expect('status', 200);
    });
});