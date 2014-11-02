'use strict';

var Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
	var Paste = sequelize.define('Paste', {
		title: DataTypes.STRING(255),
		code: DataTypes.TEXT
	}, {
		timestamps: true,
		paranoid: true,
		underscored: true,
		tableName: 'pastes',
		classMethods: {
			associate: function (models) {
				var User = models.User;

				User.hasMany(Paste, {
					as: 'pastes',
					foreignKey: 'author_id'
				});

				Paste.belongsTo(User, {
					as: 'author',
					foreignKey: 'author_id'
				});
			}
		}
	});

	return Paste;
};