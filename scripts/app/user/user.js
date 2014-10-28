'use strict';

var angular = require('angular');

var modl = angular.module('angular-io.user', [
	require('./user-service').name,
	require('./user-create/user-create').name,
	require('./user-profile/user-profile').name
])
	.config(function ($stateProvider) {
		$stateProvider
			.state('user', {
				url: '/u',
				templateUrl: 'user/user.tmpl.html'
			});
	});

module.exports = modl;