'use strict';

var angular = require('angular');

function UserProfileController ($scope, Session) {
	$scope.user = Session.getUser();
}

var modl = angular.module('angular-io.user.profile', [
	require('./user-profile-pastes/user-profile-pastes').name,
	require('./user-profile-messages/user-profile-messages').name
])
	.controller('UserProfileController', UserProfileController)
	.config(function ($stateProvider) {
		$stateProvider
			.state('user.profile', {
				url: '/profile',
				templateUrl: 'user/user-profile/user-profile.tmpl.html',
				controller: 'UserProfileController',
				role: 'User'
			});
	});

module.exports = modl;