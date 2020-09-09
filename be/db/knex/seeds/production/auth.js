import moment from 'moment';
import { fn, raw, ref, } from 'objection';
import * as models from '../../models';

export const items = [
  [ 1, 'root', 'root', ],
  [ 2, 'admin', 'admin', ],
  [ 100, 'test', 'test', ],
  [ 1000, 'user', 'user', ],
];

export const action = async (knex, items) => {
  models.Auth.knex(knex);
  const query = () => models.Auth.query().timeout(1000);
  const item = async (item) => {
    const [ authId, login, password='1', ] = item;
    if (!login || !password) {
      return null;
    }
    const auth = await query()
      .findOne({ authId })
      .orWhere('login', 'like', login);
    if (!auth) {
      await query().insert({
        authId,
        login: login.toLowerCase(),
        password,
        created: moment(),
      });
      const auth = await query()
        .findOne({ authId })
        .orWhere('login', 'like', login);
      console.log('Created auth seed:', auth);
    } else if (authId && auth.authId !== authId) {
      console.error('Error conflict auth.authId seed:', auth);
    } else if (auth.login !== login) {
      console.error('Error conflict auth.login seed:', auth);
    }
  };
  return await Promise.all(items.map(item));
};

export const seed = async (knex) => await action(knex, items);
