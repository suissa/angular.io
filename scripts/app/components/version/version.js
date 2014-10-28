'use strict';

var angular = require('angular');

var modl = angular.module('angular-io.components.version', [
	require('./version-directive').name,
	require('./version-filter').name,
])
	.value('version', '0.0.1');

module.exports = modl;