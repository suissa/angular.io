'use strict';

var angular = require('angular');

var modl = angular.module('angular-io.components.validators.directives.unique-email', [])
	.directive('uniqueEmail', function ($http, $q) {
		return {
			require: '?ngModel',
			link: function (scope, element, attrs, ngModel) {
				ngModel.$asyncValidators.uniqueEmail = function (modelValue, viewValue) {
					var value = modelValue || viewValue;

					return $http.get('/api/user/unique-email', {
						params: {
							email: value
						}
					}).then(function resolved () {
						return $q.reject();
					}, function rejected () {
						return true;
					});
				};
			}
		};
	});

module.exports = modl;