module.exports = {
	up: async (knex) => {
		const exists = await knex.schema.hasTable('auth');
		return exists || await knex.schema.createTable('auth', (table) => {
			table.increments('authId').primary();
			table.string('login', 32).notNullable().unique();
			table.string('password', 32).notNullable();
			table.boolean('active').notNullable().defaultTo(true);
			table.datetime('updated', { useTz: true, precision: 6, }).notNullable().defaultTo(knex.fn.now());
		});
	},
	down: async (knex) => knex.schema.dropTableIfExists('auth'),
};
