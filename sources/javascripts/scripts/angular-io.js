'use strict';

var angular = require('angular');

var modl = angular.module('angular-io', [
	require('angular-ui-router'),
	require('angular-foundation').name,
	
	require('./components/components').name,
	require('./user/user').name,
	require('./paste/paste').name,
	require('./home/home').name
])
	.config(function ($locationProvider, $resourceProvider) {
		$locationProvider.html5Mode(true).hashPrefix('!');
		$resourceProvider.defaults.stripTrailingSlashes = false;
	});

module.exports = modl;