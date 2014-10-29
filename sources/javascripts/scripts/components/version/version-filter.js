'use strict';

var angular = require('angular');

var modl = angular.module('angular-io.components.version.filter', [])
	.filter('version', function (version) {
		return function (input) {
			return String(input).replace(/\%VERSION\%/mg, version);
		};
	});

module.exports = modl;