'use strict';

var path = require('path');
var passport = require(path.join(path.dirname(__dirname), 'passport'));

module.exports = function (app, controller) {
	app
		.route('/api/user/unique-email')
		.get(controller.uniqueEmail);

	app
		.route('/api/auth/local')
		.post(passport.authenticate('local'), function (req, res) {
			res.json({ result: true });
		});

	app
		.route('/api/auth/facebook')
		.get(passport.authenticate('facebook', { scope: ['email', 'public_profile', 'user_friends'] }));

	app
		.route('/api/auth/facebook/callback')
		.get(passport.authenticate('facebook', { failureRedirect: '/user/login' }), function (req, res) {
			res.redirect('/');
		});

	app
		.route('/api/auth/check')
		.get(function (req, res) {
			return res.json({ result: req.isAuthenticated() });
		});

	app
		.route('/api/user')
		.get(controller.list)
		.post(controller.store);

	app
		.route('/api/user/:user')
		.get(controller.get)
		.patch(controller.update)
		.delete(controller.destroy);
};