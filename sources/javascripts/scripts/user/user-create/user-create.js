'use strict';

var angular = require('angular');

function UserCreateController ($scope, $state, User) {
	$scope.user = new User;

	this.storeUser = function (user) {		
		user.$save().then(function () {
			$state.go()
		});
	};
}

var modl = angular.module('angular-io.user.create', [])
	.controller('UserCreateController', UserCreateController)
	.config(function ($stateProvider) {
		$stateProvider
			.state('user.create', {
				url: '/create',
				templateUrl: 'user/user-create/user-create.tmpl.html',
				controller: 'UserCreateController',
				controllerAs: 'userCreateCtrl',
				role: 'Guest'
			});
	});

module.exports = modl;