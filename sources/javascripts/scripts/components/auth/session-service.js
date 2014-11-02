'use strict';

var angular = require('angular');

function SessionProvider () {
	var SessionProvider = this;

	this.$get = function ($http, $q) {
		function SessionFactory () {
			var Session = {};

			var user = {};

			Session.updateUser = function (u) {
				user = angular.extend(user, u);

				return user;
			};

			Session.getUser = function () {
				return angular.copy(user);
			};

			return Session;
		}

		return new SessionFactory;
	};
}

var modl = angular.module('angular-io.components.auth.services.session', [])
	.provider('Session', SessionProvider);

module.exports = modl;