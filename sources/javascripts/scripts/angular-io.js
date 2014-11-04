'use strict';

var angular = require('angular');

var modl = angular.module('angular-io', [
	require('angular-ui-router'),
	require('angular-foundation').name,
	require('angular-moment').name,
	
	require('./components/components').name,
	require('./user/user').name,
	require('./post/post').name,
	require('./paste/paste').name,
	require('./category/category').name
])
	.config(function ($locationProvider, $resourceProvider) {
		$locationProvider.html5Mode(true).hashPrefix('!');
		$resourceProvider.defaults.stripTrailingSlashes = false;
	});

module.exports = modl;