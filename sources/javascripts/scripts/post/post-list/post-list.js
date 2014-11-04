'use strict';

var angular = require('angular');

function PostListController ($scope, Post, categories) {
	$scope.query = {};
	$scope.categories = categories;
	$scope.$watchCollection('query', function (query) {
		if(!query) return;

		$scope.$broadcast('paginator.reload');
	});

	$scope.$on('paginator.page.changed', function (event, page, paginator) {
		var params = {
			page: page
		};

		angular.forEach(['category_id', 'status'], function (key) {
			var query = $scope.query;
			if(!query) return;
			if(angular.isDefined(query[key])) {
				params[key] = query[key];
			}
			if(params[key]===0) delete params[key];
		});

		var promise = Post.query(params).$promise;

		promise.then(function (res) {
			angular.extend(paginator, res.pagination);

			$scope.posts = res.data;
		});
	});
}

var modl = angular.module('angular-io.post.list', [])
	.config(function ($stateProvider) {
		$stateProvider
			.state('post.list', {
				url: '/list',
				templateUrl: 'post/post-list/post-list.tmpl.html',
				resolve: {
					categories: function (Category) {
						return Category.query().$promise;
					}
				},
				controller: 'PostListController',
				controllerAs: 'postListCtrl'
			});
	})
	.controller('PostListController', PostListController);

module.exports = modl;