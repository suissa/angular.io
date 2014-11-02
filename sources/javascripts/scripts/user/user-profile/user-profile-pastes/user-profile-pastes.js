'use strict';

var angular = require('angular');

function UserProfilePastesController ($scope, pastes) {
	$scope.pastes = pastes;
}

var modl = angular.module('angular-io.user.profile.pastes', [])
	.controller('UserProfilePastesController', UserProfilePastesController)
	.config(function ($stateProvider) {
		$stateProvider
			.state('user.profile.pastes', {
				url: '/pastes',
				templateUrl: 'user/user-profile/user-profile-pastes/user-profile-pastes.tmpl.html',
				resolve: {
					pastes: function ($http) {
						return $http.get('/api/user/pastes').then(function (res) {
							return res.data;
						});
					}
				},
				controller: 'UserProfilePastesController',
				controllerAs: 'userProfilePastesCtrl'
			})
	});

module.exports = modl;