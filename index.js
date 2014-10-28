var express = require('express');
var path = require('path');

var app = express();
var sequelize = require(path.join(__dirname, 'app', 'sequelize'));

app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/lib', express.static(path.join(__dirname, 'scripts', 'bower_components')));
app.use('/img', express.static(path.join(__dirname, 'scripts', 'img')));

// routes
require(path.join(__dirname, 'app', 'routes'))(app);

app.use('*', function (req, res) {
	res.render('index', {
		csrf_token: req._csrfToken || '',
		cache: false
	});
});

app.listen(3000);

console.log('We\'re making love with localhost:3000');