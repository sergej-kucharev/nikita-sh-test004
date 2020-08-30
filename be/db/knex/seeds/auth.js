export const seed = async (knex) => {
  await knex('auth').del();
  await knex('auth').insert([
    [ 1, 'admin', 'admin', ],
    [ 2, 'user', 'user', ],
  ].map(item => ({
    authId: item[0],
    login: item[1],
    password: item[2],
  })));
};
