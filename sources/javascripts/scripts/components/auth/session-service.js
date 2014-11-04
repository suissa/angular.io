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

			// it will return a promise if
			// the user object wasn't filled yet
			Session.getUser = function () {
				return typeof user === 'object' && user.id && angular.copy(user) || $http.get('/api/user/request-profile').then(function (res) {
					return Session.updateUser(res.data);
				});
			};

			return Session;
		}

		return new SessionFactory;
	};
}

var modl = angular.module('angular-io.components.auth.services.session', [])
	.provider('Session', SessionProvider);

module.exports = modl;