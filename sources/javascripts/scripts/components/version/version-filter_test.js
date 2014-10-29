'use strict';

describe('angular-io.components.version module', function () {
	beforeEach(module('angular-io.components.version'));

	describe('version filter', function () {
		beforeEach(module(function ($provide) {
			$provide.value('version', 'VERSION');
		}));

		it('should replace the application version', inject(function (versionFilter) {
			expect(versionFilter('the application version is %VERSION%')).toEqual('the application version is VERSION');
		}));
	});
});