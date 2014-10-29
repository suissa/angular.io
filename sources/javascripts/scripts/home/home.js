'use strict';

var angular = require('angular');

var modl = angular.module('angular-io.home', [
	require('./home-index/home-index').name
])
	.config(function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/home/index');
		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: 'home/home.tmpl.html'
			});
	});

module.exports = modl;