'use strict';

var angular = require('angular');

function PasteController ($scope, user) {
	$scope.user = user;

	var editorOptions = {
		mode: 'javascript',
		lineNumbers: true,
		tabSize: 2,
		indentWithTabs: true,
		lineWrapping: true,
		viewportMargin: Infinity,
		extraKeys: {
			'Ctrl-Space': 'autocomplete'
		}
	};

	this.getEditorOptions = function (options) {
		return angular.extend(editorOptions, options);
	};
}

var modl = angular.module('angular-io.paste', [
	require('./paste-create/paste-create').name,
	require('./paste-editor/paste-editor').name,
	require('./paste-detail/paste-detail').name,
	require('./paste-service').name,
	require('angular-codemirror').name,
	require('angular-animate').name,
	require('angular-ui-utils').name
])
	.controller('PasteController', PasteController)
	.config(function ($stateProvider) {
		$stateProvider
			.state('paste', {
				url: '/paste',
				templateUrl: 'paste/paste.tmpl.html',
				resolve: {
					user: function ($q, Session) {
						return $q.when(Session.getUser());
					}
				},
				controller: 'PasteController',
				controllerAs: 'pasteCtrl'
			})
	});

module.exports = modl;