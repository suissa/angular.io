'use strict';

var Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
	var Category = sequelize.define('Category', {
		name: DataTypes.STRING(100)
	}, {
		timestamps: true,
		paranoid: true,
		underscored: true,
		tableName: 'categories'
	});

	return Category;
};