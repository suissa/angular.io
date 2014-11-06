'use strict';

var angular = require('angular');
var moment = require('moment');

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
						return Post.get({ post: $stateParams.post }).$promise.then(function (post) {
							post.created_at = moment(post.created_at).fromNow();
							post.comments = post.comments.map(function (comment) {
								comment.created_at = moment(comment.created_at).fromNow();
								return comment;
							});

							return post;
						});
					}
				},
				controller: 'PostDetailController',
				controllerAs: 'postDetailCtrl'
			});
	});

module.exports = modl;