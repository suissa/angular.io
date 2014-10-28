'use strict';

var angular = require('angular');

var modl = angular.module('angular-io.home.index', [])
	.config(function ($stateProvider) {
		$stateProvider
			.state('home.index', {
				url: '/index',
				templateUrl: 'home/home-index/home-index.tmpl.html'
			})
	});

module.exports = modl;