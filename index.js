'use strict';

var express = require('express');
var path = require('path');

var lusca = require('lusca');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var SequelizeStore = require('connect-sequelizejs')(session.Store);

var app = express();
var passport = require(path.join(__dirname, 'app', 'passport'));
var sequelize = require(path.join(__dirname, 'app', 'sequelize'));

app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
	saveUninitialized: true,
	resave: true,
	secret: 'angular-io_938fh2983ghigbetm5l7504903u8934t',
	store: new SequelizeStore({
		db: sequelize
	})
}));
app.use(lusca({
	csrf: false,
	csp: {},
	xframe: 'SAMEORIGIN',
	p3p: 'ABCDEF',
	hsts: {
		maxAge: 31536000,
		includeSubDomains: true
	},
	xssProtection: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/lib', express.static(path.join(__dirname, 'bower_components')));
app.use('/images', express.static(path.join(__dirname, 'sources', 'images')));

// routes
require(path.join(__dirname, 'app', 'routes'))(app);

app.use('*', function (req, res) {
	res.render('index', {
		csrf_token: req.csrfToken && req.csrfToken() || '',
		cache: false
	});
});

app.listen(3000);

console.log('We\'re making love with localhost:3000');