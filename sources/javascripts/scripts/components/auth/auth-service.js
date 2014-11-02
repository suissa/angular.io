'use strict';

var angular = require('angular');

function AuthProvider () {
	var AuthProvider = this;

	this.$get = function ($http, $q, Session) {
		function AuthFactory () {
			var Auth = {},
			logged = null,
			asyncCheck = true,
			user = Session.getUser();

			Auth.authenticate = function (credentials) {
				return $http.post('/api/auth/local', credentials).success(function (data) {
					return data.result;
				});
			};

			Auth.checkSync = function () {
				return logged || false;
			};

			Auth.requestProfile = function () {
				return $http.get('/api/user/request-profile').then(function (res) {
					return Session.updateUser(res.data);
				});
			};

			Auth.check = function () {
				if(!asyncCheck) {
					return $q.when(Auth.checkSync());
				}

				if(user.id) {
					asyncCheck = false;
				}

				return $http.get('/api/auth/check').then(function (res) {
					logged = res.data.result;

					if(user && typeof user.id === 'number' && logged || !logged) {
						return logged;
					}

					return Auth.requestProfile().then(function (user) {
						return user.id && logged === true;
					});
				}).finally(function () {
					setTimeout(function () {
						asyncCheck = true;
					}, 800);
				});
			};

			return Auth;
		}

		return new AuthFactory;
	};
}

var modl = angular.module('angular-io.components.auth.services.auth', [])
	.provider('Auth', AuthProvider);

module.exports = modl;