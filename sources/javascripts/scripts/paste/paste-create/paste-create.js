'use strict';

var angular = require('angular');

function PasteCreateController ($scope, $interval, $state, Paste) {
	var ms = 5000,
	securityCopy = JSON.parse(localStorage.getItem('paste.create.security_copy')) || '';

	$scope.paste = new Paste;

	/**
	 * This is a security copy.
	 * The security copy will not be deleted
	 * until the user save his paste.
	 */	 
	securityCopy &&
	securityCopy.code &&
	angular.extend($scope.paste, securityCopy);

	/**
	 * Keep the data storing forever.
	 */
	var interval = $interval(function () {
		localStorage.setItem('paste.create.security_copy', JSON.stringify($scope.paste));
	}, ms);
	
	this.storePaste = function (paste) {
		paste
			.$save()
			.then(function (paste) {
				clearInterval(interval);
				$state.go('paste.detail', { paste: paste.id });
				localStorage.removeItem('paste.create.security_copy');
			});
	};
}

var modl = angular.module('angular-io.paste.create', [])
	.controller('PasteCreateController', PasteCreateController)
	.config(function ($stateProvider) {
		$stateProvider
			.state('paste.create', {
				url: '/create',
				controller: 'PasteCreateController',
				controllerAs: 'pasteCreateCtrl',
				templateUrl: 'paste/paste-create/paste-create.tmpl.html'
			});
	});

module.exports = modl;