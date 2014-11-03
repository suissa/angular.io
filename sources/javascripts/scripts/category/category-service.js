'use strict';

var angular = require('angular');

function CategoryFactory ($resource) {
	return $resource('/api/category');
}

var modl = angular.module('angular-io.category.service', [
	require('angular-resource').name
])
	.factory('Category', CategoryFactory);

module.exports = modl;