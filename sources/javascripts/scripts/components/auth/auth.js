'use strict';

var angular = require('angular');

var modl = angular.module('angular-io.components.auth', [
	require('./auth-service').name,
	require('./if-logged-directive').name,
	require('./if-not-logged-directive').name
]);

module.exports = modl;