import { Model, } from 'objection';
import moment from 'moment';

export default class extends Model {
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
				created: {
					type: 'string',
					format: 'date-time',
					// http://json-schema.org/understanding-json-schema/reference/string.html#format
				},
				updated: {
					type: 'string',
					format: 'date-time',
					// http://json-schema.org/understanding-json-schema/reference/string.html#format
				},
				deleted: {
					type: 'string',
					format: 'date-time',
					// http://json-schema.org/understanding-json-schema/reference/string.html#format
				},
			},
		};
	}

	// async $beforeInsert(data) {
	// 	console.log('$beforeInsert:', { data });
	// 	await super.$beforeInsert(data);
	// 	let { authId, created, updated, deleted, login, password, ..._ } = data;
	// 	created = created ?? moment();
	// 	if (!login || !password || !moment(created).isValid()) {
	// 		throw new Error(`Auth.insert(${ JSON.stringify(data) })`);
	// 	}
	// 	created = moment(created).utc().format();
	// 	login = login.toLowerCase();
	// 	return { ..._, login, password, created, };
	// }

	// async $beforeUpdate(options, data) {
	// 	console.log('$beforeUpdate:', { options, data });
	// 	await super.$beforeUpdate(options, data);
	// 	const { authId, created, updated, deleted, login, password, ..._ } = data;
	// 	updated = updated ?? moment();
	// 	if (!login || !password || !moment(updated).isValid()) {
	// 		throw new Error(`Auth.insert(${ JSON.stringify(data) })`);
	// 	}
	// 	updated = moment(updated).utc().format();
	// 	login = login.toLowerCase();
	// 	return { ..._, login, password, updated, };
	// }

	// async $beforeDelete(data) {
	// 	console.log('$beforeInsert:', { data });
	// 	await super.$beforeDelete(data);
	// 	const { authId, created, updated, deleted, login, password, ..._ } = data;
	// 	deleted = deleted ?? moment();
	// 	if (!moment(deleted).isValid()) {
	// 		throw new Error(`Auth.insert(${ JSON.stringify(data) })`);
	// 	}
	// 	deleted = moment(deleted).utc().format();
	// 	return { ..._, deleted, };
	// }
};
