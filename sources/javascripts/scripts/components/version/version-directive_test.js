'use strict';

describe('angular-io.components.version.directive module', function () {
	beforeEach(module('angular-io.components.version'));

	describe('appVersion directive', function () {
		beforeEach(module(function ($provide) {
			$provide.value('version', 'VERSION');
		}));
		it('should print the application version', function () {
			inject(function ($compile, $rootScope) {
				var element = $compile('<i app-version></i>')($rootScope);
				expect(element.text()).toEqual('VERSION');
			});
		});
	});
});