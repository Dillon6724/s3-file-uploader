const knex = require('knex')({
	dialect: 'sqlite3',
	connection: {
		filename: './data.db'
	},
	useNullAsDefault: true
});

exports.getUser = async user => {
	const res = await userQuery(user);
	if (res.length > 0) {
		return await res[0];
	} else {
		return false;
	}
};

const userQuery = async user => {
	return await knex('users').where({ user_name: user.user_name });
};
