'use strict';

var angular = require('angular');

var modl = angular.module('angular-io.category', [
	require('./category-service').name
]);

module.exports = modl;