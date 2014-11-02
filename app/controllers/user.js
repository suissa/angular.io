'use strict';

var _ = require('underscore');
var path = require('path');

var models = require(path.join(path.dirname(__dirname), 'models'));
var User = models.User;
var Paste = models.Paste;

var GET_FIELDS = [
	'id',
	'first_name',
	'last_name',
	'email',
	'fb_id'
];

var POST_FIELDS = _.union(['password'], GET_FIELDS);

exports.requestProfile = function (req, res) {
	User.find({
		where: {
			id: req.user.id
		},
		attributes: GET_FIELDS
	}).then(function (user) {
		if(!user) res.status(404).end();

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
		},
		attributes: GET_FIELDS
	}).then(function (user) {
		setTimeout(function () {
			res.status(user ? 200 : 400).end();
		}, 2000);
	}, function (err) {
		res.status(200).end();
	});
};

exports.getPastes = function (req, res) {
	User.find({
		where: {
			id: req.user.id || 0
		}
	}).then(function (user) {
		user.getPastes().then(function (pastes) {
			res.json(pastes);
		});
	});
};

exports.list = function (req, res) {
	User.findAll({
		attributes: GET_FIELDS
	}).then(function (users) {
		res.json(users);
	}, function (err) {
		res.json(err);
	});
};

exports.get = function (req, res) {
	User.find({
		where: {
			id: req.params.user
		},
		attributes: GET_FIELDS,
		include: [{
			as: 'pastes',
			model: Paste
		}]
	}).then(function (user) {
		res.json(user);
	}, function (err) {
		res.json(err);
	});
};

exports.store = function (req, res) {
	var user = _.pick(req.body, POST_FIELDS);

	User.build(user).save().then(function (user) {
		User.find({
			where: {
				id: user.id
			},
			attributes: GET_FIELDS
		}).then(function (user) {
			res.json(user);
		}, function (err) {
			res.json(err);
		});
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
	}, res.json);
};

exports.update = function (req, res) {
	var user = _.pick(req.body, POST_FIELDS);

	User.update(user, {
		where: {
			id: req.params.user
		}
	}).then(function (affectedRows) {
		res.json({ affectedRows: affectedRows });
	}, function (err) {
		res.json(err);
	});
};