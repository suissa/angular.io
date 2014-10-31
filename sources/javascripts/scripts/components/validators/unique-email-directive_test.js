'use strict';

describe('angular-io.components.validators.directives.unique-email module', function () {
	beforeEach(module('angular-io.components.validators.directives.unique-email'));

	describe('uniqueEmail directive', function () {
		beforeEach(inject(function ($httpBackend) {
			$httpBackend.whenGET('/api/user/unique-email?email=victorcqueirozg@gmail.com').respond(200);
			$httpBackend.whenGET('/api/user/unique-email?email=victorcqueirozg_1@gmail.com').respond(400);
		}));

		afterEach(inject(function ($httpBackend) {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		}));

		it('should check if the email exists', inject(function ($rootScope, $compile, $httpBackend) {
			var scope, element, form;

			scope = $rootScope.$new();
			scope.user = { email: 'victorcqueirozg@gmail.com' };
			element = angular.element('<input name="emailField" ng-model="user.email" unique-email>');
			form = angular.element('<form name="form"></form>');
			form.append(element);
			$compile(form)(scope);
			form = scope.form;
			$rootScope.$digest();
			$httpBackend.flush();

			expect(form.emailField.$error.uniqueEmail).toEqual(true);
			expect(element.hasClass('ng-invalid-unique-email')).toEqual(true);

			scope.user.email = 'victorcqueirozg_1@gmail.com';

			$rootScope.$digest();
			$httpBackend.flush();

			expect(form.emailField.$error.uniqueEmail).toEqual(undefined);
		}));
	});
});