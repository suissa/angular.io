var fs = require('fs');
var path = require('path');

var filters = require(path.join(__dirname, 'filters'));

module.exports = function (app) {
	fs
		.readdirSync(__dirname)
		.filter(function (file) {
			return file !== 'index.js' && file !== 'filters';
		})
		.forEach(function (file) {
			var controller = require(path.join(path.dirname(__dirname), 'controllers', file.replace(/$.js/, ''))) || null;

			require(path.join(__dirname, file))(app, controller, filters);
		});
};