'use strict';

var angular = require('angular');

var modl = angular.module('angular-io.post', [
	require('./post-service').name
]);

module.exports = modl;