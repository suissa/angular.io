'use strict';

var angular = require('angular');

function UserFactory ($resource) {
	return $resource('/api/user/:user');
}

// Do not use $ to prepend your own object
// properties and service identifiers.
// Consider this style of naming
// reserved by AngularJS and jQuery.
var modl = angular.module('angular-io.user.services.user', [
	require('angular-resource').name
])
	.factory('User', UserFactory);

module.exports = modl;