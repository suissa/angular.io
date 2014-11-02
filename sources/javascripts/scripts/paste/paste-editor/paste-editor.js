'use strict';

var angular = require('angular');

var modl = angular.module('paste.editor', [
	require('./paste-editor-leftbar-directive').name
]);

module.exports = modl;