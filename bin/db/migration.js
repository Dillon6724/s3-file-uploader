const bcrypt = require('bcrypt');
const user = require('./user.json');
const knex = require('knex')({
	dialect: 'sqlite3',
	connection: {
		filename: './bin/db/data.db'
	},
	useNullAsDefault: true
});

// knex.schema.createTable('users', function(table) {
//   table.increments('id');
//   table.string('user_name');
//   table.string('password');
// }).then((res) => {})

bcrypt.genSalt(10, function(err, salt) {
	bcrypt.hash(user.password, salt, function(err, hash) {
		knex
			.insert({ user_name: user.email, password: hash })
			.into('users')
			.then(() => {});
	});
});
