'use strict';

var angular = require('angular');

var modl = angular.module('angular-io.components.auth.directives.if-logged', [])
	.directive('ifLogged', function (Auth) {
		return {
			compile: function (element, attrs) {
				Auth.check().then(function (logged) {
					if(!logged) {
						return element.remove();
					}

					attrs.$set('ifLogged', undefined);
					element.removeClass('if-logged');
				});
			}
		};
	});

module.exports = modl;