'use strict';

var angular = require('angular');

var modl = angular.module('angular-io.components.auth.directives.if-not-logged', [])
	.directive('ifNotLogged', function (Auth) {
		return {
			compile: function (element, attrs) {
				Auth.check().then(function (logged) {
					if(logged) {
						return element.remove();
					}

					attrs.$set('ifNotLogged', undefined);
					element.removeClass('if-not-logged');
				});
			}
		};
	});

module.exports = modl;