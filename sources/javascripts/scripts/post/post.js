'use strict';

var angular = require('angular');

var modl = angular.module('angular-io.post', [
	require('./post-detail/post-detail').name,
	require('./post-list/post-list').name,
	require('./post-service').name
])
	.config(function ($stateProvider) {
		$stateProvider
			.state('post', {
				url: '/post',
				templateUrl: 'post/post.tmpl.html'
			});
	});

module.exports = modl;