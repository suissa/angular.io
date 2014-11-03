'use strict';

var angular = require('angular');

function PostFactory ($resource) {
	return $resource('/api/post/:post', null, {
		query: { isArray: false }
	});
}

var modl = angular.module('angular-io.post.services.post', [
	require('angular-resource').name
])
	.factory('Post', PostFactory);

module.exports = modl;