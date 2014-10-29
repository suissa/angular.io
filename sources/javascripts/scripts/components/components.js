'use strict';

var angular = require('angular');

var modl = angular.module('angular-io.components', [
	require('./version/version').name,
	require('./auth/auth').name
]);

module.exports = modl;