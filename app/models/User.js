'use strict';

var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');

module.exports = function (sequelize, DataTypes) {
	var User = sequelize.define('User', {
		first_name: DataTypes.STRING(255),
		last_name: DataTypes.STRING(255),
		password: DataTypes.STRING(255),
		email: {
			type: DataTypes.STRING(255),
			unique: true
		},
		uid: DataTypes.UUID,
		online: DataTypes.BOOLEAN,
		genre: {
			type: DataTypes.ENUM,
			values: ['male', 'female']
		},
		fb_id: DataTypes.UUID
	}, {
		timestamps: true,
		paranoid: true,
		underscored: true,
		tableName: 'users',
		instanceMethods: {
			validPassword: function (password) {
				return bcrypt.compareSync(password, this.password);
			}
		},
		setterMethods: {
			password: function (password) {
				var salt = bcrypt.genSaltSync(10);
				return this.setDataValue('password', bcrypt.hashSync(password, salt));
			}
		}
	});

	return User;
};