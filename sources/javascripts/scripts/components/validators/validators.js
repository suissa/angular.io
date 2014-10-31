'use strict';

var angular = require('angular');

var modl = angular.module('angular-io.components.validators', [
	require('./unique-email-directive').name
]);

module.exports = modl;