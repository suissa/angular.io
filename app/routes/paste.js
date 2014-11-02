'use strict';

var path = require('path');
var passport = require(path.join(path.dirname(__dirname), 'passport'));

module.exports = function (app, controller) {
	app
		.route('/api/paste')
		.get(controller.list)
		.post(controller.store);

	app
		.route('/api/paste/:paste')
		.get(controller.get)
		.patch(controller.update)
		.delete(controller.destroy);
};