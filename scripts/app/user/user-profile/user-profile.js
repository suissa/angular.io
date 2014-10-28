'use strict';

var angular = require('angular');

function UserProfileController ($scope) {}

var modl = angular.module('angular-io.user.profile', [])
	.controller('UserProfileController', UserProfileController)
	.config(function ($stateProvider) {
		$stateProvider
			.state('user.profile', {
				url: '/profile',
				templateUrl: 'user/user-profile/user-profile.tmpl.html',
				controller: 'UserProfileController'
			});
	});

module.exports = modl;