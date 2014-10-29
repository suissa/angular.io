'use strict';

var angular = require('angular');

// Do not use $ to prepend your own object
// properties and service identifiers.
// Consider this style of naming
// reserved by AngularJS and jQuery.
var modl = angular.module('angular-io.user.service', [
	require('angular-resource').name
])
	.factory('User', UserFactory);

function UserFactory ($resource) {
	return $resource('/api/user');
}

module.exports = modl;