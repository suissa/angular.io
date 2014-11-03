'use strict';

var angular = require('angular');

function HomeIndexController ($scope, Post, categories) {
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

		angular.forEach(['category_id'], function (key) {
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

var modl = angular.module('angular-io.home.index', [])
	.config(function ($stateProvider) {
		$stateProvider
			.state('home.index', {
				url: '/index',
				templateUrl: 'home/home-index/home-index.tmpl.html',
				resolve: {
					categories: function (Category) {
						return Category.query().$promise;
					}
				},
				controller: 'HomeIndexController',
				controllerAs: 'homeIndexCtrl'
			});
	})
	.controller('HomeIndexController', HomeIndexController);

module.exports = modl;