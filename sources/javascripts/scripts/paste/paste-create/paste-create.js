'use strict';

var angular = require('angular');

function PasteCreateController ($scope, $state, Paste) {
	$scope.paste = new Paste;
	$scope.destroyLeftbar = false;
	
	this.storePaste = function (paste) {
		paste
			.$save()
			.then(function (paste) {
				$state.go('paste.detail', { paste: paste.id }).then(function () {
					$scope.$destroy();
				});
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