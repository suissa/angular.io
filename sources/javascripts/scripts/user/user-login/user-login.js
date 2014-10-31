'use strict';

var angular = require('angular');

function UserLoginController (Auth) {
	this.authenticate = Auth;
}

var modl = angular.module('angular-io.user.login', [])
	.controller('UserLoginController', UserLoginController)
	.config(function ($stateProvider) {
		$stateProvider
			.state('user.login', {
				url: '/login',
				templateUrl: 'user/user-login/user-login.tmpl.html',
				controller: 'UserLoginController',
				controllerAs: 'userLoginCtrl',
				role: 'Guest'
			});
	});

module.exports = modl;