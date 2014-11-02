'use strict';

var angular = require('angular');

var modl = angular.module('angular-io.paste', [
	require('./paste-create/paste-create').name,
	require('./paste-editor/paste-editor').name,
	require('./paste-detail/paste-detail').name,
	require('./paste-service').name,
	require('angular-codemirror').name,
	require('angular-animate').name,
	require('angular-ui-utils').name
])
	.config(function ($stateProvider) {
		$stateProvider
			.state('paste', {
				url: '/paste',
				templateUrl: 'paste/paste.tmpl.html'
			})
	});

module.exports = modl;