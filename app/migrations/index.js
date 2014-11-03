'use strict';

var fs = require('fs');
var path = require('path');
var sequelize = require(path.join(path.dirname(__dirname), 'sequelize'));
var models = require(path.join(path.dirname(__dirname), 'models'));

fs
	.readdirSync(__dirname)
	.filter(function (file) {
		return file !== 'index.js';
	})
	.forEach(function (file) {
		require(path.join(__dirname, file))(sequelize, models);
	});