'use strict';

var angular = require('angular');

var modl = angular.module('angular-io.components.paginator', [
	require('./paginator-directive').name
]);

module.exports = modl;