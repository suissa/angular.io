'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var sequelize = require(path.join(path.dirname(__dirname), 'sequelize'));
var env = process.env.NODE_ENV || 'development';
var db = {};

fs.readdirSync(__dirname)
	.filter(function (file) {
		return file !== 'index.js';
	})
	.forEach(function (file) {
		var model = sequelize.import(path.join(__dirname, file));
		db[model.name] = model;
	});

Object.keys(db).forEach(function (name) {
	if('associate' in db[name]) {
		db[name].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;