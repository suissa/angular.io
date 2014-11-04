'use strict';

var angular = require('angular');

function UserProfileIndexController ($scope) {
}

var modl = angular.module('angular-io.user.profile.index', [])
	.controller('UserProfileIndexController', UserProfileIndexController)
	.config(function ($stateProvider) {
		$stateProvider
			.state('user.profile.index', {
				url: '/index',
				templateUrl: 'user/user-profile/user-profile-index/user-profile-index.tmpl.html',
				controller: 'UserProfileIndexController',
				controllerAs: 'userProfileIndexCtrl'
			});
	});

module.exports = modl;