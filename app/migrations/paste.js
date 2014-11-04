'use strict';

var faker = require('faker');

module.exports = function (sequelize, models) {
	var Paste = models.Paste;

	var categories = [];

	for(var i=0; i<200; i++) {
		categories.push({
			title: faker.lorem.words(2).join(' '),
			code: '(function () {});'
		});
	}

	categories.forEach(function (category) {
		Paste.build(category).save();
	});
};