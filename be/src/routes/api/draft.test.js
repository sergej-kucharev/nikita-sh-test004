import { env, } from '../../../env';

import faker from 'faker';
import frisby from 'frisby';
import jest from 'jest';

describe('draft', () => {
    it('env is development', () => expect(env.NODE_ENV).toBe(env.NODE_ENV_EXPECTED));

    it('GET /api/draft success', async () => {
        await frisby
            .get(`${ env.URI_BASE }/api/draft`)
            .expect('status', 200)
            .expect('json', '*', {
                success: true,
            });
    });
});