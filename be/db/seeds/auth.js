const data = [
  [ 1, 'admin', 'admin', ],
  [ 2, 'user', 'user', ],
].map(([ authId, login, password, ]) => ({ authId, login, password, }));

export default {
  seed: async (knex) => {
    await knex('auth').del();
    await knex('auth').insert(data);
  },
};
