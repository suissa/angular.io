'use strict';

var _ = require('underscore');
var path = require('path');

var models = require(path.join(path.dirname(__dirname), 'models'));
var Category = models.Category;

exports.list = function (req, res) {
	Category.findAll().then(function (categories) {
		res.json(categories);
	}, function (err) {
		res.json(err);
	});
};