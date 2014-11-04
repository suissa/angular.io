'use strict';

module.exports = function (sequelize, models) {
	var Category = models.Category;

	var categories = [];

	categories.forEach(function (category) {
		Category.build(category).save();
	});
};