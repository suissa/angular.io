'use strict';

var angular = require('angular');

var modl = angular.module('angular-io.components.version.directive', [])
	.directive('appVersion', function (version) {
		return function (scope, element, attrs) {
			return element.text(version);
		};
	});

module.exports = modl;