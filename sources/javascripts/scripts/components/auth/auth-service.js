'use strict';

var angular = require('angular');

var modl = angular.module('angular-io.components.auth.service', [])
	.factory('Auth', function ($http) {
		var Auth = this,
		logged = null;

		this.checkSync = function () {
			return logged || false;
		};

		this.check = function () {
			return $http.get('/api/auth/check').success(function (data) {
				logged = data.result;

				return logged;
			});
		};

		return this;
	});

module.exports = modl;