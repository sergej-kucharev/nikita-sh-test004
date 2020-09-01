export const items = [
  [ 1, 'root', 'root', ],
  [ 2, 'admin', 'admin', ],
  [ 100, 'test', 'test', ],
  [ 1000, 'user', 'user', ],
];

export const action = async (knex, items) => {
  return await Promise.all(items.map(async (item) => {
    const [ authId, login, password='1', ] = item;
    let record = await knex('auth').where({ authId }).orWhere({ login }).first();
    if (!record) {
      await knex('auth').insert({ ...authId && { authId }, login, password, });
      record = await knex('auth').where({ authId }).orWhere({ login }).first();
      console.log('Created auth seed:', record);
    } else if (authId && record.authId !== authId) {
      console.error('Error conflict auth.authId seed:', record);
    } else if (record.login !== login) {
      console.error('Error conflict auth.login seed:', record);
    }
    return record?.authId ?? null;
  }));
};

export const seed = async (knex) => await action(knex, items);
