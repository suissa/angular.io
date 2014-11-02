'use strict';

var angular = require('angular');

function UserProfileMessagesController ($scope) {}

var modl = angular.module('angular-io.user.profile.messages', [])
	.controller('UserProfileMessagesController', UserProfileMessagesController)
	.config(function ($stateProvider) {
		$stateProvider
			.state('user.profile.messages', {
				url: '/messages',
				templateUrl: 'user/user-profile/user-profile-messages/user-profile-messages.tmpl.html',
				controller: 'UserProfileMessagesController',
				controllerAs: 'userProfileMessagesCtrl'
			});
	});

module.exports = modl;