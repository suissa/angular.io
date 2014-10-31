'use strict';

var _ = require('underscore');
var path = require('path');

var User = require(path.join(path.dirname(__dirname), 'models')).User;

var GET_FIELDS = [
	'first_name',
	'last_name',
	'email',
	'birthday',
	'fb_id',
];

var POST_FIELDS = _.union(['password'], GET_FIELDS);

exports.requestProfile = function (req, res) {
	User.find({
		where: {
			id: req.user.id
		}
	}).then(function (user) {
		user = _.pick(user, GET_FIELDS);

		res.json(user);
	}, function (err) {
		res.json(err);
	});
};

exports.uniqueEmail = function (req, res) {
	var query = req.query;

	User.find({
		where: {
			email: query.email || ''
		}
	}).then(function (user) {
		setTimeout(function () {
			res.status(user ? 200 : 400).end();
		}, 2000);
	}, function (err) {
		res.status(200).end();
	});
};

exports.list = function (req, res) {
	User.findAll().then(function (users) {
		users = _.map(users, function (user) {
			user = _.pick(user, GET_FIELDS);
			
			return user;
		});
		
		res.json(users);
	});
};

exports.get = function (req, res) {
	User.find(req.params.user).then(function (user) {		
		res.json(_.pick(user, GET_FIELDS));
	}).error(function (err) {
		res.json(err);
	});
};

exports.store = function (req, res) {
	User.build(_.pick(req.body, POST_FIELDS)).save().then(function (user) {		
		res.json(_.pick(user, GET_FIELDS));
	}, function (err) {
		res.json(err);
	});
};

exports.destroy = function (req, res) {
	User.destroy({
		where: {
			id: req.params.user
		}
	}).then(function (affectedRows) {
		res.json({ affectedRows: affectedRows });
	}, function (err) {
		res.json(err);
	});
};

exports.update = function (req, res) {
	User.update(_.pick(req.body, POST_FIELDS), {
		where: {
			id: req.params.user
		}
	}).then(function (affectedRows) {
		res.json({ affectedRows: affectedRows });
	}, function (err) {
		res.json(err);
	});
};