const { Model, } = require('objection');

module.exports = class Auth extends Model {
	static get tableName() { return 'auth'; };
	static get idColumn() { return 'authId'; };
	static get jsonSchema() { 
		return {
			type: 'object',
			required: ['login', 'password'], 
			properties: {
				authId: {
					type: 'integer',
					// http://json-schema.org/understanding-json-schema/reference/numeric.html#integer
				},
				login: {
					type: 'string',
					minLength: 1,
					maxLength: 32,
					// http://json-schema.org/understanding-json-schema/reference/string.html
				},
				password: {
					type: 'string',
					minLength: 1,
					maxLength: 32,
				},
				active: {
					type: 'boolean',
					// http://json-schema.org/understanding-json-schema/reference/boolean.html
				},
				updated: {
					type: 'string',
					format: 'date-time',
					// http://json-schema.org/understanding-json-schema/reference/string.html#format
				},
			},
		};
	}
};
