'use strict';

module.exports = function (sequelize, models) {
	var Paste = models.Paste;

	var categories = [];

	for(var i=0; i<200; i++) {
		categories.push({
			title: 'Some example paste',
			code: '(function () {});'
		});
	}

	categories.forEach(function (category) {
		Paste.build(category).save();
	});
};