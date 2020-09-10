import { env, } from '../../../env';

import faker from 'faker';
import frisby from 'frisby';
import jest from 'jest';

// https://docs.frisbyjs.com/

describe('module auth', () => {
    it('success login as root', async() => await frisby
        .post(`${ env.URI_BASE }/api/auth/login`, {
            login: 'root',
            password: 'root',
        })
        // .inspectHeaders()
        // .inspectJSON()
        .expect('status', 200)
        .expectNot('jsonTypes', '*', {
            password: frisby.Joi.string()
        })
        .expect('jsonTypes', '*', {
            id: frisby.Joi.number().required(),
            login: frisby.Joi.string().required(),
            created: frisby.Joi.date().iso().required(),
        })
    );

    // it('error login as random userName with random password', async() => await frisby
    //     .post(`${ env.URI_BASE }/api/auth/login`, {
    //         login: faker.internet.userName(),
    //         password: faker.internet.password(),
    //     })
    //     // .inspectHeaders()
    //     // .inspectJSON()
    //     .expect('status', 401)
    // );

    // it('logout', )
    // it('registration', )
});