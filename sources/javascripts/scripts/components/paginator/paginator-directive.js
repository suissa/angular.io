'use strict';

var angular = require('angular');

var modl = angular.module('angular-io.components.paginator.directive', [])
	.controller('PaginatorController', function ($scope, $element, $attrs) {
		$scope.paginator = {};

		this.nextPage = function () {
      var nextPage = ($scope.paginator.currentPage + 1);

      if(nextPage > $scope.paginator.lastPage) return;

      $scope.$emit('paginator.page.changed', nextPage, $scope.paginator);
    };

    this.previousPage = function () {
			var prevPage = ($scope.paginator.currentPage - 1);

      if(prevPage < 1) return;

      $scope.$emit('paginator.page.changed', prevPage, $scope.paginator);
    };

    this.setPage = function (page) {
    	if(page > $scope.paginator.lastKey) return;

    	$scope.$emit('paginator.page.changed', page, $scope.paginator);
    };

    $scope.$on('paginator.reload', function (event) {
    	$scope.$emit('paginator.page.changed', 1, $scope.paginator);
    });

    $scope.$emit('paginator.page.changed', 1, $scope.paginator);
	})
	.directive('paginator', function () {
		return {
			restrict: 'AE',
			templateUrl: 'components/paginator/paginator-directive.tmpl.html',
			scope: {},
			controller: 'PaginatorController',
			controllerAs: 'paginatorCtrl'
		}
	});

module.exports = modl;