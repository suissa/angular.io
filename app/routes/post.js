'use strict';

var path = require('path');
var passport = require(path.join(path.dirname(__dirname), 'passport'));

module.exports = function (app, controller, filters) {
	app
		.route('/api/post')
		.get(controller.list)
		.post(filters.authenticated, controller.store);

	app
		.route('/api/post/:post')
		.get(controller.get)
		.patch(filters.authenticated, controller.update)
		.delete(filters.authenticated, controller.destroy);
};