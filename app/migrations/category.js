'use strict';

module.exports = function (sequelize, models) {
	var Category = models.Category;

	var categories = [{
		name: 'Begin'
	}, {
		name: 'Setup'
	}];

	categories.forEach(function (category) {
		Category.build(category).save();
	});
};