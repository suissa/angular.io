'use strict';

var angular = require('angular');

function PasteDetailController ($scope, paste, Session) {
	$scope.paste = paste;
	
	this.updatePaste = function (paste) {
		paste.saving = true;

		paste
			.$update({ paste: paste.id });
	};
}

var modl = angular.module('angular-io.paste.detail', [])
	.controller('PasteDetailController', PasteDetailController)
	.config(function ($stateProvider) {
		$stateProvider
			.state('paste.detail', {
				url: '/detail/:paste',
				templateUrl: 'paste/paste-detail/paste-detail.tmpl.html',
				resolve: {
					paste: function (Paste, $stateParams) {
						return Paste.get({ paste: $stateParams.paste });
					}
				},
				controller: 'PasteDetailController',
				controllerAs: 'pasteDetailCtrl'
			});
	});

module.exports = modl;