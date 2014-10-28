var Sequelize = require('sequelize');

var sequelize = new Sequelize('angular-io', 'root', '', {
	dialect: 'mysql',
	port: 3306,
	logging: false
});

sequelize
	.sync()
	.complete(function (err) {
		if(!!err) {
			console.log('Unable to connect to the database:', err);
		} else {
			console.log('We are making love with MySQL...');
		};
	});

module.exports = sequelize;