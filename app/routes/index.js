var fs = require('fs');
var path = require('path');

module.exports = function (app) {
	fs
		.readdirSync(__dirname)
		.filter(function (file) {
			return file !== 'index.js';
		})
		.forEach(function (file) {
			var controller = require(path.join(path.dirname(__dirname), 'controllers', file.replace(/$.js/, ''))) || null;

			require(path.join(__dirname, file))(app, controller);
		});
};