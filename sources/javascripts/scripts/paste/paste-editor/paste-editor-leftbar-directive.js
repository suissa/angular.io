'use strict';

var angular = require('angular');

function PasteEditorLeftbarDirective ($animate, $document, $rootScope, $timeout, $templateCache, $compile) {
	var opened = false;
	$document = angular.element($document);

	return function (scope, element, attrs) {
		var leftbar = $templateCache.get(attrs.templateUrl);
		leftbar = angular.element(leftbar);

		function onKeydown (event) {
			var altKey = event.altKey;

			if(event.keyCode === 27 && opened) {
				opened = false;

				return scope.$$phase || (scope.$root && scope.$root.$$phase) || scope.$digest();
			}

			if(altKey && event.keyCode === 84) {
				opened = !opened;

				return scope.$$phase || (scope.$root && scope.$root.$$phase) || scope.$digest();
			}
		}

		function onChange (opened) {
			leftbar = $compile(leftbar)(scope);
			$animate[opened ? 'enter' : 'leave'](leftbar, document.body);

			if(!opened) {
				element.focus();
			}
		}

		scope.$on('$destroy', function () {
			opened = false;
			$animate.leave(leftbar);
			$document.off('keydown', onKeydown);
		});

		$document.on('keydown', onKeydown);

		scope.$watch(function () {
			return opened;
		}, onChange);
	};
}

var modl = angular.module('paste.editor.directives.paste-editor-leftbar', [])
	.directive('pasteEditorLeftbar', PasteEditorLeftbarDirective);

module.exports = modl;