'use strict';

var angular = require('angular');

function PasteFactory ($resource) {
	return $resource('/api/paste/:paste', null, {
		update: { method: 'PATCH' }
	});
}

var modl = angular.module('angular-io.paste.services.paste', [
	require('angular-resource').name
])
	.factory('Paste', PasteFactory);

module.exports = modl;