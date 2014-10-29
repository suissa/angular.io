'use strict';

var angular = require('angular');

var modl = angular.module('angular-io', [
	require('angular-ui-router'),
	require('angular-foundation').name,
	
	require('./components/components').name,
	require('./user/user').name,
	require('./home/home').name
])
	.config(function ($locationProvider) {
		$locationProvider.html5Mode(true).hashPrefix('!');
	});

module.exports = modl;