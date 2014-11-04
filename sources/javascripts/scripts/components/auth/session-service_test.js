'use strict';

describe('angular-io.components.auth.services.session module', function () {
	beforeEach(module('angular-io.components.auth.services.session'));

	describe('Session service', function () {
		var Session;

		afterEach(inject(function ($httpBackend) {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		}));

		beforeEach(inject(function ($injector, $httpBackend) {
			Session = $injector.get('Session');

			$httpBackend.whenGET('/api/user/request-profile').respond(200, {
				id: 1,
				first_name: 'Victor',
				last_name: 'Queiroz',
				name: 'Victor Queiroz'
			});
		}));

		it('should return a promise if the user object wasn\'t filled yet', inject(function ($httpBackend) {
			var user = Session.getUser();

			expect(user.then).toBeDefined();

			$httpBackend.flush();
		}));

		it('should not return a promise at the second time', inject(function ($httpBackend) {
			var user = Session.getUser();

			expect(user.then).toBeDefined();

			$httpBackend.flush();

			expect(Session.getUser().then).not.toBeDefined();
		}));

		it('cannot be modified by outside scope', inject(function ($httpBackend) {
			var user = Session.getUser();

			expect(user.then).toBeDefined();

			$httpBackend.flush();

			user = Session.getUser();

			user.__my_custom_variable__ = 'myCustomValue';

			expect(user.__my_custom_variable__).toEqual('myCustomValue');
			expect(Session.getUser().__my_custom_variable__).not.toBeDefined();
		}));
	});
});