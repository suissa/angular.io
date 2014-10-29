var fs = require('fs');
var path = require('path');

module.exports = function (passport) {
	fs.readdirSync(__dirname)
		.filter(function (file) {
			return file !== 'index.js';
		})
		.forEach(function (file) {
			require(path.join(__dirname, file))(passport);
		});
};