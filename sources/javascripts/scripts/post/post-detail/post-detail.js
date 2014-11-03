'use strict';

var angular = require('angular');

function PostDetailController ($scope, post) {
	$scope.post = post;
}

var modl = angular.module('angular-io.post.detail', [])
	.controller('PostDetailController', PostDetailController)
	.config(function ($stateProvider) {
		$stateProvider
			.state('post.detail', {
				url: '/detail/:post',
				templateUrl: 'post/post-detail/post-detail.tmpl.html',
				resolve: {
					post: function (Post, $stateParams) {
						return Post.get({ post: $stateParams.post }).$promise;
					}
				},
				controller: 'PostDetailController',
				controllerAs: 'postDetailCtrl'
			});
	});

module.exports = modl;