'use strict';

var angular = require('angular');

var modl = angular.module('angular-io.components.auth', [
	require('./auth-service').name,
	require('./session-service').name,
	require('./if-logged-directive').name,
	require('./if-not-logged-directive').name
])
	.run(function ($rootScope, $state, Auth, $location) {
		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
			if(!toState.role) return;

			var params = null,
			role = toState.role;

			event.preventDefault();

			Auth.check().then(function (logged) {
				if(role === 'User' && !logged) { console.log('You cannot access this area.', 'Only for users!');
					return $state.go('user.login', params, { notify: false }).then(function (state) {
						$rootScope.$broadcast('$stateChangeSuccess', state, params, fromState, fromParams);
					});
				}

				if(role === 'Guest' && logged) { console.log('You cannot access this area.', 'Only for guests!');
					return $state.go('user.profile', params, { notify: false }).then(function (state) {
						$rootScope.$broadcast('$stateChangeSuccess', state, params, fromState, fromParams);
					});
				}

				$state.go(toState.name, toParams, { notify: false }).then(function (state) {
					$rootScope.$broadcast('$stateChangeSuccess', state, toParams, fromState, fromParams);
				});
			});
		});
	});

module.exports = modl;