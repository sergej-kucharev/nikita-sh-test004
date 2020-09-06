import moment from 'moment';
import * as models from '../../models';

export const items = [
  [ 1, 'root', 'root', ],
  [ 2, 'admin', 'admin', ],
  [ 100, 'test', 'test', ],
  [ 1000, 'user', 'user', ],
];

export const action = async (knex, items) => {
  return await Promise.all(items.map(async (item) => {
    const [ authId, login, password='1', ] = item;
    models.Auth.knex(knex);
    const findAuth = async ({
      authId,
      login,
    }) => await models.Auth.query()
      .where({ authId })
      .orWhere('login', 'like', login)
      .limit(1)
      .first();
    let auth = await findAuth({ authId, login, });
    if (!auth) {
      await models.Auth.query().insert({ ...authId && { authId }, created: moment(), login, password, });
      auth = await findAuth({ authId, login, });
      console.log('Created auth seed:', auth);
    } else if (authId && auth.authId !== authId) {
      console.error('Error conflict auth.authId seed:', auth);
    } else if (auth.login !== login) {
      console.error('Error conflict auth.login seed:', auth);
    }
    return auth?.authId ?? null;
  }));
};

export const seed = async (knex) => await action(knex, items);
