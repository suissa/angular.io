'use strict';

module.exports = function (app, controller) {
	app
		.route('/api/user/:user')
		.get(controller.get);
};