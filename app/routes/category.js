'use strict';

var path = require('path');
var passport = require(path.join(path.dirname(__dirname), 'passport'));

module.exports = function (app, controller) {
	app
		.route('/api/category')
		.get(controller.list);
};